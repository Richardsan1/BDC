require('dotenv').config();

const app = require('./app');
const { pool } = require('./config/database');
const { connect: connectMQ } = require('./config/messageBroker');
const { limparTokensExpirados } = require('./services/authService');

const PORT = process.env.PORT || 3001;

const inicializar = async () => {
  // Testa conexão com o banco de dados
  try {
    await pool.query('SELECT 1');
    console.log('[DB] Conexão com PostgreSQL estabelecida.');
  } catch (err) {
    console.error('[DB] Falha ao conectar com PostgreSQL:', err);
    process.exit(1);
  }

  // Conecta ao message broker (não bloqueia inicialização se falhar)
  await connectMQ();

  // Agenda limpeza periódica da blacklist de tokens (a cada 1 hora)
  setInterval(limparTokensExpirados, 60 * 60 * 1000);

  const server = app.listen(PORT, () => {
    console.log(`[Auth Service] Rodando na porta ${PORT} — ambiente: ${process.env.NODE_ENV || 'development'}`);
  });

  // Graceful shutdown
  const shutdown = async (signal) => {
    console.log(`\n[Auth Service] Recebido ${signal}. Encerrando...`);
    server.close(async () => {
      await pool.end();
      console.log('[Auth Service] Encerrado com sucesso.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

inicializar();
