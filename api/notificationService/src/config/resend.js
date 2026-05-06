// Mock Resend - Em produção usar biblioteca 'resend'
const enviarEmail = async (to, subject, body) => {
  // Mock: Simular envio
  console.log(`[Notification] Email enviado para ${to}: ${subject}`);
  
  return {
    id: `email_${Date.now()}`,
    from: process.env.EMAIL_FROM || 'noreply@belezainclusiva.com',
    to,
    subject,
    body,
    status: 'sent',
  };
};

module.exports = { enviarEmail };
