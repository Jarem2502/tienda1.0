// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ IP autorizada
const ALLOWED_IP = '169.197.142.119';

// ✅ Permitir solo tu frontend, localhost y verificar IP real del cliente
app.use(cors({
  origin: [
    'https://tienda-frontend-oazu.onrender.com', // tu frontend
    'http://localhost:5500' // pruebas locales
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// 🧱 Middleware de seguridad por IP real
app.use((req, res, next) => {
  // Render y proxies pueden alterar IP, por eso se usa x-forwarded-for
  const clientIp =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.connection.remoteAddress;

  console.log('🔍 IP detectada:', clientIp);

  // Comparar con tu IP autorizada
  if (clientIp === ALLOWED_IP || clientIp === '::1') {
    return next();
  } else {
    console.log(`🚫 Acceso bloqueado desde ${clientIp}`);
    return res.status(403).json({ error: 'Acceso no autorizado desde esta IP' });
  }
});

// Swagger
const { swaggerDocs } = require('./swagger');
swaggerDocs(app);

// Rutas
const categoriasRoutes = require('./routes/categorias');
const productosRoutes = require('./routes/productos');
const imagenesRoutes = require('./routes/imagenes');
const authRoutes = require('./routes/auth');

app.use('/api/categorias', categoriasRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/imagenes', imagenesRoutes);
app.use('/api/auth', authRoutes);

// Endpoint raíz
app.get('/', (req, res) => {
  res.send('✅ API de Tienda funcionando correctamente (acceso por IP autorizado).');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`📘 Swagger disponible en /api-docs`);
});
