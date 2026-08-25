import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validate';
import { registerSchema, loginSchema } from '../validators/auth.validator';
import { requireAuth } from '../middleware/auth.middleware';
import { authLoginLimiter, authRegisterLimiter } from '../middleware/rateLimiters';

const router = Router();

// Public Authentication Routes with dedicated brute-force/spam rate limiters
router.post(
  '/register',
  authRegisterLimiter,
  validateRequest(registerSchema),
  AuthController.register
);

router.post(
  '/login',
  authLoginLimiter,
  validateRequest(loginSchema),
  AuthController.login
);

router.post('/logout', AuthController.logout);

// Protected Authentication State Route
router.get('/me', requireAuth, AuthController.getMe);

export default router;
