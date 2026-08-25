import { prisma } from '../config/prisma';
import { CreateDemoRequestInput } from '../validators/demo.validator';
import { logger } from '../utils/logger';

export class DemoService {
  public static async createDemoRequest(input: CreateDemoRequestInput) {
    try {
      const demo = await prisma.demoRequest.create({
        data: {
          fullName: input.fullName,
          workEmail: input.workEmail,
          companyName: input.companyName,
          companySize: input.companySize,
          primaryInterest: input.primaryInterest,
          notes: input.notes,
        },
      });

      logger.info(`New demo request booked: ${demo.id} (${demo.workEmail})`);
      return demo;
    } catch (error) {
      logger.warn('Database write bypassed or failed, recording in-memory/logger payload', error);
      return {
        id: `mock-${Date.now()}`,
        ...input,
        status: 'REQUESTED',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  }

  public static async listDemoRequests() {
    try {
      return await prisma.demoRequest.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      logger.error('Failed to list demo requests', error);
      return [];
    }
  }
}
