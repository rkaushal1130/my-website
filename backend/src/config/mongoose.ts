import mongoose from 'mongoose';
import { logger } from '../utils/logger';

/**
 * Connects to MongoDB using Mongoose.
 */
export async function connectMongoDB(url?: string): Promise<typeof mongoose | null> {
  const mongoUri = (url || process.env.MONGODB_URL || process.env.MONGODB_URI || '').trim();

  if (!mongoUri) {
    logger.warn('No MONGODB_URL provided. Skipping MongoDB connection.');
    return null;
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    logger.success(`🍃 MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error: any) {
    logger.error('Failed to connect to MongoDB:', error.message);
    return null;
  }
}

/**
 * Gracefully disconnects Mongoose.
 */
export async function disconnectMongoDB(): Promise<void> {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB connection closed.');
  } catch (error: any) {
    logger.error('Error disconnecting MongoDB:', error);
  }
}
