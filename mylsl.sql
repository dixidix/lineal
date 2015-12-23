-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-12-2015 a las 21:48:21
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
  `manager` varchar(65) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
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
(1, 'esco s.a', 'escosa', 'tabanera 3385', 'Nicolas Sigal', '4294555', '14654156', 'www.google.com', 'logos/jas.jpg', '1012311231'),
(2, 'cisco srl', 'ciscosrl', 'cadetes chilenos 173', 'Martin Martinez', '153013907', '42374541', 'www.ciscosrl.com.ar', 'logos/cisco.jpg', '123456789'),
(3, 'Lineal Soluciones', 'linealsrl', 'calle falsa 123', 'Paula Rojas', '158459789', '123118015', 'www.linealsoluciones.com', 'logos/lineal.jpg', '54362181');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client_email`
--

CREATE TABLE `client_email` (
  `emailId` int(10) NOT NULL,
  `clientId` int(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `client_email`
--

INSERT INTO `client_email` (`emailId`, `clientId`, `email`, `name`, `lastname`) VALUES
(1, 1, 'nicolas.sigal@gmail.com', 'Nicolas', 'Sigal'),
(2, 1, 'nicolas@sigal.com', 'Pepe', 'Suarez'),
(3, 1, 'joys@sigal.com', 'Johanna', 'Robbinson'),
(4, 2, 'paul@martinez.com', 'Paula', 'Martinez'),
(5, 2, 'p.martinezsa@martinez.com', 'Paola', 'Manzalba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `document`
--

CREATE TABLE `document` (
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

CREATE TABLE `operation` (
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `operation`
--

INSERT INTO `operation` (`ref_lsl`, `ref_client`, `merchandise`, `transport`, `shipment`, `shipment_origin`, `estimated_arrival`, `custom_document`, `custom_document_djai`, `arrival_date`, `release_date`, `lsl_bill`, `clientId`, `operationTypeId`) VALUES
(1, 'OC SCHMIDT-91', 'Actuador editado', 'Avion', NULL, '2015-10-06', '2015-08-12', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-08-12', '2015-08-12', '0001-00002527', 1, 2),
(2, 'OM-100', 'Caudalimetros', NULL, '2015-06-17', NULL, NULL, '15 073 IC04 097571 X', NULL, NULL, NULL, '0001-00002524', 2, 1),
(4, 'OC SCHMIDT-92', 'Actuador Neumatico2', 'Avion', NULL, '2015-10-06', '2015-10-06', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '1970-01-01', '1970-01-01', '0001-00002527', 1, 2),
(5, 'OC SCHMIDT-93', 'Actuador Neumatico3', 'Avion', NULL, '2015-10-06', '2015-10-06', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '1970-01-01', '1970-01-01', '0001-00002527', 1, 2),
(6, 'OC SCHMIDT-95', 'Actuador Neumatico', 'Avion', NULL, '2015-06-10', '2015-06-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-13', '2015-06-13', '0001-00002527', 1, 2),
(7, 'OC SCHMIDT-94', 'Actuador Neumatico', 'Avion', NULL, '2015-06-10', '2015-06-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-13', '2015-06-13', '0001-00002527', 1, 2),
(8, 'OC SCHMIDT-96', 'Actuador Neumatico', 'Avion', NULL, '2015-06-10', '2015-06-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-13', '2015-06-13', '0001-00002527', 1, 2),
(9, 'OC SCHMIDT-97', 'Actuador Neumatico', 'Avion', NULL, '2015-06-10', '2015-06-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-13', '2015-06-13', '0001-00002527', 1, 2),
(10, 'OC SCHMIDT-98', 'Actuador Neumatico', 'Avion', NULL, '2015-06-10', '2015-06-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-13', '2015-06-13', '0001-00002527', 1, 2),
(16, 'OB SCHMIDT-91', 'Actuador', 'Avion', NULL, '2015-06-12', '2015-06-12', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-12', '2015-06-12', '0001-00002527', 2, 2),
(17, 'ON-2002', 'Caudal', NULL, '2015-12-09', NULL, NULL, '15 073 IC04 097571 X', NULL, NULL, NULL, '0001-00002524', 1, 1),
(18, 'OC SCHMIDT-198', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2),
(19, 'OC SCHMIDT-199', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2),
(36, 'OC SCHMIDT-215', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2),
(37, 'OC SCHMIDT-200', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2),
(38, 'OC SCHMIDT-201', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2),
(39, 'OC SCHMIDT-202', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2),
(40, 'OC SCHMIDT-203', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2),
(41, 'OC SCHMIDT-204', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2),
(42, 'OC SCHMIDT-205', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2),
(43, 'OC SCHMIDT-206', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2),
(44, 'OC SCHMIDT-207', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2),
(45, 'OC SCHMIDT-208', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2),
(46, 'OC SCHMIDT-209', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2),
(47, 'OC SCHMIDT-210', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2),
(48, 'OC SCHMIDT-211', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2),
(49, 'OC SCHMIDT-212', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2),
(50, 'OC SCHMIDT-213', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2),
(51, 'OC SCHMIDT-214', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2),
(52, 'test_ref_client', 'test_merchandise', 'test_transport', NULL, '2015-12-08', '2015-12-08', 'test_doc', 'test_djai', '2015-12-08', '2015-12-08', 'test_bill', 1, 2),
(53, 'test2_ref_cliente', 'test2_mercha', 'test2_transporte', NULL, '2015-12-08', '2015-12-08', 'test2_doc', 'test2_doc_djai', '2015-12-08', '2015-12-08', 'test2_factura', 1, 2),
(54, 'test_dp_ref_cliente', 'test_dp_merch4', 'test_dp_transp', NULL, '2015-12-09', '2015-12-09', 'test_dp_doc', 'test_dp_docdjai', '2015-12-09', '2015-12-09', 'test_dp_factura', 1, 2),
(55, 'test1234', 'test123', 'test123', NULL, '2015-12-09', '2015-12-09', 'test123', 'test123', '2015-12-09', '2015-12-09', 'test123', 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operation_type`
--

