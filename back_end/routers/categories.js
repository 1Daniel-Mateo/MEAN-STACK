const Category = require('../models/category');
const express = require('express');
const router = express.Router();

//Metodo de consulta get
router.get(`/`, async (req, res) => {
    try {
        const categoryList = await Category.find();
        if (!categoryList) {
            res.status(400).json({ success: false });
        } else {
            res.send(categoryList);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    });
    category = await category.save();

    if (!category) 
    return res.status(400).send('El registro no se pudo crear');

    res.send(category);
});

module.exports = router;