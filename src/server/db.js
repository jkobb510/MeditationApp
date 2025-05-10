const { Pool } = require('pg');
require('dotenv').config();

let pool;

if (process.env.NODE_ENV === 'production') {
  // Production configuration
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // Required for some hosted PostgreSQL services
    }
  });
} else {
  // Local development configuration
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
  } else {
    console.log(`Successfully connected to PostgreSQL database in ${process.env.NODE_ENV || 'development'} mode`);
    release();
  }
});

module.exports = pool;