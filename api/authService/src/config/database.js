const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'auth_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  console.error('[DB] Erro inesperado no pool de conexões:', err);
});

const query = async (text, params) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DB] query: ${text} | duration: ${duration}ms | rows: ${result.rowCount}`);
    }
    return result;
  } catch (err) {
    console.error('[DB] Erro na query:', { text, error: err.message });
    throw err;
  }
};

const getClient = () => pool.connect();

module.exports = { query, getClient, pool };
