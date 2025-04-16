const express = require('express');
const app = express();
const PORT = 3001;

// Dados mockados (simulando um banco de dados)
const weatherData = {
    "SãoPaulo": { city: "São Paulo", temp: 25, unit: "Celsius" },
    "RioDeJaneiro": { city: "Rio de Janeiro", temp: 32, unit: "Celsius" },
    "PortoAlegre": { city: "Porto Alegre", temp: 12, unit: "Celsius" }
};

// Endpoint GET /weather/{city}
app.get('/weather/:city', (req, res) => {
    const city = req.params.city;
    const data = weatherData[city];

    if (data) {
        res.json(data);
    } else {
        res.status(404).json({ error: "Cidade não encontrada" });
    }
});

app.listen(PORT, () => {
    console.log(`API B (Clima) rodando em http://localhost:${PORT}`);
});