const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath =
  process.env.NODE_ENV === 'production'
    ? '/var/data/meditation.db'
    : path.resolve(__dirname, '../meditation.db');

const db = new sqlite3.Database(dbPath);
console.log(dbPath);
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      timeRecorded TEXT NOT NULL,
      durationSeconds INTEGER NOT NULL
    )
  `);
});

module.exports = db;