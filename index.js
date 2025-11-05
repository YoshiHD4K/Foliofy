const express = require('express');
const path = require('path'); 
const app = express();
const PORT = 3000;

// Sirve archivos estáticos (incluyendo tu CSS compilado en dist y otros archivos de src)
app.use(express.static(path.join(__dirname, 'dist'))); 
app.use(express.static(path.join(__dirname, 'src'))); 

// Ruta raíz que redirige a src/index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Foliofy corriendo en http://localhost:${PORT}/`);
});