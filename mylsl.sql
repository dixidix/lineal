-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-12-2015 a las 04:11:43
-- Versión del servidor: 5.6.25
-- Versión de PHP: 5.6.11

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

CREATE TABLE IF NOT EXISTS `client` (
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `client`
--

INSERT INTO `client` (`clientId`, `name_desc`, `username`, `address`, `manager`, `tel`, `fax`, `web`, `clientLogoPath`, `cuit`) VALUES
(1, 'esco s.a', 'escosa', 'tabanera 3385', 1, '4294555', '14654156', 'www.google.com', 'public/client/logo/logo.jpg', '1012311231'),
(2, 'cisco srl', 'ciscosrl', 'cadetes chilenos 173', NULL, '153013907', '42374541', 'www.ciscosrl.com.ar', 'public/cisco/logo/cisco.png', '123456789');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client_email`
--

CREATE TABLE IF NOT EXISTS `client_email` (
  `emailId` int(10) NOT NULL,
  `clientId` int(10) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `document`
--

CREATE TABLE IF NOT EXISTS `document` (
  `documentId` int(10) NOT NULL,
  `clientId` int(10) NOT NULL,
  `ref_lsl` int(15) NOT NULL,
  `document_path` varchar(100) NOT NULL,
  `document_ext` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operation`
--

CREATE TABLE IF NOT EXISTS `operation` (
  `ref_lsl` int(10) NOT NULL,
  `ref_client` varchar(45) NOT NULL,
  `merchandise` varchar(45) NOT NULL,
  `transport` varchar(45) DEFAULT NULL,
  `shipment` varchar(45) DEFAULT NULL,
  `shipment_origin` date DEFAULT NULL,
  `estimated_arrival` date DEFAULT NULL,
  `custom_document` varchar(45) DEFAULT NULL,
  `custom_document_djai` varchar(45) DEFAULT NULL,
  `arrival_date` date DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `lsl_bill` varchar(45) DEFAULT NULL,
  `clientId` int(10) NOT NULL,
  `operationTypeId` int(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `operation`
--

INSERT INTO `operation` (`ref_lsl`, `ref_client`, `merchandise`, `transport`, `shipment`, `shipment_origin`, `estimated_arrival`, `custom_document`, `custom_document_djai`, `arrival_date`, `release_date`, `lsl_bill`, `clientId`, `operationTypeId`) VALUES
(1, 'OC SCHMIDT-91', 'Actuador Neumatico', 'Avion', NULL, '2015-06-10', '2015-06-13', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-13', '2015-06-17', '0001-00002527', 1, 2),
(2, 'OM-100', 'Caudalimetros', NULL, '2015-06-17', NULL, NULL, '15 073 IC04 097571 X', NULL, NULL, NULL, '0001-00002524', 2, 1),
(4, 'OC SCHMIDT-92', 'Actuador Neumatico', 'Avion', NULL, '2015-06-10', '2015-06-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-13', '2015-06-13', '0001-00002527', 1, 2),
(5, 'OC SCHMIDT-93', 'Actuador Neumatico', 'Avion', NULL, '2015-06-10', '2015-06-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-13', '2015-06-13', '0001-00002527', 1, 2),
(6, 'OC SCHMIDT-95', 'Actuador Neumatico', 'Avion', NULL, '2015-06-10', '2015-06-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-13', '2015-06-13', '0001-00002527', 1, 2),
(7, 'OC SCHMIDT-94', 'Actuador Neumatico', 'Avion', NULL, '2015-06-10', '2015-06-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-13', '2015-06-13', '0001-00002527', 1, 2),
(8, 'OC SCHMIDT-96', 'Actuador Neumatico', 'Avion', NULL, '2015-06-10', '2015-06-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-13', '2015-06-13', '0001-00002527', 1, 2),
(9, 'OC SCHMIDT-97', 'Actuador Neumatico', 'Avion', NULL, '2015-06-10', '2015-06-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-13', '2015-06-13', '0001-00002527', 1, 2),
(10, 'OC SCHMIDT-98', 'Actuador Neumatico', 'Avion', NULL, '2015-06-10', '2015-06-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-13', '2015-06-13', '0001-00002527', 1, 2),
(16, 'OB SCHMIDT-91', 'Actuador', 'Avion', NULL, '2015-06-12', '2015-06-12', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-12', '2015-06-12', '0001-00002527', 2, 2),
(17, 'ON-200', 'Caudal', NULL, '2015-06-17', NULL, NULL, '15 073 IC04 097571 X', NULL, NULL, NULL, '0001-00002524', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operation_type`
--

CREATE TABLE IF NOT EXISTS `operation_type` (
  `operationTypeId` int(1) NOT NULL,
  `operation_desc` varchar(45) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `operation_type`
--

INSERT INTO `operation_type` (`operationTypeId`, `operation_desc`) VALUES
(1, 'exportacion'),
(2, 'importacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `userId` int(10) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `name` varchar(65) NOT NULL,
  `surname` varchar(65) NOT NULL,
  `role` varchar(100) NOT NULL,
  `tel` varchar(45) NOT NULL,
  `active` int(1) NOT NULL,
  `clientId` int(10) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`userId`, `username`, `password`, `name`, `surname`, `role`, `tel`, `active`, `clientId`) VALUES
(1, 'nicolas.sigal@escosa.com', '123456', 'nicolas', 'sigal', '1,2,3,4', '4294555', 1, 1),
(2, 'joybelmonte@cisco.com', 'jowi', 'johanna', 'belmonte', '4', '4378622', 1, 2);

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
-- Indices de la tabla `client_email`
--
ALTER TABLE `client_email`
  ADD PRIMARY KEY (`emailId`);

--
-- Indices de la tabla `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`documentId`);

--
-- Indices de la tabla `operation`
--
ALTER TABLE `operation`
  ADD PRIMARY KEY (`ref_lsl`),
  ADD UNIQUE KEY `operationId` (`ref_client`);

--
-- Indices de la tabla `operation_type`
--
ALTER TABLE `operation_type`
  ADD PRIMARY KEY (`operationTypeId`);

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
  MODIFY `clientId` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `document`
--
ALTER TABLE `document`
  MODIFY `documentId` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `operation`
--
ALTER TABLE `operation`
  MODIFY `ref_lsl` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT de la tabla `operation_type`
--
ALTER TABLE `operation_type`
  MODIFY `operationTypeId` int(1) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
