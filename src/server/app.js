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

app.use(cors());
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