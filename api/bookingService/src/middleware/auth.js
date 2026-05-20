/**
 * Middleware para extrair informações do usuário dos headers
 * (injetados pelo API Gateway)
 */
const extrairUsuario = (req, res, next) => {
  try {
    const userId = req.headers['x-user-id'];
    const userEmail = req.headers['x-user-email'];
    const userTipo = req.headers['x-user-tipo'];

    if (!userId) {
      return res.status(401).json({ erro: 'Usuário não identificado' });
    }

    req.usuario = {
      id: userId,
      email: userEmail,
      tipo: userTipo,
    };

    next();
  } catch (err) {
    res.status(401).json({ erro: 'Erro ao extrair usuário' });
  }
};

module.exports = { extrairUsuario };
