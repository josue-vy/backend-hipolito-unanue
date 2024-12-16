const express = require('express');
const { obtenerJugadores } = require('../controllers/jugadorController');
const ruta = express.Router();

ruta.get('/', obtenerJugadores);

module.exports = ruta;
