import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { validateRequest } from '../middleware/validate';
import {
  createProjectSchema,
  updateProjectSchema,
  projectSlugParamSchema,
  projectIdParamSchema,
  listProjectsQuerySchema,
} from '../validators/project.validator';
import { requireAuth, requireAdmin, optionalAuth } from '../middleware/auth.middleware';

const router = Router();

/**
 * Public Routes (with optional auth detection for admins)
 */

// GET /api/projects - List projects (Public: published only; Admin: all or filtered)
router.get(
  '/',
  optionalAuth,
  validateRequest(listProjectsQuerySchema),
  ProjectController.listProjects
);

// GET /api/projects/:slug - Retrieve single project by unique slug
router.get(
  '/:slug',
  optionalAuth,
  validateRequest(projectSlugParamSchema),
  ProjectController.getProjectBySlug
);

/**
 * Protected Admin Routes
 */

// POST /api/projects - Create new project
router.post(
  '/',
  requireAuth,
  requireAdmin,
  validateRequest(createProjectSchema),
  ProjectController.createProject
);

// PATCH /api/projects/:id - Update existing project
router.patch(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest(updateProjectSchema),
  ProjectController.updateProject
);

// DELETE /api/projects/:id - Delete project
router.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest(projectIdParamSchema),
  ProjectController.deleteProject
);

export default router;
