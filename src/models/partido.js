const mongoose = require('mongoose');

const partidoSchema = new mongoose.Schema({
  equipoLocal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipo',
    required: true
  },
  equipoVisitante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipo',
    required: true
  },
  golesLocal: {
    type: Number,
    default: 0,
    min: 0
  },
  golesVisitante: {
    type: Number,
    default: 0,
    min: 0
  },
  fecha: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Partido', partidoSchema);