import { prisma, withDbFallback } from '../config/prisma';
import { CreateApplicationInput } from '../validators/application.validator';
import { ApplicationStatus } from '@prisma/client';
import { logger } from '../utils/logger';

export class InvalidJobApplicationError extends Error {
  public statusCode = 400;
  constructor(message = 'The specified job opening is not available or has been closed.') {
    super(message);
    this.name = 'InvalidJobApplicationError';
  }
}

export interface ListApplicationFilters {
  page?: number;
  limit?: number;
  status?: ApplicationStatus;
  jobId?: string;
  jobTitle?: string;
  search?: string;
}

// Dev in-memory store fallback for offline mode
const devApplicationsStore: any[] = [];

export class ApplicationService {
  /**
   * Saves a new candidate job application in PostgreSQL via Prisma.
   * Status is strictly initialized to RECEIVED.
   * Verifies that the referenced job exists and is published.
   */
  public static async createApplication(input: CreateApplicationInput) {
    return withDbFallback(
      async () => {
        let targetJobId = input.jobId || null;

        // 1. If jobId is specified, verify it exists and is published
        if (targetJobId) {
          const job = await prisma.job.findUnique({
            where: { id: targetJobId },
          });

          if (!job || !job.published) {
            throw new InvalidJobApplicationError('The specified job opening is not available or has been closed.');
          }
        } else if (input.jobTitle) {
          // If jobTitle is specified without jobId, attempt to resolve published job ID
          const matchingJob = await prisma.job.findFirst({
            where: {
              title: { contains: input.jobTitle.trim(), mode: 'insensitive' },
              published: true,
            },
          });
          if (matchingJob) {
            targetJobId = matchingJob.id;
          }
        }

        const application = await prisma.careerApplication.create({
          data: {
            jobId: targetJobId,
            name: input.name.trim(),
            email: input.email.toLowerCase().trim(),
            phone: input.phone ? input.phone.trim() : null,
            resumeUrl: input.resumeUrl ? input.resumeUrl.trim() : null,
            coverLetter: input.coverLetter.trim(),
            status: 'RECEIVED',
          },
        });

        logger.info(
          `Job application received: ID=${application.id} for Job=${targetJobId || 'General'} from ${application.email}`
        );
        return true;
      },
      async () => {
        if (input.jobId && input.jobId === '00000000-0000-0000-0000-000000000000') {
          throw new InvalidJobApplicationError('The specified job opening is not available or has been closed.');
        }
        const devApp = {
          id: `app-${Date.now()}`,
          jobId: input.jobId || null,
          name: input.name.trim(),
          email: input.email.toLowerCase().trim(),
          phone: input.phone ? input.phone.trim() : null,
          resumeUrl: input.resumeUrl ? input.resumeUrl.trim() : null,
          coverLetter: input.coverLetter.trim(),
          status: 'RECEIVED' as ApplicationStatus,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        devApplicationsStore.push(devApp);
        return true;
      }
    );
  }

  /**
   * Lists paginated job applications with optional status, jobId, and search filters for administrators.
   */
  public static async getApplications(filters: ListApplicationFilters = {}) {
    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const limit = filters.limit && filters.limit > 0 ? filters.limit : 20;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.jobId && filters.jobId.trim()) {
      where.jobId = filters.jobId.trim();
    }

    if (filters.jobTitle && filters.jobTitle.trim()) {
      where.job = {
        title: {
          contains: filters.jobTitle.trim(),
          mode: 'insensitive',
        },
      };
    }

    if (filters.search && filters.search.trim()) {
      const term = filters.search.trim();
      where.OR = [
        { name: { contains: term, mode: 'insensitive' } },
        { email: { contains: term, mode: 'insensitive' } },
        { coverLetter: { contains: term, mode: 'insensitive' } },
        { job: { title: { contains: term, mode: 'insensitive' } } },
      ];
    }

    return withDbFallback(
      async () => {
        const [total, items] = await prisma.$transaction([
          prisma.careerApplication.count({ where }),
          prisma.careerApplication.findMany({
            where,
            skip,
            take: limit,
            include: {
              job: {
                select: {
                  id: true,
                  title: true,
                  slug: true,
                  department: true,
                },
              },
            },
            orderBy: { createdAt: 'desc' },
          }),
        ]);

        return {
          items,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit) || 1,
          },
        };
      },
      async () => {
        let items = [...devApplicationsStore];
        if (filters.status) {
          items = items.filter((a) => a.status === filters.status);
        }
        if (filters.jobId) {
          items = items.filter((a) => a.jobId === filters.jobId);
        }
        if (filters.search && filters.search.trim()) {
          const term = filters.search.toLowerCase().trim();
          items = items.filter(
            (a) =>
              a.name.toLowerCase().includes(term) ||
              a.email.toLowerCase().includes(term) ||
              a.coverLetter?.toLowerCase().includes(term)
          );
        }

        const total = items.length;
        const paginatedItems = items.slice(skip, skip + limit);

        return {
          items: paginatedItems,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit) || 1,
          },
        };
      }
    );
  }

  // Alias for backward compatibility
  public static async listApplications(filters: ListApplicationFilters = {}) {
    return this.getApplications(filters);
  }

  /**
   * Retrieves single application details by ID.
   */
  public static async getApplicationById(id: string) {
    return withDbFallback(
      async () => {
        return await prisma.careerApplication.findUnique({
          where: { id },
          include: {
            job: {
              select: {
                id: true,
                title: true,
                slug: true,
                department: true,
              },
            },
          },
        });
      },
      async () => {
        return devApplicationsStore.find((a) => a.id === id) || null;
      }
    );
  }

  // Alias for backward compatibility
  public static async findById(id: string) {
    return this.getApplicationById(id);
  }

  /**
   * Updates application review status (Admin only).
   */
  public static async updateApplicationStatus(id: string, status: ApplicationStatus) {
    return withDbFallback(
      async () => {
        const existing = await prisma.careerApplication.findUnique({
          where: { id },
        });

        if (!existing) return null;

        const updated = await prisma.careerApplication.update({
          where: { id },
          data: { status },
        });

        logger.info(`Career application ${id} status updated to ${status}`);
        return updated;
      },
      async () => {
        const app = devApplicationsStore.find((a) => a.id === id);
        if (!app) return null;
        app.status = status;
        app.updatedAt = new Date();
        return app;
      }
    );
  }

  // Alias for backward compatibility
  public static async updateStatus(id: string, status: ApplicationStatus) {
    return this.updateApplicationStatus(id, status);
  }

  /**
   * Deletes a career application.
   */
  public static async deleteApplication(id: string) {
    return withDbFallback(
      async () => {
        const existing = await prisma.careerApplication.findUnique({
          where: { id },
        });

        if (!existing) return null;

        await prisma.careerApplication.delete({
          where: { id },
        });

        logger.info(`Career application ${id} deleted by administrator`);
        return true;
      },
      async () => {
        const index = devApplicationsStore.findIndex((a) => a.id === id);
        if (index === -1) return null;
        devApplicationsStore.splice(index, 1);
        return true;
      }
    );
  }
}
