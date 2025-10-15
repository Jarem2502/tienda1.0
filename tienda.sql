-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-10-2025 a las 21:51:32
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(1, 'Laptops Gamer'),
(2, 'Motos'),
(3, 'Camisetas de Futbol');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes_productos`
--

CREATE TABLE `imagenes_productos` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `producto_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenes_productos`
--

INSERT INTO `imagenes_productos` (`id`, `url`, `producto_id`) VALUES
(1, 'https://www.lacuracao.pe/media/catalog/product/1/5/15-fb3020la-01.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700', 1),
(2, 'https://www.lacuracao.pe/media/catalog/product/1/5/15-fb3020la-02.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700', 1),
(3, 'https://www.lacuracao.pe/media/catalog/product/x/1/x1605va-mb165wr_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700', 2),
(4, 'https://www.lacuracao.pe/media/catalog/product/x/1/x1605va-mb165w_2.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700', 2),
(5, 'https://oechsle.vteximg.com.br/arquivos/ids/15732785-1000-1000/image-4281d3e5ebd4428c8432467a420bfbe2.jpg?v=638280540631970000', 3),
(6, 'https://oechsle.vteximg.com.br/arquivos/ids/15732788-1000-1000/image-e21463443b2444fa87b06dcdc5204dda.jpg?v=638280540657930000', 3),
(7, 'https://royalenfieldperu.com/wp-content/uploads/2024/06/imagen_lateral_atributos_meteor_350.webp', 4),
(8, 'https://bun.somosmoto.pe/images/models/protected/colors/ssenda-gol-125-2026-negro-c5f8ae.png?width=1069', 5),
(9, 'https://bun.somosmoto.pe/images/models/protected/colors/yamaha-yzf-r6-2017-gris-oscuro-mate-45498b.png?width=1069', 6),
(10, 'https://assets.adidas.com/images/w_600,f_auto,q_auto/bb3e148743aa4423bc25ceb575e14bce_faec/Camiseta_de_local_del_Real_Madrid_25-26_Blanco_JJ1931_db01_laydown.jpg', 7),
(11, 'https://sportpalace.es/wp-content/uploads/2024/06/837282ab-scaled.jpeg', 8),
(12, 'https://www.tradeinn.com/f/13992/139927612/adidas-camiseta-de-manga-corta-junior-primera-equipacion-juventus-23-24.webp', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `categoria_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `categoria_id`) VALUES
(1, 'Laptop Gamer HP Victus 15.6\" Windows 11 Home AMD Ryzen 7-7445H 16GB 512GB SSD 15-FB3020LA', 3099.00, 1),
(2, 'Laptop ASUS Vivobook 16 16\" Intel Core i9-13900H 1TB SSD 16GB RAM', 2999.00, 1),
(3, 'Acer Nitro 17 Laptop Gamer AN1741R8N5 17.3pulgadas 165Hz Ryzen 7 7735HS 16GBRAM 1TBSSD RTX 4050 2023', 6485.00, 1),
(4, 'Royal Enfield Meteor 350', 16998.30, 2),
(5, 'Ssenda GOL 125 2026', 4290.00, 2),
(6, 'Yamaha YZF-R6 2018', 62066.00, 2),
(7, 'Camiseta local Real Madrid 2025/2026', 449.00, 3),
(8, 'Camiseta local Manchester United 2024/2025', 174.00, 3),
(9, 'Primera equipación Juventus 2023/2024', 631.99, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'carlos', '81dc9bdb52d04dc20036dbd8313ed055'),
(2, 'admin', '0192023a7bbd73250516f069df18b500'),
(3, 'Jarem', 'e10adc3949ba59abbe56e057f20f883e'),
(4, 'sadsa', 'f1c4f4e9ad854c242ee8a1a8f921859a'),
(5, 'asfasf', '6d27544c07937e4a7fab8123291cc4df');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `imagenes_productos`
--
ALTER TABLE `imagenes_productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `imagenes_productos`
--
ALTER TABLE `imagenes_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `imagenes_productos`
--
ALTER TABLE `imagenes_productos`
  ADD CONSTRAINT `imagenes_productos_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
