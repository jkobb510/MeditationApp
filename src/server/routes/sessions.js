const express = require('express');
const router = express.Router();
const db = require('../db');
router.post('/save-session', (req, res) => {
  const { username, date, time, timeRecorded, durationSeconds } = req.body;
  console.log('Received session on server:', req.body);

  if (typeof durationSeconds !== 'number') {
    console.warn('Invalid durationSeconds:', durationSeconds);
    return res.status(400).json({ error: 'Invalid or missing durationSeconds' });
  }

  const stmt = db.prepare(`
    INSERT INTO sessions (username, date, time, timeRecorded, durationSeconds) 
    VALUES (?, ?, ?, ?, ?);
  `);

  stmt.run(username, date, time, timeRecorded, durationSeconds, function (err) {
    if (err) {
      console.error('Insert error:', err.message);
      return res.status(500).json({ error: err.message });
    }

    console.log(`Inserted session with ID ${this.lastID}`);
    res.json({ success: true, id: this.lastID });
  });

  stmt.finalize();
});
router.get('/sessions', (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'Username required' });

  db.all('SELECT * FROM sessions WHERE username = ?', [username], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});



module.exports = router;