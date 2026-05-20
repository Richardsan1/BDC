const { query } = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const { publish } = require('../config/messageBroker');
const criar = async (clienteId, dados) => {
  const { profissionalId, servicoId, data_hora, data, hora } = dados;
  const bookingId = uuidv4();
  
  // Combine data e hora se virem separados
  let dataHoraCombinada = data_hora;
  if (!dataHoraCombinada && data && hora) {
    dataHoraCombinada = `${data} ${hora}:00`;
  }
  
  const result = await query(`
    INSERT INTO bookingservice.agendamentos (id, cliente_id, profissional_id, servico_id, data_hora, status)
    VALUES ($1, $2, $3, $4, $5, 'aguardando_pagamento')
    RETURNING *
  `, [bookingId, clienteId, profissionalId, servicoId, dataHoraCombinada]);
  return result.rows[0];
};
const obter = async (id) => {
  const result = await query('SELECT * FROM bookingservice.agendamentos WHERE id = $1', [id]);
  return result.rows[0];
};
const listar = async (usuarioId) => {
  const result = await query(`
    SELECT * FROM bookingservice.agendamentos 
    WHERE cliente_id = $1 
    ORDER BY data_hora DESC
  `, [usuarioId]);
  
  // Enriquecer agendamentos com dados de profissional e serviço
  const agendamentos = await Promise.all(
    result.rows.map(async (agendamento) => {
      try {
        // Buscar profissional no userService
        const profRes = await fetch(`http://user-service:3002/users/${agendamento.profissional_id}/perfil`, {
          headers: { 'Content-Type': 'application/json' }
        });
        const profissional = profRes.ok ? await profRes.json() : {};

        // Buscar serviço no userService
        const servRes = await fetch(`http://user-service:3002/users/servicos/${agendamento.servico_id}`, {
          headers: { 'Content-Type': 'application/json' }
        });
        const servico = servRes.ok ? await servRes.json() : {};

        return {
          ...agendamento,
          profissional_nome: profissional.nome || 'Profissional',
          profissional_id: agendamento.profissional_id,
          servico_nome: servico.nome || 'Serviço'
        };
      } catch (err) {
        console.warn(`Erro ao enriquecer agendamento ${agendamento.id}:`, err.message);
        return agendamento;
      }
    })
  );
  
  return agendamentos;
};
const cancelar = async (id, usuarioId) => {
  await query('UPDATE bookingservice.agendamentos SET status = $2 WHERE id = $1 AND cliente_id = $3', [id, 'cancelado', usuarioId]);
  await publish('booking.cancelled', { bookingId: id });
};
module.exports = { criar, obter, listar, cancelar };
