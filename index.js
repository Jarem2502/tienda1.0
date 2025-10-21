// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Lista de orígenes permitidos (tu IP, tu frontend y local)
const allowedOrigins = [
  'http://169.197.142.119', // ✅ Tu IP pública actual
  'https://tienda-frontend-oazu.onrender.com', // ✅ Tu frontend desplegado
  'http://localhost:5500' // ✅ Para pruebas locales con Live Server
];

// 🔹 Configurar CORS dinámico
app.use(cors({
  origin: function (origin, callback) {
    // Permitir Postman o peticiones sin origen (como curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`🚫 CORS bloqueado: intento desde ${origin}`);
      callback(new Error('No autorizado por CORS'));
    }
  },
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
