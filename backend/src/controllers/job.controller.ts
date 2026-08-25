import { Request, Response } from 'express';
import { JobService } from '../services/job.service';
import { DuplicateSlugError } from '../services/project.service';
import { sendSuccess, sendError } from '../utils/response';
import { logger } from '../utils/logger';

export class JobController {
  /**
   * GET /api/jobs
   * List jobs with pagination and department/location filtering.
   * Public users only see published jobs; Admins can see all.
   */
  public static async listJobs(req: Request, res: Response): Promise<any> {
    try {
      const isAdmin = req.user?.role === 'ADMIN';

      const page = typeof req.query.page === 'number' ? req.query.page : parseInt(req.query.page as string, 10) || 1;
      const limit = typeof req.query.limit === 'number' ? req.query.limit : parseInt(req.query.limit as string, 10) || 12;
      const department = req.query.department as string | undefined;
      const location = req.query.location as string | undefined;
      const employmentType = req.query.employmentType as string | undefined;
      const search = req.query.search as string | undefined;

      const rawPublished = req.query.published as string | undefined;
      const published = rawPublished !== undefined ? rawPublished === 'true' || rawPublished === '1' : undefined;

      const { items, pagination } = await JobService.listJobs(
        {
          page,
          limit,
          department,
          location,
          employmentType,
          published,
          search,
        },
        isAdmin
      );

      return res.status(200).json({
        success: true,
        data: items,
        pagination,
        message: 'Job openings retrieved successfully.',
      });
    } catch (error) {
      logger.error('Failed to list jobs:', error);
      return sendError(res, 'Failed to retrieve jobs.', 500, []);
    }
  }

  /**
   * GET /api/jobs/:slug
   * Retrieve single job posting by slug.
   */
  public static async getJobBySlug(req: Request, res: Response): Promise<any> {
    try {
      const { slug } = req.params;
      const isAdmin = req.user?.role === 'ADMIN';

      const job = await JobService.findBySlug(slug, isAdmin);

      if (!job) {
        return sendError(res, 'Job posting not found.', 404, []);
      }

      return sendSuccess(res, job, 'Job details retrieved successfully.', 200);
    } catch (error) {
      logger.error(`Failed to fetch job by slug "${req.params.slug}":`, error);
      return sendError(res, 'Failed to retrieve job details.', 500, []);
    }
  }

  /**
   * POST /api/jobs (Admin Only)
   * Create a new job opening.
   */
  public static async createJob(req: Request, res: Response): Promise<any> {
    try {
      const job = await JobService.createJob(req.body);
      return sendSuccess(res, job, 'Job posting created successfully.', 201);
    } catch (error) {
      if (error instanceof DuplicateSlugError) {
        return sendError(res, error.message, 409, []);
      }
      logger.error('Failed to create job posting:', error);
      return sendError(res, 'Failed to create job posting.', 500, []);
    }
  }

  /**
   * PATCH /api/jobs/:id (Admin Only)
   * Update an existing job opening.
   */
  public static async updateJob(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const updated = await JobService.updateJob(id, req.body);

      if (!updated) {
        return sendError(res, 'Job posting not found.', 404, []);
      }

      return sendSuccess(res, updated, 'Job posting updated successfully.', 200);
    } catch (error) {
      if (error instanceof DuplicateSlugError) {
        return sendError(res, error.message, 409, []);
      }
      logger.error(`Failed to update job ID=${req.params.id}:`, error);
      return sendError(res, 'Failed to update job posting.', 500, []);
    }
  }

  /**
   * DELETE /api/jobs/:id (Admin Only)
   * Permanently delete a job opening.
   */
  public static async deleteJob(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const deleted = await JobService.deleteJob(id);

      if (!deleted) {
        return sendError(res, 'Job posting not found.', 404, []);
      }

      return sendSuccess(res, {}, 'Job posting deleted successfully.', 200);
    } catch (error) {
      logger.error(`Failed to delete job ID=${req.params.id}:`, error);
      return sendError(res, 'Failed to delete job posting.', 500, []);
    }
  }
}
