const notFound = (req, res) => res.status(404).json({ erro: 'Rota não encontrada' });
const errorHandler = (err, req, res, next) => {
  console.error(`[Admin] ${err.statusCode || 500} - ${err.message}`);
  res.status(err.statusCode || 500).json({ erro: err.message });
};
module.exports = { notFound, errorHandler };
