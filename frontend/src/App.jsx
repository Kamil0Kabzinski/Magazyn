import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">🏠 Home</Link></li>
                    <li><Link to="/products">📦 Produkty</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </Router>
    );
}

export default App;
