// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔐 Página de error personalizada
const errorPage = path.join(__dirname, 'forbidden.html');

// ✅ IP permitida
const allowedIPs = ['45.232.149.146', '::1'];

// 🔒 Middleware: restringir acceso por IP
app.use((req, res, next) => {
  const forwarded = req.headers['x-forwarded-for'];
  const clientIP = forwarded ? forwarded.split(',')[0].trim() : req.connection.remoteAddress;

  if (allowedIPs.includes(clientIP)) {
    next();
  } else {
    res.status(403).sendFile(errorPage);
  }
});

// 🧱 Servir archivos estáticos (tu tienda)
app.use(express.static(__dirname));

// 🔹 Ruta raíz (por si alguien entra directo)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`Frontend corriendo en puerto ${PORT}`);
});
