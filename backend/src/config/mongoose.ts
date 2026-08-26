import mongoose from 'mongoose';
import { env } from './environment';
import { logger } from '../utils/logger';

let isConnecting = false;
let isConnected = false;

/**
 * Connects to MongoDB via Mongoose.
 * Features auto-reconnect, timeout controls, and non-blocking initialization.
 */
export async function connectMongoDB(): Promise<typeof mongoose | null> {
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return mongoose;
  }

  if (isConnecting) {
    return null;
  }

  isConnecting = true;

  try {
    const uri = env.MONGODB_URI;

    mongoose.set('strictQuery', true);

    const connection = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick timeout fallback if MongoDB service is not local
    });

    isConnected = true;
    isConnecting = false;
    console.log('✅ MongoDB connected successfully');
    logger.success('🍃 MongoDB connected successfully via Mongoose.');
    return connection;
  } catch (err: any) {
    isConnected = false;
    isConnecting = false;
    console.error('❌ MongoDB connection error:', err.message || err);
    logger.warn('⚠️  MongoDB connection notice: Unable to reach MongoDB server. Fallback in-memory/Prisma store will be utilized.', {
      error: err.message,
    });
    return null;
  }
}

/**
 * Checks MongoDB connection health.
 */
export async function checkMongoHealth(): Promise<{ healthy: boolean; status: string }> {
  const state = mongoose.connection.readyState;
  const stateMap: Record<number, string> = {
    0: 'DISCONNECTED',
    1: 'CONNECTED',
    2: 'CONNECTING',
    3: 'DISCONNECTING',
  };

  return {
    healthy: state === 1,
    status: stateMap[state] || 'UNKNOWN',
  };
}

/**
 * Disconnects from MongoDB gracefully.
 */
export async function disconnectMongoDB(): Promise<void> {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      isConnected = false;
      logger.info('MongoDB connection closed gracefully.');
    }
  } catch (err: any) {
    logger.error('Error disconnecting MongoDB:', err);
  }
}

export default mongoose;
