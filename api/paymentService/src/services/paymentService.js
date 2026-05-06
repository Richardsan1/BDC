const { query } = require('../config/database');
const stripe = require('../config/stripe');
const { v4: uuidv4 } = require('uuid');
const { publish } = require('../config/messageBroker');

const criarIntent = async (bookingId, valor, clienteId) => {
  const intent = await stripe.criarPaymentIntent({ valor, bookingId });
  
  const paymentId = uuidv4();
  await query(`
    INSERT INTO paymentservice.pagamentos (id, booking_id, cliente_id, stripe_intent_id, valor, status)
    VALUES ($1, $2, $3, $4, $5, 'pendente')
  `, [paymentId, bookingId, clienteId, intent.id, valor]);
  
  return { ...intent, paymentId };
};

const confirmar = async (paymentIntentId) => {
  const { rows } = await query('SELECT * FROM paymentservice.pagamentos WHERE stripe_intent_id = $1', [paymentIntentId]);
  
  if (!rows[0]) {
    const err = new Error('Pagamento não encontrado');
    err.statusCode = 404;
    throw err;
  }

  const pagamento = await stripe.confirmarPagamento(paymentIntentId, { amount: rows[0].valor, metadata: { bookingId: rows[0].booking_id } });

  await query('UPDATE paymentservice.pagamentos SET status = $2 WHERE stripe_intent_id = $1', [paymentIntentId, 'aprovado']);

  await publish('payment.approved', { bookingId: rows[0].booking_id, paymentId: rows[0].id });

  return pagamento;
};

const reembolsar = async (paymentIntentId) => {
  const { rows } = await query('SELECT * FROM paymentservice.pagamentos WHERE stripe_intent_id = $1', [paymentIntentId]);
  
  if (!rows[0]) {
    const err = new Error('Pagamento não encontrado');
    err.statusCode = 404;
    throw err;
  }

  const reembolso = await stripe.reembolsar(paymentIntentId);

  await query('UPDATE paymentservice.pagamentos SET status = $2 WHERE stripe_intent_id = $1', [paymentIntentId, 'reembolsado']);

  await publish('payment.refunded', { bookingId: rows[0].booking_id });

  return reembolso;
};

module.exports = { criarIntent, confirmar, reembolsar };
