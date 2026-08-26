import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFound';
import { globalApiLimiter } from './middleware/rateLimiters';
import { env } from './config/environment';

const app: Application = express();

// 1. Helmet: Secure HTTP Headers
app.use(
  helmet({
    contentSecurityPolicy: env.NODE_ENV === 'production' ? undefined : false,
    crossOriginEmbedderPolicy: false,
    hsts:
      env.NODE_ENV === 'production'
        ? {
            maxAge: 31536000, // 1 year in seconds
            includeSubDomains: true,
            preload: true,
          }
        : false,
  })
);

// 2. Strict CORS Configuration: Explicit Whitelist (NO wildcard * with credentials)
const isProduction = env.NODE_ENV === 'production';

// In production, strictly restrict to configured frontend origin(s)
const allowedOrigins = isProduction
  ? [env.FRONTEND_URL].filter(Boolean)
  : [
      env.FRONTEND_URL,
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
    ].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Explicitly reject unauthorized origins
      return callback(new Error(`CORS blocked: Origin "${origin}" is not allowed.`));
    },
    credentials: true, // Allows HTTP-only cookies and Authorization headers
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Set-Cookie'],
    maxAge: 86400, // Preflight cache: 24 hours
  })
);

// 3. Request Logging (Morgan without leaking auth credentials)
if (env.NODE_ENV !== 'test') {
  app.use(
    morgan('dev', {
      skip: (req) => req.url === '/api/health', // Avoid spamming health check logs
    })
  );
}

// 4. Global API Rate Limiter
app.use('/api', globalApiLimiter);

// 5. Request Body Size Limits (Strict 1MB to prevent payload DoS attacks)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());

// 6. Mount API Routes
app.use('/api', apiRoutes);

// Root health & meta route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      name: 'NeverquiT AI Enterprise API Engine',
      status: 'ACTIVE',
      version: '1.0.0',
    },
    message: 'Welcome to the NeverquiT AI API.',
  });
});

// 7. Not Found Middleware
app.use(notFoundHandler);

// 8. Global Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
