//Importando el módulo express y creando una nueva aplicación
const express = require('express');
const morgan = require('morgan');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

//Traemos la libreria dotenv
require('dotenv/config');


//Llamada de modelo

const Product = require('../models/product')
const productsRouter = require('../routers/products')



//Esta constante nos llama a la variable URL guardada en el .env
const api = process.env.URL;

//middleware para que guarde nuevos datos
app.use(bodyPaser.json());
app.use(morgan('tiny'));
app.use(`${api}/products`, productsRouter);

//conecion con la base de datos
const conectarDB = async () => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB conectado");
}

conectarDB()

module.exports = conectarDB

// Iniciando el servidor en el puerto especificado (3000) y registrando un mensaje
// a la consola cuando el servidor esté en funcionamiento
app.listen(3000, () => {
    console.log('Tu servidor esta corriendo en el enlace http://localhost:3000');
})


