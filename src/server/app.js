const express = require('express');
const cors = require('cors');
const sessionsRouter = require('./routes/sessions');
require('dotenv').config();

const app = express();

const PORT = parseInt(process.env.PORT, 10) || 5001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const API_BASE_URL = process.env.RENDER_API_URL || `http://localhost:${PORT}`;

console.log(`API Base URL: ${API_BASE_URL}`);
console.log(`Running in ${NODE_ENV} mode on port ${PORT}`);

// Debugging: Ensure sessionsRouter is loaded
console.log('Sessions router loaded:', !!sessionsRouter);
console.log('Registered API routes:', sessionsRouter.stack.map(r => r.route?.path));
app.use(cors({
  origin: 'https://jkobb510.github.io',
}));
app.use(express.json());

const serverUrl = () => {
  if (API_BASE_URL === process.env.RENDER_API_URL) 
    return `Server is running in production mode on ${API_BASE_URL}`;
  if (API_BASE_URL === `http://localhost:${PORT}`) 
    return `Server is running in development mode on http://localhost:${PORT}`;
  return `Server running on ${API_BASE_URL}`;
};

app.use('/api', sessionsRouter);

app.get('/', (req, res) => {
  res.send(serverUrl());
});

app.listen(PORT, () => {
  console.log(serverUrl());
});