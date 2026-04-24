const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const authController = require('../controllers/authController');
const { autenticar, autenticarServico } = require('../middleware/auth');
const { regrasRegistro, regrasLogin, validar } = require('../middleware/validacao');

// Rate limiter específico para rotas de autenticação (proteção contra brute force)
const authLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS), // 15 min
  max: parseInt(process.env.RATE_LIMIT_AUTH_MAX),
  standardHeaders: true,
  legacyHeaders: false,
  message: { erro: 'Muitas tentativas. Aguarde antes de tentar novamente.' },
  skipSuccessfulRequests: true, // Conta apenas falhas
});

// ─── Rotas Públicas ──────────────────────────────────────────────────────────

/**
 * @route   POST /auth/register
 * @desc    Cadastro de cliente, profissional ou salão (UC01, UC12)
 * @access  Public
 */
router.post('/register', authLimiter, regrasRegistro, validar, authController.registrar);

/**
 * @route   POST /auth/login
 * @desc    Login de qualquer tipo de usuário (UC02, UC13, UC19)
 * @access  Public
 */
router.post('/login', authLimiter, regrasLogin, validar, authController.login);

// ─── Rotas Autenticadas ───────────────────────────────────────────────────────

/**
 * @route   POST /auth/logout
 * @desc    Invalidar token atual (blacklist)
 * @access  Private
 */
router.post('/logout', autenticar, authController.logout);

/**
 * @route   GET /auth/me
 * @desc    Retorna dados do usuário autenticado
 * @access  Private
 */
router.get('/me', autenticar, authController.me);

// ─── Rotas Internas (Inter-Serviços) ─────────────────────────────────────────

/**
 * @route   POST /auth/validate
 * @desc    Valida token JWT — consumido pelo API Gateway
 * @access  Internal (x-service-key)
 */
router.post('/validate', autenticarServico, authController.validarToken);

/**
 * @route   PATCH /auth/internal/suspend/:usuarioId
 * @desc    Suspende usuário e invalida sessões — chamado pelo Admin Service
 * @access  Internal (x-service-key)
 */
router.patch('/internal/suspend/:usuarioId', autenticarServico, authController.suspenderUsuario);

module.exports = router;
