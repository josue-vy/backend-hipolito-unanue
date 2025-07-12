const express = require('express');
const {
    crearEquipo,
    obtenerEquipos,
    obtenerEquipo,
    actualizarEquipo,
    eliminarEquipo
} = require('../controllers/equipoController');

const router = express.Router();

router.post('/', crearEquipo);
router.get('/', obtenerEquipos);
router.get('/:id', obtenerEquipo);
router.put('/:id', actualizarEquipo);
router.delete('/:id', eliminarEquipo);

module.exports = router;