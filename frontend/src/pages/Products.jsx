import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct } from '../services/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        quantity: '',
        price: '',
        category: ''
    });

    useEffect(() => {
        async function loadProducts() {
            const data = await fetchProducts();
            setProducts(data);
        }
        loadProducts();
    }, []);

    const handleChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });

        if (response.ok) {
            const addedProduct = await response.json();
            setProducts([...products, addedProduct]);
            setNewProduct({ name: '', description: '', quantity: '', price: '', category: '' });
        } else {
            console.error('Błąd dodawania produktu');
        }
    };

    const handleDelete = async (productId) => {
        const success = await deleteProduct(productId);
        if (success) {
            setProducts(products.filter(product => product._id !== productId));
        }
    };

    return (
        <div>
            <h2>📦 Produkty</h2>

            {/* Formularz dodawania produktu */}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nazwa" value={newProduct.name} onChange={handleChange} required />
                <input type="text" name="description" placeholder="Opis" value={newProduct.description} onChange={handleChange} />
                <input type="number" name="quantity" placeholder="Ilość" value={newProduct.quantity} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Cena" value={newProduct.price} onChange={handleChange} required />
                <input type="text" name="category" placeholder="Kategoria" value={newProduct.category} onChange={handleChange} />
                <button type="submit">Dodaj produkt</button>
            </form>

            {/* Lista produktów */}
            <ul>
                {products.length === 0 ? (
                    <p>Brak produktów w magazynie</p>
                ) : (
                    products.map(product => (
                        <li key={product._id}>
                            {product.name} - {product.quantity} szt. - {product.price} PLN
                            <button onClick={() => handleDelete(product._id)}>❌ Usuń</button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Products;
