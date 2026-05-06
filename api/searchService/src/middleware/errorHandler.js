const notFound = (req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro';

  console.error(`[Search] ${statusCode} - ${message}`);

  res.status(statusCode).json({
    erro: message,
    ...(process.env.NODE_ENV === 'development' && { detalhes: err }),
  });
};

module.exports = { notFound, errorHandler };
