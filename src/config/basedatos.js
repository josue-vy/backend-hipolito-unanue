const mongoose = require('mongoose');
const { mongoAtlasURI } = require('./entorno');

const conectarDB = async () => {
    try {
        await mongoose.connect(mongoAtlasURI, { 
        });
        console.log('Conexión exitosa a MongoDB Atlas');
    } catch (error) {
        console.error('Error al conectar a MongoDB Atlas:', error.message);
        process.exit(1);
    }
};

module.exports = conectarDB;
