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