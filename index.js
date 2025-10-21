// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Permitir CORS (desde tu frontend de Render)
app.use(cors({
  origin: [
    'https://tienda-frontend-oazu.onrender.com', // tu frontend en Render
    'http://localhost:5500' // útil si pruebas localmente con Live Server
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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
