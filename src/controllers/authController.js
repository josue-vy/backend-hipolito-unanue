const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        const usuario = await Usuario.findOne({ correo });
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        const esValida = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!esValida) return res.status(400).json({ mensaje: 'Contraseña incorrecta' });

        const token = jwt.sign(
            { id: usuario._id, rol: usuario.rol },
            process.env.JWT_SECRETO,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};

const registrar = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        const usuarioExistente = await Usuario.findOne({ correo });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

        const nuevoUsuario = new Usuario({
            correo,
            contrasena: contrasenaEncriptada,
            rol: 'admin',
        });

        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'Usuario administrador registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar el usuario', error });
    }
};

module.exports = { login, registrar };
