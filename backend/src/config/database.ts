import { PrismaClient } from '@prisma/client';
import { env } from './environment';
import { logger } from '../utils/logger';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

/**
 * Reusable Prisma Database Client singleton instance.
 * Prevents multiple client instances during development hot-reloading.
 */
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

/**
 * Checks connectivity to PostgreSQL database.
 * Returns health status without leaking internal database credentials or details.
 */
export async function checkDatabaseHealth(timeoutMs = 1500): Promise<{ healthy: boolean; latencyMs?: number; error?: string }> {
  const start = Date.now();
  try {
    // Run lightweight probe query with a strict timeout
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('DATABASE_CONNECTION_TIMEOUT')), timeoutMs)
      ),
    ]);

    const latencyMs = Date.now() - start;
    return { healthy: true, latencyMs };
  } catch (err: any) {
    logger.warn('Database health check failed:', { error: err.message });
    return { healthy: false, error: 'Database service is currently unreachable' };
  }
}

/**
 * Executes a Prisma query with a fast timeout fallback for offline/development environments.
 */
export async function withDbFallback<T>(
  queryPromise: () => Promise<T>,
  fallbackFn: () => Promise<T> | T,
  timeoutMs = 350
): Promise<T> {
  try {
    const result = await Promise.race([
      queryPromise(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('DB_CONNECTION_TIMEOUT')), timeoutMs)
      ),
    ]);
    return result;
  } catch (err: any) {
    // If it's a domain/validation error (e.g. invalid job, duplicate record), rethrow it
    if (err?.statusCode || err?.name === 'InvalidJobApplicationError' || err?.code === 'P2002') {
      throw err;
    }
    return await fallbackFn();
  }
}

/**
 * Safely disconnects the Prisma client on application shutdown.
 */
export async function disconnectDatabase(): Promise<void> {
  try {
    await prisma.$disconnect();
    logger.info('Prisma database client disconnected gracefully.');
  } catch (err: any) {
    logger.error('Error disconnecting Prisma client:', err);
  }
}
