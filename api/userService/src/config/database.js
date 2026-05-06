const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'user_db',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'user_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  console.error('[User DB] Erro no pool:', err);
});

const query = async (text, params) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development' && duration > 200) {
      console.log(`[User DB] query took ${duration}ms`);
    }
    return result;
  } catch (err) {
    console.error('[User DB] Query error:', err.message);
    throw err;
  }
};

module.exports = { pool, query };
