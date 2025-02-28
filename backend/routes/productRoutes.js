const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 🔹 Pobierz wszystkie produkty
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 🔹 Dodaj nowy produkt
router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        category: req.body.category
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 🔹 Pobierz jeden produkt
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produkt nie znaleziony' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 🔹 Edytuj produkt
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 🔹 Usuń produkt
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Produkt usunięty' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
