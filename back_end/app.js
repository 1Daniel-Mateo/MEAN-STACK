//Importando el módulo express y creando una nueva aplicación
const express = require('express');
const morgan = require('morgan');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

//Traemos la libreria dotenv
require('dotenv/config');

//Esta constante nos llama a la variable URL guardada en el .env
const api = process.env.URL;

//middleware para que guarde nuevos datos
app.use(bodyPaser.json());
app.use(morgan('tiny'));



// Definir la ruta raíz de la aplicación, que devuelve un mensaje
// al usuario cuando accede al sitio web

//Metodo de consulta get
app.get(`${api}/products`, async (req, res) => {
    const productList = await Product.find();

    if (!productList) {
        res.status(500).json({ success: false })
    } else {
        res.send(productList);
    }
})

//metodo de ingreso de datos
app.post(`${api}/products`, (req, res) => {

    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        total: req.body.total
    });

    product.save().then((createProduct => {
        res.status(201).json(createProduct)
    })).catch((err) => {
        //error 500 falla breve en la conectividad
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

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


//Generación de modelo 

const productShema = mongoose.Schema({
    name: String,
    image: String,
    total: {
        type: Number,
        require: true
    }
})

const Product = mongoose.model('Product', productShema);