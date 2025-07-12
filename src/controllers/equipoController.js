const Equipo = require('../models/equipo');
const Jugador = require('../models/jugador');

// Crear un nuevo equipo
const crearEquipo = async (req, res) => {
    try {
        const equipo = new Equipo(req.body);
        await equipo.save();
        res.status(201).json(equipo);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el equipo', error });
    }
};

// Obtener todos los equipos
const obtenerEquipos = async (req, res) => {
    try {
        const equipos = await Equipo.find();
        res.status(200).json(equipos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los equipos', error });
    }
};

// Obtener un equipo por ID con sus jugadores
const obtenerEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        
        const equipo = await Equipo.findById(id);
        if (!equipo) {
            return res.status(404).json({ mensaje: 'Equipo no encontrado' });
        }
        
        // Obtener jugadores del equipo
        const jugadores = await Jugador.find({ equipo: id });
        
        res.status(200).json({
            ...equipo.toObject(),
            jugadores
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el equipo', error });
    }
};

// Actualizar un equipo
const actualizarEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const equipo = await Equipo.findByIdAndUpdate(id, req.body, { 
            new: true 
        });
        if (!equipo) {
            return res.status(404).json({ mensaje: 'Equipo no encontrado' });
        }
        res.status(200).json(equipo);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el equipo', error });
    }
};

// Eliminar un equipo (y desvincular sus jugadores)
const eliminarEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Desvincular jugadores del equipo
        await Jugador.updateMany(
            { equipo: id },
            { $set: { equipo: null } }
        );
        
        // Eliminar el equipo
        const equipo = await Equipo.findByIdAndDelete(id);
        if (!equipo) {
            return res.status(404).json({ mensaje: 'Equipo no encontrado' });
        }
        
        res.status(200).json({ 
            mensaje: 'Equipo eliminado y jugadores desvinculados',
            equipoEliminado: equipo
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el equipo', error });
    }
};

module.exports = {
    crearEquipo,
    obtenerEquipos,
    obtenerEquipo,
    actualizarEquipo,
    eliminarEquipo
};