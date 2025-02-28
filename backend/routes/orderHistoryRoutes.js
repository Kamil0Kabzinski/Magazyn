const express = require('express');
const router = express.Router();
const OrderHistory = require('../models/OrderHistory');

router.get('/', async (req, res) => {
    try {
        const history = await OrderHistory.find().sort({ timestamp: -1 }).populate('productId');
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
