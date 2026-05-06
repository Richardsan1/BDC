const verificarServiceKey = (req, res, next) => {
  const serviceKey = req.headers['x-service-key'];
  if (serviceKey === process.env.INTERNAL_SERVICE_KEY) {
    req.isInternal = true;
    return next();
  }

  // Headers injetados pelo API Gateway
  const userId = req.headers['x-user-id'];
  const userEmail = req.headers['x-user-email'];
  const userTipo = req.headers['x-user-tipo'];

  if (!userId || !userEmail || !userTipo) {
    return res.status(401).json({ erro: 'Não autenticado' });
  }

  req.usuario = {
    id: userId,
    email: userEmail,
    tipo: userTipo,
  };

  next();
};

const requerInterno = (req, res, next) => {
  if (!req.isInternal) {
    return res.status(403).json({ erro: 'Acesso apenas para serviços internos' });
  }
  next();
};

module.exports = { verificarServiceKey, requerInterno };
