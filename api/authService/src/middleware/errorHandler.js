/**
 * Middleware global de tratamento de erros.
 * Centraliza respostas de erro para evitar vazamento de stack traces em produção.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProd = process.env.NODE_ENV === 'production';

  // Log detalhado apenas em desenvolvimento
  if (!isProd) {
    console.error(`[ERROR] ${req.method} ${req.path}:`, err);
  } else if (statusCode >= 500) {
    console.error(`[ERROR] 500 em ${req.method} ${req.path}:`, err.message);
  }

  res.status(statusCode).json({
    erro: err.message || 'Erro interno do servidor.',
    ...(err.code && { codigo: err.code }),
    ...(!isProd && statusCode >= 500 && { stack: err.stack }),
  });
};

/**
 * Middleware para rotas não encontradas.
 */
const notFound = (req, res) => {
  res.status(404).json({ erro: `Rota ${req.method} ${req.path} não encontrada.` });
};

module.exports = { errorHandler, notFound };
