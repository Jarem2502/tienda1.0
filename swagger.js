// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Express MySQL CRUD',
      version: '1.0.0',
      description: 'Documentación de mi API creada con Express, MySQL y JWT',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./routes/*.js'], // 👈 aquí Swagger buscará los comentarios
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📄 Documentación Swagger disponible en /api-docs');
}

// 👇 ESTA LÍNEA ES CLAVE
module.exports = { swaggerDocs };
