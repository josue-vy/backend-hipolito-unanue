const Jugador = require('../models/jugador');

const crearJugador = async (req, res) => {
    try {
        const jugador = new Jugador(req.body);
        await jugador.save();
        res.status(201).json(jugador);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el jugador', error });
    }
};

const actualizarJugador = async (req, res) => {
    try {
        const { id } = req.params;
        const jugador = await Jugador.findByIdAndUpdate(id, req.body, { new: true });
        if (!jugador) return res.status(404).json({ mensaje: 'Jugador no encontrado' });
        res.status(200).json(jugador);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el jugador', error });
    }
};

const eliminarJugador = async (req, res) => {
    try {
        const { id } = req.params;
        const jugador = await Jugador.findByIdAndDelete(id);
        if (!jugador) return res.status(404).json({ mensaje: 'Jugador no encontrado' });
        res.status(200).json({ mensaje: 'Jugador eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el jugador', error });
    }
};

module.exports = { crearJugador, actualizarJugador, eliminarJugador };
