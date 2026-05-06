// Mock Stripe - Em produção, usar biblioteca 'stripe' real
const criarPaymentIntent = async (dados) => {
  const { valor, bookingId } = dados;
  
  // Mock: Simular resposta do Stripe
  return {
    id: `pi_${bookingId}`,
    amount: Math.round(valor * 100),
    currency: 'brl',
    status: 'requires_payment_method',
    client_secret: `pi_${bookingId}_secret_mock`,
    metadata: { bookingId },
  };
};

const confirmarPagamento = async (paymentIntentId, dados) => {
  // Mock: Simular confirmação
  return {
    id: paymentIntentId,
    status: 'succeeded',
    amount: dados.amount,
    metadata: dados.metadata,
  };
};

const reembolsar = async (paymentIntentId) => {
  // Mock: Simular reembolso
  return {
    id: `ref_${paymentIntentId}`,
    status: 'succeeded',
    amount: 0,
  };
};

module.exports = { criarPaymentIntent, confirmarPagamento, reembolsar };
