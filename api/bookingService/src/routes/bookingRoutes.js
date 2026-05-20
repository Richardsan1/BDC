const express = require('express');
const bookingController = require('../controllers/bookingController');
const { extrairUsuario } = require('../middleware/auth');
const router = express.Router();

// Todas as rotas requerem autenticação
router.use(extrairUsuario);

router.post('/', bookingController.criar);
router.get('/:id', bookingController.obter);
router.get('/', bookingController.listar);
router.delete('/:id', bookingController.cancelar);
module.exports = router;
