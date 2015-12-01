-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-12-2015 a las 21:15:10
-- Versión del servidor: 10.1.8-MariaDB
-- Versión de PHP: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mylsl`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client`
--

CREATE TABLE `client` (
  `clientId` int(10) NOT NULL,
  `name_desc` varchar(65) NOT NULL,
  `username` varchar(65) NOT NULL,
  `address` varchar(100) NOT NULL,
  `manager` int(10) DEFAULT NULL,
  `tel` varchar(65) NOT NULL,
  `fax` varchar(65) NOT NULL,
  `web` varchar(150) NOT NULL,
  `clientLogoPath` varchar(150) NOT NULL,
  `cuit` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `client`
--

INSERT INTO `client` (`clientId`, `name_desc`, `username`, `address`, `manager`, `tel`, `fax`, `web`, `clientLogoPath`, `cuit`) VALUES
(1, 'esco s.a', 'escosa', 'tabanera 3385', 1, '4294555', '14654156', 'www.google.com', 'public/client/logo/logo.jpg', '1012311231'),
(2, 'cisco srl', 'ciscosrl', 'cadetes chilenos 173', NULL, '153013907', '42374541', 'www.ciscosrl.com.ar', 'public/cisco/logo/cisco.png', '123456789');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `userId` int(10) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `name` varchar(65) NOT NULL,
  `surname` varchar(65) NOT NULL,
  `role` varchar(100) NOT NULL,
  `tel` varchar(45) NOT NULL,
  `clientId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`userId`, `username`, `password`, `name`, `surname`, `role`, `tel`, `clientId`) VALUES
(1, 'nicolas.sigal@escosa.com', '123456', 'nicolas', 'sigal', '1,2,3,4', '4294555', 1),
(2, 'joybelmonte@cisco.com', 'jowi', 'johanna', 'belmonte', '4', '4378622', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`clientId`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `client`
--
ALTER TABLE `client`
  MODIFY `clientId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
