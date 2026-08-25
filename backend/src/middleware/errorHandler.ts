import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { sendError } from '../utils/response';
import { AppError } from '../utils/errors';
import { logger } from '../utils/logger';

/**
 * Centralized Error-Handling Middleware
 * Standardizes all application, validation, database, and system errors into:
 * {
 *   "success": false,
 *   "message": "...",
 *   "errors": []
 * }
 *
 * Guarantees that internal stack traces, DB connection strings, file paths,
 * password hashes, and JWT secrets are NEVER exposed to clients.
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): any => {
  // Log internal error diagnostics safely on server
  logger.error(`[${req.method}] ${req.originalUrl} - ${err.name || 'Error'}: ${err.message}`);

  // 1. Handled Application Errors (AppError and subclasses)
  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode, err.errors);
  }

  // 2. Zod Schema Validation Errors
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join('.').replace(/^(body|query|params)\./, ''),
      message: e.message,
    }));
    return sendError(res, 'Validation failed. Please check the submitted fields.', 400, formattedErrors);
  }

  // 3. Express Body Parser Malformed JSON Syntax Errors
  if (err instanceof SyntaxError && 'body' in err && (err as any).status === 400) {
    return sendError(res, 'Malformed JSON payload in request body.', 400, []);
  }

  // 4. Prisma / Database Known Request Errors (Never expose SQL/internals)
  if (err.name === 'PrismaClientKnownRequestError') {
    if (err.code === 'P2002') {
      const target = Array.isArray(err.meta?.target) ? err.meta.target.join(', ') : 'field';
      return sendError(res, `A record with this ${target} already exists.`, 409, []);
    }
    if (err.code === 'P2025') {
      return sendError(res, 'The requested record was not found.', 404, []);
    }
    if (err.code === 'P2003') {
      return sendError(res, 'Referenced related record does not exist.', 400, []);
    }
    return sendError(res, 'Database operation could not be completed.', 400, []);
  }

  // 5. Prisma Initialization / Database Connection Errors
  if (err.name === 'PrismaClientInitializationError') {
    return sendError(res, 'Database connection is temporarily unavailable. Please try again later.', 500, []);
  }

  // 6. JWT Authentication / Expiration Errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return sendError(res, 'Invalid or expired authentication token. Please log in again.', 401, []);
  }

  // 7. Generic Fallback Error (Shield internal details, paths, and stack traces)
  const statusCode = typeof err.statusCode === 'number' ? err.statusCode : typeof err.status === 'number' ? err.status : 500;
  const isClientError = statusCode >= 400 && statusCode < 500;
  const safeMessage = isClientError ? err.message : 'Internal server error. Please try again later.';

  return sendError(res, safeMessage, statusCode, []);
};
