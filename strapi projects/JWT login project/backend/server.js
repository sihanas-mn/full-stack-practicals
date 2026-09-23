const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const seedDatabase = require('./seed');

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(morgan('dev'));

// Health check endpoints
app.get(['/_health', '/api/health'], (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Node.js + Express backend is running',
    database: mongoose.connection.readyState === 1 ? 'MongoDB Atlas connected' : 'Connecting...',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authRoutes); // Exposes GET /api/users/me
app.use('/api/students', studentRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    data: null,
    error: {
      status: 404,
      name: 'NotFoundError',
      message: `Route ${req.originalUrl} not found`,
    },
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    data: null,
    error: {
      status: 500,
      name: 'InternalServerError',
      message: err.message || 'Something went wrong on the server',
    },
  });
});

// MongoDB Atlas Connection & Server Startup
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('CRITICAL: MONGODB_URI is not defined in .env file!');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log('✓ Connected to MongoDB Atlas successfully!');
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Express Backend Server is running on port ${PORT}`);
      console.log(`🔗 API Base: http://localhost:${PORT}/api`);
    });
  })
  .catch((err) => {
    console.error('✗ Failed to connect to MongoDB Atlas:', err);
    process.exit(1);
  });
