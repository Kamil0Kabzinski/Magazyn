﻿import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct, updateProduct } from '../services/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        quantity: '',
        price: '',
        category: '',
        lowStockThreshold: 5
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

    const handleEditChange = (e) => {
        setEditProduct({
            ...editProduct,
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
            setNewProduct({ name: '', description: '', quantity: '', price: '', category: '', lowStockThreshold: 5 });
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

    const handleEdit = (product) => {
        setEditProduct(product);
    };

    const handleUpdate = async () => {
        const updatedProduct = await updateProduct(editProduct._id, editProduct);
        if (updatedProduct) {
            setProducts(products.map(p => (p._id === updatedProduct._id ? updatedProduct : p)));
            setEditProduct(null);
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
                <input type="number" name="lowStockThreshold" placeholder="Próg niskiego stanu" value={newProduct.lowStockThreshold} onChange={handleChange} />
                <button type="submit">Dodaj produkt</button>
            </form>

            {/* Formularz edycji produktu */}
            {editProduct && (
                <div>
                    <h3>✏ Edytuj produkt</h3>
                    <input type="text" name="name" value={editProduct.name} onChange={handleEditChange} />
                    <input type="text" name="description" value={editProduct.description} onChange={handleEditChange} />
                    <input type="number" name="quantity" value={editProduct.quantity} onChange={handleEditChange} />
                    <input type="number" name="price" value={editProduct.price} onChange={handleEditChange} />
                    <input type="text" name="category" value={editProduct.category} onChange={handleEditChange} />
                    <input type="number" name="lowStockThreshold" value={editProduct.lowStockThreshold} onChange={handleEditChange} />
                    <button onClick={handleUpdate}>Zapisz</button>
                    <button onClick={() => setEditProduct(null)}>Anuluj</button>
                </div>
            )}

            {/* Lista produktów */}
            <ul>
                {products.length === 0 ? (
                    <p>Brak produktów w magazynie</p>
                ) : (
                    products.map(product => (
                        <li key={product._id} style={{ color: product.quantity <= product.lowStockThreshold ? 'red' : 'black' }}>
                            {product.name} - {product.quantity} szt. - {product.price} PLN
                            {product.quantity <= product.lowStockThreshold && <span> ⚠ Niski stan!</span>}
                            <button onClick={() => handleEdit(product)}>✏ Edytuj</button>
                            <button onClick={() => handleDelete(product._id)}>❌ Usuń</button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Products;
