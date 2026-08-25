import { Request, Response, NextFunction } from 'express';
import { ContactService } from '../services/contact.service';
import { sendSuccess } from '../utils/response';

export class ContactController {
  public static async submitInquiry(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ContactService.createInquiry(req.body);
      return sendSuccess(
        res,
        result,
        'Thank you! Your message has been received. Our team will get back to you shortly.',
        201
      );
    } catch (error) {
      return next(error);
    }
  }

  public static async getInquiries(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await ContactService.listInquiries();
      return sendSuccess(res, results, 'Inquiries retrieved successfully');
    } catch (error) {
      return next(error);
    }
  }
}
