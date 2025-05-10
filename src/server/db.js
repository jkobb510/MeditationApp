const { Pool } = require('pg');
require('dotenv').config();

let pool;

if (process.env.DATABASE_URL) {
  // Production configuration - prioritize DATABASE_URL if it exists
  console.log('Using production database configuration with DATABASE_URL');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  // Local development configuration
  console.log('Using local database configuration');
  pool = new Pool({
    user: process.env.DB_USER || 'jkobb510',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'upwardmeditation',
    password: process.env.DB_PASSWORD || 'ee5510',
    port: process.env.DB_PORT || 5001,
  });
}

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    console.error('Connection details:', {
      nodeEnv: process.env.NODE_ENV,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlPrefix: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 20) + '...' : 'not set',
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });
  } else {
    console.log(`Successfully connected to PostgreSQL database in ${process.env.NODE_ENV || 'development'} mode`);
    release();
  }
});

module.exports = pool;