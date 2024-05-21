//IMPORTACION DE MODULO DE MONGOOSE
const mongoose = require('mongoose');

//coneccion con la base de datos
const conectarDB = async () => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB conectado..............");
}

module.exports = conectarDB