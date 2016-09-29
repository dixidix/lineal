-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-12-2015 a las 18:19:07
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
  `address` varchar(100) NOT NULL,
  `manager` varchar(65) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `tel` varchar(65) NOT NULL,
  `fax` varchar(65) NOT NULL,
  `web` varchar(150) NOT NULL,
  `clientLogoPath` varchar(150) NOT NULL,
  `cuit` varchar(20) NOT NULL,
  `deleted` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `client`
--

INSERT INTO `client` (`clientId`, `name_desc`, `address`, `manager`, `tel`, `fax`, `web`, `clientLogoPath`, `cuit`, `deleted`) VALUES
(1, 'Lineal Soluciones', 'Roque Saenz Peña 917 Floor 2 - CABA - Argentina', 'Santiago Lloret', '+54 11 4326 3315', '', 'http://www.linealsoluciones.com/', 'logos/lineal.jpg', '1-789456-0', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client_email`
--

CREATE TABLE `client_email` (
  `emailId` int(10) NOT NULL,
  `clientId` int(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(45) NOT NULL,
  `deleted` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `document`
--

CREATE TABLE `document` (
  `documentId` int(10) NOT NULL,
  `clientId` int(10) NOT NULL,
  `operationTypeId` int(1) DEFAULT NULL,
  `ref_lsl` int(15) DEFAULT NULL,
  `document_path` varchar(100) NOT NULL,
  `document_ext` int(100) NOT NULL,
  `deleted` int(1) NOT NULL DEFAULT '0',
  `doc_type` varchar(45) NOT NULL,
  `upload_date` datetime DEFAULT NULL
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
  `operationTypeId` int(1) NOT NULL,
  `deleted` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `operation`
--

INSERT INTO `operation` (`ref_lsl`, `ref_client`, `merchandise`, `transport`, `shipment`, `shipment_origin`, `estimated_arrival`, `custom_document`, `custom_document_djai`, `arrival_date`, `release_date`, `lsl_bill`, `clientId`, `operationTypeId`, `deleted`) VALUES
(1, 'OC SCHMIDT-91', 'Actuador editado', 'Avion', NULL, '2015-12-15', '2015-12-12', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-12-12', '2015-12-12', '0001-00002527', 1, 2, 0),
(2, 'OM-100', 'Caudalimetros', NULL, '2015-06-17', NULL, NULL, '15 073 IC04 097571 X', NULL, NULL, NULL, '0001-00002524', 2, 1, 0),
(4, 'OC SCHMIDT-92', 'Actuador Neumatico2', 'Avion', NULL, '2015-12-15', '2015-12-08', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-12-08', '2015-12-08', '0001-00002527', 1, 2, 0),
(5, 'OC SCHMIDT-93', 'Actuador Neumatico3', 'Avion', NULL, '2015-10-06', '2015-10-06', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '1970-01-01', '1970-01-01', '0001-00002527', 1, 2, 0),
(6, 'OC SCHMIDT-95', 'Actuador Neumatico', 'Avion', NULL, '2015-06-10', '2015-06-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-13', '2015-06-13', '0001-00002527', 1, 2, 0),
(7, 'OC SCHMIDT-94', 'Actuador Neumatico', 'Avion', NULL, '2015-06-10', '2015-06-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-13', '2015-06-13', '0001-00002527', 1, 2, 0),
(8, 'OC SCHMIDT-96', 'Actuador Neumatico', 'Avion', NULL, '2015-06-10', '2015-06-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-13', '2015-06-13', '0001-00002527', 1, 2, 0),
(9, 'OC SCHMIDT-97', 'Actuador Neumatico', 'Avion', NULL, '2015-06-10', '2015-06-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-13', '2015-06-13', '0001-00002527', 1, 2, 0),
(10, 'OC SCHMIDT-98', 'Actuador Neumatico', 'Avion', NULL, '2015-06-10', '2015-06-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-13', '2015-06-13', '0001-00002527', 1, 2, 0),
(16, 'OB SCHMIDT-91', 'Actuador', 'Avion', NULL, '2015-06-12', '2015-06-12', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-06-12', '2015-06-12', '0001-00002527', 2, 2, 0),
(17, 'ON-2055', 'Caudales', NULL, '2015-12-10', NULL, NULL, '15 073 IC04 097571 X', NULL, NULL, NULL, '0001-00002524', 1, 1, 0),
(18, 'OC SCHMIDT-198', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2, 0),
(19, 'OC SCHMIDT-199', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2, 0),
(36, 'OC SCHMIDT-215', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2, 0),
(37, 'OC SCHMIDT-200', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2, 0),
(38, 'OC SCHMIDT-201', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2, 0),
(39, 'OC SCHMIDT-202', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2, 0),
(40, 'OC SCHMIDT-203', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2, 0),
(41, 'OC SCHMIDT-204', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2, 0),
(42, 'OC SCHMIDT-205', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2, 0),
(43, 'OC SCHMIDT-206', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2, 0),
(44, 'OC SCHMIDT-207', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2, 0),
(45, 'OC SCHMIDT-208', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2, 0),
(46, 'OC SCHMIDT-209', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2, 0),
(47, 'OC SCHMIDT-210', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2, 0),
(48, 'OC SCHMIDT-211', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2, 0),
(49, 'OC SCHMIDT-212', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2, 0),
(50, 'OC SCHMIDT-213', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2, 0),
(51, 'OC SCHMIDT-214', 'algo', 'barco', NULL, '2015-11-10', '2015-11-10', '15 073 IC04 099124 E', '15 073 DJAI 091064 Z', '2015-11-10', '2015-11-10', '0001-00002528', 1, 2, 0),
(52, 'test_ref_client', 'test_merchandise', 'test_transport', NULL, '2015-12-08', '2015-12-08', 'test_doc', 'test_djai', '2015-12-08', '2015-12-08', 'test_bill', 1, 2, 0),
(53, 'test2_ref_cliente', 'test2_mercha', 'test2_transporte', NULL, '2015-12-08', '2015-12-08', 'test2_doc', 'test2_doc_djai', '2015-12-08', '2015-12-08', 'test2_factura', 1, 2, 0),
(54, 'test_dp_ref_cliente', 'test_dp_merch4', 'test_dp_transp', NULL, '2015-12-09', '2015-12-09', 'test_dp_doc', 'test_dp_docdjai', '2015-12-09', '2015-12-09', 'test_dp_factura', 1, 2, 0),
(55, 'test1234', 'test123', 'test123', NULL, '2015-12-09', '2015-12-09', 'test123', 'test123', '2015-12-09', '2015-12-09', 'test123', 1, 2, 0),
(56, 'OC SCHMIDT-9000', 'adasdasdasd', 'asdasdasdasd', NULL, '2015-12-25', '2015-12-25', 'adasdasd', 'asdasdasdas', '2015-12-25', '2015-12-25', 'ASDASDASD', 1, 2, 0),
(78, 'ON-3939', 'Merc', NULL, '2015-11-11', NULL, NULL, 'Doc', NULL, NULL, NULL, 'fac', 1, 1, 0),
(79, 'ON-4040', 'Merc', NULL, '2015-11-11', NULL, NULL, 'ada', NULL, NULL, NULL, 'qasdasd', 1, 1, 0),
(80, 'asd', 'asd', NULL, '2015-11-11', NULL, NULL, 'asd', NULL, NULL, NULL, 'asd', 1, 1, 0),
(81, 'bbb', 'bbbbbbbbbbb', NULL, '2015-11-11', NULL, NULL, 'bbbb', NULL, NULL, NULL, 'bbbb', 1, 1, 0),
(82, 'OM-111', 'asdasd', NULL, '2015-11-11', NULL, NULL, 'adsasd', NULL, NULL, NULL, 'asdasd', 2, 1, 0),
(83, 'OC SCHMIDT-5443', 'OC SCHMIDT-5443', 'OC SCHMIDT-5443', NULL, '2015-11-11', '2015-11-11', 'OC SCHMIDT-5443', 'OC SCHMIDT-5443', '2015-11-11', '2015-11-11', 'OC SCHMIDT-5443', 1, 2, 0),
(84, 'refTest', 'MerchTest', NULL, '2015-11-11', NULL, NULL, 'Doc', NULL, NULL, NULL, 'Fac', 15, 1, 1),
(85, 'TEST1', 'Me', 'T', NULL, '2015-11-11', '2015-11-11', 'D', 'D', '2015-11-11', '2015-11-11', 'F', 15, 2, 1),
(86, 'reftest1', 'M', NULL, '2015-11-11', NULL, NULL, 'D', NULL, NULL, NULL, 'F', 15, 1, 1),
(87, 'ON-2020', 'Mercaderi', NULL, '2015-11-11', NULL, NULL, 'Doc', NULL, NULL, NULL, 'Fac', 19, 1, 0),
(88, 'OC SCMIST-0998', 'MM', 'TRA', NULL, '2015-11-11', '2015-11-11', 'D', 'D', '2015-11-11', '2015-11-11', 'FAC', 19, 2, 0),
(89, 'OCTEST1_deleted', 'mercaderia', 't', NULL, '2015-11-11', '2015-11-11', 'D', 'D', '2015-11-11', '2015-11-11', 'F', 20, 2, 1),
(90, 'deleted_ON-201_deleted', 'mercaderia', NULL, '2015-11-11', NULL, NULL, 'Doc', NULL, NULL, NULL, 'Fac', 20, 1, 1),
(92, 'ON-201_deleted', 'Merc', NULL, '2015-11-11', NULL, NULL, 'Doc', NULL, NULL, NULL, 'F', 20, 1, 1);

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
  `role` varchar(100) NOT NULL,
  `tel` varchar(45) NOT NULL,
  `active` int(1) NOT NULL,
  `clientId` int(10) NOT NULL,
  `deleted` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`userId`, `username`, `password`, `name`, `role`, `tel`, `active`, `clientId`, `deleted`) VALUES
(1, 'admin', 'admin', 'Nicolas Sigal', '6', '153013907', 0, 1, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`clientId`);

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
  MODIFY `clientId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `client_email`
--
ALTER TABLE `client_email`
  MODIFY `emailId` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `document`
--
ALTER TABLE `document`
  MODIFY `documentId` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `operation`
--
ALTER TABLE `operation`
  MODIFY `ref_lsl` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;
--
-- AUTO_INCREMENT de la tabla `operation_type`
--
ALTER TABLE `operation_type`
  MODIFY `operationTypeId` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
