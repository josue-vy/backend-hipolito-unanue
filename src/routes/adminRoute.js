const express = require('express');
const {
    crearJugador,
    actualizarJugador,
    eliminarJugador,
} = require('../controllers/adminController');
const middlewareAutenticacion = require('../middlewares/autenticacionMiddleware');
const router = express.Router();


router.post('/', middlewareAutenticacion, crearJugador);
router.put('/:id', middlewareAutenticacion, actualizarJugador);
router.delete('/:id', middlewareAutenticacion, eliminarJugador);

module.exports = router;
