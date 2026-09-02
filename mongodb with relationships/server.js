require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Route imports
const busRoutes = require('./routes/busRoutes');
const conductorRoutes = require('./routes/conductorRoutes');
const passengerRoutes = require('./routes/passengerRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

// Connect to MongoDB
connectDB();

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/buses', busRoutes);
app.use('/api/conductors', conductorRoutes);
app.use('/api/passengers', passengerRoutes);
app.use('/api/tickets', ticketRoutes);

// ── Root health check ────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: '🚌 Bus Management System API is running',
    version: '1.0.0',
    endpoints: {
      buses: '/api/buses',
      conductors: '/api/conductors',
      passengers: '/api/passengers',
      tickets: '/api/tickets',
    },
  });
});

// ── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ── Start server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

