// server/routes/sessions.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/save-session', (req, res) => {
  const { username, date, time, timeRecorded } = req.body;
  
  const stmt = db.prepare(`
    INSERT INTO sessions (username, date, time, timeRecorded, durationSeconds) 
    VALUES (?, ?, ?, ?)
  `);

  stmt.run(username, date, time, timeRecorded, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true, id: this.lastID });
  });

  stmt.finalize();
});

router.get('/sessions', (req, res) => {
  db.all('SELECT * FROM sessions', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

module.exports = router;