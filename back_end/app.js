//Importando el módulo express y creando una nueva aplicación
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const app = express();
const conectarDB = require('./config/db');

dotenv.config({
    path: './config/.env'
});


//Esta constante nos llama a la variable URL guardada en el .env
const api = process.env.PUERTO;
conectarDB()
app.use(morgan('tiny'));


//Llamada de modelo
const productsRouter = require('./routers/products')

//middleware para que guarde nuevos datos
app.use(`/products`, productsRouter);

// Iniciando el servidor en el puerto especificado (3000) y registrando un mensaje
// a la consola cuando el servidor esté en funcionamiento
app.listen(api, function (){
    console.log(`Tu servidor esta corriendo en el enlace http://localhost:${api}`);
})


