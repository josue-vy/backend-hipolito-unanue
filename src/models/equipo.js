const mongoose = require("mongoose");

const esquemaEquipo = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  goles: {
    type: Number,
    default: 0,
  },
  victorias: {
    type: Number,
    default: 0,
  },
  derrotas: {
    type: Number,
    default: 0,
  },
  empates: {
    type: Number,
    default: 0,
  },
  puntos: {
    type: Number,
    default: 0,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Equipo", esquemaEquipo);
