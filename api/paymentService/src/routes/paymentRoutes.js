const express = require('express');
const paymentController = require('../controllers/paymentController');
const { extrairUsuario } = require('../middleware/auth');
const router = express.Router();

// Todas as rotas requerem autenticação
router.use(extrairUsuario);

router.post('/intent', paymentController.criarIntent);
router.post('/confirmar', paymentController.confirmar);
router.post('/reembolso', paymentController.reembolsar);
module.exports = router;
