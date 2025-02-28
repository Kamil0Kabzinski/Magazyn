import React, { useState, useEffect } from 'react';
import { fetchHistory } from '../services/api';

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        async function loadHistory() {
            const data = await fetchHistory();
            setHistory(data);
        }
        loadHistory();
    }, []);

    // Tłumaczenie nazw pól
    const translateKey = (key) => {
        const translations = {
            name: "Nazwa",
            description: "Opis",
            quantity: "Ilość",
            price: "Cena",
            category: "Kategoria",
            lowStockThreshold: "Próg niskiego stanu"
        };
        return translations[key] || key;
    };

    // Formatowanie danych, aby nie wyświetlać zbędnych informacji
    const formatData = (data) => {
        if (!data) return "Brak danych";

        // Usunięcie zbędnych pól bazy danych
        const { _id, __v, createdAt, ...filteredData } = data;

        return Object.entries(filteredData).map(([key, value]) => (
            <p key={key}><strong>{translateKey(key)}:</strong> {value}</p>
        ));
    };

    return (
        <div>
            <h2>📜 Historia zmian</h2>
            <ul>
                {history.length === 0 ? (
                    <p>Brak historii zmian</p>
                ) : (
                    history.map((entry) => (
                        <li key={entry._id}>
                            <strong>{entry.action === "Dodanie" ? "🆕 Dodano" : entry.action === "Edycja" ? "✏ Edytowano" : "❌ Usunięto"}</strong> -
                            {entry.newData?.name || entry.previousData?.name || 'Nieznany produkt'} <br />
                            <small>{new Date(entry.timestamp).toLocaleString()}</small> <br />

                            {entry.action === "Dodanie" && (
                                <>
                                    <p><strong>Dodano produkt:</strong></p>
                                    {formatData(entry.newData)}
                                </>
                            )}

                            {entry.action === "Edycja" && (
                                <>
                                    <p><strong>Przed zmianą:</strong></p>
                                    {formatData(entry.previousData)}
                                    <p><strong>Po zmianie:</strong></p>
                                    {formatData(entry.newData)}
                                </>
                            )}

                            {entry.action === "Usunięcie" && (
                                <>
                                    <p><strong>Usunięty produkt:</strong></p>
                                    {formatData(entry.previousData)}
                                </>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default History;
