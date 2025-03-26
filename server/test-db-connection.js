require('dotenv').config();
const { Pool } = require('pg');

// Display connection details (without the password)
console.log('Attempting to connect with:');
console.log(`Host: ${process.env.DB_HOST}`);
console.log(`Port: ${process.env.DB_PORT}`);
console.log(`Database: ${process.env.DB_NAME}`);
console.log(`User: ${process.env.DB_USER}`);
console.log('Password: [Hidden]\n');

// Create connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Attempt connection
async function testConnection() {
  let client;
  try {
    console.log('Attempting to connect to PostgreSQL...');
    client = await pool.connect();
    console.log('\nConnection successful!');
    
    // Test if the database exists
    const dbResult = await client.query(`
      SELECT EXISTS(
        SELECT 1 FROM pg_database WHERE datname = $1
      )`, [process.env.DB_NAME]);
    console.log(`Database '${process.env.DB_NAME}' exists: ${dbResult.rows[0].exists}`);
    
    console.log('\nConnection test completed successfully');
    return true;
  } catch (err) {
    console.error('\nConnection error:', err.message);
    if (err.code === '28P01') {
      console.error('This indicates an authentication failure. Check your username and password.');
    } else if (err.code === 'ECONNREFUSED') {
      console.error('Could not connect to PostgreSQL server. Check if PostgreSQL is running.');
    }
    return false;
  } finally {
    if (client) client.release();
    pool.end();
  }
}

// Run the test
testConnection(); 