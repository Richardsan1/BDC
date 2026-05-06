const amqp = require('amqplib');
let channel;
const connect = async () => {
  try {
    const url = process.env.RABBITMQ_URL || `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@rabbitmq:5672`;
    const connection = await amqp.connect(url);
    channel = await connection.createChannel();
    await channel.assertExchange('beleza_events', 'topic', { durable: true });
    console.log('[Admin Service] RabbitMQ OK');
  } catch (err) {
    console.error('[Admin Service] RabbitMQ:', err);
  }
};
const publish = async (routingKey, message) => {
  if (!channel) return;
  channel.publish('beleza_events', routingKey, Buffer.from(JSON.stringify(message)));
};
module.exports = { connect, publish };
