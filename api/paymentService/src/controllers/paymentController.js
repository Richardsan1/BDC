const paymentService = require('../services/paymentService');
const criarIntent = async (req, res, next) => {
  try {
    const { bookingId, valor } = req.body;
    const intent = await paymentService.criarIntent(bookingId, valor, req.usuario.id);
    res.status(201).json(intent);
  } catch (err) {
    next(err);
  }
};
const confirmar = async (req, res, next) => {
  try {
    const { paymentIntentId } = req.body;
    const pagamento = await paymentService.confirmar(paymentIntentId);
    res.json(pagamento);
  } catch (err) {
    next(err);
  }
};
const reembolsar = async (req, res, next) => {
  try {
    const { paymentIntentId } = req.body;
    const reembolso = await paymentService.reembolsar(paymentIntentId);
    res.json(reembolso);
  } catch (err) {
    next(err);
  }
};
module.exports = { criarIntent, confirmar, reembolsar };
