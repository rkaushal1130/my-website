import rateLimit from 'express-rate-limit';

/**
 * Standard 429 response structure matching NeverQuit.ai API contract.
 */
const rateLimitResponse = (message: string) => ({
  success: false,
  message,
  errors: [],
});

const shouldSkipRateLimiting = (req: any) => {
  return process.env.NODE_ENV === 'test' || req.headers['x-test-bypass-limiter'] === 'true';
};

/**
 * 1. Global API Rate Limiter
 * 300 requests per 15 minutes per IP
 */
export const globalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  skip: shouldSkipRateLimiting,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  message: rateLimitResponse('Too many requests from this network. Please try again after 15 minutes.'),
});

/**
 * 2. Authentication Login Rate Limiter (Brute-force protection)
 * Max 10 attempts per 15 minutes per IP
 */
export const authLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 attempts
  skip: shouldSkipRateLimiting,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  message: rateLimitResponse('Too many login attempts. For security, please wait 15 minutes before trying again.'),
});

/**
 * 3. Authentication Registration Rate Limiter (Spam account creation prevention)
 * Max 5 registrations per hour per IP
 */
export const authRegisterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  skip: shouldSkipRateLimiting,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  message: rateLimitResponse('Too many account registration requests from this IP. Please try again later.'),
});

/**
 * 4. Contact Form Submission Rate Limiter (Spam prevention)
 * Max 5 messages per 10 minutes per IP
 */
export const contactSubmissionLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  skip: shouldSkipRateLimiting,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  message: rateLimitResponse('Too many contact messages received from your network. Please wait 10 minutes.'),
});

/**
 * 5. Career Application Submission Rate Limiter (Spam prevention)
 * Max 5 applications per 15 minutes per IP
 */
export const applicationSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  skip: shouldSkipRateLimiting,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  message: rateLimitResponse('Too many job applications submitted from your network. Please wait 15 minutes.'),
});
