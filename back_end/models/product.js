const mongoose = require('mongoose');

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
module.exports = Product