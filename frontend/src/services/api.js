const API_URL = "http://localhost:5000/api";

export async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            throw new Error("Błąd pobierania produktów");
        }
        return await response.json();
    } catch (error) {
        console.error("Błąd API:", error);
        return [];
    }
}

export async function deleteProduct(productId) {
    try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("Błąd podczas usuwania produktu");
        }

        return true;
    } catch (error) {
        console.error("Błąd API (usuwanie):", error);
        return false;
    }
}

export async function updateProduct(productId, updatedData) {
    try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error("Błąd podczas aktualizacji produktu");
        }

        return await response.json();
    } catch (error) {
        console.error("Błąd API (edycja):", error);
        return null;
    }
}


