const express = require('express');
const app = express();
const cors = require('cors');
const sessionsRouter = require('./routes/sessions');
app.use(cors());

app.use(express.json());

// Use your sessions API
app.use('/api', sessionsRouter);

// Add this route to handle requests to "/"
app.get('/', (req, res) => {
  res.send('Server is running!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
