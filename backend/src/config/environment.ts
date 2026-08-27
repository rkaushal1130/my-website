import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000').transform((val) => parseInt(val, 10)),
  DATABASE_URL: z.string().optional(),
  JWT_SECRET: z.string().default('neverquit_ai_jwt_secret_dev_key_2026'),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
  ADMIN_EMAIL: z.string().default('kaushalrahul1130@gmail.com'),
  NOTIFICATION_EMAIL: z.string().default('kaushalrahul1130@gmail.com'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  process.exit(1);
}

export const env = _env.data;
