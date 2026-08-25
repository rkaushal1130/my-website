import { Request, Response } from 'express';
import { ContactService } from '../services/contact.service';
import { sendSuccess, sendError } from '../utils/response';
import { logger } from '../utils/logger';
import { MessageStatus } from '@prisma/client';

export class ContactController {
  /**
   * POST /api/contact
   * Public endpoint to submit contact form messages.
   */
  public static async submitContact(req: Request, res: Response): Promise<any> {
    try {
      await ContactService.createContactMessage(req.body);

      // Return standardized 201 Created response
      return sendSuccess(
        res,
        {},
        'Your message has been received.',
        201
      );
    } catch (error) {
      logger.error('Failed to process contact form submission:', error);
      return sendError(
        res,
        'Unable to process your request at this moment. Please try again later.',
        500,
        []
      );
    }
  }

  /**
   * GET /api/contact
   * Admin endpoint to list contact messages with pagination and filtering (?page=1&limit=20&status=NEW).
   */
  public static async getContactMessages(req: Request, res: Response): Promise<any> {
    try {
      const page = typeof req.query.page === 'number' ? req.query.page : parseInt(req.query.page as string, 10) || 1;
      const limit = typeof req.query.limit === 'number' ? req.query.limit : parseInt(req.query.limit as string, 10) || 20;
      const status = req.query.status as MessageStatus | undefined;
      const search = req.query.search as string | undefined;

      const result = await ContactService.listContactMessages({
        page,
        limit,
        status,
        search,
      });

      return sendSuccess(res, result, 'Contact messages retrieved successfully.', 200);
    } catch (error) {
      logger.error('Failed to retrieve contact messages:', error);
      return sendError(res, 'Failed to fetch contact messages.', 500, []);
    }
  }

  /**
   * GET /api/contact/:id
   * Admin endpoint to fetch a single contact message by ID.
   */
  public static async getContactMessageById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const message = await ContactService.getContactMessageById(id);

      if (!message) {
        return sendError(res, 'Contact message not found.', 404, []);
      }

      return sendSuccess(res, message, 'Contact message retrieved successfully.', 200);
    } catch (error) {
      logger.error(`Failed to fetch contact message ID=${req.params.id}:`, error);
      return sendError(res, 'Failed to retrieve contact message.', 500, []);
    }
  }

  /**
   * PATCH /api/contact/:id
   * Admin endpoint to update the status of a contact message (NEW, READ, REPLIED, ARCHIVED).
   */
  public static async updateContactStatus(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updated = await ContactService.updateContactMessageStatus(id, status);

      if (!updated) {
        return sendError(res, 'Contact message not found.', 404, []);
      }

      return sendSuccess(res, updated, 'Contact message status updated successfully.', 200);
    } catch (error) {
      logger.error(`Failed to update contact message ID=${req.params.id}:`, error);
      return sendError(res, 'Failed to update contact message status.', 500, []);
    }
  }

  /**
   * DELETE /api/contact/:id
   * Admin endpoint to permanently delete a contact message.
   */
  public static async deleteContact(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const deleted = await ContactService.deleteContactMessage(id);

      if (!deleted) {
        return sendError(res, 'Contact message not found.', 404, []);
      }

      return sendSuccess(res, {}, 'Contact message deleted successfully.', 200);
    } catch (error) {
      logger.error(`Failed to delete contact message ID=${req.params.id}:`, error);
      return sendError(res, 'Failed to delete contact message.', 500, []);
    }
  }
}
