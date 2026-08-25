const SENSITIVE_KEYS = new Set([
  'password',
  'passwordhash',
  'token',
  'jwt',
  'jwt_secret',
  'secret',
  'authorization',
  'cookie',
  'set-cookie',
]);

/**
 * Recursively redacts sensitive values (passwords, tokens, secrets) before logging.
 */
function sanitizeForLogging(data: any): any {
  if (data === null || data === undefined) return data;
  if (typeof data !== 'object') return data;

  if (Array.isArray(data)) {
    return data.map(sanitizeForLogging);
  }

  const sanitized: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object') {
      sanitized[key] = sanitizeForLogging(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

/* Structured console logger with timestamp, icons, and automatic redaction */
export const logger = {
  info: (message: string, ...args: any[]) => {
    const safeArgs = args.map(sanitizeForLogging);
    console.log(`[${new Date().toISOString()}] ℹ️  INFO: ${message}`, ...safeArgs);
  },
  success: (message: string, ...args: any[]) => {
    const safeArgs = args.map(sanitizeForLogging);
    console.log(`[${new Date().toISOString()}] ✅ SUCCESS: ${message}`, ...safeArgs);
  },
  warn: (message: string, ...args: any[]) => {
    const safeArgs = args.map(sanitizeForLogging);
    console.warn(`[${new Date().toISOString()}] ⚠️  WARN: ${message}`, ...safeArgs);
  },
  error: (message: string, ...args: any[]) => {
    const safeArgs = args.map(sanitizeForLogging);
    console.error(`[${new Date().toISOString()}] ❌ ERROR: ${message}`, ...safeArgs);
  },
};
