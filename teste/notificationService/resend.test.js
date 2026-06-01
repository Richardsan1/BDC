const test = require('node:test');
const assert = require('node:assert/strict');
const { enviarEmail } = require('../../api/notificationService/src/config/resend');

test('notificationService monta payload de envio de e-mail', async () => {
  const payload = await enviarEmail('cliente@teste.com', 'Assunto', 'Mensagem de teste');

  assert.equal(payload.to, 'cliente@teste.com');
  assert.equal(payload.subject, 'Assunto');
  assert.equal(payload.status, 'sent');
  assert.match(payload.id, /^email_/);
});
