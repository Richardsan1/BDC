require('dotenv').config();

const app = require('./app');
const { pool } = require('./config/database');
const { connect: connectMQ } = require('./config/messageBroker');

const PORT = process.env.PORT || 3003;

const inicializar = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('[Search DB] Conexão estabelecida.');
  } catch (err) {
    console.error('[Search DB] Falha ao conectar:', err);
    process.exit(1);
  }

  await connectMQ();

  const server = app.listen(PORT, () => {
    console.log(`[Search Service] Porta ${PORT}`);
  });

  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('[Search Service] Encerrando.');
      process.exit(0);
    });
  });
};

inicializar();
