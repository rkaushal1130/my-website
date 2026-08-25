import { Router } from 'express';
import healthRoutes from './health.routes';
import contactRoutes from './contact.routes';
import demoRoutes from './demo.routes';
import careersRoutes from './careers.routes';

const router = Router();

// Mount individual domain routes
router.use('/health', healthRoutes);
router.use('/contact', contactRoutes);
router.use('/demo', demoRoutes);
router.use('/careers', careersRoutes);

export default router;
