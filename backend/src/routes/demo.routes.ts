import { Router } from 'express';
import { DemoController } from '../controllers/demo.controller';
import { validateRequest } from '../middleware/validate';
import { createDemoRequestSchema } from '../validators/demo.validator';

const router = Router();

// POST /api/demo - Schedule a live demo
router.post(
  '/',
  validateRequest(createDemoRequestSchema),
  DemoController.bookDemo
);

// GET /api/demo - List all scheduled demos
router.get('/', DemoController.getDemoRequests);

export default router;
