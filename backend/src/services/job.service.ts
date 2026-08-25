import { prisma, withDbFallback } from '../config/prisma';
import { CreateJobInput, UpdateJobInput, slugify } from '../validators/job.validator';
import { DuplicateSlugError } from './project.service';
import { logger } from '../utils/logger';

export interface ListJobFilters {
  page?: number;
  limit?: number;
  department?: string;
  location?: string;
  employmentType?: string;
  published?: boolean;
  search?: string;
}

// Dev in-memory store fallback for offline mode
const devJobsStore: any[] = [
  {
    id: 'job-00000000-0000-0000-0000-000000000001',
    title: 'Principal AI Systems Architect',
    slug: 'principal-ai-systems-architect',
    department: 'Engineering',
    location: 'Remote / Global',
    employmentType: 'Full-time',
    description: 'Lead architecture and distributed high-performance deployment of autonomous LLM reasoning pipelines.',
    requirements: '8+ years distributed backend systems, PyTorch/TensorFlow, high-throughput streaming architectures.',
    salaryRange: '$180,000 - $240,000',
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'job-00000000-0000-0000-0000-000000000002',
    title: 'Lead Autonomous Agent Engineer',
    slug: 'lead-autonomous-agent-engineer',
    department: 'Engineering',
    location: 'Remote / Global',
    employmentType: 'Full-time',
    description: 'Design self-correcting agentic memory, tool-calling pipelines, and multimodal inference layers.',
    requirements: '5+ years TypeScript/Python, vector indexing, LangGraph or custom multi-agent orchestrations.',
    salaryRange: '$150,000 - $200,000',
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class JobService {
  /**
   * Creates a new job posting with slug validation in PostgreSQL.
   */
  public static async createJob(input: CreateJobInput) {
    const finalSlug = (input.slug ? slugify(input.slug) : slugify(input.title)).trim();

    if (!finalSlug) {
      throw new Error('Valid slug or title is required.');
    }

    const data = {
      title: input.title.trim(),
      slug: finalSlug,
      department: input.department.trim(),
      location: input.location.trim(),
      employmentType: input.employmentType.trim(),
      description: input.description.trim(),
      requirements: input.requirements.trim(),
      salaryRange: input.salaryRange || null,
      published: input.published ?? false,
    };

    return withDbFallback(
      async () => {
        const existing = await prisma.job.findUnique({
          where: { slug: finalSlug },
        });

        if (existing) {
          throw new DuplicateSlugError(`A job with slug "${finalSlug}" already exists.`);
        }

        const job = await prisma.job.create({ data });
        logger.info(`Job created: ${job.id} (${job.title} - ${job.slug})`);
        return job;
      },
      async () => {
        const devExisting = devJobsStore.find((j) => j.slug === finalSlug);
        if (devExisting) {
          throw new DuplicateSlugError(`A job with slug "${finalSlug}" already exists.`);
        }

        const newJob = {
          id: `dev-job-${Date.now()}`,
          ...data,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        devJobsStore.push(newJob);
        return newJob;
      }
    );
  }

  /**
   * Retrieves public published jobs.
   */
  public static async getPublishedJobs(filters: ListJobFilters = {}) {
    return this.listJobs({ ...filters, published: true }, false);
  }

  /**
   * Retrieves all jobs for administrators.
   */
  public static async getAllJobs(filters: ListJobFilters = {}) {
    return this.listJobs(filters, true);
  }

  /**
   * Retrieves paginated job openings.
   */
  public static async listJobs(filters: ListJobFilters = {}, isAdmin: boolean = false) {
    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const limit = filters.limit && filters.limit > 0 ? filters.limit : 12;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (!isAdmin) {
      where.published = true;
    } else if (filters.published !== undefined) {
      where.published = filters.published;
    }

    if (filters.department && filters.department.trim()) {
      where.department = {
        contains: filters.department.trim(),
        mode: 'insensitive',
      };
    }

    if (filters.location && filters.location.trim()) {
      where.location = {
        contains: filters.location.trim(),
        mode: 'insensitive',
      };
    }

    if (filters.employmentType && filters.employmentType.trim()) {
      where.employmentType = {
        contains: filters.employmentType.trim(),
        mode: 'insensitive',
      };
    }

    if (filters.search && filters.search.trim()) {
      const term = filters.search.trim();
      where.OR = [
        { title: { contains: term, mode: 'insensitive' } },
        { department: { contains: term, mode: 'insensitive' } },
        { location: { contains: term, mode: 'insensitive' } },
        { description: { contains: term, mode: 'insensitive' } },
      ];
    }

    return withDbFallback(
      async () => {
        const [total, items] = await prisma.$transaction([
          prisma.job.count({ where }),
          prisma.job.findMany({
            where,
            skip,
            take: limit,
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
        let items = [...devJobsStore];
        if (!isAdmin) {
          items = items.filter((j) => j.published);
        } else if (filters.published !== undefined) {
          items = items.filter((j) => j.published === filters.published);
        }
        if (filters.department && filters.department.trim()) {
          items = items.filter((j) =>
            j.department.toLowerCase().includes(filters.department!.toLowerCase().trim())
          );
        }
        if (filters.search && filters.search.trim()) {
          const term = filters.search.toLowerCase().trim();
          items = items.filter(
            (j) =>
              j.title.toLowerCase().includes(term) || j.description.toLowerCase().includes(term)
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

  /**
   * Looks up a job by its unique slug.
   */
  public static async findBySlug(slug: string, isAdmin: boolean = false) {
    const normalizedSlug = slug.toLowerCase().trim();

    return withDbFallback(
      async () => {
        const where: any = { slug: normalizedSlug };
        if (!isAdmin) {
          where.published = true;
        }
        return await prisma.job.findFirst({ where });
      },
      async () => {
        const dev = devJobsStore.find((j) => j.slug === normalizedSlug && (isAdmin || j.published));
        return dev || null;
      }
    );
  }

  /**
   * Looks up a job by its unique ID.
   */
  public static async findById(id: string) {
    return withDbFallback(
      async () => {
        return await prisma.job.findUnique({ where: { id } });
      },
      async () => {
        return devJobsStore.find((j) => j.id === id) || null;
      }
    );
  }

  /**
   * Updates an existing job posting.
   */
  public static async updateJob(id: string, input: UpdateJobInput) {
    return withDbFallback(
      async () => {
        const existing = await prisma.job.findUnique({ where: { id } });
        if (!existing) return null;

        const updateData: any = {};
        if (input.title !== undefined) updateData.title = input.title.trim();
        if (input.department !== undefined) updateData.department = input.department.trim();
        if (input.location !== undefined) updateData.location = input.location.trim();
        if (input.employmentType !== undefined) updateData.employmentType = input.employmentType.trim();
        if (input.description !== undefined) updateData.description = input.description.trim();
        if (input.requirements !== undefined) updateData.requirements = input.requirements.trim();
        if (input.salaryRange !== undefined) updateData.salaryRange = input.salaryRange || null;
        if (typeof input.published === 'boolean') updateData.published = input.published;

        if (input.slug) {
          const newSlug = slugify(input.slug);
          if (newSlug !== existing.slug) {
            const slugConflict = await prisma.job.findFirst({
              where: { slug: newSlug, NOT: { id } },
            });
            if (slugConflict) {
              throw new DuplicateSlugError(`A job with slug "${newSlug}" already exists.`);
            }
            updateData.slug = newSlug;
          }
        }

        return await prisma.job.update({
          where: { id },
          data: updateData,
        });
      },
      async () => {
        const devIndex = devJobsStore.findIndex((j) => j.id === id);
        if (devIndex === -1) return null;

        const dev = devJobsStore[devIndex];
        if (input.slug) {
          const newSlug = slugify(input.slug);
          const conflict = devJobsStore.find((j) => j.slug === newSlug && j.id !== id);
          if (conflict) {
            throw new DuplicateSlugError(`A job with slug "${newSlug}" already exists.`);
          }
          dev.slug = newSlug;
        }
        if (input.title !== undefined) dev.title = input.title.trim();
        if (input.department !== undefined) dev.department = input.department.trim();
        if (input.location !== undefined) dev.location = input.location.trim();
        if (input.employmentType !== undefined) dev.employmentType = input.employmentType.trim();
        if (input.description !== undefined) dev.description = input.description.trim();
        if (input.requirements !== undefined) dev.requirements = input.requirements.trim();
        if (input.salaryRange !== undefined) dev.salaryRange = input.salaryRange || null;
        if (typeof input.published === 'boolean') dev.published = input.published;
        dev.updatedAt = new Date();

        return dev;
      }
    );
  }

  /**
   * Deletes a job posting by ID.
   */
  public static async deleteJob(id: string) {
    return withDbFallback(
      async () => {
        const existing = await prisma.job.findUnique({ where: { id } });
        if (!existing) return null;

        await prisma.job.delete({ where: { id } });
        logger.info(`Job ${id} deleted by administrator`);
        return true;
      },
      async () => {
        const devIndex = devJobsStore.findIndex((j) => j.id === id);
        if (devIndex !== -1) {
          devJobsStore.splice(devIndex, 1);
          return true;
        }
        return null;
      }
    );
  }
}
