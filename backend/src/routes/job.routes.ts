import { Router } from 'express';
import { JobController } from '../controllers/job.controller';
import { validateRequest } from '../middleware/validate';
import {
  createJobSchema,
  updateJobSchema,
  jobSlugParamSchema,
  jobIdParamSchema,
  listJobsQuerySchema,
} from '../validators/job.validator';
import { requireAuth, requireAdmin, optionalAuth } from '../middleware/auth.middleware';

const router = Router();

/**
 * Public Routes (optional admin elevation)
 */

// GET /api/jobs - List job openings with pagination & filters (?department=Engineering)
router.get(
  '/',
  optionalAuth,
  validateRequest(listJobsQuerySchema),
  JobController.listJobs
);

// GET /api/jobs/:slug - Get specific job details by slug
router.get(
  '/:slug',
  optionalAuth,
  validateRequest(jobSlugParamSchema),
  JobController.getJobBySlug
);

/**
 * Protected Admin Routes
 */

// POST /api/jobs - Create new job posting
router.post(
  '/',
  requireAuth,
  requireAdmin,
  validateRequest(createJobSchema),
  JobController.createJob
);

// PATCH /api/jobs/:id - Update existing job posting
router.patch(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest(updateJobSchema),
  JobController.updateJob
);

// DELETE /api/jobs/:id - Permanently delete job posting
router.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest(jobIdParamSchema),
  JobController.deleteJob
);

export default router;
