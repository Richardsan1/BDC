const jwt = require('jsonwebtoken');

const verificarToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { verificarToken };
