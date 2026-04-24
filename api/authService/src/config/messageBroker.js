const amqplib = require('amqplib');

let connection = null;
let channel = null;

const EXCHANGE = process.env.RABBITMQ_EXCHANGE;

const connect = async () => {
  try {
    connection = await amqplib.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE, 'topic', { durable: true });
    console.log('[MQ] Conectado ao RabbitMQ');

    connection.on('error', (err) => {
      console.error('[MQ] Erro de conexão:', err.message);
      connection = null;
      channel = null;
    });

    connection.on('close', () => {
      console.warn('[MQ] Conexão encerrada. Tentando reconectar em 5s...');
      connection = null;
      channel = null;
      setTimeout(connect, 5000);
    });
  } catch (err) {
    console.error('[MQ] Falha ao conectar:', err.message);
    // Não bloqueia a inicialização do serviço
  }
};

const publish = async (routingKey, payload) => {
  if (!channel) {
    console.warn(`[MQ] Canal indisponível. Evento '${routingKey}' não publicado.`);
    return false;
  }
  try {
    const message = Buffer.from(JSON.stringify({ ...payload, timestamp: new Date().toISOString() }));
    channel.publish(EXCHANGE, routingKey, message, { persistent: true });
    console.log(`[MQ] Evento publicado: ${routingKey}`);
    return true;
  } catch (err) {
    console.error(`[MQ] Erro ao publicar evento '${routingKey}':`, err.message);
    return false;
  }
};

module.exports = { connect, publish };
