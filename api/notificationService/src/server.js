require('dotenv').config();
const { connect: connectMQ } = require('./config/messageBroker');
const PORT = 3006;
const inicializar = async () => {
  await connectMQ();
  console.log(`[Notification Service] ${PORT}`);
};
inicializar();
