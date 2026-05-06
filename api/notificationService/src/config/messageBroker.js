const amqp = require('amqplib');
const resend = require('./resend');

let channel;

const connect = async () => {
  try {
    const url = process.env.RABBITMQ_URL || `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@rabbitmq:5672`;
    const connection = await amqp.connect(url);
    channel = await connection.createChannel();
    
    await channel.assertExchange('beleza_events', 'topic', { durable: true });
    
    const queue = await channel.assertQueue('notificationservice_events', { durable: true });
    await channel.bindQueue(queue.queue, 'beleza_events', 'user.*');
    await channel.bindQueue(queue.queue, 'beleza_events', 'professional.*');
    await channel.bindQueue(queue.queue, 'beleza_events', 'booking.*');
    await channel.bindQueue(queue.queue, 'beleza_events', 'payment.*');
    
    console.log('[Notification Service] RabbitMQ OK');

    channel.consume(queue.queue, async (msg) => {
      if (msg) {
        try {
          const content = JSON.parse(msg.content.toString());
          await handleEvent(msg.fields.routingKey, content);
          channel.ack(msg);
        } catch (err) {
          console.error('[Notification] Erro:', err);
          channel.nack(msg, false, true);
        }
      }
    });
  } catch (err) {
    console.error('[Notification Service] RabbitMQ:', err);
  }
};

const handleEvent = async (routingKey, data) => {
  if (routingKey === 'user.registered') {
    await resend.enviarEmail(data.email, 'Bem-vindo!', 'Sua conta foi criada com sucesso.');
  } else if (routingKey === 'professional.approved') {
    await resend.enviarEmail(data.email, 'Aprovado!', 'Sua conta foi aprovada.');
  } else if (routingKey === 'booking.confirmed') {
    await resend.enviarEmail(data.clienteEmail, 'Agendamento confirmado', 'Seu agendamento foi confirmado.');
  } else if (routingKey === 'payment.refunded') {
    await resend.enviarEmail(data.clienteEmail, 'Reembolso processado', 'Seu reembolso foi processado.');
  }
};

module.exports = { connect };
