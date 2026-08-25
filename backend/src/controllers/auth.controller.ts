import { Request, Response } from 'express';
import { AuthService, AuthenticationError, DuplicateEmailError } from '../services/auth.service';
import { setAuthCookie, clearAuthCookie } from '../utils/jwt';
import { sendSuccess, sendError } from '../utils/response';
import { logger } from '../utils/logger';

export class AuthController {
  /**
   * POST /api/auth/register
   * Register a new user and set HTTP-only authentication cookie
   */
  public static async register(req: Request, res: Response): Promise<any> {
    try {
      const { user, token } = await AuthService.register(req.body);

      // Attach secure HTTP-only cookie
      setAuthCookie(res, token);

      return sendSuccess(
        res,
        { user, token },
        'Account registered successfully.',
        201
      );
    } catch (error) {
      if (error instanceof DuplicateEmailError) {
        return sendError(res, error.message, 409, []);
      }
      logger.error('Registration controller error:', error);
      return sendError(res, 'Registration failed. Please try again later.', 500, []);
    }
  }

  /**
   * POST /api/auth/login
   * Authenticate user, return safe user object, and set HTTP-only cookie
   */
  public static async login(req: Request, res: Response): Promise<any> {
    try {
      const { user, token } = await AuthService.login(req.body);

      // Attach secure HTTP-only cookie
      setAuthCookie(res, token);

      return sendSuccess(
        res,
        { user, token },
        'Login successful.',
        200
      );
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return sendError(res, error.message, error.statusCode, []);
      }
      logger.error('Login controller error:', error);
      return sendError(res, 'Login failed. Please try again later.', 500, []);
    }
  }

  /**
   * POST /api/auth/logout
   * Clear authentication cookie and invalidate client session state
   */
  public static async logout(req: Request, res: Response): Promise<any> {
    try {
      clearAuthCookie(res);
      return sendSuccess(res, {}, 'Logged out successfully.', 200);
    } catch (error) {
      logger.error('Logout controller error:', error);
      return sendError(res, 'Logout failed.', 500, []);
    }
  }

  /**
   * GET /api/auth/me
   * Retrieve current authenticated user profile
   */
  public static async getMe(req: Request, res: Response): Promise<any> {
    try {
      if (!req.user) {
        return sendError(res, 'Unauthenticated user.', 401, []);
      }

      return sendSuccess(
        res,
        { user: req.user },
        'Current user profile retrieved.',
        200
      );
    } catch (error) {
      logger.error('Get profile controller error:', error);
      return sendError(res, 'Failed to retrieve user profile.', 500, []);
    }
  }
}
