const amqp = require('amqplib');
let channel;
const connect = async () => {
  try {
    const url = process.env.RABBITMQ_URL || `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@rabbitmq:5672`;
    const connection = await amqp.connect(url);
    channel = await connection.createChannel();
    await channel.assertExchange('beleza_events', 'topic', { durable: true });
    const queue = await channel.assertQueue('bookingservice_events', { durable: true });
    await channel.bindQueue(queue.queue, 'beleza_events', 'payment.*');
    console.log('[Booking Service] RabbitMQ conectado');
    channel.consume(queue.queue, async (msg) => {
      if (msg) {
        try {
          const content = JSON.parse(msg.content.toString());
          await handleEvent(msg.fields.routingKey, content);
          channel.ack(msg);
        } catch (err) {
          console.error('[Booking] Erro:', err);
          channel.nack(msg, false, true);
        }
      }
    });
  } catch (err) {
    console.error('[Booking Service] RabbitMQ erro:', err);
  }
};
const handleEvent = async (routingKey, data) => {};
const publish = async (routingKey, message) => {
  if (!channel) return;
  channel.publish('beleza_events', routingKey, Buffer.from(JSON.stringify(message)));
};
module.exports = { connect, publish };
