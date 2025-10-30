// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Permitir CORS (desde tu frontend en Render y local)
app.use(cors({
  origin: [
    'https://tienda-frontend-oazu.onrender.com',
    'http://localhost:5500'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 🔐 Restricción por IP
app.use((req, res, next) => {
  const forwarded = req.headers['x-forwarded-for'];
  const clientIP = forwarded ? forwarded.split(',')[0].trim() : req.socket.remoteAddress;
  
  // Lista de IPs permitidas
  const allowedIPs = ['45.232.149.146', '45.232.149.130']; // Agrega aquí todas las IPs permitidas

  if (allowedIPs.includes(clientIP)) {
    next();
  } else {
    res.status(403).json({ error: 'Acceso denegado: IP no autorizada' });
  }
});

// 🔹 Parsear JSON
app.use(bodyParser.json());

// 🔹 Swagger
const { swaggerDocs } = require('./swagger');
swaggerDocs(app);

// 🔹 Importar rutas
const categoriasRoutes = require('./routes/categorias');
const productosRoutes = require('./routes/productos');
const imagenesRoutes = require('./routes/imagenes');
const authRoutes = require('./routes/auth');

// 🔹 Registrar rutas
app.use('/api/categorias', categoriasRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/imagenes', imagenesRoutes);
app.use('/api/auth', authRoutes);

// 🔹 Endpoint raíz
app.get('/', (req, res) => {
  res.send('✅ API de Tienda funcionando correctamente.');
});

// 🔹 Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`📘 Swagger disponible en /api-docs`);
});
