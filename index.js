const express = require('express');
const path = require('path'); 
const app = express();
// const PORT = 3000; // Ya no es necesario para Vercel

// Sirve archivos estáticos (incluyendo tu CSS compilado en dist y otros archivos de src)
// Asegúrate de que 'dist' contenga tus activos compilados y 'src' tu HTML principal.
app.use(express.static(path.join(__dirname, 'dist'))); 
app.use(express.static(path.join(__dirname, 'src'))); 

// Ruta raíz que redirige a src/index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// **ESTE ES EL CAMBIO CLAVE para Vercel:**
// Exporta la aplicación para que Vercel la ejecute como una Serverless Function.
module.exports = app;

// (Opcional: Si quieres seguir probando localmente, puedes mantener app.listen()
// pero asegúrate de que NO se ejecute cuando Vercel haga el build. Es más simple
// eliminarlo o usar una variable de entorno.)