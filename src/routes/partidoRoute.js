const express = require('express');
const { registrarPartido, obtenerHistorial } = require('../controllers/partidoController');
const router = express.Router();

router.post('/', registrarPartido);
router.get('/', obtenerHistorial);

module.exports = router;