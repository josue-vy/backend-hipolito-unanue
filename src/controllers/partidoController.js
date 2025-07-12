const Partido = require('../models/partido');
const Equipo = require('../models/equipo');

const registrarPartido = async (req, res) => {
  try {
    const { equipoLocalId, equipoVisitanteId, golesLocal, golesVisitante } = req.body;

    // Validación básica
    if (equipoLocalId === equipoVisitanteId) {
      return res.status(400).json({ error: 'Un equipo no puede jugar contra sí mismo' });
    }

    // Crear partido
    const partido = new Partido({
      equipoLocal: equipoLocalId,
      equipoVisitante: equipoVisitanteId,
      golesLocal,
      golesVisitante
    });

    // Actualizar estadísticas de equipos
    await actualizarEstadisticasEquipos(
      equipoLocalId, 
      equipoVisitanteId, 
      golesLocal, 
      golesVisitante
    );

    await partido.save();
    res.status(201).json(partido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerHistorial = async (req, res) => {
  try {
    const partidos = await Partido.find()
      .populate('equipoLocal', 'nombre')
      .populate('equipoVisitante', 'nombre')
      .sort({ fecha: -1 }); // Más recientes primero

    res.status(200).json(partidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Función para actualizar equipos automáticamente
async function actualizarEstadisticasEquipos(localId, visitanteId, golesLocal, golesVisitante) {
  // Determinar resultado
  const resultadoLocal = golesLocal > golesVisitante ? 'victorias' : 
                        golesLocal < golesVisitante ? 'derrotas' : 'empates';
  
  const resultadoVisitante = golesVisitante > golesLocal ? 'victorias' : 
                            golesVisitante < golesLocal ? 'derrotas' : 'empates';

  // Actualizar equipo local
  await Equipo.findByIdAndUpdate(localId, {
    $inc: {
      goles: golesLocal,
      [resultadoLocal]: 1,
      partidosJugados: 1
    }
  });

  // Actualizar equipo visitante
  await Equipo.findByIdAndUpdate(visitanteId, {
    $inc: {
      goles: golesVisitante,
      [resultadoVisitante]: 1,
      partidosJugados: 1
    }
  });
}

module.exports = {
  registrarPartido,
  obtenerHistorial
};