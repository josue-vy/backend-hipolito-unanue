const jwt = require('jsonwebtoken');

const middlewareAutenticacion = (req, res, next) => {
    const token = req.header('Authorization');
    console.log('Token recibido:', token);  // Log para verificar el encabezado
    if (!token) return res.status(401).json({ mensaje: 'Acceso no autorizado' });

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRETO);  // .split(' ')[1] para obtener solo el token sin "Bearer"
        req.user = decoded;

        if (req.user.rol !== 'admin') {
            return res.status(403).json({ mensaje: 'No tienes permisos de administrador' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token no válido', error: error.message });
    }
};


module.exports = middlewareAutenticacion;
