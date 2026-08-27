import app from './app';
import { env } from './config/environment';
import { prisma } from './config/prisma';
import { logger } from './utils/logger';

const PORT = env.PORT;

const server = app.listen(PORT, () => {
  logger.success(`🚀 NeverquiT AI API server is running on http://localhost:${PORT}`);
  logger.info(`🌐 Environment: ${env.NODE_ENV}`);
  logger.info(`🩺 Health Check: http://localhost:${PORT}/api/health`);
});

// Graceful Shutdown Handling
const handleShutdown = async (signal: string) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);

  server.close(async () => {
    logger.info('HTTP server closed.');

    try {
      await prisma.$disconnect();
      logger.info('Database connection closed.');
    } catch (err) {
      logger.error('Error disconnecting from database:', err);
    }

    process.exit(0);
  });

  // Force close if graceful shutdown takes too long
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

export default server;
