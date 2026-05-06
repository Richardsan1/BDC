const notFound = (req, res) => res.status(404).json({ erro: 'Rota não encontrada' });
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(`[Booking] ${statusCode} - ${err.message}`);
  res.status(statusCode).json({ erro: err.message, ...(process.env.NODE_ENV === 'development' && { detalhes: err }) });
};
module.exports = { notFound, errorHandler };
