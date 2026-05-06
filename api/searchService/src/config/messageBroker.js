const amqp = require('amqplib');

let channel;

const connect = async () => {
  try {
    const url = process.env.RABBITMQ_URL || `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@rabbitmq:5672`;
    const connection = await amqp.connect(url);
    channel = await connection.createChannel();
    
    await channel.assertExchange('beleza_events', 'topic', { durable: true });
    
    const queue = await channel.assertQueue('searchservice_events', { durable: true });
    await channel.bindQueue(queue.queue, 'beleza_events', 'professional.*');
    await channel.bindQueue(queue.queue, 'beleza_events', 'user.*');
    await channel.bindQueue(queue.queue, 'beleza_events', 'review.*');
    
    console.log('[Search Service] RabbitMQ conectado');

    channel.consume(queue.queue, async (msg) => {
      if (msg) {
        try {
          const content = JSON.parse(msg.content.toString());
          await handleEvent(msg.fields.routingKey, content);
          channel.ack(msg);
        } catch (err) {
          console.error('[Search] Erro ao processar evento:', err);
          channel.nack(msg, false, true);
        }
      }
    });
  } catch (err) {
    console.error('[Search Service] RabbitMQ erro:', err);
  }
};

const handleEvent = async (routingKey, data) => {
  // Será implementado conforme necessário
};

const publish = async (routingKey, message) => {
  if (!channel) return;
  channel.publish('beleza_events', routingKey, Buffer.from(JSON.stringify(message)));
};

module.exports = { connect, publish };
