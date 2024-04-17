const mongoose = require('mongoose');

//conecion con la base de datos
const conectarDB = async () => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB conectado..............");
}

module.exports = conectarDB