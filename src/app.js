const express = require('express');
const cors = require('cors');  // Importa CORS
const conectarBaseDatos = require('./config/basedatos');
const rutasJugador = require('./routes/jugadorRoute');
const rutasAdmin = require('./routes/adminRoute');
const rutasAuth = require('./routes/authRoute');
const manejadorErrores = require('./middlewares/manejadorErrores');

const app = express();

app.use(cors({
    origin: 'https://hipolite-sport-6gjmn71d6-epis.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

conectarBaseDatos();

app.use(express.json());

app.use('/api/jugadores', rutasJugador);
app.use('/api/auth', rutasAuth);
app.use('/api/admin', rutasAdmin);

app.use(manejadorErrores);

module.exports = app;
