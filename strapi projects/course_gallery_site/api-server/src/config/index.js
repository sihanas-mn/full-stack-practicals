import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  strapiUrl: process.env.STRAPI_URL || 'http://localhost:1337/api',
  strapiToken: process.env.STRAPI_API_TOKEN || '',
  cookieSecret: process.env.COOKIE_SECRET || 'cookie_secret_key_12345',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};
