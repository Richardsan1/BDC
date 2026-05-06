const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { autenticar, validarServiceKey } = require('./middleware/auth');
const proxyRoutes = require('./routes/proxyRoutes');
const app = express();

app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 }));
app.use(cors({ origin: '*', credentials: false }));
app.use(express.json({ limit: '10kb' }));
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'apiGateway' }));

// Rotas públicas
app.use('/auth', proxyRoutes.auth);
app.use('/search', proxyRoutes.search);
app.use('/users/especialidades', proxyRoutes.especialidades);

// Rotas autenticadas
app.use('/users', autenticar, proxyRoutes.users);
app.use('/bookings', autenticar, proxyRoutes.bookings);
app.use('/payments', autenticar, proxyRoutes.payments);
app.use('/admin', autenticar, validarServiceKey, proxyRoutes.admin);

app.use((req, res) => res.status(404).json({ erro: 'Rota não encontrada' }));
app.use((err, req, res, next) => {
  console.error(`[Gateway] ${err.statusCode || 500} - ${err.message}`);
  res.status(err.statusCode || 500).json({ erro: err.message });
});

module.exports = app;
