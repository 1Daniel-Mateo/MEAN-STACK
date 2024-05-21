const mongoose = require('mongoose')

//funcion de conexion

const conectarDB = async() => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('MongoDB conectado.......😁:'.bgBlack.green.inverse)
}

module.exports = conectarDB