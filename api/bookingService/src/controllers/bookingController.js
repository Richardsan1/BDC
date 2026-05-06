const bookingService = require('../services/bookingService');
const criar = async (req, res, next) => {
  try {
    const booking = await bookingService.criar(req.usuario.id, req.body);
    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};
const obter = async (req, res, next) => {
  try {
    const booking = await bookingService.obter(req.params.id);
    if (!booking) return res.status(404).json({ erro: 'Agendamento não encontrado' });
    res.json(booking);
  } catch (err) {
    next(err);
  }
};
const listar = async (req, res, next) => {
  try {
    const bookings = await bookingService.listar(req.usuario.id);
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};
const cancelar = async (req, res, next) => {
  try {
    await bookingService.cancelar(req.params.id, req.usuario.id);
    res.json({ mensagem: 'Agendamento cancelado' });
  } catch (err) {
    next(err);
  }
};
module.exports = { criar, obter, listar, cancelar };
