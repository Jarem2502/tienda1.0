// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 🧱 Middleware: restringir por IP
app.use((req, res, next) => {
  const forwarded = req.headers['x-forwarded-for'];
  const clientIP = forwarded ? forwarded.split(',')[0].trim() : req.connection.remoteAddress;

  const allowedIPs = ['45.232.149.146', '::1']; // tu IP y localhost

  if (allowedIPs.includes(clientIP)) {
    next();
  } else {
    res.status(403).sendFile(path.join(__dirname, 'forbidden.html'));
  }
});

// 🌍 CORS (solo tu frontend en Render o localhost)
app.use(cors({
  origin: [
    'https://tienda-frontend-oazu.onrender.com',
    'http://localhost:5500'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 🧩 Parsear JSON
app.use(bodyParser.json());

// 📘 Swagger
const { swaggerDocs } = require('./swagger');
swaggerDocs(app);

// 🛠️ Rutas
const categoriasRoutes = require('./routes/categorias');
const productosRoutes = require('./routes/productos');
const imagenesRoutes = require('./routes/imagenes');
const authRoutes = require('./routes/auth');

app.use('/api/categorias', categoriasRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/imagenes', imagenesRoutes);
app.use('/api/auth', authRoutes);

// 🔹 Ruta raíz
app.get('/', (req, res) => {
  res.send('✅ API de Tienda funcionando correctamente.');
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`📘 Swagger disponible en /api-docs`);
});
