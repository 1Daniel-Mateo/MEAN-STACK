//Importacion de modulo mongoose
const mongoose = require('mongoose');

//Generación de modelo esquema
const productShema = mongoose.Schema({
    //Definición de campos
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    richDescription:{
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String
    }],
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
    },
    //Campo donde hacemos la coneccion con la colección categoria
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    //Campo donde guardamos el numero de producto que hay en stock
    countInStock:{
        type: Number,
        min: 0,
        max: 255
    },
    rating: {
        type: Number,
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    /**Campo donde guardamos la fecha de creación del producto */
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

// Creando el modelo de productos a partir del esquema de productos
const Product = mongoose.model('Product', productShema);
// Exportación de modulo de productos
module.exports = Product