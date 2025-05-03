const express = require('express');
const cors = require('cors');
const sessionsRouter = require('./routes/sessions');
require('dotenv').config();

const app = express();

// Configuration
const PORT = parseInt(process.env.PORT, 10) || 5001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const API_BASE_URL = process.env.RENDER_API_URL || `http://localhost:${PORT}`;

// CORS configuration
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5001', 'https://jkobb510.github.io'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.use('/api', sessionsRouter);

// Health check route
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    environment: NODE_ENV,
    apiUrl: API_BASE_URL
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
    Server running in ${NODE_ENV} mode
    API Base URL: ${API_BASE_URL}
    Port: ${PORT}
    CORS enabled for: ${allowedOrigins.join(', ')}
  `);
});