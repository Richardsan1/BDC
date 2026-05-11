const axios = require('axios');

const AUTH_SERVICE = process.env.AUTH_SERVICE_URL || 'http://auth-service:3001';
const USER_SERVICE = process.env.USER_SERVICE_URL || 'http://user-service:3002';
const SEARCH_SERVICE = process.env.SEARCH_SERVICE_URL || 'http://search-service:3003';
const BOOKING_SERVICE = process.env.BOOKING_SERVICE_URL || 'http://booking-service:3004';
const PAYMENT_SERVICE = process.env.PAYMENT_SERVICE_URL || 'http://payment-service:3005';
const ADMIN_SERVICE = process.env.ADMIN_SERVICE_URL || 'http://admin-service:3007';

const proxy = (baseURL) => async (req, res, next) => {
  try {
    const method = req.method.toLowerCase();
    // Use originalUrl to preserve the full request path (includes mount point)
    // so downstream receives the exact route namespace (e.g., /auth/register).
    const url = `${baseURL}${req.originalUrl}`;
    // Build a minimal safe headers set to forward to downstream services.
    const allowed = [
      'authorization',
      'content-type',
      'accept',
      'x-user-id',
      'x-user-email',
      'x-user-tipo',
      'x-service-key',
    ];
    const headers = {};
    for (const h of allowed) {
      if (req.headers[h]) headers[h] = req.headers[h];
    }

    console.log(`[Proxy] ${method.toUpperCase()} -> ${url}`);

    const config = {
      method,
      url,
      headers,
      data: req.body,
      timeout: 30000,
    };

    const response = await axios(config);
    res.status(response.status).json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.erro || 'Erro ao processar requisição';
    res.status(status).json({ erro: message });
  }
};

const auth = proxy(AUTH_SERVICE);
const users = proxy(USER_SERVICE);
const search = proxy(SEARCH_SERVICE);
const bookings = proxy(BOOKING_SERVICE);
const payments = proxy(PAYMENT_SERVICE);
const admin = proxy(ADMIN_SERVICE);

const especialidades = async (req, res, next) => {
  try {
    const response = await axios.get(`${USER_SERVICE}/users/especialidades`);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ erro: 'Erro ao buscar especialidades' });
  }
};

module.exports = { auth, users, search, bookings, payments, admin, especialidades };
