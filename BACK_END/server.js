const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors')
const DB = require('./conf/db');

const app = express();

dotenv.config({ path: './conf/.env' });
DB()
app.use(express.json());


//Rutas
const bootcampRoutes = require('./routes/RouterBootcamp');

//Implementacion de ruta
app.use('/bootcamps',bootcampRoutes)

const puerto = process.env.PUERTO

app.listen(puerto, function() {
    console.log(`Servidor conectado...${puerto}`.bgBlack.yellow.inverse);
})