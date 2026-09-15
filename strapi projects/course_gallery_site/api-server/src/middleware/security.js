import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config } from '../config/index.js';

// Helmet security headers
export const helmetMiddleware = helmet({
  contentSecurityPolicy: false, // Allow flex for dev/embedded media if needed
  crossOriginEmbedderPolicy: false,
});

// CORS configuration supporting credentials
export const corsMiddleware = cors({
  origin: [config.frontendUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
});

// General API rate limiter: 200 requests per 15 min
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
});

// Stricter rate limiter for inquiries: 10 submissions per 15 min
export const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many inquiry submissions. Please wait a few minutes before trying again.',
  },
});

// HTTP-Only Cookie helper middleware
export const cookieSecurityMiddleware = (req, res, next) => {
  // If an internal token exists or is established, set standard HTTP-only cookie options
  res.setSecureAuthCookie = (token) => {
    res.cookie('strapi_access_token', token, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  };

  res.clearSecureAuthCookie = () => {
    res.clearCookie('strapi_access_token', {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'strict',
    });
  };

  next();
};
