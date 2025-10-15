const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Endpoints para gestionar productos
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.id, p.nombre, p.precio, c.nombre AS categoria
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', verifyToken, async (req, res) => {
  const { nombre, precio, categoria_id } = req.body;
  if (!nombre || !precio || !categoria_id) {
    return res.status(400).json({ error: "Faltan datos" });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO productos (nombre, precio, categoria_id) VALUES (?, ?, ?)',
      [nombre, precio, categoria_id]
    );
    res.json({ id: result.insertId, nombre, precio, categoria_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, categoria_id } = req.body;
  try {
    await db.query(
      'UPDATE productos SET nombre = ?, precio = ?, categoria_id = ? WHERE id = ?',
      [nombre, precio, categoria_id, id]
    );
    res.json({ id, nombre, precio, categoria_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM productos WHERE id = ?', [id]);
    res.json({ mensaje: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
