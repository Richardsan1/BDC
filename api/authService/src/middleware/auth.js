const { verificarToken } = require('../utils/jwt');
const { isTokenBlacklisted } = require('../services/authService');
const { query } = require('../config/database');

/**
 * Middleware de autenticação JWT.
 * Extrai o token do cookie httpOnly ou do header Authorization.
 */
const autenticar = async (req, res, next) => {
  try {
    // Suporta cookie httpOnly (web) e Authorization header (inter-serviços)
    let token = req.cookies?.token;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.slice(7);
      }
    }

    if (!token) {
      return res.status(401).json({ erro: 'Token de acesso não fornecido.' });
    }

    const payload = verificarToken(token);

    // Verifica blacklist
    const blacklisted = await isTokenBlacklisted(payload.jti);
    if (blacklisted) {
      return res.status(401).json({ erro: 'Token inválido ou expirado.' });
    }

    // Verifica status atual do usuário (captura suspensões pós-login)
    const { rows } = await query(
      'SELECT status FROM authservice.usuarios WHERE id = $1',
      [payload.sub]
    );

    if (!rows[0] || rows[0].status !== 'ativo') {
      return res.status(401).json({ erro: 'Acesso negado.' });
    }

    req.usuario = { id: payload.sub, email: payload.email, tipo: payload.tipo, jti: payload.jti };
    req.token = token;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ erro: 'Token expirado. Faça login novamente.' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ erro: 'Token inválido.' });
    }
    next(err);
  }
};

/**
 * Middleware de autorização por papel (role).
 * @param {...string} tipos - Tipos permitidos (ex: 'admin', 'profissional')
 */
const autorizar = (...tipos) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ erro: 'Não autenticado.' });
    }
    if (!tipos.includes(req.usuario.tipo)) {
      return res.status(403).json({ erro: 'Acesso proibido. Permissão insuficiente.' });
    }
    next();
  };
};

/**
 * Middleware de autenticação para comunicação interna entre microsserviços.
 * Usa uma chave de serviço no header (não JWT de usuário).
 */
const autenticarServico = (req, res, next) => {
  const serviceKey = req.headers['x-service-key'];
  if (!serviceKey || serviceKey !== process.env.INTERNAL_SERVICE_KEY) {
    return res.status(401).json({ erro: 'Acesso negado entre serviços.' });
  }
  next();
};

module.exports = { autenticar, autorizar, autenticarServico };
