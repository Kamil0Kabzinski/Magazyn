const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    category: { type: String },
    lowStockThreshold: { type: Number, default: 5 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
