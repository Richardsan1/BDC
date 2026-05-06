require('dotenv').config();
const app = require('./app');
const { pool } = require('./config/database');
const { connect: connectMQ } = require('./config/messageBroker');
const PORT = process.env.PORT || 3007;
const inicializar = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('[Admin DB] OK');
  } catch (err) {
    console.error('[Admin DB] Erro:', err);
    process.exit(1);
  }
  await connectMQ();
  app.listen(PORT, () => console.log(`[Admin Service] ${PORT}`));
};
inicializar();
