import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { config } from './config/index.js';
import {
  helmetMiddleware,
  corsMiddleware,
  apiLimiter,
  cookieSecurityMiddleware,
} from './middleware/security.js';
import publicRoutes from './routes/publicRoutes.js';

const app = express();

// Trust proxy for rate limiting behind reverse proxies
app.set('trust proxy', 1);

// Standard Middlewares
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser(config.cookieSecret));
app.use(cookieSecurityMiddleware);

// Apply rate limiter to /api
app.use('/api', apiLimiter);

// Public API Gateway Routes
app.use('/api/public', publicRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'course-gallery-api-gateway',
    timestamp: new Date().toISOString(),
    nodeEnv: config.nodeEnv,
    strapiConnected: Boolean(config.strapiUrl),
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled API Error:', err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(config.nodeEnv === 'development' ? { stack: err.stack } : {}),
  });
});

app.listen(config.port, () => {
  console.log(`====================================================`);
  console.log(`🚀 API Gateway Server running on http://localhost:${config.port}`);
  console.log(`🔒 Strapi CMS upstream URL: ${config.strapiUrl}`);
  console.log(`🌐 Allowed Frontend: ${config.frontendUrl}`);
  console.log(`====================================================`);
});
