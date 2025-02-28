const mongoose = require('mongoose');

const OrderHistorySchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false },
    action: { type: String, enum: ['Dodanie', 'Edycja', 'Usunięcie'], required: true },
    previousData: { type: Object, default: {} },
    newData: { type: Object, default: {} },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OrderHistory', OrderHistorySchema);
