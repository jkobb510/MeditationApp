// server/db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./meditation.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      timeRecorded TEXT NOT NULL
    )
  `);
});

module.exports = db;