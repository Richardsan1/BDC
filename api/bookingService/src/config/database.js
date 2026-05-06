const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.DB_HOST || 'booking_db',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'booking_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  max: 20,
});
pool.on('error', (err) => console.error('[Booking DB] Erro:', err));
const query = async (text, params) => {
  try {
    return await pool.query(text, params);
  } catch (err) {
    console.error('[Booking DB] Erro:', err.message);
    throw err;
  }
};
module.exports = { pool, query };
