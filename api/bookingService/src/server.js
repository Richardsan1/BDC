require('dotenv').config();
const app = require('./app');
const { pool } = require('./config/database');
const { connect: connectMQ } = require('./config/messageBroker');
const PORT = process.env.PORT || 3004;

const inicializar = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('[Booking DB] Conexão estabelecida.');
  } catch (err) {
    console.error('[Booking DB] Falha:', err);
    process.exit(1);
  }
  await connectMQ();
  const server = app.listen(PORT, () => {
    console.log(`[Booking Service] Porta ${PORT}`);
  });
  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('[Booking Service] Encerrando.');
      process.exit(0);
    });
  });
};
inicializar();
