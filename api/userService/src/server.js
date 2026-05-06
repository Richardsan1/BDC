require('dotenv').config();

const app = require('./app');
const { pool } = require('./config/database');
const { connect: connectMQ } = require('./config/messageBroker');

const PORT = process.env.PORT || 3002;

const inicializar = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('[User DB] Conexão estabelecida.');
  } catch (err) {
    console.error('[User DB] Falha ao conectar:', err);
    process.exit(1);
  }

  await connectMQ();

  const server = app.listen(PORT, () => {
    console.log(`[User Service] Porta ${PORT} — ${process.env.NODE_ENV || 'development'}`);
  });

  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('[User Service] Encerrando gracefully.');
      process.exit(0);
    });
  });
};

inicializar();
