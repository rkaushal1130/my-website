import { prisma } from '../config/prisma';
import { CreateDemoRequestInput } from '../validators/demo.validator';
import { logger } from '../utils/logger';
import { WebsiteSubmission } from '../models/submission.model';
import { isMongoConnected, ensureMongoConnected } from '../config/mongoose';

export class DemoService {
  public static async createDemoRequest(input: CreateDemoRequestInput) {
    // 1. Primary storage: MongoDB Atlas (rahul_database.website)
    try {
      await ensureMongoConnected();
      if (isMongoConnected()) {
        const demo = await WebsiteSubmission.create({
          type: 'demo',
          formType: 'demo',
          name: input.fullName,
          fullName: input.fullName,
          email: input.workEmail.toLowerCase().trim(),
          workEmail: input.workEmail.toLowerCase().trim(),
          company: input.companyName,
          companyName: input.companyName,
          service: `Demo: ${input.primaryInterest || 'General'}`,
          primaryInterest: input.primaryInterest || 'General',
          companySize: input.companySize || 'N/A',
          notes: input.notes || '',
          message: `Company Size: ${input.companySize || 'N/A'}\nNotes: ${input.notes || 'None'}`,
          status: 'NEW',
        });

        logger.info(`✅ Demo request saved to MongoDB Atlas [website]: ID=${demo._id} (${demo.email})`);
        return {
          id: demo._id.toString(),
          name: demo.name,
          email: demo.email,
          company: demo.company,
          service: demo.service,
          message: demo.message,
          status: demo.status,
          createdAt: demo.createdAt,
          updatedAt: demo.updatedAt,
        };
      }
    } catch (mongoErr: any) {
      logger.error('Failed to save demo request to MongoDB Atlas:', mongoErr.message);
    }

    // 2. Secondary fallback
    try {
      const demoMessage = await prisma.contactMessage.create({
        data: {
          name: input.fullName,
          email: input.workEmail,
          company: input.companyName,
          service: `Demo: ${input.primaryInterest || 'General'}`,
          message: `Company Size: ${input.companySize || 'N/A'}\nNotes: ${input.notes || 'None'}`,
          status: 'NEW',
        },
      });

      logger.info(`New demo request booked via Prisma: ${demoMessage.id} (${demoMessage.email})`);
      return demoMessage;
    } catch (error) {
      logger.warn('Database write bypassed or failed, recording in-memory/logger payload', error);
      return {
        id: `mock-${Date.now()}`,
        name: input.fullName,
        email: input.workEmail,
        company: input.companyName,
        service: `Demo: ${input.primaryInterest || 'General'}`,
        message: `Company Size: ${input.companySize || 'N/A'}\nNotes: ${input.notes || 'None'}`,
        status: 'NEW',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  }

  public static async listDemoRequests() {
    try {
      await ensureMongoConnected();
      if (isMongoConnected()) {
        const docs = await WebsiteSubmission.find({ type: 'demo' })
          .sort({ createdAt: -1 })
          .lean();
        return docs.map((d: any) => ({
          ...d,
          id: d._id.toString(),
        }));
      }
    } catch (mongoErr: any) {
      logger.warn('Failed to list demos from MongoDB Atlas:', mongoErr.message);
    }

    try {
      return await prisma.contactMessage.findMany({
        where: {
          service: {
            startsWith: 'Demo:',
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      logger.error('Failed to list demo requests', error);
      return [];
    }
  }
}
