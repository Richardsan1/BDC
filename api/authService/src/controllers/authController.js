const authService = require('../services/authService');
const { decodificarToken } = require('../utils/jwt');

/**
 * POST /auth/register
 * UC01 (Cliente) | UC12 (Profissional/Salão)
 */
const registrar = async (req, res, next) => {
  try {
    const { email, senha, tipo } = req.body;

    const usuario = await authService.registrar({ email, senha, tipo });

    return res.status(201).json({
      mensagem: tipo === 'cliente'
        ? 'Cadastro realizado com sucesso.'
        : 'Cadastro recebido. Aguardando aprovação da equipe.',
      usuario,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /auth/login
 * UC02 (Cliente) | UC13 (Profissional/Salão) | UC19 (Admin)
 */
const login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;
    const ipOrigem = req.ip || req.headers['x-forwarded-for'];

    const { token, jti, expiresAt, usuario } = await authService.login({ email, senha, ipOrigem });

    // Cookie httpOnly para clientes web — seguro contra XSS
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: expiresAt,
    });

    return res.status(200).json({
      mensagem: 'Login realizado com sucesso.',
      token, // também retorna no body para consumo via API Gateway / outros serviços
      usuario,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /auth/logout
 * Invalida o token atual do usuário autenticado.
 */
const logout = async (req, res, next) => {
  try {
    const { jti } = req.usuario;
    const decoded = decodificarToken(req.token);
    const expiresAt = new Date(decoded.exp * 1000);

    await authService.logout({
      usuarioId: req.usuario.id,
      jti,
      expiresAt,
    });

    res.clearCookie('token');

    return res.status(200).json({ mensagem: 'Logout realizado com sucesso.' });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /auth/validate
 * Valida um token JWT — usado internamente pelo API Gateway e outros microsserviços.
 */
const validarToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.slice(7) || req.body?.token;

    if (!token) {
      return res.status(400).json({ erro: 'Token não fornecido.' });
    }

    const payload = await authService.validarToken(token);

    return res.status(200).json({
      valido: true,
      payload: {
        sub: payload.sub,
        email: payload.email,
        tipo: payload.tipo,
        jti: payload.jti,
      },
    });
  } catch (err) {
    if (err.statusCode === 401 || err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ valido: false, erro: err.message });
    }
    next(err);
  }
};

/**
 * PATCH /auth/internal/suspend/:usuarioId
 * Rota interna: Admin Service chama para suspender um usuário.
 */
const suspenderUsuario = async (req, res, next) => {
  try {
    const { usuarioId } = req.params;
    await authService.invalidarSessoesPorUsuario(usuarioId);
    return res.status(200).json({ mensagem: 'Sessões do usuário invalidadas.' });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /auth/me
 * Retorna dados do usuário autenticado com base no token.
 */
const me = (req, res) => {
  return res.status(200).json({ usuario: req.usuario });
};

module.exports = { registrar, login, logout, validarToken, suspenderUsuario, me };
