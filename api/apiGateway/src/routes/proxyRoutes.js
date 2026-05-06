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
    const url = `${baseURL}${req.path}`;
    const config = {
      method,
      url,
      headers: req.headers,
      data: req.body,
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
