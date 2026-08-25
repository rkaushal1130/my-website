import { Request, Response, NextFunction } from 'express';
import { DemoService } from '../services/demo.service';
import { sendSuccess } from '../utils/response';

export class DemoController {
  public static async bookDemo(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await DemoService.createDemoRequest(req.body);
      return sendSuccess(
        res,
        result,
        'Your demo has been scheduled! A principal engineer will reach out to confirm your session.',
        201
      );
    } catch (error) {
      return next(error);
    }
  }

  public static async getDemoRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await DemoService.listDemoRequests();
      return sendSuccess(res, results, 'Demo requests retrieved successfully');
    } catch (error) {
      return next(error);
    }
  }
}
