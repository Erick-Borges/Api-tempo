const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Endpoint GET /recommendation/{city}
app.get('/recommendation/:city', async (req, res) => {
    try {
        const city = req.params.city;
        
        // Consulta a API B
        const response = await axios.get(`http://localhost:3001/weather/${city}`);
        const { city: cityName, temp } = response.data;

        // Gera a recomendação
        let recommendation;
        if (temp > 30) {
            recommendation = "Hidrate-se e use protetor solar! Está quente!";
        } else if (temp >= 15 && temp <= 30) {
            recommendation = "Clima agradável. Aproveite!";
        } else {
            recommendation = "Está frio! Leve um casaco.";
        }

        // Resposta final
        res.json({
            city: cityName,
            temperature: temp,
            unit: "Celsius",
            recommendation
        });

    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: "Cidade não encontrada" });
        } else {
            res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
});

app.listen(PORT, () => {
    console.log(`API A (Recomendações) rodando em http://localhost:${PORT}`);
});