const Jugador = require('../models/jugador');

const obtenerJugadores = async (req, res) => {
    try {
        const jugadores = await Jugador.find();
        res.status(200).json(jugadores);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los jugadores' });
    }
};

module.exports = { obtenerJugadores };
