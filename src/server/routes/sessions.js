const express = require('express');
const router = express.Router();
const pool = require('../db'); // pool from pg

router.post('/save-session', async (req, res) => {
  const { username, date, time, durationSeconds } = req.body;
  console.log('Received session on server:', req.body);

  if (typeof durationSeconds !== 'number') {
    console.warn('Invalid durationSeconds:', durationSeconds);
    return res.status(400).json({ error: 'Invalid or missing durationSeconds' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO sessions (username, date, time, timeRecorded, durationSeconds) 
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4) RETURNING id`,
      [username, date, time, durationSeconds]
    );
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    console.error('Insert error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get('/sessions', async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'Username required' });

  try {
    const result = await pool.query(
      'SELECT * FROM sessions WHERE username = $1 ORDER BY date DESC',
      [username]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;