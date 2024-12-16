const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    correo: { type: String, required: true, unique: true },
    contrasena: { type: String, required: true },
    rol: { type: String, default: 'admin' }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
