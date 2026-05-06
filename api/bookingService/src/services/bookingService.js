const { query } = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const { publish } = require('../config/messageBroker');
const criar = async (clienteId, dados) => {
  const { profissionalId, servicoId, data_hora } = dados;
  const bookingId = uuidv4();
  const result = await query(`
    INSERT INTO bookingservice.agendamentos (id, cliente_id, profissional_id, servico_id, data_hora, status)
    VALUES ($1, $2, $3, $4, $5, 'aguardando_pagamento')
    RETURNING *
  `, [bookingId, clienteId, profissionalId, servicoId, data_hora]);
  return result.rows[0];
};
const obter = async (id) => {
  const result = await query('SELECT * FROM bookingservice.agendamentos WHERE id = $1', [id]);
  return result.rows[0];
};
const listar = async (usuarioId) => {
  const result = await query('SELECT * FROM bookingservice.agendamentos WHERE cliente_id = $1 ORDER BY data_hora DESC', [usuarioId]);
  return result.rows;
};
const cancelar = async (id, usuarioId) => {
  await query('UPDATE bookingservice.agendamentos SET status = $2 WHERE id = $1 AND cliente_id = $3', [id, 'cancelado', usuarioId]);
  await publish('booking.cancelled', { bookingId: id });
};
module.exports = { criar, obter, listar, cancelar };
