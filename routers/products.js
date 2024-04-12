const express = require('express');
const router = express.Router();

// Definir la ruta raíz de la aplicación, que devuelve un mensaje
// al usuario cuando accede al sitio web

//Metodo de consulta get
router.get(`${api}/products`, async (req, res) => {
    const productList = await Product.find();

    if (!productList) {
        res.status(500).json({ success: false })
    } else {
        res.send(productList);
    }
})

//metodo de ingreso de datos
router.post(`${api}/products`, (req, res) => {

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

module.exports = router;