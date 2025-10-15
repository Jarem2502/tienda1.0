// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;
// Middlewares
// --Permitir CORS
app.use(cors());
// --Parsear JSON en requests
app.use(bodyParser.json());

const { swaggerDocs } = 
require('./swagger');
swaggerDocs(app);

// Importar rutas
const categoriasRoutes =
require('./routes/categorias');
const productosRoutes =
require('./routes/productos');
const imagenesRoutes =
require('./routes/imagenes');
const authRoutes =
require('./routes/auth');
// Registrar rutas
app.use('/categorias',
categoriasRoutes);
app.use('/productos', productosRoutes);
app.use('/imagenes', imagenesRoutes);
app.use('/auth', authRoutes);
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📘 Documentación disponible en http://localhost:${PORT}/api-docs`);
  });