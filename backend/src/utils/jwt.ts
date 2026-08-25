import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { env } from '../config/environment';

export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

const JWT_SECRET: jwt.Secret = env.JWT_SECRET || 'neverquit_ai_jwt_secret_dev_key_2026';
const JWT_EXPIRES_IN = '7d';
export const AUTH_COOKIE_NAME = 'token';

/**
 * Generates a signed JWT token containing safe identity claims.
 */
export function generateToken(payload: AuthTokenPayload, expiresIn: string | number = JWT_EXPIRES_IN): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
  });
}

/**
 * Verifies a JWT token and extracts the decoded payload.
 * Returns null if token is expired, invalid, or malformed.
 */
export function verifyToken(token: string): AuthTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Attaches a secure, HTTP-only cookie with the auth token to the HTTP response.
 */
export function setAuthCookie(res: Response, token: string): void {
  const isProduction = env.NODE_ENV === 'production';

  res.cookie(AUTH_COOKIE_NAME, token, {
    httpOnly: true, // Inaccessible to JavaScript (XSS mitigation)
    secure: isProduction, // HTTPS only in production
    sameSite: isProduction ? 'strict' : 'lax', // CSRF mitigation
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    path: '/',
  });
}

/**
 * Clears the authentication cookie upon logout.
 */
export function clearAuthCookie(res: Response): void {
  const isProduction = env.NODE_ENV === 'production';

  res.clearCookie(AUTH_COOKIE_NAME, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    path: '/',
  });
}
