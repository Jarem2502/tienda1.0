// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// 🔐 Middleware: restringir acceso por IP pública
app.use((req, res, next) => {
  const forwarded = req.headers['x-forwarded-for'];
  const clientIP = forwarded ? forwarded.split(',')[0].trim() : req.connection.remoteAddress;

  const allowedIPs = ['45.232.149.146']; // ✅ Tu IP pública desde Perú

  if (allowedIPs.includes(clientIP)) {
    next();
  } else {
    console.log(`🚫 Acceso denegado desde IP: ${clientIP}`);
    res.status(403).json({ error: "Acceso denegado por IP" });
  }
});

// 🔐 CORS restringido por origen
const allowedOrigins = [
  'https://tienda-frontend-oazu.onrender.com', // tu frontend en Render
  'http://138.186.143.50:5173', // IP pública actual desde Perú
  'http://localhost:5173', // desarrollo local
  'http://127.0.0.1:5173'  // pruebas locales
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`❌ Bloqueado por CORS desde: ${origin}`);
      callback(new Error('No autorizado por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// --Parsear JSON en requests
app.use(bodyParser.json());

// Swagger
const { swaggerDocs } = require('./swagger');
swaggerDocs(app);

// Importar rutas
const categoriasRoutes = require('./routes/categorias');
const productosRoutes = require('./routes/productos');
const imagenesRoutes = require('./routes/imagenes');
const authRoutes = require('./routes/auth');

// Registrar rutas
app.use('/api/categorias', categoriasRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/imagenes', imagenesRoutes);
app.use('/api/auth', authRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📘 Documentación disponible en http://localhost:${PORT}/api-docs`);
});
