// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');
const { SECRET_KEY } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para registro y login de usuarios
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Crea un nuevo usuario en la base de datos con su contraseña cifrada en MD5.
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: jarem
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Datos incompletos o usuario ya existe
 *       500:
 *         description: Error en el servidor
 */
router.post('/register', async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña requeridos' });
  }

  try {
    // Insertar nuevo usuario con contraseña en MD5
    await db.query(
      'INSERT INTO usuarios (usuario, password) VALUES (?, MD5(?))',
      [usuario, password]
    );

    res.json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'El usuario ya existe' });
    } else {
      res.status(500).json({ message: 'Error al registrar usuario' });
    }
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     description: Verifica las credenciales y devuelve un token JWT si son correctas.
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: jarem
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error en el servidor
 */
router.post('/login', async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const [rows] = await db.query(
      'SELECT id, usuario FROM usuarios WHERE usuario = ? AND password = MD5(?)',
      [usuario, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const user = rows[0];
    const token = jwt.sign(
      { id: user.id, usuario: user.usuario },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
