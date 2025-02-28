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
