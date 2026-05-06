const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();
router.post('/intent', paymentController.criarIntent);
router.post('/confirmar', paymentController.confirmar);
router.post('/reembolso', paymentController.reembolsar);
module.exports = router;
