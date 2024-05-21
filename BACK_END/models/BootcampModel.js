const mongoose = require("mongoose");

//MODELOS CON LIBRERIAS
//MODELO SOLO PARA MONGO
//los modelos se llaman esquemas que son plantillas
// mongoose.shema es para crear esquemas de la crud

const bootcampShema = new mongoose.Schema({
  name: {
    //se extiende el atributo
    type: String,
    unique: true,
    required: [true, "se rquiere nombre de bootcamp"],
    maxlength: [20, "el nombre no puede ser superior a 20 caracteres"],
  },
  phone: {
    type: Number,
    required: [true, "se requiere numero de telefono"],
    maxlength: [999999999, "el telefono no puede ser superior a 10 caracteres"],
  },
  address: {
    type: String,
    required: [true, "la direccion es requeridad"],
  },
  topics: {
    type: [String],
    enum: ["AI", "Backend", "Frontend", "Devops"],
  },
  averageRating: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Bootcamp = mongoose.model("Bootcamp", bootcampShema);
module.exports = Bootcamp;