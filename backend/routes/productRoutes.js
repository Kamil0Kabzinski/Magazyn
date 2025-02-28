const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const OrderHistory = require('../models/OrderHistory');


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
        category: req.body.category,
        lowStockThreshold: req.body.lowStockThreshold || 5
    });

    try {
        const newProduct = await product.save();

        // Zapisujemy pełne dane do historii
        await OrderHistory.create({
            productId: newProduct._id,
            action: 'Dodanie',
            newData: newProduct.toObject()
        });

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
        const previousProduct = await Product.findById(req.params.id);
        if (!previousProduct) {
            return res.status(404).json({ message: 'Produkt nie znaleziony' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Zapisujemy do historii
        await OrderHistory.create({
            productId: updatedProduct._id,
            action: 'Edycja',
            previousData: previousProduct.toObject(),
            newData: updatedProduct.toObject()
        });

        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// 🔹 Usuń produkt
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findById(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Produkt nie znaleziony' });
        }

        await deletedProduct.deleteOne();

        // Zapisujemy usunięcie do historii
        await OrderHistory.create({
            action: 'Usunięcie',
            previousData: deletedProduct.toObject()
        });

        res.json({ message: 'Produkt usunięty' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;
