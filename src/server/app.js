const express = require('express');
const cors = require('cors');
const sessionsRouter = require('./routes/sessions');
require('dotenv').config();
const app = express();

// Determine the port dynamically
const PORT = parseInt(process.env.PORT, 10) || 5001;
const NODE_ENV = process.env.NODE_ENV || 'development'; // Default to 'development'
const API_BASE_URL = process.env.API_BASE_URL || `http://localhost:${PORT}`;
console.log(`API Base URL: ${API_BASE_URL}`);
console.log(`Running in ${NODE_ENV} mode on port ${PORT}`);
app.use(cors());
app.use(express.json());

// Use your sessions API
app.use('/api', sessionsRouter);

// Health check route
app.get('/', (req, res) => {
  res.send(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on http://localhost:${PORT}`);
});