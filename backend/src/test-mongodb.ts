import dotenv from 'dotenv';
import path from 'node:path';
import mongoose from 'mongoose';

// Load environment variables from backend/.env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const uri = process.env.MONGODB_URI;

console.log('🔄 Attempting MongoDB connection...');
console.log(`📍 URI: ${uri ? uri.replace(/:([^:@]+)@/, ':****@') : 'UNDEFINED'}\n`);

if (!uri || uri.includes('USERNAME:PASSWORD')) {
  console.log('⚠️  Please replace USERNAME, PASSWORD, and YOUR-CLUSTER in backend/.env with your actual MongoDB credentials.');
  process.exit(0);
}

mongoose
  .connect(uri)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });
