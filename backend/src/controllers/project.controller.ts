import { Request, Response } from 'express';
import { ProjectService, DuplicateSlugError } from '../services/project.service';
import { sendSuccess, sendError } from '../utils/response';
import { logger } from '../utils/logger';

export class ProjectController {
  /**
   * GET /api/projects
   * Public & Admin listing endpoint with pagination and category/featured filtering.
   * Public users only see published projects; Admin users can see all.
   */
  public static async listProjects(req: Request, res: Response): Promise<any> {
    try {
      const isAdmin = req.user?.role === 'ADMIN';

      const page = typeof req.query.page === 'number' ? req.query.page : parseInt(req.query.page as string, 10) || 1;
      const limit = typeof req.query.limit === 'number' ? req.query.limit : parseInt(req.query.limit as string, 10) || 12;
      const category = req.query.category as string | undefined;
      const search = req.query.search as string | undefined;

      const rawFeatured = req.query.featured as string | undefined;
      const featured = rawFeatured !== undefined ? rawFeatured === 'true' || rawFeatured === '1' : undefined;

      const rawPublished = req.query.published as string | undefined;
      const published = rawPublished !== undefined ? rawPublished === 'true' || rawPublished === '1' : undefined;

      const { items, pagination } = await ProjectService.listProjects(
        {
          page,
          limit,
          category,
          featured,
          published,
          search,
        },
        isAdmin
      );

      return res.status(200).json({
        success: true,
        data: items,
        pagination,
        message: 'Projects retrieved successfully.',
      });
    } catch (error) {
      logger.error('Failed to list projects:', error);
      return sendError(res, 'Failed to retrieve projects.', 500, []);
    }
  }

  /**
   * GET /api/projects/:slug
   * Retrieve single project by slug. Public users cannot view unpublished drafts.
   */
  public static async getProjectBySlug(req: Request, res: Response): Promise<any> {
    try {
      const { slug } = req.params;
      const isAdmin = req.user?.role === 'ADMIN';

      const project = await ProjectService.findBySlug(slug, isAdmin);

      if (!project) {
        return sendError(res, 'Project not found.', 404, []);
      }

      return sendSuccess(res, project, 'Project retrieved successfully.', 200);
    } catch (error) {
      logger.error(`Failed to fetch project by slug "${req.params.slug}":`, error);
      return sendError(res, 'Failed to retrieve project details.', 500, []);
    }
  }

  /**
   * POST /api/projects (Admin Only)
   * Create a new project with unique slug check.
   */
  public static async createProject(req: Request, res: Response): Promise<any> {
    try {
      const project = await ProjectService.createProject(req.body);
      return sendSuccess(res, project, 'Project created successfully.', 201);
    } catch (error) {
      if (error instanceof DuplicateSlugError) {
        return sendError(res, error.message, 409, []);
      }
      logger.error('Failed to create project:', error);
      return sendError(res, 'Failed to create project.', 500, []);
    }
  }

  /**
   * PATCH /api/projects/:id (Admin Only)
   * Update an existing project with collision prevention.
   */
  public static async updateProject(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const updated = await ProjectService.updateProject(id, req.body);

      if (!updated) {
        return sendError(res, 'Project not found.', 404, []);
      }

      return sendSuccess(res, updated, 'Project updated successfully.', 200);
    } catch (error) {
      if (error instanceof DuplicateSlugError) {
        return sendError(res, error.message, 409, []);
      }
      logger.error(`Failed to update project ID=${req.params.id}:`, error);
      return sendError(res, 'Failed to update project.', 500, []);
    }
  }

  /**
   * DELETE /api/projects/:id (Admin Only)
   * Permanently delete a project.
   */
  public static async deleteProject(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const deleted = await ProjectService.deleteProject(id);

      if (!deleted) {
        return sendError(res, 'Project not found.', 404, []);
      }

      return sendSuccess(res, {}, 'Project deleted successfully.', 200);
    } catch (error) {
      logger.error(`Failed to delete project ID=${req.params.id}:`, error);
      return sendError(res, 'Failed to delete project.', 500, []);
    }
  }
}
