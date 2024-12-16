require('dotenv').config();

module.exports = {
    puerto: process.env.PUERTO || 5000,
    mongoAtlasURI: process.env.MONGO_ATLAS_URI,
    jwtSecreto: process.env.JWT_SECRETO,
};
