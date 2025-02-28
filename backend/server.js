require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Połączenie z MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Połączono z MongoDB"))
    .catch(err => console.error(" Błąd połączenia:", err));

// Importowanie tras
const productRoutes = require('./routes/productRoutes');
const orderHistoryRoutes = require('./routes/orderHistoryRoutes');

// Obsługa endpointów
app.use('/api/products', productRoutes);
app.use('/api/history', orderHistoryRoutes);

app.get('/', (req, res) => {
    res.send('✅ API działa!');
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});
