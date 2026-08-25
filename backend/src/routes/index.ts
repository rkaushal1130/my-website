import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';
import projectRoutes from './project.routes';
import jobRoutes from './job.routes';
import contactRoutes from './contact.routes';
import demoRoutes from './demo.routes';
import careersRoutes from './careers.routes';

const router = Router();

// Mount individual domain routes
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', careersRoutes);
router.use('/careers', careersRoutes);
router.use('/contact', contactRoutes);
router.use('/demo', demoRoutes);

export default router;
