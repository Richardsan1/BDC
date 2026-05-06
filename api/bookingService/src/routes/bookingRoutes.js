const express = require('express');
const bookingController = require('../controllers/bookingController');
const router = express.Router();
router.post('/', bookingController.criar);
router.get('/:id', bookingController.obter);
router.get('/', bookingController.listar);
router.delete('/:id', bookingController.cancelar);
module.exports = router;
