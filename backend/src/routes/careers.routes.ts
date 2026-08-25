import { Router } from 'express';
import { CareersController } from '../controllers/careers.controller';
import { validateRequest } from '../middleware/validate';
import {
  createApplicationSchema,
  updateApplicationStatusSchema,
  applicationIdParamSchema,
  listApplicationsQuerySchema,
} from '../validators/application.validator';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware';
import { applicationSubmissionLimiter } from '../middleware/rateLimiters';

const router = Router();

/**
 * Public Route
 * POST /api/applications (or /api/careers) - Submit a job application (Protected with rate limiter)
 */
router.post(
  '/',
  applicationSubmissionLimiter,
  validateRequest(createApplicationSchema),
  CareersController.submitApplication
);

/**
 * Protected Admin Routes (Requires Authentication + ADMIN Role)
 */

// GET /api/applications - List job applications with pagination & filtering (?status=RECEIVED)
router.get(
  '/',
  requireAuth,
  requireAdmin,
  validateRequest(listApplicationsQuerySchema),
  CareersController.getApplications
);

// GET /api/applications/:id - View application details
router.get(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest(applicationIdParamSchema),
  CareersController.getApplicationById
);

// PATCH /api/applications/:id - Update application review status (RECEIVED, REVIEWING, SHORTLISTED, REJECTED, HIRED)
router.patch(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest(updateApplicationStatusSchema),
  CareersController.updateApplicationStatus
);

// DELETE /api/applications/:id - Delete an application
router.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  validateRequest(applicationIdParamSchema),
  CareersController.deleteApplication
);

export default router;
