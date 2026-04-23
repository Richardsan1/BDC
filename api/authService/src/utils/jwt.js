const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const SECRET = process.env.JWT_SECRET;

const EXPIRATION_BY_TIPO = {
  cliente: process.env.JWT_EXPIRES_CLIENTE || '24h',
  profissional: process.env.JWT_EXPIRES_PROFISSIONAL || '24h',
  salao: process.env.JWT_EXPIRES_PROFISSIONAL || '24h',
  admin: process.env.JWT_EXPIRES_ADMIN || '8h',
};

/**
 * Gera um token JWT para o usuário.
 * @param {Object} usuario - Dados do usuário
 * @returns {{ token: string, jti: string, expiresAt: Date }}
 */
const gerarToken = (usuario) => {
  const jti = uuidv4();
  const expiresIn = EXPIRATION_BY_TIPO[usuario.tipo] || '24h';

  const payload = {
    sub: usuario.id,
    email: usuario.email,
    tipo: usuario.tipo,
    jti,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn });
  const decoded = jwt.decode(token);
  const expiresAt = new Date(decoded.exp * 1000);

  return { token, jti, expiresAt };
};

/**
 * Verifica e decodifica um token JWT.
 * @param {string} token
 * @returns {Object} payload decodificado
 */
const verificarToken = (token) => {
  return jwt.verify(token, SECRET);
};

/**
 * Decodifica sem verificar (útil para blacklist com token expirado).
 */
const decodificarToken = (token) => {
  return jwt.decode(token);
};

module.exports = { gerarToken, verificarToken, decodificarToken };
