const mongoose = require('mongoose');

const esquemaJugador = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellidos: { type: String, required: false },
    apodo: { type: String, required: false },
    nacionalidad: { type: String, required: false },
    posicion: { type: String, required: false },
    goles: { type: Number, default: 0 },
    asistencias: { type: Number, default: 0 },
    partidosGanados: { type: Number, default: 0 },
    partidosPerdidos: { type: Number, default: 0 },
    fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Jugador', esquemaJugador, 'jugadores');
