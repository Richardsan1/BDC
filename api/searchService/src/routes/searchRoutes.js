const express = require('express');
const searchController = require('../controllers/searchController');

const router = express.Router();

router.get('/', searchController.buscar);
router.post('/internal/indexar', searchController.indexar);

module.exports = router;
