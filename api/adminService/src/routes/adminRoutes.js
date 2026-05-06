const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();
router.post('/aprovar', adminController.aprovar);
router.post('/rejeitar', adminController.rejeitar);
router.post('/suspender', adminController.suspender);
router.get('/metricas', adminController.metricas);
module.exports = router;
