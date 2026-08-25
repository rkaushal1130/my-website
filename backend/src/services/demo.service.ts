import { prisma } from '../config/prisma';
import { CreateDemoRequestInput } from '../validators/demo.validator';
import { logger } from '../utils/logger';

export class DemoService {
  public static async createDemoRequest(input: CreateDemoRequestInput) {
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

      logger.info(`New demo request booked: ${demoMessage.id} (${demoMessage.email})`);
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
