const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'search_db',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'search_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  max: 20,
  ssl: false,
  sslmode: 'disable',
});

pool.on('error', (err) => {
  console.error('[Search DB] Erro:', err);
});

const query = async (text, params) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development' && duration > 200) {
      console.log(`[Search] ${duration}ms`);
    }
    return result;
  } catch (err) {
    console.error('[Search DB] Erro:', err.message);
    throw err;
  }
};

module.exports = { pool, query };
