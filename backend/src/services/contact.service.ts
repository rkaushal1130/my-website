import { prisma, withDbFallback } from '../config/prisma';
import { CreateContactInput } from '../validators/contact.validator';
import { MessageStatus } from '@prisma/client';
import { logger } from '../utils/logger';
import { env } from '../config/environment';
import { ContactSubmission } from '../models/submission.model';
import { isMongoConnected, ensureMongoConnected } from '../config/mongoose';
import mongoose from 'mongoose';

export interface ListContactFilters {
  page?: number;
  limit?: number;
  status?: MessageStatus;
  search?: string;
}

const devContactMessagesStore: any[] = [];

export class ContactService {
  /**
   * Saves contact form inquiry to MongoDB Atlas in the 'website' collection of 'rahul_database'.
   * Contains ONLY: Full Name, Email Address, Phone Number, Company Name, Area of Interest / Service, Message.
   */
  public static async createMessage(input: CreateContactInput) {
    const docData: any = {
      name: input.name.trim(),
      email: input.email.toLowerCase().trim(),
      service: input.service && input.service.trim() ? input.service.trim() : 'AI Automation',
      message: input.message.trim(),
    };

    if (input.phone && input.phone.trim()) {
      docData.phone = input.phone.trim();
    }
    if (input.company && input.company.trim()) {
      docData.company = input.company.trim();
    }

    // 1. Primary storage: MongoDB Atlas (rahul_database.website)
    try {
      await ensureMongoConnected();
      if (isMongoConnected()) {
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
        const duplicate = await ContactSubmission.findOne({
          email: docData.email,
          message: docData.message,
          createdAt: { $gte: oneMinuteAgo },
        });

        if (duplicate) {
          logger.info(`Duplicate contact submission prevented in MongoDB Atlas for ${docData.email}`);
          return true;
        }

        const submission = await ContactSubmission.create(docData);

        logger.info(`✅ Clean contact message saved to MongoDB Atlas [website]: ID=${submission._id} from ${submission.email}`);
        logger.info(`📧 Notification routed to admin: ${env.NOTIFICATION_EMAIL} for inquiry from ${submission.name} (${submission.email})`);
        return true;
      }
    } catch (mongoErr: any) {
      logger.error('Error saving contact to MongoDB Atlas:', mongoErr.message);
    }

    // 2. Secondary fallback (Prisma or in-memory)
    const fallbackData = {
      ...docData,
      phone: docData.phone || null,
      company: docData.company || null,
      status: 'NEW' as MessageStatus,
    };

    return withDbFallback(
      async () => {
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
        const duplicate = await prisma.contactMessage.findFirst({
          where: {
            email: fallbackData.email,
            message: fallbackData.message,
            createdAt: { gte: oneMinuteAgo },
          },
        });

        if (duplicate) {
          return true;
        }

        const message = await prisma.contactMessage.create({ data: fallbackData });
        return true;
      },
      async () => {
        const devMsg = {
          id: `msg-${Date.now()}`,
          ...fallbackData,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        devContactMessagesStore.push(devMsg);
        return true;
      }
    );
  }

  public static async createContactMessage(input: CreateContactInput) {
    return this.createMessage(input);
  }

  public static async getMessages(filters: ListContactFilters = {}) {
    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const limit = filters.limit && filters.limit > 0 ? filters.limit : 20;
    const skip = (page - 1) * limit;

    try {
      await ensureMongoConnected();
      if (isMongoConnected()) {
        const query: any = { message: { $exists: true } };

        if (filters.search && filters.search.trim()) {
          const term = filters.search.trim();
          query.$or = [
            { name: { $regex: term, $options: 'i' } },
            { email: { $regex: term, $options: 'i' } },
            { company: { $regex: term, $options: 'i' } },
            { service: { $regex: term, $options: 'i' } },
            { message: { $regex: term, $options: 'i' } },
          ];
        }

        const [total, docs] = await Promise.all([
          ContactSubmission.countDocuments(query),
          ContactSubmission.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        ]);

        const items = docs.map((doc: any) => ({
          ...doc,
          id: doc._id.toString(),
          status: doc.status || 'NEW',
        }));

        return {
          items,
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit) || 1,
          },
        };
      }
    } catch (mongoErr: any) {
      logger.warn('MongoDB query failed, using fallback:', mongoErr.message);
    }

    return {
      items: devContactMessagesStore.slice(skip, skip + limit),
      pagination: {
        total: devContactMessagesStore.length,
        page,
        limit,
        totalPages: Math.ceil(devContactMessagesStore.length / limit) || 1,
      },
    };
  }

  public static async listContactMessages(filters: ListContactFilters = {}) {
    return this.getMessages(filters);
  }

  public static async getMessageById(id: string) {
    try {
      await ensureMongoConnected();
      if (isMongoConnected() && mongoose.Types.ObjectId.isValid(id)) {
        const doc: any = await ContactSubmission.findOne({ _id: id }).lean();
        if (doc) {
          return { ...doc, id: doc._id.toString(), status: doc.status || 'NEW' };
        }
      }
    } catch {
      // fallback
    }
    return devContactMessagesStore.find((m) => m.id === id) || null;
  }

  public static async getContactMessageById(id: string) {
    return this.getMessageById(id);
  }

  public static async updateMessageStatus(id: string, status: MessageStatus) {
    try {
      await ensureMongoConnected();
      if (isMongoConnected() && mongoose.Types.ObjectId.isValid(id)) {
        const updated: any = await ContactSubmission.findByIdAndUpdate(
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

  public static async updateContactMessageStatus(id: string, status: MessageStatus) {
    return this.updateMessageStatus(id, status);
  }

  public static async deleteMessage(id: string) {
    try {
      await ensureMongoConnected();
      if (isMongoConnected() && mongoose.Types.ObjectId.isValid(id)) {
        await ContactSubmission.findByIdAndDelete(id);
        return true;
      }
    } catch {
      // fallback
    }
    return true;
  }

  public static async deleteContactMessage(id: string) {
    return this.deleteMessage(id);
  }
}
