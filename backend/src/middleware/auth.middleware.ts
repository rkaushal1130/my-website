import { Request, Response, NextFunction } from 'express';
import { verifyToken, AUTH_COOKIE_NAME } from '../utils/jwt';
import { AuthService } from '../services/auth.service';
import { sendError } from '../utils/response';

/**
 * Authentication Middleware:
 * Ensures the requesting client has a valid JWT via Bearer Authorization header or HTTP-only cookie.
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    let token: string | undefined;

    // 1. Check Authorization header (Bearer <token>)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    }

    // 2. Fallback to HTTP-only cookie
    if (!token && req.cookies && req.cookies[AUTH_COOKIE_NAME]) {
      token = req.cookies[AUTH_COOKIE_NAME];
    }

    if (!token) {
      return sendError(
        res,
        'Authentication required. Please provide a valid token or log in.',
        401
      );
    }

    // 3. Verify JWT token signature and expiration
    const payload = verifyToken(token);
    if (!payload) {
      return sendError(
        res,
        'Invalid or expired authentication token. Please log in again.',
        401
      );
    }

    // 4. Validate user exists in database and attach safe identity to request
    const user = await AuthService.getProfile(payload.userId);
    if (!user) {
      return sendError(
        res,
        'User account associated with this token no longer exists.',
        401
      );
    }

    req.user = user;
    return next();
  } catch (error) {
    return sendError(res, 'Authentication verification failed.', 401);
  }
}

/**
 * Optional Authentication Middleware:
 * Inspects for JWT without rejecting unauthenticated requests.
 * Attaches req.user if a valid token is present.
 */
export async function optionalAuth(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    }

    if (!token && req.cookies && req.cookies[AUTH_COOKIE_NAME]) {
      token = req.cookies[AUTH_COOKIE_NAME];
    }

    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        const user = await AuthService.getProfile(payload.userId);
        if (user) {
          req.user = user;
        }
      }
    }

    return next();
  } catch (error) {
    // If token parsing fails, simply continue as unauthenticated
    return next();
  }
}

/**
 * Authorization Middleware:
 * Requires authenticated user to have the ADMIN role.
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction): any {
  if (!req.user) {
    return sendError(res, 'Authentication required before checking permissions.', 401);
  }

  if (req.user.role !== 'ADMIN') {
    return sendError(
      res,
      'Access forbidden: Administrator privileges required for this action.',
      403
    );
  }

  return next();
}
