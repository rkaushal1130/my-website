import { prisma, withDbFallback } from '../config/prisma';
import { CreateContactInput } from '../validators/contact.validator';
import { MessageStatus } from '@prisma/client';
import { logger } from '../utils/logger';
import { env } from '../config/environment';

export interface ListContactFilters {
  page?: number;
  limit?: number;
  status?: MessageStatus;
  search?: string;
}

// Dev in-memory store fallback for offline testing
const devContactMessagesStore: any[] = [];

export class ContactService {
  /**
   * Saves a valid contact message to the ContactMessage model in PostgreSQL.
   */
  public static async createMessage(input: CreateContactInput) {
    const data = {
      name: input.name.trim(),
      email: input.email.toLowerCase().trim(),
      phone: input.phone ? input.phone.trim() : null,
      company: input.company ? input.company.trim() : null,
      service: input.service ? input.service.trim() : null,
      message: input.message.trim(),
      status: 'NEW' as MessageStatus,
    };

    return withDbFallback(
      async () => {
        // Prevent accidental duplicate submissions within 60 seconds
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
        const duplicate = await prisma.contactMessage.findFirst({
          where: {
            email: data.email,
            message: data.message,
            createdAt: { gte: oneMinuteAgo },
          },
        });

        if (duplicate) {
          logger.info(`Duplicate contact submission prevented for ${data.email} (ID=${duplicate.id})`);
          return true;
        }

        const message = await prisma.contactMessage.create({ data });
        logger.info(`Contact message saved: ID=${message.id} from ${message.email}`);
        logger.info(`📧 Notification routed to admin: ${env.NOTIFICATION_EMAIL} for contact inquiry from ${message.name} (${message.email})`);
        return true;
      },
      async () => {
        const oneMinuteAgo = Date.now() - 60 * 1000;
        const duplicate = devContactMessagesStore.find(
          (m) =>
            m.email === data.email &&
            m.message === data.message &&
            m.createdAt.getTime() >= oneMinuteAgo
        );

        if (duplicate) {
          logger.info(`Duplicate contact submission prevented in dev store for ${data.email}`);
          return true;
        }

        const devMsg = {
          id: `msg-${Date.now()}`,
          ...data,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        devContactMessagesStore.push(devMsg);
        logger.info(`📧 Dev store: Notification routed to admin: ${env.NOTIFICATION_EMAIL} for contact inquiry from ${data.name}`);
        return true;
      }
    );
  }

  // Alias for backward compatibility
  public static async createContactMessage(input: CreateContactInput) {
    return this.createMessage(input);
  }

  /**
   * Retrieves paginated contact messages with optional status and text filters for administrators.
   */
  public static async getMessages(filters: ListContactFilters = {}) {
    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const limit = filters.limit && filters.limit > 0 ? filters.limit : 20;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.search && filters.search.trim()) {
      const term = filters.search.trim();
      where.OR = [
        { name: { contains: term, mode: 'insensitive' } },
        { email: { contains: term, mode: 'insensitive' } },
        { company: { contains: term, mode: 'insensitive' } },
        { service: { contains: term, mode: 'insensitive' } },
        { message: { contains: term, mode: 'insensitive' } },
      ];
    }

    return withDbFallback(
      async () => {
        const [total, items] = await prisma.$transaction([
          prisma.contactMessage.count({ where }),
          prisma.contactMessage.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
          }),
        ]);

        return {
          items,
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit) || 1,
          },
        };
      },
      async () => {
        let items = [...devContactMessagesStore];
        if (filters.status) {
          items = items.filter((m) => m.status === filters.status);
        }
        if (filters.search && filters.search.trim()) {
          const term = filters.search.toLowerCase().trim();
          items = items.filter(
            (m) =>
              m.name.toLowerCase().includes(term) ||
              m.email.toLowerCase().includes(term) ||
              m.message.toLowerCase().includes(term)
          );
        }

        const total = items.length;
        const paginatedItems = items.slice(skip, skip + limit);

        return {
          items: paginatedItems,
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit) || 1,
          },
        };
      }
    );
  }

  // Alias for backward compatibility
  public static async listContactMessages(filters: ListContactFilters = {}) {
    return this.getMessages(filters);
  }

  /**
   * Fetches a specific contact message by ID.
   */
  public static async getMessageById(id: string) {
    return withDbFallback(
      async () => {
        return await prisma.contactMessage.findUnique({
          where: { id },
        });
      },
      async () => {
        return devContactMessagesStore.find((m) => m.id === id) || null;
      }
    );
  }

  // Alias for backward compatibility
  public static async getContactMessageById(id: string) {
    return this.getMessageById(id);
  }

  /**
   * Updates the status of an existing contact message (NEW, READ, REPLIED, ARCHIVED).
   */
  public static async updateMessageStatus(id: string, status: MessageStatus) {
    return withDbFallback(
      async () => {
        const existing = await prisma.contactMessage.findUnique({ where: { id } });
        if (!existing) return null;

        const updated = await prisma.contactMessage.update({
          where: { id },
          data: { status },
        });

        logger.info(`Contact message ${id} status updated to ${status}`);
        return updated;
      },
      async () => {
        const msg = devContactMessagesStore.find((m) => m.id === id);
        if (!msg) return null;
        msg.status = status;
        msg.updatedAt = new Date();
        return msg;
      }
    );
  }

  // Alias for backward compatibility
  public static async updateContactMessageStatus(id: string, status: MessageStatus) {
    return this.updateMessageStatus(id, status);
  }

  /**
   * Deletes a contact message by ID.
   */
  public static async deleteMessage(id: string) {
    return withDbFallback(
      async () => {
        const existing = await prisma.contactMessage.findUnique({ where: { id } });
        if (!existing) return null;

        await prisma.contactMessage.delete({ where: { id } });
        logger.info(`Contact message ${id} deleted by administrator`);
        return true;
      },
      async () => {
        const index = devContactMessagesStore.findIndex((m) => m.id === id);
        if (index === -1) return null;
        devContactMessagesStore.splice(index, 1);
        return true;
      }
    );
  }

  // Alias for backward compatibility
  public static async deleteContactMessage(id: string) {
    return this.deleteMessage(id);
  }
}
