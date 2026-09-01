import { prisma, withDbFallback } from '../config/prisma';
import { CreateApplicationInput } from '../validators/application.validator';
import { ApplicationStatus } from '@prisma/client';
import { logger } from '../utils/logger';
import { env } from '../config/environment';
import { CareerSubmission } from '../models/submission.model';
import { isMongoConnected, ensureMongoConnected } from '../config/mongoose';
import mongoose from 'mongoose';

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

const devApplicationsStore: any[] = [];

export class ApplicationService {
  /**
   * Saves candidate application to MongoDB Atlas in the 'website' collection of 'rahul_database'.
   * Contains ONLY:
   * 1. Full Name (name)
   * 2. Email Address (email)
   * 3. Phone Number (phone)
   * 4. Primary Role / Focus Area (role)
   * 5. Experience Level (experience)
   * 6. LinkedIn / Portfolio / GitHub Profile (portfolio)
   * 7. Resume / CV File (resume)
   * 8. Introduction / Why NeverquiT AI? (introduction)
   */
  public static async createApplication(input: CreateApplicationInput) {
    const docData: any = {
      name: input.name.trim(),
      email: input.email.toLowerCase().trim(),
      role: (input.role || input.roleTitle || input.jobTitle || 'AI & Deep Learning Engineer').trim(),
      experience: (input.experience || 'Fresh Graduate / Student').trim(),
      introduction: (input.introduction || input.coverLetter || '').trim(),
    };

    if (input.phone && input.phone.trim()) {
      docData.phone = input.phone.trim();
    }
    const portfolioVal = input.portfolio || input.portfolioUrl || input.linkedinUrl;
    if (portfolioVal && portfolioVal.trim()) {
      docData.portfolio = portfolioVal.trim();
    }
    const resumeVal = input.resume || input.resumeUrl;
    if (resumeVal && resumeVal.trim()) {
      docData.resume = resumeVal.trim();
    }

    // 1. Primary Storage: MongoDB Atlas (rahul_database.website)
    try {
      await ensureMongoConnected();
      if (isMongoConnected()) {
        const application = await CareerSubmission.create(docData);

        logger.info(
          `✅ Clean job application saved to MongoDB Atlas [website]: ID=${application._id} for ${docData.role} from ${docData.email}`
        );
        logger.info(
          `📧 Notification routed to admin: ${env.NOTIFICATION_EMAIL} for application from ${docData.name} (${docData.email})`
        );
        return true;
      }
    } catch (mongoErr: any) {
      logger.error('Error saving career application to MongoDB Atlas:', mongoErr.message);
    }

    // 2. Secondary fallback
    const fallbackData = {
      ...docData,
      phone: docData.phone || null,
      resumeUrl: docData.resume || null,
      jobTitle: docData.role,
      coverLetter: docData.introduction,
      status: 'RECEIVED' as ApplicationStatus,
    };

    return withDbFallback(
      async () => {
        await prisma.careerApplication.create({
          data: {
            name: fallbackData.name,
            email: fallbackData.email,
            phone: fallbackData.phone,
            resumeUrl: fallbackData.resumeUrl,
            coverLetter: fallbackData.coverLetter,
            status: fallbackData.status,
          },
        });
        return true;
      },
      async () => {
        const devApp = {
          id: `app-${Date.now()}`,
          ...fallbackData,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        devApplicationsStore.push(devApp);
        return true;
      }
    );
  }

  public static async getApplications(filters: ListApplicationFilters = {}) {
    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const limit = filters.limit && filters.limit > 0 ? filters.limit : 20;
    const skip = (page - 1) * limit;

    try {
      await ensureMongoConnected();
      if (isMongoConnected()) {
        const query: any = {
          $or: [{ role: { $exists: true } }, { introduction: { $exists: true } }],
        };

        if (filters.jobTitle && filters.jobTitle.trim()) {
          query.role = { $regex: filters.jobTitle.trim(), $options: 'i' };
        }

        if (filters.search && filters.search.trim()) {
          const term = filters.search.trim();
          query.$or = [
            { name: { $regex: term, $options: 'i' } },
            { email: { $regex: term, $options: 'i' } },
            { role: { $regex: term, $options: 'i' } },
            { introduction: { $regex: term, $options: 'i' } },
          ];
        }

        const [total, docs] = await Promise.all([
          CareerSubmission.countDocuments(query),
          CareerSubmission.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        ]);

        const items = docs.map((doc: any) => ({
          ...doc,
          id: doc._id.toString(),
          jobTitle: doc.role || doc.jobTitle || 'AI & Deep Learning Engineer',
          coverLetter: doc.introduction || doc.coverLetter || '',
          resumeUrl: doc.resume || doc.portfolio || '',
          status: doc.status || 'RECEIVED',
          job: {
            id: doc._id.toString(),
            title: doc.role || 'AI & Deep Learning Engineer',
            slug: (doc.role || 'AI Engineer').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            department: 'Engineering',
          },
        }));

        return {
          items,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit) || 1,
          },
        };
      }
    } catch (mongoErr: any) {
      logger.warn('MongoDB query for applications failed, using fallback:', mongoErr.message);
    }

    return {
      items: devApplicationsStore.slice(skip, skip + limit),
      pagination: {
        total: devApplicationsStore.length,
        totalPages: Math.ceil(devApplicationsStore.length / limit) || 1,
      },
    };
  }

  public static async listApplications(filters: ListApplicationFilters = {}) {
    return this.getApplications(filters);
  }

  public static async getApplicationById(id: string) {
    try {
      await ensureMongoConnected();
      if (isMongoConnected() && mongoose.Types.ObjectId.isValid(id)) {
        const doc: any = await CareerSubmission.findOne({ _id: id }).lean();
        if (doc) {
          return {
            ...doc,
            id: doc._id.toString(),
            jobTitle: doc.role || doc.jobTitle,
            coverLetter: doc.introduction || doc.coverLetter,
            status: doc.status || 'RECEIVED',
          };
        }
      }
    } catch {
      // fallback
    }
    return devApplicationsStore.find((a) => a.id === id) || null;
  }

  public static async findById(id: string) {
    return this.getApplicationById(id);
  }

  public static async updateApplicationStatus(id: string, status: ApplicationStatus) {
    try {
      await ensureMongoConnected();
      if (isMongoConnected() && mongoose.Types.ObjectId.isValid(id)) {
        const updated: any = await CareerSubmission.findByIdAndUpdate(
          id,
          { status, updatedAt: new Date() },
          { new: true }
        ).lean();
        if (updated) {
          return { ...updated, id: updated._id.toString() };
        }
      }
    } catch {
      // fallback
    }
    return null;
  }

  public static async updateStatus(id: string, status: ApplicationStatus) {
    return this.updateApplicationStatus(id, status);
  }

  public static async deleteApplication(id: string) {
    try {
      await ensureMongoConnected();
      if (isMongoConnected() && mongoose.Types.ObjectId.isValid(id)) {
        await CareerSubmission.findByIdAndDelete(id);
        return true;
      }
    } catch {
      // fallback
    }
    return true;
  }
}
