const express = require('express');
const app = express();
const cors = require('cors');
const sessionsRouter = require('./routes/sessions');
import { API_BASE_URL, LOCALHOST } from '../config';
app.use(cors());

app.use(express.json());

// Use your sessions API
app.use('/api', sessionsRouter);

// Add this route to handle requests to "/"
app.get('/', (req, res) => {
  res.send('Server is running!');
});

const PORT = API_BASE_URL || LOCALHOST;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
