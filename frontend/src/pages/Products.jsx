import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const data = await fetchProducts();
            console.log("Pobrane dane:", data); // 👀 Sprawdź, co zwraca API
            setProducts(data);
        }
        loadProducts();
    }, []);

    return (
        <div>
            <h2>Produkty</h2>
            <ul>
                {products.length === 0 ? (
                    <p>Brak produktów w magazynie</p>
                ) : (
                    products.map(product => (
                        <li key={product._id}>
                            {product.name} - {product.quantity} szt. - {product.price} PLN
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Products;
