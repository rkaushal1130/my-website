import { Router } from 'express';
import { CareersController } from '../controllers/careers.controller';
import { validateRequest } from '../middleware/validate';
import { createJobApplicationSchema } from '../validators/careers.validator';

const router = Router();

// POST /api/careers - Submit job application
router.post(
  '/',
  validateRequest(createJobApplicationSchema),
  CareersController.submitApplication
);

// GET /api/careers - List all applications
router.get('/', CareersController.getApplications);

export default router;