CREATE TABLE `operation_type` (
  `operationTypeId` int(1) NOT NULL,
  `operation_desc` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

CREATE TABLE `users` (
  `userId` int(10) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(64) NOT NULL,
  `name` varchar(65) NOT NULL,
  `surname` varchar(65) NOT NULL,
  `role` varchar(100) NOT NULL,
  `tel` varchar(45) NOT NULL,
  `active` int(1) NOT NULL,
  `clientId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`userId`, `username`, `password`, `name`, `surname`, `role`, `tel`, `active`, `clientId`) VALUES
(1, 'nicolas.sigal@escosa.com', '123456', 'Nicolas', 'Sigal', '1, 2, 3, 4, 5', '4294555', 0, 1),
(2, 'joybelmonte@cisco.com', 'jowi', 'Johanna', 'Belmonte', '1, 2, 3, 4', '4378622', 0, 2),
(3, 'admin', 'admin', 'Nicolas', 'Sigal', '6', '153013907', 1, 3),
(5, 'juan@berdugo.com', '93c1e7bd5aed2371699f26ecd2088bc271ef10d140e7240f2dd1f16e78e82652', 'Juan', 'Berdugo', '1, 2', '132456', 0, 1);

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
  MODIFY `clientId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `client_email`
--
ALTER TABLE `client_email`
  MODIFY `emailId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `document`
--
ALTER TABLE `document`
  MODIFY `documentId` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `operation`
--
ALTER TABLE `operation`
  MODIFY `ref_lsl` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
--
-- AUTO_INCREMENT de la tabla `operation_type`
--
ALTER TABLE `operation_type`
  MODIFY `operationTypeId` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
