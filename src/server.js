const app = require('./app');
const { puerto } = require('./config/entorno');

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
