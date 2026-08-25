import { Request, Response, NextFunction } from 'express';
import { CareersService } from '../services/careers.service';
import { sendSuccess } from '../utils/response';

export class CareersController {
  public static async submitApplication(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await CareersService.createApplication(req.body);
      return sendSuccess(
        res,
        result,
        'Application submitted successfully! Our recruiting team is reviewing your profile.',
        201
      );
    } catch (error) {
      return next(error);
    }
  }

  public static async getApplications(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await CareersService.listApplications();
      return sendSuccess(res, results, 'Job applications retrieved successfully');
    } catch (error) {
      return next(error);
    }
  }
}
