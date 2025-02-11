const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Servir las carpetas 'images' y 'models' como estáticas
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/models", express.static(path.join(__dirname, "models")));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
