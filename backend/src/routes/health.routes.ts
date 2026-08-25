import { Router } from 'express';
import { HealthController } from '../controllers/health.controller';

const router = Router();

// GET /api/health - Server health & uptime
router.get('/', HealthController.getHealth);

// GET /api/health/db - Database connectivity probe
router.get('/db', HealthController.getDbHealth);

export default router;
