const amqp = require('amqplib');

let connection;
let channel;

const connect = async () => {
  try {
    const url = process.env.RABBITMQ_URL || `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@rabbitmq:5672`;
    connection = await amqp.connect(url);
    channel = await connection.createChannel();
    
    // Declara exchange
    await channel.assertExchange('beleza_events', 'topic', { durable: true });
    
    // Declara fila e vincula a topicos
    const queue = await channel.assertQueue('userservice_events', { durable: true });
    await channel.bindQueue(queue.queue, 'beleza_events', 'user.*');
    await channel.bindQueue(queue.queue, 'beleza_events', 'professional.*');
    await channel.bindQueue(queue.queue, 'beleza_events', 'review.*');
    
    console.log('[User Service] Conectado ao RabbitMQ');

    // Consome mensagens
    channel.consume(queue.queue, async (msg) => {
      if (msg) {
        try {
          const content = JSON.parse(msg.content.toString());
          console.log(`[User Service] Evento recebido: ${msg.fields.routingKey}`);
          await handleEvent(msg.fields.routingKey, content);
          channel.ack(msg);
        } catch (err) {
          console.error('[User Service] Erro ao processar evento:', err);
          channel.nack(msg, false, true);
        }
      }
    });
  } catch (err) {
    console.error('[User Service] RabbitMQ erro:', err);
  }
};

const handleEvent = async (routingKey, data) => {
  // Será implementado nos casos de uso específicos
};

const publish = async (routingKey, message) => {
  if (!channel) return;
  channel.publish('beleza_events', routingKey, Buffer.from(JSON.stringify(message)));
};

module.exports = { connect, publish };
