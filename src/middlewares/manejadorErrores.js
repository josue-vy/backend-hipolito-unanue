const manejadorErrores = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ mensaje: 'Error interno del servidor', error: err.message });
};

module.exports = manejadorErrores;
