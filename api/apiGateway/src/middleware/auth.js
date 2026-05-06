const { verificarToken } = require('../utils/jwt');

const autenticar = (req, res, next) => {
  try {
    let token = req.cookies?.token;
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.slice(7);
      }
    }
    if (!token) {
      return res.status(401).json({ erro: 'Token não fornecido' });
    }

    const payload = verificarToken(token);

    // Injeta headers para os microserviços
    req.headers['x-user-id'] = payload.sub;
    req.headers['x-user-email'] = payload.email;
    req.headers['x-user-tipo'] = payload.tipo;

    next();
  } catch (err) {
    res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};

const validarServiceKey = (req, res, next) => {
  // Apenas admins podem acessar
  if (req.headers['x-user-tipo'] !== 'admin') {
    return res.status(403).json({ erro: 'Acesso apenas para administradores' });
  }
  next();
};

module.exports = { autenticar, validarServiceKey };
