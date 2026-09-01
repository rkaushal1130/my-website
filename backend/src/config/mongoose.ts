import mongoose from 'mongoose';
import dns from 'dns';
import { logger } from '../utils/logger';

/**
 * Connects to MongoDB using Mongoose.
 * Automatically handles SRV DNS resolution issues on Windows/ISP networks.
 */
export async function connectMongoDB(url?: string): Promise<typeof mongoose | null> {
  const mongoUri = (url || process.env.MONGODB_URL || process.env.MONGODB_URI || '').trim();

  if (!mongoUri) {
    logger.warn('No MONGODB_URL provided. Skipping MongoDB connection.');
    return null;
  }

  // Preemptively use public DNS for mongodb+srv URLs to avoid Windows ISP querySrv ECONNREFUSED issues
  if (mongoUri.startsWith('mongodb+srv://')) {
    try {
      dns.setServers(['8.8.8.8', '8.8.4.4']);
    } catch {
      // Keep default DNS if setServers cannot be changed
    }
  }

  try {
    const dbName = process.env.MONGODB_DB_NAME || 'rahul_database';
    const conn = await mongoose.connect(mongoUri, {
      dbName,
    });
    logger.success(`🍃 MongoDB Connected: ${conn.connection.host}, Database: ${conn.connection.name}`);
    return conn;
  } catch (error: any) {
    logger.error('Failed to connect to MongoDB:', error.message);
    return null;
  }
}

/**
 * Checks if MongoDB is currently connected.
 */
export function isMongoConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

/**
 * Ensures MongoDB is connected, attempting reconnection if necessary.
 */
export async function ensureMongoConnected(): Promise<boolean> {
  if (mongoose.connection.readyState === 1) {
    return true;
  }
  const url = process.env.MONGODB_URL || process.env.MONGODB_URI;
  if (url) {
    const conn = await connectMongoDB(url);
    return conn !== null;
  }
  return false;
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
