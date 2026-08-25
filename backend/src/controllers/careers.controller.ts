import { Request, Response } from 'express';
import { CareersService } from '../services/careers.service';
import { sendSuccess, sendError } from '../utils/response';
import { logger } from '../utils/logger';
import { ApplicationStatus } from '@prisma/client';

export class CareersController {
  /**
   * POST /api/applications
   * Public endpoint to submit job applications.
   */
  public static async submitApplication(req: Request, res: Response): Promise<any> {
    try {
      await CareersService.createApplication(req.body);

      // Return standardized 201 Created response
      return sendSuccess(
        res,
        {},
        'Application submitted successfully.',
        201
      );
    } catch (error: any) {
      if (error?.statusCode === 400 || error?.name === 'InvalidJobApplicationError') {
        return sendError(res, error.message, 400, []);
      }
      logger.error('Failed to process job application:', error);
      return sendError(
        res,
        'Unable to submit application at this time. Please try again later.',
        500,
        []
      );
    }
  }

  /**
   * GET /api/applications (Admin Only)
   * List submitted job applications with pagination and status filtering (?page=1&limit=20&status=RECEIVED&jobTitle=Frontend%20Developer).
   */
  public static async getApplications(req: Request, res: Response): Promise<any> {
    try {
      const page = typeof req.query.page === 'number' ? req.query.page : parseInt(req.query.page as string, 10) || 1;
      const limit = typeof req.query.limit === 'number' ? req.query.limit : parseInt(req.query.limit as string, 10) || 20;
      const status = req.query.status as ApplicationStatus | undefined;
      const jobTitle = req.query.jobTitle as string | undefined;
      const search = req.query.search as string | undefined;

      const { items, pagination } = await CareersService.listApplications({
        page,
        limit,
        status,
        jobTitle,
        search,
      });

      return res.status(200).json({
        success: true,
        data: items,
        pagination,
        message: 'Job applications retrieved successfully.',
      });
    } catch (error) {
      logger.error('Failed to list job applications:', error);
      return sendError(res, 'Failed to fetch job applications.', 500, []);
    }
  }

  /**
   * GET /api/applications/:id (Admin Only)
   * View details of a specific job application.
   */
  public static async getApplicationById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const application = await CareersService.findById(id);

      if (!application) {
        return sendError(res, 'Application not found.', 404, []);
      }

      return sendSuccess(res, application, 'Application details retrieved successfully.', 200);
    } catch (error) {
      logger.error(`Failed to fetch application ID=${req.params.id}:`, error);
      return sendError(res, 'Failed to fetch application details.', 500, []);
    }
  }

  /**
   * PATCH /api/applications/:id (Admin Only)
   * Update application status (RECEIVED, REVIEWING, SHORTLISTED, REJECTED, HIRED).
   */
  public static async updateApplicationStatus(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updated = await CareersService.updateStatus(id, status);

      if (!updated) {
        return sendError(res, 'Application not found.', 404, []);
      }

      return sendSuccess(res, updated, 'Application status updated successfully.', 200);
    } catch (error) {
      logger.error(`Failed to update application status ID=${req.params.id}:`, error);
      return sendError(res, 'Failed to update application status.', 500, []);
    }
  }

  /**
   * DELETE /api/applications/:id (Admin Only)
   * Permanently delete a career application.
   */
  public static async deleteApplication(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const deleted = await CareersService.deleteApplication(id);

      if (!deleted) {
        return sendError(res, 'Application not found.', 404, []);
      }

      return sendSuccess(res, {}, 'Application deleted successfully.', 200);
    } catch (error) {
      logger.error(`Failed to delete application ID=${req.params.id}:`, error);
      return sendError(res, 'Failed to delete application.', 500, []);
    }
  }
}
