-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Servidor: localhost:3306
-- Tiempo de generación: 05-02-2016 a las 17:51:16
-- Versión del servidor: 5.5.47-cll
-- Versión de PHP: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `linealso_mylsl`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client`
--

CREATE TABLE IF NOT EXISTS `client` (
  `clientId` int(10) NOT NULL AUTO_INCREMENT,
  `name_desc` varchar(65) NOT NULL,
  `address` varchar(100) NOT NULL,
  `manager` varchar(65) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `tel` varchar(65) NOT NULL,
  `fax` varchar(65) NOT NULL,
  `web` varchar(150) NOT NULL,
  `clientLogoPath` varchar(150) NOT NULL,
  `cuit` varchar(20) NOT NULL,
  `deleted` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`clientId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Volcado de datos para la tabla `client`
--

INSERT INTO `client` (`clientId`, `name_desc`, `address`, `manager`, `tel`, `fax`, `web`, `clientLogoPath`, `cuit`, `deleted`) VALUES
(1, 'Lineal Soluciones', 'Roque Saenz  PeÃ±a 917 Floor 2 - CABA - Argentina', 'Santiago Lloret', '+54 11 4326 3315', '011 92 (232) 666 8888', 'http://www.linealsoluciones.com/', 'logos/lineal_logo.jpg', '1-789456-0', 0),
(2, 'Esco S.A.', 'Corrientes 1876 Capital Federal, Buenos Aires', 'Roberto Juarez', '+54 11 4297841', '011 44 (161) 999 8888', 'http://www.escosa.com/', 'logos/Esco S.A./258559_6460_original.jpg', '1-132456-7', 0),
(3, 'Jas SRL', 'Ayacucho 1236 Godoy Cruz, Mendoza', 'Pedro Vazquez', '4587954', '011 44 (161) 999 8888', 'http://www.jassrl.com/', 'logos/Jas SRL/jas.jpg', '1-456789-7', 0),
(4, 'Palmares S.A._deleted', 'Panamericana S/N', 'Paola Ruiz', '0261 - 789456', '0261 44 (161) 852741', 'www.palmaresopenmall.com', 'logos/EmpresaDePrueba/WB0J1F78B.png', '07-70982114-4', 1),
(5, 'Palmares', 'Panamericana S/N', 'Paula Ruiz', '0261 423151', '011 2342 2342', 'www.palmares.com', 'logos/Palmares/134704-ubuntu-wallpaper-blue-desktop-wallpaper-1920x1200.jpg', '07-12312312-1', 0),
(6, 'Prueba2 S.A.', 'direccion', 'Santiago', '0261 1234234', '011 1231231', 'www.santiago.com', 'logos/Prueba S.A./10426766_10203886708669735_7062214750264119858_n.jpg', '07-1223123-1', 0),
(7, 'Prueba3 S.A.', 'direcccion 1234', 'Mica', '0261 1231231', '011 2323424', 'www.mica.com', 'logos/Prueba3/10869672_10205318082813194_8794960290261265111_o_(1).jpg', '8-123123-1', 0),
(8, 'prueba Otros', 'Direccion', 'encargado', '123123', '123213', 'www.otros.com', 'logos/prueba Otros/8683466047_4a3b550234_z.jpg', '213123213', 0),
(9, 'Capitol City', 'Austria 2038, 1425 Ciudad De Buenos Aires', 'Alexandre', '011 4828-0871', '', 'www.capitolcity.com.ar/', 'logos/Capitol City/capitol.jpg', '01-12341234-7', 0),
(10, 'Buhlmann', 'Direccion 1234', 'marina', '011456787', '454-789-7', 'www.buhlmann.com.ar', 'logos/Buhlmann/buhlmann.jpg', '4567981326', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client_email`
--

CREATE TABLE IF NOT EXISTS `client_email` (
  `emailId` int(10) NOT NULL AUTO_INCREMENT,
  `clientId` int(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(45) NOT NULL,
  `deleted` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`emailId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Volcado de datos para la tabla `client_email`
--

INSERT INTO `client_email` (`emailId`, `clientId`, `email`, `name`, `deleted`) VALUES
(1, 2, 'marina.arayos@escosa.com', 'Marina Arallos', 0),
(2, 3, 'janina.walz@jas.com', 'Janina Walz', 1),
(3, 4, 'paula.ruiz@palmares.com_deleted', 'Paula Ruiz', 1),
(4, 4, 'p.ruiz@palmares.com_deleted', 'Paula Ruiz', 1),
(5, 6, 'nicolas.sigal@prueba2.com', 'Nicolas', 0),
(6, 7, 'micaela@linealsoluciones.com', 'Micaela Perez', 0),
(7, 7, 'victor@linealsoluciones.com', 'Victor', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client_section`
--

CREATE TABLE IF NOT EXISTS `client_section` (
  `id_client_section` int(4) NOT NULL AUTO_INCREMENT,
  `id_client` int(5) NOT NULL,
  `id_section` int(5) NOT NULL,
  PRIMARY KEY (`id_client_section`),
  KEY `id_client` (`id_client`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=35 ;

--
-- Volcado de datos para la tabla `client_section`
--

INSERT INTO `client_section` (`id_client_section`, `id_client`, `id_section`) VALUES
(1, 3, 1),
(2, 3, 2),
(3, 3, 3),
(4, 3, 9),
(5, 3, 10),
(6, 3, 5),
(18, 9, 16),
(17, 9, 15),
(16, 1, 25),
(15, 1, 24),
(14, 1, 23),
(13, 1, 22),
(19, 9, 4),
(20, 2, 1),
(21, 2, 2),
(22, 2, 3),
(23, 2, 9),
(24, 2, 10),
(25, 2, 5),
(26, 3, 18),
(27, 10, 1),
(28, 10, 2),
(29, 10, 8),
(30, 10, 26),
(31, 10, 19),
(32, 10, 5),
(33, 10, 6),
(34, 1, 27);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `document`
--

CREATE TABLE IF NOT EXISTS `document` (
  `documentId` int(10) NOT NULL AUTO_INCREMENT,
  `clientId` int(10) NOT NULL,
  `operationTypeId` int(1) DEFAULT NULL,
  `ref_lsl` int(15) DEFAULT NULL,
  `document_path` varchar(100) NOT NULL,
  `document_name` varchar(65) NOT NULL,
  `document_ext` int(100) NOT NULL,
  `deleted` int(1) NOT NULL DEFAULT '0',
  `doc_type` varchar(45) NOT NULL,
  `upload_date` datetime DEFAULT NULL,
  PRIMARY KEY (`documentId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=329 ;

--
-- Volcado de datos para la tabla `document`
--

INSERT INTO `document` (`documentId`, `clientId`, `operationTypeId`, `ref_lsl`, `document_path`, `document_name`, `document_ext`, `deleted`, `doc_type`, `upload_date`) VALUES
(1, 2, 2, 1, '/mylsl/files/2/operations/2/OC SCHMIT-9/2015-12-29_CERT_RNR_SIGAL_NICOLAS_EMILIANO.pdf', '', 0, 0, 'pdf', NULL),
(2, 2, 2, 1, '/mylsl/files/2/operations/2/OC SCHMIT-9/2015-12-29_arboles_de_decision.pdf', '', 0, 0, 'fcl', NULL),
(3, 2, 1, 2, '/mylsl/files/f58a3870ca6091f62bc10b3cb57baf81cf362878ae2102c68bdd15d6ba16f979.pdf', 'level01.pdf', 0, 0, 'pdf', NULL),
(4, 2, 1, 2, '/mylsl/files/2/operations/1/ON-200/2015-12-29_arboles_de_decision.pdf', '', 0, 0, 'fcl', NULL),
(5, 2, NULL, NULL, '/mylsl/files/2/documents/seguimiento/bd_(1).xlsx', '', 0, 0, 'seguimiento', '2015-12-30 16:52:41'),
(6, 2, NULL, NULL, '/mylsl/files/2/documents/reintegros/bd_(3).xlsx', '', 0, 0, 'reintegros', '2015-12-30 16:52:49'),
(7, 2, NULL, NULL, '/mylsl/files/2/documents/courrier_imp/bd_(9).xlsx', '', 0, 0, 'courrier_imp', '2015-12-30 16:52:56'),
(8, 2, 2, 3, '/mylsl/files/2/operations/2/OC SCHMIT-8/wireframe3.pdf', '', 0, 0, 'pdf', NULL),
(9, 2, 2, 3, '/mylsl/files/2/operations/2/OC SCHMIT-8/2015-12-29_CERT_RNR_SIGAL_NICOLAS_EMILIANO.pdf', '', 0, 0, 'fcl', NULL),
(10, 2, 2, 4, '/mylsl/files/2/operations/2/OC SCHMIT-7/2015-12-29_CERT_RNR_SIGAL_NICOLAS_EMILIANO.pdf', '', 0, 0, 'pdf', NULL),
(11, 2, 2, 4, '/mylsl/files/2/operations/2/OC SCHMIT-7/2015-12-29_arboles_de_decision.pdf', '', 0, 0, 'fcl', NULL),
(12, 2, 2, 5, '/mylsl/files/2/operations/2/OC SCHMIT-6/2015-12-29_CERT_RNR_SIGAL_NICOLAS_EMILIANO.pdf', '', 0, 0, 'pdf', NULL),
(13, 2, 2, 5, '/mylsl/files/2/operations/2/OC SCHMIT-6/2015-12-29_CERT_RNR_SIGAL_NICOLAS_EMILIANO.pdf', '', 0, 0, 'fcl', NULL),
(14, 2, 2, 6, '/mylsl/files/2/operations/2/OC SCHMIT-5/2015-12-29_CERT_RNR_SIGAL_NICOLAS_EMILIANO.pdf', '', 0, 0, 'pdf', NULL),
(15, 2, 2, 6, '/mylsl/files/2/operations/2/OC SCHMIT-5/2015-12-29_arboles_de_decision.pdf', '', 0, 0, 'fcl', NULL),
(16, 2, 2, 7, '/mylsl/files/2/operations/2/OC SCHMIT-4/2015-12-29_arboles_de_decision.pdf', '', 0, 0, 'pdf', NULL),
(17, 2, 2, 7, '/mylsl/files/2/operations/2/OC SCHMIT-4/2015-12-29_arboles_de_decision.pdf', '', 0, 0, 'fcl', NULL),
(18, 2, 2, 8, '/mylsl/files/2/operations/2/OC SCHMIT-3/2015-12-29_CERT_RNR_SIGAL_NICOLAS_EMILIANO.pdf', '', 0, 0, 'pdf', NULL),
(19, 2, 2, 8, '/mylsl/files/2/operations/2/OC SCHMIT-3/2015-12-29_arboles_de_decision.pdf', '', 0, 0, 'fcl', NULL),
(20, 2, 2, 9, '/mylsl/files/2/operations/2/OC SCHMIT-2/2015-12-29_CERT_RNR_SIGAL_NICOLAS_EMILIANO.pdf', '', 0, 0, 'pdf', NULL),
(21, 2, 2, 9, '/mylsl/files/2/operations/2/OC SCHMIT-2/2015-12-29_arboles_de_decision.pdf', '', 0, 0, 'fcl', NULL),
(22, 2, 2, 10, '/mylsl/files/2/operations/2/OC SCHMIT-1/2015-12-29_CERT_RNR_SIGAL_NICOLAS_EMILIANO.pdf', '', 0, 0, 'pdf', NULL),
(23, 2, 2, 10, '/mylsl/files/2/operations/2/OC SCHMIT-1/2015-12-29_arboles_de_decision.pdf', '', 0, 0, 'fcl', NULL),
(24, 3, 2, 11, '/mylsl/files/3/operations/2/OC JAS-1/CERT_RNR_SIGAL_NICOLAS_EMILIANO_(1).pdf', '', 0, 0, 'pdf', NULL),
(25, 3, 2, 11, '/mylsl/files/3/operations/2/OC JAS-1/2015-12-29_arboles_de_decision.pdf', '', 0, 0, 'fcl', NULL),
(26, 3, 1, 12, '/mylsl/files/3/operations/1/ON-JAS-1/2015-12-29_CERT_RNR_SIGAL_NICOLAS_EMILIANO.pdf', '', 0, 0, 'pdf', NULL),
(27, 3, 1, 12, '/mylsl/files/3/operations/1/ON-JAS-1/2015-12-29_arboles_de_decision.pdf', '', 0, 0, 'fcl', NULL),
(28, 3, NULL, NULL, '/mylsl/files/3/documents/reintegros/bd_(11).xlsx', '', 0, 0, 'reintegros', '2015-12-30 17:47:37'),
(29, 3, NULL, NULL, '/mylsl/files/3/documents/reintegros/134704-ubuntu-wallpaper-blue-desktop-wallpaper-1920x1200.jpg', '', 0, 0, 'reintegros', '2015-12-30 18:03:40'),
(30, 3, 1, 572, '/mylsl/files/3/operations/1/Fc. 999/2015-12-29_arboles_de_decision_(1).pdf', '', 0, 0, 'pdf', NULL),
(31, 3, 1, 572, '/mylsl/files/3/operations/1/Fc. 999/2015-12-29_CERT_RNR_SIGAL_NICOLAS_EMILIANO.pdf', '', 0, 0, 'fcl', NULL),
(32, 3, 1, 471, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(33, 3, 1, 472, '/mylsl/files/3/operations/1/FC,0002-00000174/wireframe3.pdf', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(34, 3, 1, 473, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(35, 3, 1, 474, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(36, 3, 1, 475, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(37, 3, 1, 476, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(38, 3, 1, 477, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(39, 3, 1, 478, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(40, 3, 1, 479, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(41, 3, 1, 480, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(42, 3, 1, 481, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(43, 3, 1, 483, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(44, 3, 1, 484, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(45, 3, 1, 485, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(46, 3, 1, 486, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(47, 3, 1, 487, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(48, 3, 1, 488, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(49, 3, 1, 489, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(50, 3, 1, 490, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(51, 3, 1, 491, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(52, 3, 1, 492, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(53, 3, 1, 493, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(54, 3, 1, 494, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(55, 3, 1, 495, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(56, 3, 1, 496, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(57, 3, 1, 497, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(58, 3, 1, 498, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(59, 3, 1, 500, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(60, 3, 1, 502, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(61, 3, 1, 503, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(62, 3, 1, 504, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(63, 3, 1, 505, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(64, 3, 1, 506, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(65, 3, 1, 507, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(66, 3, 1, 508, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(67, 3, 1, 509, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(68, 3, 1, 510, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(69, 3, 1, 511, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(70, 3, 1, 512, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(71, 3, 1, 513, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(72, 3, 1, 514, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(73, 3, 1, 515, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(74, 3, 1, 516, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(75, 3, 1, 517, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(76, 3, 1, 518, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(77, 3, 1, 519, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(78, 3, 1, 520, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(79, 3, 1, 521, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(80, 3, 1, 522, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(81, 3, 1, 523, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(82, 3, 1, 524, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(83, 3, 1, 525, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(84, 3, 1, 526, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(85, 3, 1, 527, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(86, 3, 1, 528, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(87, 3, 1, 529, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(88, 3, 1, 530, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(89, 3, 1, 531, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(90, 3, 1, 532, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(91, 3, 1, 533, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(92, 3, 1, 534, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(93, 3, 1, 535, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(94, 3, 1, 536, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(95, 3, 1, 537, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(96, 3, 1, 538, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(97, 3, 1, 539, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(98, 3, 1, 540, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(99, 3, 1, 541, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(100, 3, 1, 542, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(101, 3, 1, 543, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(102, 3, 1, 544, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(103, 3, 1, 545, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(104, 3, 1, 547, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(105, 3, 1, 548, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(106, 3, 1, 549, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(107, 3, 1, 550, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(108, 3, 1, 551, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(109, 3, 1, 552, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(110, 3, 1, 553, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(111, 3, 1, 554, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(112, 3, 1, 555, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(113, 3, 1, 556, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(114, 3, 1, 557, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(115, 3, 1, 558, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(116, 3, 1, 559, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(117, 3, 1, 560, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(118, 3, 1, 561, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(119, 3, 1, 562, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(120, 3, 1, 563, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(121, 3, 1, 564, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(122, 3, 1, 565, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(123, 3, 1, 566, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(124, 3, 1, 567, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(125, 3, 1, 568, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(126, 3, 1, 569, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(127, 3, 1, 570, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(128, 3, 1, 571, '', '', 0, 0, 'pdf', '0000-00-00 00:00:00'),
(129, 3, 1, 471, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(130, 3, 1, 472, '/mylsl/files/3/operations/1/FC,0002-00000174/2015-12-29_CERT_RNR_SIGAL_NICOLAS_EMILIANO.pdf', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(131, 3, 1, 473, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(132, 3, 1, 474, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(133, 3, 1, 475, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(134, 3, 1, 476, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(135, 3, 1, 477, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(136, 3, 1, 478, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(137, 3, 1, 479, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(138, 3, 1, 480, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(139, 3, 1, 481, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(140, 3, 1, 483, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(141, 3, 1, 484, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(142, 3, 1, 485, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(143, 3, 1, 486, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(144, 3, 1, 487, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(145, 3, 1, 488, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(146, 3, 1, 489, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(147, 3, 1, 490, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(148, 3, 1, 491, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(149, 3, 1, 492, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(150, 3, 1, 493, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(151, 3, 1, 494, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(152, 3, 1, 495, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(153, 3, 1, 496, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(154, 3, 1, 497, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(155, 3, 1, 498, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(156, 3, 1, 500, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(157, 3, 1, 502, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(158, 3, 1, 503, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(159, 3, 1, 504, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(160, 3, 1, 505, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(161, 3, 1, 506, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(162, 3, 1, 507, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(163, 3, 1, 508, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(164, 3, 1, 509, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(165, 3, 1, 510, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(166, 3, 1, 511, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(167, 3, 1, 512, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(168, 3, 1, 513, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(169, 3, 1, 514, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(170, 3, 1, 515, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(171, 3, 1, 516, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(172, 3, 1, 517, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(173, 3, 1, 518, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(174, 3, 1, 519, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(175, 3, 1, 520, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(176, 3, 1, 521, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(177, 3, 1, 522, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(178, 3, 1, 523, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(179, 3, 1, 524, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(180, 3, 1, 525, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(181, 3, 1, 526, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(182, 3, 1, 527, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(183, 3, 1, 528, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(184, 3, 1, 529, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(185, 3, 1, 530, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(186, 3, 1, 531, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(187, 3, 1, 532, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(188, 3, 1, 533, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(189, 3, 1, 534, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(190, 3, 1, 535, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(191, 3, 1, 536, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(192, 3, 1, 537, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(193, 3, 1, 538, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(194, 3, 1, 539, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(195, 3, 1, 540, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(196, 3, 1, 541, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(197, 3, 1, 542, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(198, 3, 1, 543, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(199, 3, 1, 544, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(200, 3, 1, 545, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(201, 3, 1, 547, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(202, 3, 1, 548, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(203, 3, 1, 549, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(204, 3, 1, 550, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(205, 3, 1, 551, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(206, 3, 1, 552, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(207, 3, 1, 553, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(208, 3, 1, 554, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(209, 3, 1, 555, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(210, 3, 1, 556, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(211, 3, 1, 557, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(212, 3, 1, 558, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(213, 3, 1, 559, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(214, 3, 1, 560, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(215, 3, 1, 561, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(216, 3, 1, 562, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(217, 3, 1, 563, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(218, 3, 1, 564, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(219, 3, 1, 565, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(220, 3, 1, 566, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(221, 3, 1, 567, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(222, 3, 1, 568, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(223, 3, 1, 569, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(224, 3, 1, 570, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(225, 3, 1, 571, '', '', 0, 0, 'fcl', '0000-00-00 00:00:00'),
(226, 3, 1, 574, '', '', 0, 0, 'pdf', NULL),
(227, 3, 1, 574, '', '', 0, 0, 'fcl', NULL),
(228, 4, NULL, NULL, '/mylsl/files/4/documents/seguimiento/phone.png', '', 0, 1, 'seguimiento', '2016-01-12 21:58:34'),
(229, 4, NULL, NULL, '/mylsl/files/4/documents/reintegros/planes_map_3223313a.png', '', 0, 1, 'reintegros', '2016-01-12 21:58:43'),
(230, 4, NULL, NULL, '/mylsl/files/4/documents/courrier_imp/wassily-kandinsky_00321475.jpg', '', 0, 1, 'courrier_imp', '2016-01-12 21:59:04'),
(231, 4, NULL, NULL, '/mylsl/files/4/documents/courrier_imp/wassily-kandinsky_00321475.jpg', '', 0, 1, 'courrier_imp', '2016-01-12 21:59:12'),
(232, 4, NULL, NULL, '/mylsl/files/4/documents/courrier_imp/wassily-kandinsky_00321475.jpg', '', 0, 1, 'courrier_imp', '2016-01-12 21:58:52'),
(233, 4, NULL, NULL, '/mylsl/files/4/documents/courrier_imp/WB0J1F78B.png', '', 0, 1, 'courrier_imp', '2016-01-12 22:00:01'),
(234, 4, NULL, NULL, '/mylsl/files/4/documents/seguimiento/phone.png', '', 0, 1, 'seguimiento', '2016-01-12 22:16:32'),
(235, 4, NULL, NULL, '/mylsl/files/4/documents/reintegros/planes_map_3223313a.png', '', 0, 1, 'reintegros', '2016-01-12 22:17:16'),
(236, 4, NULL, NULL, '/mylsl/files/4/documents/courrier_imp/WB0J1F78B.png', '', 0, 1, 'courrier_imp', '2016-01-12 22:17:30'),
(237, 4, NULL, NULL, '/mylsl/files/4/documents/reintegros/level01.pdf', '', 0, 1, 'reintegros', '2016-01-12 22:17:53'),
(238, 4, NULL, NULL, '/mylsl/files/4/documents/reintegros/level01.pdf', '', 0, 1, 'reintegros', '2016-01-12 22:18:08'),
(239, 4, NULL, NULL, '/mylsl/files/4/documents/courrier_imp/Inf__Reintegros_Jas03-06-11.xls', '', 0, 1, 'courrier_imp', '2016-01-12 22:19:10'),
(240, 4, 1, 575, '/mylsl/files/4/operations/1/FC.0002-PRUEBA/level01.pdf', '', 0, 1, 'pdf', NULL),
(241, 4, 1, 575, '/mylsl/files/4/operations/1/FC.0002-PRUEBA/level02.pdf', '', 0, 1, 'fcl', NULL),
(242, 2, 1, 576, '', '', 0, 0, 'pdf', NULL),
(243, 2, 1, 576, '', '', 0, 0, 'fcl', NULL),
(244, 4, 1, 577, '', '', 0, 1, 'pdf', NULL),
(245, 4, 1, 577, '', '', 0, 1, 'fcl', NULL),
(246, 4, 1, 579, '/mylsl/files/4/operations/1/PruebaSpinner/level01.pdf', '', 0, 1, 'pdf', NULL),
(247, 4, 1, 579, '/mylsl/files/4/operations/1/PruebaSpinner/level02.pdf', '', 0, 1, 'fcl', NULL),
(248, 4, 1, 580, '/mylsl/files/4/operations/1/Ref/level04.pdf', '', 0, 1, 'pdf', NULL),
(249, 4, 1, 580, '/mylsl/files/4/operations/1/Ref/level02.pdf', '', 0, 1, 'fcl', NULL),
(252, 3, 1, 583, '/mylsl/files/3/operations/1/test/2015-12-29_arboles_de_decision_(1).pdf', '', 0, 0, 'pdf', NULL),
(253, 3, 1, 583, '/mylsl/files/3/operations/1/test/2015-12-29_arboles_de_decision_(1).pdf', '', 0, 0, 'fcl', NULL),
(254, 3, 2, 584, '/mylsl/files/3/operations/2/testImp/2015-12-29_CERT_RNR_SIGAL_NICOLAS_EMILIANO.pdf', '', 0, 0, 'pdf', NULL),
(255, 3, 2, 584, '/mylsl/files/3/operations/2/testImp/2015-12-29_arboles_de_decision_(1).pdf', '', 0, 0, 'fcl', NULL),
(256, 5, NULL, NULL, '/mylsl/files/5/documents/seguimiento/134704-ubuntu-wallpaper-blue-desktop-wallpaper-1920x1200_(1).jp', '', 0, 0, 'seguimiento', '2016-01-13 11:20:48'),
(257, 5, NULL, NULL, '/mylsl/files/5/documents/reintegros/2015-12-29_arboles_de_decision_(1).pdf', '', 0, 0, 'reintegros', '2016-01-13 11:22:33'),
(258, 5, NULL, NULL, '/mylsl/files/5/documents/courrier_imp/bd_(2).xlsx', '', 0, 0, 'courrier_imp', '2016-01-13 11:22:57'),
(259, 6, NULL, NULL, '/mylsl/files/6/documents/seguimiento/2015-12-29_arboles_de_decision_(1).pdf', '', 0, 0, 'seguimiento', '2016-01-13 11:58:54'),
(260, 6, NULL, NULL, '/mylsl/files/6/documents/seguimiento/134704-ubuntu-wallpaper-blue-desktop-wallpaper-1920x1200_(1).jp', '', 0, 0, 'seguimiento', '2016-01-13 12:00:12'),
(261, 6, 1, 585, '/mylsl/files/6/operations/1/Referencia/2015-12-29_arboles_de_decision_(1).pdf', '', 0, 0, 'pdf', NULL),
(262, 6, 1, 585, '/mylsl/files/6/operations/1/Referencia/2015-12-29_arboles_de_decision.pdf', '', 0, 0, 'fcl', NULL),
(263, 7, NULL, NULL, '/mylsl/files/7/documents/seguimiento/2015-12-29_arboles_de_decision_(1).pdf', '', 0, 0, 'seguimiento', '2016-01-13 12:32:31'),
(264, 7, NULL, NULL, '/mylsl/files/7/documents/courrier_imp/jas.xlsx', '', 0, 0, 'courrier_imp', '2016-01-13 12:33:01'),
(265, 7, 1, 586, '/mylsl/files/7/operations/1/Referencia234234/2015-12-29_arboles_de_decision_(1).pdf', '', 0, 0, 'pdf', NULL),
(266, 7, 1, 586, '/mylsl/files/7/operations/1/Referencia234234/2015-12-29_arboles_de_decision_(1).pdf', '', 0, 0, 'fcl', NULL),
(267, 7, 2, 587, '/mylsl/files/7/operations/2/RefPrueba/2015-12-29_arboles_de_decision_(1).pdf', '', 0, 0, 'pdf', NULL),
(268, 7, 2, 587, '/mylsl/files/7/operations/2/RefPrueba/2015-12-29_arboles_de_decision_(1).pdf', '', 0, 0, 'fcl', NULL),
(269, 7, 2, 588, '', '', 0, 0, 'pdf', NULL),
(270, 7, 2, 588, '', '', 0, 0, 'fcl', NULL),
(271, 3, 1, 589, '', '', 0, 0, 'pdf', NULL),
(272, 3, 1, 589, '', '', 0, 0, 'fcl', NULL),
(273, 3, 1, 0, '', '', 0, 0, 'pdf', NULL),
(274, 3, 1, 0, '', '', 0, 0, 'fcl', NULL),
(275, 3, 1, 590, '', '', 0, 0, 'pdf', NULL),
(276, 3, 1, 590, '', '', 0, 0, 'fcl', NULL),
(277, 3, 2, 591, '/mylsl/files/3/operations/2/Prueba 1 ccomercial/Presentacion_MY_LSL_01-16.pdf', '', 0, 0, 'pdf', NULL),
(278, 3, 2, 591, '/mylsl/files/80ec491eaed98480f306a70220827db881e7f77b3bbf4a3356a7b3a2e782434a.pdf', 'NodeJS_-_Clase_2.pdf', 0, 0, 'fcl', NULL),
(279, 3, 2, 592, '/mylsl/files/3/operations/2/xx1/LSL_IMPO_2015.pdf', '', 0, 0, 'pdf', NULL),
(280, 3, 2, 592, '/mylsl/files/3/operations/2/xx1/Tarifas_expo_a_LSL___Commisso_2015.pdf', '', 0, 0, 'fcl', NULL),
(281, 3, 2, 593, '', '', 0, 0, 'pdf', NULL),
(282, 3, 2, 593, '/mylsl/files/d0d1bb0b71a9e0166752e3f4b0250cfc08c06216b0a06c136b987168e88e6cbe.pdf', 'level04_(2).pdf', 0, 0, 'fcl', NULL),
(283, 3, 2, 593, '', '', 0, 0, 'simi', NULL),
(284, 3, 2, 594, '/mylsl/files/3/operations/2/asdagaax/level01.pdf', '', 0, 0, 'pdf', NULL),
(285, 3, 2, 594, '', '', 0, 0, 'fcl', NULL),
(286, 3, 2, 594, '', '', 0, 0, 'simi', NULL),
(287, 3, 2, 595, '/mylsl/files/3/operations/2/refcli/level01.pdf', '', 0, 0, 'pdf', NULL),
(288, 3, 2, 595, '', '', 0, 0, 'fcl', NULL),
(289, 3, 2, 595, '', '', 0, 0, 'simi', NULL),
(290, 3, 2, 596, '/mylsl/files/2e59c12fbfafa664f2988d301f1a3f10dc90d43cb7cdca483f2b6fbab560cce2.', '', 0, 0, 'pdf', NULL),
(291, 3, 2, 596, '', '', 0, 0, 'fcl', NULL),
(292, 3, 2, 596, '', '', 0, 0, 'simi', NULL),
(293, 3, 2, 597, '/mylsl/files/d05943ad435eaa92d05fa7de092f6bd606e5d731dfdae4050a31982a478446d9.pdf', '', 0, 0, 'pdf', NULL),
(294, 3, 2, 597, '', '', 0, 0, 'fcl', NULL),
(295, 3, 2, 597, '', '', 0, 0, 'simi', NULL),
(296, 3, 2, 598, '/mylsl/files/ff3a9a066f6ceb8467ec482756d2ba0d93f467098df5534bc4ab5f88ebe14279.pdf', '', 0, 0, 'pdf', NULL),
(297, 3, 2, 598, '/mylsl/files/b583111d4b6f9d875af1d5dd98f74db7c75990f23503fdd97e5e0c80b29132e9.pdf', '', 0, 0, 'fcl', NULL),
(298, 3, 2, 598, '/mylsl/files/b583111d4b6f9d875af1d5dd98f74db7c75990f23503fdd97e5e0c80b29132e9.pdf', '', 0, 0, 'simi', NULL),
(299, 3, 2, 599, '/mylsl/files/ed46d6da23f8f9c27cec4bd83246615cecd9822cdbfce17fff57eb8383ee0e77.pdf', 'level01.pdf', 0, 0, 'pdf', NULL),
(300, 3, 2, 599, '/mylsl/files/9218173930adfb2281defa8e7f692d87d7e65576f18b31b42b2ffc0aa4f02bb9.pdf', 'level02.pdf', 0, 0, 'fcl', NULL),
(301, 3, 2, 599, '/mylsl/files/9218173930adfb2281defa8e7f692d87d7e65576f18b31b42b2ffc0aa4f02bb9.pdf', 'level02.pdf', 0, 0, 'simi', NULL),
(302, 3, 2, 600, '/mylsl/files/6859bad3191112f29de9372ebd051221a7da9fb0055b8752bbae4b57fcc24a07.pdf', 'level01.pdf', 0, 0, 'pdf', NULL),
(303, 3, 2, 600, '/mylsl/files/c5610a2ad02c646b7035a0291cb21e1f1c93df34752bce608dfa2601d7db15b2.pdf', 'level02.pdf', 0, 0, 'fcl', NULL),
(304, 3, 2, 600, '/mylsl/files/9b8ef93831e8ec8724066fc2d10d48b707e2d8687748b97bcf0a1e15bd05243b.pdf', 'level03.pdf', 0, 0, 'simi', NULL),
(305, 3, 2, 601, '', '', 0, 0, 'pdf', NULL),
(306, 3, 2, 601, '', '', 0, 0, 'fcl', NULL),
(307, 3, 2, 601, '/mylsl/files/6409a9fec47c83333d9da81336995280e18f7433e2b2d15ac10c9315d7bf47d7.pdf', 'level05.pdf', 0, 0, 'simi', NULL),
(308, 3, 2, 602, '', '', 0, 0, 'pdf', NULL),
(309, 3, 2, 602, '', '', 0, 0, 'fcl', NULL),
(310, 3, 2, 602, '/mylsl/files/6f1e42b72ecd3e63c533c305977c571d9cd8187a4a323583f5d2b03b4317aa5f.pdf', 'level04.pdf', 0, 0, 'simi', NULL),
(311, 3, 2, 603, '/mylsl/files/53b9d7d96ff755d8de99843d9a1e7fedba4ce5895ab6df7199a8f5a4af847502.pdf', 'level01.pdf', 0, 0, 'pdf', NULL),
(312, 3, 2, 603, '/mylsl/files/f60a06c56f8523a5c6bdf0269f3797edd269411ade781a83af63a3c5d817073c.pdf', 'level02.pdf', 0, 0, 'fcl', NULL),
(313, 3, 2, 603, '/mylsl/files/46c5b74e7ef65069264a6261ca5fcf8df49b1617fefa169cff5501052fb00246.pdf', 'level03.pdf', 0, 0, 'simi', NULL),
(314, 3, 2, 604, '/mylsl/files/c1b0c234d0ef089b34f3d15ccf4882ca2bed1c3cfba8db3866eab434dd8fca3f.pdf', 'NodeJS_-_Clase_3.pdf', 0, 0, 'pdf', NULL),
(315, 3, 2, 604, '/mylsl/files/fabb9de797aac4e63fe0bad101e67e0afdfa913d54c3636abf9d245497d9164d.pdf', 'NodeJS_-_Clase_1.pdf', 0, 0, 'fcl', NULL),
(316, 3, 2, 604, '/mylsl/files/eb60400a33a16c4ada92094904bde5e0f3c7a998cb36e24778949553c79765e9.pdf', 'NodeJS_-_Clase_2.pdf', 0, 0, 'simi', NULL),
(317, 2, 1, 605, '/mylsl/files/d76ac13e6ffd2e732b527ed63a8e03cc10ee90454a68441b3a584e812bacc7ea.pdf', '', 0, 0, 'pdf', NULL),
(318, 2, 1, 605, '/mylsl/files/e2afa999fc78d516e80aaa5245fd9924beb6ec8ef9b21642ae2c462fad1c8e17.pdf', '', 0, 0, 'fcl', NULL),
(319, 2, 1, 605, '/mylsl/files/99a70a4d7422da5dcc302e6fa89ddbb6b108c51b819af2736bc2b81d97e7cdb6.pdf', 'level03.pdf', 0, 0, 'simi', NULL),
(320, 2, 1, 606, '/mylsl/files/b5b48fac4a8bae6c57bc661c806bb6c92a1f073e54f7a756201a206674dcf807.pdf', 'NodeJS_-_Clase_1.pdf', 0, 0, 'pdf', NULL),
(321, 2, 1, 606, '/mylsl/files/cac016128cb22cc9ff24edf1922f7ba6f91e6330489f31280fdd5c6065e96285.pdf', 'NodeJS_-_Clase_2.pdf', 0, 0, 'fcl', NULL),
(322, 2, 1, 606, '/mylsl/files/f57f7fa36065631c42c89f9ff84e34a92360f1ca02c08fa3379eeaf8528c1766.pdf', 'NodeJS_-_Clase_3.pdf', 0, 0, 'simi', NULL),
(323, 9, 3, 607, '/mylsl/files/8a7d701b29020aad78da6a79c2d77cd7f583acbcf29e917e31b48bb02af3def4.pdf', 'wireframe3.pdf', 0, 0, 'pdf', NULL),
(324, 9, 3, 607, '/mylsl/files/8a7d701b29020aad78da6a79c2d77cd7f583acbcf29e917e31b48bb02af3def4.pdf', 'wireframe3.pdf', 0, 0, 'fcl', NULL),
(325, 9, 3, 607, '/mylsl/files/8a7d701b29020aad78da6a79c2d77cd7f583acbcf29e917e31b48bb02af3def4.pdf', 'wireframe3.pdf', 0, 0, 'simi', NULL),
(326, 10, 1, 608, '/mylsl/files/32a9ff2d572191f999b9e34c2b5e287aec6bbd9c3f1a0ed563441d927278a67b.pdf', '2015-12-29_arboles_de_decision_(3).pdf', 0, 0, 'pdf', NULL),
(327, 10, 1, 608, '/mylsl/files/9d210b55443dcc250418bb0f8e87734bb60cb6c95bc9b47befb7c7168323c0b1.pdf', '2015-12-29_arboles_de_decision_(2).pdf', 0, 0, 'fcl', NULL),
(328, 10, 1, 608, '/mylsl/files/8bd1df952638a322213e0679e8d28f66423ae1ae1d4a5f521a3e9c18989ca831.pdf', '2015-12-29_arboles_de_decision.pdf', 0, 0, 'simi', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fares`
--

CREATE TABLE IF NOT EXISTS `fares` (
  `faresId` int(10) NOT NULL AUTO_INCREMENT,
  `start` varchar(65) NOT NULL,
  `end` varchar(65) NOT NULL,
  `fare` varchar(65) NOT NULL,
  `clientId` int(11) NOT NULL,
  `deleted` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`faresId`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Volcado de datos para la tabla `fares`
--

INSERT INTO `fares` (`faresId`, `start`, `end`, `fare`, `clientId`, `deleted`) VALUES
(1, '0.00', '20,000.00', '200', 10, 0),
(2, '20,001.00', '80,000.00', '1%', 10, 0),
(3, '80,001.00', '150,000.00', '0.80%', 10, 0),
(4, '150,001.00', '350,000.00', '0.65%', 10, 0),
(5, '350,001.00', 'en adelante', '0.50', 10, 0),
(6, '350,001.00', '650,000.00', '17%', 10, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `files`
--

CREATE TABLE IF NOT EXISTS `files` (
  `fileId` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) NOT NULL,
  `operationId` int(11) DEFAULT NULL,
  `fileTypeId` int(11) NOT NULL,
  `filename` varchar(65) NOT NULL,
  `fileSystemname` varchar(65) NOT NULL,
  `uploadDate` datetime NOT NULL,
  `extension` varchar(10) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`fileId`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- Volcado de datos para la tabla `files`
--

INSERT INTO `files` (`fileId`, `clientId`, `operationId`, `fileTypeId`, `filename`, `fileSystemname`, `uploadDate`, `extension`, `deleted`) VALUES
(1, 3, NULL, 1, 'sections.xlsx', '0868f8b2ded92af251f2a3714c1fab4ac9b7929ba9ba33f137b80d05339cdb6f', '2016-01-24 10:52:58', 'xlsx', 0),
(2, 3, NULL, 1, 'Sin tÃ­tulo.png', 'd46112926416f962f5b4c086813dcd3b19136cbc416a080e71b7b464acc1b42c', '2016-01-24 10:53:58', 'png', 0),
(3, 3, NULL, 1, 'sections.xlsx', '7c6d0b2a75a0a79700262e920811aa38d1fa498c83ca923005326e936612ce8c', '2016-01-24 10:54:23', 'xlsx', 0),
(4, 3, NULL, 2, 'sections.xlsx', 'f5e27d26817f9c8ec401580e62fbea2fd683d46dd793f4cc50bfa657c791808b', '2016-01-24 10:55:18', 'xlsx', 0),
(5, 3, NULL, 2, 'sections.xlsx', 'e6aed5e60290705c73737822b0090b9726f52ba2ae3005d698848551fbea21a0', '2016-01-24 10:55:31', 'xlsx', 0),
(6, 3, NULL, 2, 'sections.xlsx', '7454cdbc4c02fd45090a6ac06c1d0a2e7d4f40cedf1bc88d7df6bb1fbe16eb3d', '2016-01-24 10:55:40', 'xlsx', 0),
(7, 3, NULL, 3, 'WB0J1F78B.png', 'd213c390fc019662e18364f72c4da687d9406ba385963574e2ddbcc4ee533fb1', '2016-01-24 10:55:50', 'png', 0),
(8, 3, NULL, 3, 'WB0J1F78B.png', '967ba8fcca80ae6095a1c9e42a048b5737567a682c9dbb8a29b75cb3de94814f', '2016-01-24 10:56:03', 'png', 0),
(9, 3, NULL, 3, 'WB0J1F78B.png', '25ae598af593bdf81a4fa8d300d798e6c195f443f407f6fcff6418739e9346d5', '2016-01-24 10:56:23', 'png', 0),
(10, 3, NULL, 1, '134704-ubuntu-wallpaper-blue-desktop-wallpaper-1920x1200 (1).jpg', '09b3c64dff5318e3b5f45ea7e81bad8cfcbcf12727bc26f798db0a7cd8a4d618.', '2016-01-25 04:15:29', 'jpg', 0),
(11, 3, NULL, 1, '258559_6460_original.jpg', '51d2ea4fc352a1cc7cdce304ccca51c38720f6cc37c2d6fa5eb53b0266538ef9j', '2016-01-25 04:16:26', 'jpg', 0),
(12, 3, NULL, 2, 'bd (1).xlsx', '219c7b05803010753a44021d757523f1d06b6cf77dbe59cbaf205c848ca81c87.', '2016-01-25 04:23:24', 'xlsx', 0),
(13, 3, NULL, 1, 'bd (2).xlsx', '0b3a065807d9da4ba16c06541ba3bc392d33f97e57a5c1d8e53cb5d7ad518fa4.', '2016-01-25 04:26:20', 'xlsx', 0),
(14, 3, NULL, 1, '134704-ubuntu-wallpaper-blue-desktop-wallpaper-1920x1200 (4).jpg', '512caa4cddd1f1399f0d74f240dd6558d42ddf1613c0be14b5726dd2e88c7a0e.', '2016-01-25 04:27:35', 'jpg', 0),
(15, 3, NULL, 3, 'amexLogo.png', '809f21a2f45d64828e1f9b8620a4182a038fe058523c36c61414347b19ea2c4e.', '2016-01-25 04:29:48', 'png', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fileTypes`
--

CREATE TABLE IF NOT EXISTS `fileTypes` (
  `fileTypeId` int(11) NOT NULL AUTO_INCREMENT,
  `fileType` varchar(65) NOT NULL,
  PRIMARY KEY (`fileTypeId`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Volcado de datos para la tabla `fileTypes`
--

INSERT INTO `fileTypes` (`fileTypeId`, `fileType`) VALUES
(1, 'Seguimiento'),
(2, 'Courrier Imp.'),
(3, 'Courrier Exp.'),
(4, 'Reintegros'),
(5, 'LNA Imp.'),
(7, 'Desc. Tarifa'),
(9, 'Honorarios'),
(10, 'LNA ARCORE'),
(11, 'LNA FAPERSA'),
(12, 'DJAI LNA'),
(13, 'EXCEP LCM'),
(14, 'Tarifas Imp.'),
(15, 'Tarifas Exp.'),
(16, 'Cargas'),
(17, 'otros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operation`
--

CREATE TABLE IF NOT EXISTS `operation` (
  `ref_lsl` int(10) NOT NULL AUTO_INCREMENT,
  `ref_client` varchar(45) DEFAULT NULL,
  `merchandise` varchar(45) DEFAULT NULL,
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
  `operationTypeId` int(1) DEFAULT NULL,
  `operation_state` int(1) NOT NULL DEFAULT '0',
  `owner` varchar(65) DEFAULT NULL,
  `deleted` int(1) NOT NULL DEFAULT '0',
  `funding_request_date` date DEFAULT NULL,
  `recived_funds_date` date DEFAULT NULL,
  PRIMARY KEY (`ref_lsl`),
  UNIQUE KEY `operationId` (`ref_client`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=612 ;

--
-- Volcado de datos para la tabla `operation`
--

INSERT INTO `operation` (`ref_lsl`, `ref_client`, `merchandise`, `transport`, `shipment`, `shipment_origin`, `estimated_arrival`, `custom_document`, `custom_document_djai`, `arrival_date`, `release_date`, `lsl_bill`, `clientId`, `operationTypeId`, `operation_state`, `owner`, `deleted`, `funding_request_date`, `recived_funds_date`) VALUES
(1, 'OC SCHMIT-9', 'carbon', 'Avion', NULL, '2015-12-25', '2015-12-31', 'documentoaduanero', 'documentodjai', '2015-01-01', '2015-05-05', 'facturalsl', 2, 2, 0, 'null', 0, '2016-01-05', '0000-00-00'),
(2, 'ON-200', 'carbon', NULL, '2015-12-15', NULL, NULL, 'documentoAduanero', NULL, NULL, NULL, 'facturalsl', 2, 1, 1, '1', 0, '2016-01-25', '2016-01-31'),
(3, 'OC SCHMIT-8', 'Agua Embotellada', 'AviÃ³n', NULL, '2015-11-11', '2015-11-20', 'documentoAduanero', 'DocumentoDjai', '2015-11-21', '2015-11-20', 'facturalsl', 2, 2, 0, 'null', 0, '2016-01-05', '1970-01-01'),
(4, 'OC SCHMIT-7', 'mercaderia', 'transporte', NULL, '2015-12-15', '2015-12-20', 'documento', 'djai', '2015-12-20', '2015-12-21', 'factura', 2, 2, 0, 'null', 0, '2016-01-05', '1970-01-01'),
(5, 'OC SCHMIT-6', 'Mercaderia', 'transporte', NULL, '2015-12-15', '2015-12-20', 'Documentoaduanero', 'docdjai', '2015-12-12', '2015-12-12', 'facturakls', 2, 2, 0, 'null', 0, '2016-01-17', '1970-01-01'),
(6, 'OC SCHMIT-5', 'mercaderia', 'transporte', NULL, '2015-12-15', '2015-12-15', 'doc', 'doc', '2015-12-15', '2015-12-12', 'facturalsls', 2, 2, 0, NULL, 0, NULL, NULL),
(7, 'OC SCHMIT-4', 'mercaderia', 'transporte', NULL, '2015-10-10', '2015-10-10', 'documento', 'documentodjai', '2015-10-10', '2015-10-10', 'facturaasd', 2, 2, 0, NULL, 0, NULL, NULL),
(8, 'OC SCHMIT-3', 'mercaderia', 'transporte', NULL, '2015-12-15', '2015-12-15', 'documento', 'documentodj', '2015-12-15', '2015-12-15', 'factuasdad', 2, 2, 0, NULL, 0, NULL, NULL),
(9, 'OC SCHMIT-2', 'mercaderia', 'transporte', NULL, '2015-12-10', '2015-12-10', 'documento', 'docdjai', '2015-02-05', '2015-02-05', 'factuasadasd', 2, 2, 0, NULL, 0, NULL, NULL),
(10, 'OC SCHMIT-1', 'mercaderia', 'transporte', NULL, '2015-02-10', '2015-02-10', 'filterdc', 'docdjaui', '2015-02-10', '2015-02-10', 'fact', 2, 2, 0, NULL, 0, NULL, NULL),
(11, 'OC JAS-1', 'Mercaderia', 'transporte', NULL, '2015-12-20', '2015-12-20', 'Doc', 'DJAI', '2015-05-20', '2014-07-02', 'fac', 3, 2, 0, '9', 0, '2016-01-16', '2016-01-18'),
(471, 'FC.0002-00000187', 'Repuestos petroleros', 'NULL', '2013-10-31', '0000-00-00', '0000-00-00', '13 073 EC01 043148 N', 'NULL', '0000-00-00', '0000-00-00', '0001-00001698', 3, 1, 1, '9', 0, NULL, NULL),
(472, 'FC,0002-00000174', 'Insumos petroleros', 'NULL', '2013-08-16', '0000-00-00', '0000-00-00', '13 073 EC01 032225 H', 'NULL', '0000-00-00', '0000-00-00', '0001-00001566', 3, 1, 0, NULL, 0, NULL, NULL),
(473, '0002-00000154', 'Repuestos petroleros', 'NULL', '2013-08-09', '0000-00-00', '0000-00-00', '13 073 EC01 031702 G', 'NULL', '0000-00-00', '0000-00-00', '0001-00001522', 3, 1, 0, NULL, 0, NULL, NULL),
(474, '0002-00000172', 'Herramientas', 'NULL', '2013-10-04', '0000-00-00', '0000-00-00', '13 073 EC01 039004 J', 'NULL', '0000-00-00', '0000-00-00', '0001-00001634', 3, 1, 0, NULL, 0, NULL, NULL),
(475, '0002-00000172b_deleted', 'Repuestos petroleros', 'NULL', '2013-07-26', '0000-00-00', '0000-00-00', '13 073 EC01 029061 L', 'NULL', '0000-00-00', '0000-00-00', '0001-00001520', 3, 1, 0, NULL, 1, NULL, NULL),
(476, '0002-000000999', 'Repuestos petroleros', 'NULL', '2013-06-26', '0000-00-00', '0000-00-00', '13 073 EC01 025209 L', 'NULL', '0000-00-00', '0000-00-00', '0001-00001476', 3, 1, 0, NULL, 0, NULL, NULL),
(477, 'E0002-00000164', 'Set de Patas', 'NULL', '2013-03-18', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00001372', 3, 1, 0, NULL, 0, NULL, NULL),
(478, 'E0002-00000163', 'Set de Patas', 'NULL', '2013-03-15', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00001371', 3, 1, 0, NULL, 0, NULL, NULL),
(479, '0002-00000161', 'Panel Rf', 'NULL', '2013-03-20', '0000-00-00', '0000-00-00', '13 073 EC01 010640 E', 'NULL', '0000-00-00', '0000-00-00', '0001-00001360', 3, 1, 0, NULL, 0, NULL, NULL),
(480, 'fc,0002-00000159', 'Intercomunicadores', 'NULL', '2013-03-31', '0000-00-00', '0000-00-00', '13073DJAI007753P', 'NULL', '0000-00-00', '0000-00-00', '0001-00001359', 3, 1, 0, NULL, 0, NULL, NULL),
(481, '0002-00000156', 'Encoders', 'NULL', '2012-12-27', '0000-00-00', '0000-00-00', '12 073 EC01 058341 N', 'NULL', '0000-00-00', '0000-00-00', '0001-00001273', 3, 1, 0, NULL, 0, NULL, NULL),
(483, '0002-00000153', 'Fuente de alto voltaje', 'NULL', '2012-12-11', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00001210', 3, 1, 0, NULL, 0, NULL, NULL),
(484, '0002-00000146', 'Repuestos Petroleros', 'NULL', '2012-11-07', '0000-00-00', '0000-00-00', '12 073 EC01 048779 E', 'NULL', '0000-00-00', '0000-00-00', '0001-00001110', 3, 1, 0, NULL, 0, NULL, NULL),
(485, '0002-00000147', 'Repuestos Petroleros', 'NULL', '2012-10-31', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00001111', 3, 1, 0, NULL, 0, NULL, NULL),
(486, '0002-00000139', 'Equipamiento Petrolero', 'NULL', '2012-08-30', '0000-00-00', '0000-00-00', '12 073 EC01 041577 Z', 'NULL', '0000-00-00', '0000-00-00', '0001-00001026', 3, 1, 0, NULL, 0, NULL, NULL),
(487, '0002-00000152', 'Fuente de alto voltaje', 'NULL', '2012-12-07', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00001209', 3, 1, 0, NULL, 0, NULL, NULL),
(488, '0002-00000138', 'Repuestos', 'NULL', '2012-08-21', '0000-00-00', '0000-00-00', '12 073 EC01 035678 V', 'NULL', '0000-00-00', '0000-00-00', '0001-00000970', 3, 1, 0, NULL, 0, NULL, NULL),
(489, '0002-00000137', 'Repuestos Petroleros', 'NULL', '2012-08-02', '0000-00-00', '0000-00-00', '12 073 EC01 033518 M', 'NULL', '0000-00-00', '0000-00-00', '0001-00000949', 3, 1, 0, NULL, 0, NULL, NULL),
(490, '0002-00000135', 'Repuestos Petroleros', 'NULL', '2012-07-18', '0000-00-00', '0000-00-00', '12 073 EC01 030842 J', 'NULL', '0000-00-00', '0000-00-00', '0001-00000923', 3, 1, 0, NULL, 0, NULL, NULL),
(491, '0002-00000134', 'Repuestos Petroleros', 'NULL', '2012-07-11', '0000-00-00', '0000-00-00', '12 073 EC01 029752 R', 'NULL', '0000-00-00', '0000-00-00', '0001-00000898', 3, 1, 0, NULL, 0, NULL, NULL),
(492, '0002-00000133', 'Repuestos Petroleros', 'NULL', '2012-07-11', '0000-00-00', '0000-00-00', '12 073 EC01 029768 B', 'NULL', '0000-00-00', '0000-00-00', '0001-00000897', 3, 1, 0, NULL, 0, NULL, NULL),
(493, '0002-00000130', 'Repuestos Petroleros', 'NULL', '2012-06-28', '0000-00-00', '0000-00-00', '12 073 EC01 028029 N', 'NULL', '0000-00-00', '0000-00-00', '0001-00000891', 3, 1, 0, NULL, 0, NULL, NULL),
(494, '0002-00000131', 'Repuestos Petroleros', 'NULL', '2012-06-28', '0000-00-00', '0000-00-00', '12 073 EC01 028027 L', 'NULL', '0000-00-00', '0000-00-00', '0001-00000890', 3, 1, 0, NULL, 0, NULL, NULL),
(495, '0002-00000127', 'Repuestos Petroleros', 'NULL', '2012-06-19', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00000887', 3, 1, 0, NULL, 0, NULL, NULL),
(496, '0002-00000129', 'Repuestos Petroleros', 'NULL', '2012-06-15', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00000914', 3, 1, 0, NULL, 0, NULL, NULL),
(497, '0002-00000126', 'Repuestos Petroleros', 'NULL', '2012-06-15', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00000913', 3, 1, 0, NULL, 0, NULL, NULL),
(498, '0002-00000125', 'Repuestos Petroleros', 'NULL', '2012-06-14', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00000872', 3, 1, 0, NULL, 0, NULL, NULL),
(500, '0002-00000121', 'Repuestos', 'NULL', '2012-04-26', '0000-00-00', '0000-00-00', '12 073 EC01 018173 M', 'NULL', '0000-00-00', '0000-00-00', '0001-00000827', 3, 1, 0, NULL, 0, NULL, NULL),
(502, '0002-00000118', 'Repuestos', 'NULL', '2012-04-10', '0000-00-00', '0000-00-00', 'Avion dhl', 'NULL', '0000-00-00', '0000-00-00', '0001-00000824', 3, 1, 0, NULL, 0, NULL, NULL),
(503, '0002-00000117', 'Repuestos', 'NULL', '2012-03-26', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00000804', 3, 1, 0, NULL, 0, NULL, NULL),
(504, '0002-000000116', 'Repuestos', 'NULL', '2012-03-28', '0000-00-00', '0000-00-00', '12 073 EC01 012605 G', 'NULL', '0000-00-00', '0000-00-00', '0001-00000803', 3, 1, 0, NULL, 0, NULL, NULL),
(505, '0002-00000115', 'Repuestos', 'NULL', '2012-03-26', '0000-00-00', '0000-00-00', '12 073 EC01 012594 N', 'NULL', '0000-00-00', '0000-00-00', '0001-00000799', 3, 1, 0, NULL, 0, NULL, NULL),
(506, 'Fc 0002-00000114', 'Repuestos Petroleros', 'NULL', '2012-03-23', '0000-00-00', '0000-00-00', '12 073 EC03 001874 Y', 'NULL', '0000-00-00', '0000-00-00', '0001-00000802', 3, 1, 0, NULL, 0, NULL, NULL),
(507, 'Fc. 0002-00000113', 'Repuestos Petroleros', 'NULL', '2012-03-16', '0000-00-00', '0000-00-00', '12 073 EC01 010476 K', 'NULL', '0000-00-00', '0000-00-00', '0001-00000784', 3, 1, 0, NULL, 0, NULL, NULL),
(508, '0002-00000109', 'Repuestos Petroleros', 'NULL', '2012-02-17', '0000-00-00', '0000-00-00', 'Avion', 'NULL', '0000-00-00', '0000-00-00', '0001-00000766', 3, 1, 0, NULL, 0, NULL, NULL),
(509, '0002-00000108', 'Repuestos Petroleros', 'NULL', '2012-02-10', '0000-00-00', '0000-00-00', 'Avion/dhl', 'NULL', '0000-00-00', '0000-00-00', '0001-00000754', 3, 1, 0, NULL, 0, NULL, NULL),
(510, '0002-00000111', 'Elementos Petroleros', 'NULL', '2012-03-06', '0000-00-00', '0000-00-00', '12 073 EC03 001299 P', 'NULL', '0000-00-00', '0000-00-00', '0001-00000774', 3, 1, 0, NULL, 0, NULL, NULL),
(511, '0002-00000106', 'Elementos Petroleros', 'NULL', '2012-02-16', '0000-00-00', '0000-00-00', '12 073 EC01 006458 P', 'NULL', '0000-00-00', '0000-00-00', '0001-00000753', 3, 1, 0, NULL, 0, NULL, NULL),
(512, '0002-00000105', 'Elementos Petroleros', 'NULL', '2012-02-08', '0000-00-00', '0000-00-00', '12 073 EC01 005541 H', 'NULL', '0000-00-00', '0000-00-00', '0001-00000750', 3, 1, 0, NULL, 0, NULL, NULL),
(513, '0002-00000104', 'Panel RF', 'NULL', '2012-01-31', '0000-00-00', '0000-00-00', '12 073 EC01 003759 Z', 'NULL', '0000-00-00', '0000-00-00', '0001-00000749', 3, 1, 0, NULL, 0, NULL, NULL),
(514, 'Fc. 0002-00000088', 'Elementos petroleros', 'NULL', '2012-01-26', '0000-00-00', '0000-00-00', '12 073 EC01 003183 H', 'NULL', '0000-00-00', '0000-00-00', '0001-00000712', 3, 1, 0, NULL, 0, NULL, NULL),
(515, 'Fc. 0002-00000100', 'Elementos petroleros', 'NULL', '2012-01-31', '0000-00-00', '0000-00-00', '12 073 EC03 000444 G', 'NULL', '0000-00-00', '0000-00-00', '0001-00000711', 3, 1, 0, NULL, 0, NULL, NULL),
(516, 'Fc. 0002-00000097', 'Equipamiento Petrolero', 'NULL', '2012-01-21', '0000-00-00', '0000-00-00', '12 073 EC01 002726 J', 'NULL', '0000-00-00', '0000-00-00', '0001-00000710', 3, 1, 0, NULL, 0, NULL, NULL),
(517, 'Fc. 0002-00000096', 'Equipamiento Petrolero', 'NULL', '2012-01-07', '0000-00-00', '0000-00-00', '12 073 EC01 000233 A', 'NULL', '0000-00-00', '0000-00-00', '0001-00000697', 3, 1, 0, NULL, 0, NULL, NULL),
(518, 'Fc. 0002-000000102', 'Equipamiento Petrolero', 'NULL', '2012-01-07', '0000-00-00', '0000-00-00', '12 073 EC01 001000 Z', 'NULL', '0000-00-00', '0000-00-00', '0001-00000696', 3, 1, 0, NULL, 0, NULL, NULL),
(519, '0002-00000095', 'Repuestos Petroleros', 'NULL', '2011-12-16', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00000683', 3, 1, 0, NULL, 0, NULL, NULL),
(520, '0002-00000087', 'Repuestos Petroleros', 'NULL', '2011-12-01', '0000-00-00', '0000-00-00', '11 073 EC01 059880 V', 'NULL', '0000-00-00', '0000-00-00', '0001-00000646', 3, 1, 0, NULL, 0, NULL, NULL),
(521, '0002-00000090', 'Detector Gamma', 'NULL', '2011-12-01', '0000-00-00', '0000-00-00', '11 073 EC03009978 D', 'NULL', '0000-00-00', '0000-00-00', '0001-00000645', 3, 1, 0, NULL, 0, NULL, NULL),
(522, '0002-00000086', 'Repuestos Petroleros', 'NULL', '2011-11-24', '0000-00-00', '0000-00-00', '11 073 EC01 058672 T', 'NULL', '0000-00-00', '0000-00-00', '0001-00000637', 3, 1, 0, NULL, 0, NULL, NULL),
(523, 'Prof. HY20111028', 'Repuesto Petrolero', 'NULL', '2011-10-28', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00000612', 3, 1, 0, NULL, 0, NULL, NULL),
(524, 'E 0002-00000083', 'Repuestos Petroleros', 'NULL', '2011-10-25', '0000-00-00', '0000-00-00', '11 073 EC01 052281 J', 'NULL', '0000-00-00', '0000-00-00', '0001-00000593', 3, 1, 0, NULL, 0, NULL, NULL),
(525, 'E0002-00000084', 'Repuestos Petroleros', 'NULL', '2011-10-25', '0000-00-00', '0000-00-00', '11 073 EC01 052265 L', 'NULL', '0000-00-00', '0000-00-00', '0001-00000592', 3, 1, 0, NULL, 0, NULL, NULL),
(526, '0002-00000082', 'Repuestos Petroleros', 'NULL', '2011-10-12', '0000-00-00', '0000-00-00', '11 073 EC03 007623 L', 'NULL', '0000-00-00', '0000-00-00', '0001-000000570', 3, 1, 0, NULL, 0, NULL, NULL),
(527, '0002-00000080', 'Repuestos Petroleros', 'NULL', '2011-10-07', '0000-00-00', '0000-00-00', '11 073 EC03 007514 K', 'NULL', '0000-00-00', '0000-00-00', '0001-00000569', 3, 1, 0, NULL, 0, NULL, NULL),
(528, '0002-00000078', 'Repuestos Petroleros', 'NULL', '2011-10-02', '0000-00-00', '0000-00-00', '11 073 EC01 047461 N', 'NULL', '0000-00-00', '0000-00-00', '0001-00000556', 3, 1, 0, NULL, 0, NULL, NULL),
(529, '0002-00000079', 'Repuestos Petroleros', 'NULL', '2011-11-21', '0000-00-00', '0000-00-00', '11 073 EC01 045703 K', 'NULL', '0000-00-00', '0000-00-00', '0001-00000621', 3, 1, 0, NULL, 0, NULL, NULL),
(530, '0002-00000075', 'Repuestos Petroleros', 'NULL', '2011-09-16', '0000-00-00', '0000-00-00', '11 073 EC01 045013 E', 'NULL', '0000-00-00', '0000-00-00', '0001-00000543', 3, 1, 0, NULL, 0, NULL, NULL),
(531, '0002-00000074', 'Repuestos Petroleros', 'NULL', '2011-09-07', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00000537', 3, 1, 0, NULL, 0, NULL, NULL),
(532, 'E 0002-00000071', 'Repuestos', 'NULL', '2011-08-24', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00000514', 3, 1, 0, NULL, 0, NULL, NULL),
(533, 'E 0002-00000070', 'Repuestos', 'NULL', '2011-08-23', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00000513', 3, 1, 0, NULL, 0, NULL, NULL),
(534, 'E 0002-00000068', 'Repuestos', 'NULL', '2011-08-31', '0000-00-00', '0000-00-00', '11 073 EC01 041850 J', 'NULL', '0000-00-00', '0000-00-00', '0001-00000516', 3, 1, 0, NULL, 0, NULL, NULL),
(535, 'E 0002-00000067', 'Repuestos', 'NULL', '2011-08-25', '0000-00-00', '0000-00-00', '11 073 EC01 040627 K', 'NULL', '0000-00-00', '0000-00-00', '0001-00000510', 3, 1, 0, NULL, 0, NULL, NULL),
(536, 'E 0002-00000060', 'Repuesto Petrolero', 'NULL', '2011-07-07', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00000448', 3, 1, 0, NULL, 0, NULL, NULL),
(537, 'E 0002-00000059', 'Repuesto Petrolero', 'NULL', '2011-06-30', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00000447', 3, 1, 0, NULL, 0, NULL, NULL),
(538, '0002-00000056', 'Repuestos Proleros', 'NULL', '2011-06-23', '0000-00-00', '0000-00-00', '11 073 EC01 029863 T', 'NULL', '0000-00-00', '0000-00-00', '0001-00000389', 3, 1, 0, NULL, 0, NULL, NULL),
(539, 'Fc. E 0002-00000053', 'Piezas de la Industria Petrolera', 'NULL', '2011-05-27', '0000-00-00', '0000-00-00', '11 073 EC01 025511 F', 'NULL', '0000-00-00', '0000-00-00', '0001-00000425', 3, 1, 0, NULL, 0, NULL, NULL),
(540, 'Fact. 0002-00000048', 'Piezas de la Industria Petrolera', 'NULL', '2011-05-24', '0000-00-00', '0000-00-00', '11 073 EC01 024863 Y', 'NULL', '0000-00-00', '0000-00-00', '0001-00000415', 3, 1, 0, NULL, 0, NULL, NULL),
(541, 'Fact. 0002-00000052', 'Repuestos Petroleros', 'NULL', '2011-05-26', '0000-00-00', '0000-00-00', '11 073 EC03 003776 Z', 'NULL', '0000-00-00', '0000-00-00', '0001-00000417', 3, 1, 0, NULL, 0, NULL, NULL),
(542, 'Fact. 0002-00000049', 'Repuestos Petroleros', 'NULL', '2011-05-26', '0000-00-00', '0000-00-00', '11 073 EC03 003775 P', 'NULL', '0000-00-00', '0000-00-00', '0001-00000414', 3, 1, 0, NULL, 0, NULL, NULL),
(543, 'Fc E 0002-00000047', 'Repuestos Petroleros', 'NULL', '2011-05-18', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00000413', 3, 1, 0, NULL, 0, NULL, NULL),
(544, 'Fc. E 0002-00000046', 'Repuestos Petroleros', 'NULL', '2011-05-10', '0000-00-00', '0000-00-00', '11 073 EC01 021631 E', 'NULL', '0000-00-00', '0000-00-00', '0001-00000396', 3, 1, 0, NULL, 0, NULL, NULL),
(545, 'Envio Courrier Hidro', 'Repuestos Petroleros', 'NULL', '2011-05-10', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00000397', 3, 1, 0, NULL, 0, NULL, NULL),
(547, 'FC. 0002-00000043', 'Prototipo de desarrollo', 'NULL', '2011-04-21', '0000-00-00', '0000-00-00', '11073 EC01 018414 J', 'NULL', '0000-00-00', '0000-00-00', '0001-0000380', 3, 1, 0, NULL, 0, NULL, NULL),
(548, '0002-00000039', 'Repuestos Petroleros', 'NULL', '2011-04-19', '0000-00-00', '0000-00-00', '11 073 EC01 017912 L', 'NULL', '0000-00-00', '0000-00-00', '0001-00000382', 3, 1, 0, NULL, 0, NULL, NULL),
(549, 'PROF. 20110401', 'Repuestos Petroleros', 'NULL', '2011-04-11', '0000-00-00', '0000-00-00', '11 073 EC02 000612 B', 'NULL', '0000-00-00', '0000-00-00', '0001-00000363', 3, 1, 0, NULL, 0, NULL, NULL),
(550, 'Fc. 0002-00000038', 'Repuestos Petroleros', 'NULL', '2011-04-08', '0000-00-00', '0000-00-00', '11 073 EC01 015803 X', 'NULL', '0000-00-00', '0000-00-00', '0001-00000360', 3, 1, 0, NULL, 0, NULL, NULL),
(551, 'Fc.y', 'Elementos Petroleros', 'NULL', '2011-04-05', '0000-00-00', '0000-00-00', '11 073 EC01 015352 H', 'NULL', '0000-00-00', '0000-00-00', '0001-00000362', 3, 1, 0, NULL, 0, NULL, NULL),
(552, 'Envio Courrier Fc. 34', 'Elementos Petroleros', 'NULL', '2011-03-04', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00000316', 3, 1, 0, NULL, 0, NULL, NULL),
(553, 'Fc. 32', 'Elementos Petroleros', 'NULL', '2011-03-12', '0000-00-00', '0000-00-00', '11 073 EC03 001618 J', 'NULL', '0000-00-00', '0000-00-00', '0001-00000320', 3, 1, 0, NULL, 0, NULL, NULL),
(554, 'Prof.20110125', 'Equipo eyector', 'NULL', '2011-02-05', '0000-00-00', '0000-00-00', '11 073 EC02000186 H', 'NULL', '0000-00-00', '0000-00-00', '0001-00000287', 3, 1, 0, NULL, 0, NULL, NULL),
(555, 'Fc. 29', 'Repuestos petroleros', 'NULL', '2011-02-03', '0000-00-00', '0000-00-00', '11 073 EC01004583 L', 'NULL', '0000-00-00', '0000-00-00', '0001-00000281', 3, 1, 0, NULL, 0, NULL, NULL),
(556, 'Fc. 25', 'Repuestos petroleros', 'NULL', '2011-01-20', '0000-00-00', '0000-00-00', '11 073 EC03 000341 B', 'NULL', '0000-00-00', '0000-00-00', '0001-00000276', 3, 1, 0, NULL, 0, NULL, NULL),
(557, 'Fc. 23', 'Repuestos petroleros', 'NULL', '2010-10-21', '0000-00-00', '0000-00-00', '10 073 EC01 066457 S', 'NULL', '0000-00-00', '0000-00-00', '0001-00000254', 3, 1, 0, NULL, 0, NULL, NULL),
(558, 'Fc. 20', 'Repuestos petroleros', 'NULL', '2010-11-26', '0000-00-00', '0000-00-00', '10 073 EC01 060782 N', 'NULL', '0000-00-00', '0000-00-00', '0001-00000220', 3, 1, 0, NULL, 0, NULL, NULL),
(559, 'Fc. 19', 'Repuestos petroleros', 'NULL', '2010-11-12', '0000-00-00', '0000-00-00', '10 073 EC01 057564 R', 'NULL', '0000-00-00', '0000-00-00', '0001-00000205', 3, 1, 0, NULL, 0, NULL, NULL),
(560, 'Fc. 18', 'Repuestos petroleros', 'NULL', '2010-11-11', '0000-00-00', '0000-00-00', '10 073 EC01 057336 Y', 'NULL', '0000-00-00', '0000-00-00', '0001-00000173', 3, 1, 0, NULL, 0, NULL, NULL),
(561, 'Retorno Warrior', 'Repuestos petroleros', 'NULL', '2010-10-02', '0000-00-00', '0000-00-00', '10 073 EC02 001641 D', 'NULL', '0000-00-00', '0000-00-00', '0001-00000179', 3, 1, 0, NULL, 0, NULL, NULL),
(562, 'Fc. 15', 'Repuestos petroleros', 'NULL', '2010-10-13', '0000-00-00', '0000-00-00', '10 073 EC01 051125 E', 'NULL', '0000-00-00', '0000-00-00', '0001-00000190', 3, 1, 0, NULL, 0, NULL, NULL),
(563, 'Fc. 8', 'Repuestos petroleros', 'NULL', '2010-09-25', '0000-00-00', '0000-00-00', '10 073 EC01 047710 J', 'NULL', '0000-00-00', '0000-00-00', '0001-00000174', 3, 1, 0, NULL, 0, NULL, NULL),
(564, 'Fc. 1/2', 'Repuestos petroleros', 'NULL', '2010-09-29', '0000-00-00', '0000-00-00', '10 073 EC01 048601 J', 'NULL', '0000-00-00', '0000-00-00', '0001-00000173', 3, 1, 0, NULL, 0, NULL, NULL),
(565, 'Fc. 164', 'Valvulas de descarga', 'NULL', '2010-07-16', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00000135', 3, 1, 0, NULL, 0, NULL, NULL),
(566, 'Fc. 162', 'Repuestos petroleros', 'NULL', '2010-07-16', '0000-00-00', '0000-00-00', '10 073 EC01 034165 J', 'NULL', '0000-00-00', '0000-00-00', '0001-00000126', 3, 1, 0, NULL, 0, NULL, NULL),
(567, 'Fc. 155', 'Repuestos Petroleros', 'NULL', '2010-05-14', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00000115', 3, 1, 0, NULL, 0, NULL, NULL),
(568, 'Fc. 57', 'Repuestos Petroleros', 'NULL', '2010-04-25', '0000-00-00', '0000-00-00', '10 073 EC01 019255 M', 'NULL', '0000-00-00', '0000-00-00', '0001-00000093', 3, 1, 0, NULL, 0, NULL, NULL),
(569, 'Fc. 151', 'Repuestos Petroleros', 'NULL', '2010-05-12', '0000-00-00', '0000-00-00', '10 073 EC01 022508 H', 'NULL', '0000-00-00', '0000-00-00', '0001-00000108', 3, 1, 0, NULL, 0, NULL, NULL),
(570, 'Fc. 158/59/60/63', 'Repuestos petroleros', 'NULL', '2010-07-31', '0000-00-00', '0000-00-00', '10 073 EC01 038020 D', 'NULL', '0000-00-00', '0000-00-00', '0001-00000130', 3, 1, 0, NULL, 0, NULL, NULL),
(571, 'Tipificacion', 'Repuestos petroleros', 'NULL', '---', '0000-00-00', '0000-00-00', '---', 'NULL', '0000-00-00', '0000-00-00', '0001-00000151', 3, 1, 0, NULL, 0, NULL, NULL),
(572, 'Fc. 999', 'Repuestos petroleros', NULL, '2015-01-07', NULL, NULL, '10 073 EC01 034165 J', NULL, NULL, NULL, '0001-00000999', 3, 1, 0, NULL, 0, NULL, NULL),
(574, 'asasdas', 'asasas', NULL, '2016-01-08', NULL, NULL, 'dasdasasdasddas', NULL, NULL, NULL, 'saasasdasd', 3, 1, 1, NULL, 0, NULL, NULL),
(575, 'FC.0002-PRUEBA_deleted', 'Repuestos', NULL, '2016-01-12', NULL, NULL, '13 073 EC01 043148 N', NULL, NULL, NULL, '0001-00001699', 4, 1, 1, NULL, 1, NULL, NULL),
(576, '0001-PRUEBA2', 'Respuestos', NULL, '2016-02-08', NULL, NULL, '13 073 EC01 043148 N', NULL, NULL, NULL, '0001-000PRUEBA2', 2, 1, 0, NULL, 0, NULL, NULL),
(577, 'FC.0002PRUEBA2_deleted', 'Respuestos', NULL, '2016-02-02', NULL, NULL, '13 073 EC01 043148 N', NULL, NULL, NULL, '0001-0PPRUEBA2', 4, 1, 0, NULL, 1, NULL, NULL),
(578, 'FC.0002-PRUEBAIMP_deleted_deleted', 'Respuesto', 'Avion', NULL, '2016-08-02', '2016-08-02', 'DOCAD', 'DOCDJAi', '2016-08-02', '2016-08-02', '0001-00IMPTEST', 4, 2, 1, NULL, 1, NULL, NULL),
(579, 'PruebaSpinner_deleted_deleted', 'Respuesto', NULL, '2016-08-02', NULL, NULL, 'DocAduanero', NULL, NULL, NULL, 'FacturaTestSpinner', 4, 1, 0, NULL, 1, NULL, NULL),
(580, 'Ref_deleted', 'Merc', NULL, '2016-08-16', NULL, NULL, 'Doc', NULL, NULL, NULL, 'FacTesta', 4, 1, 0, NULL, 1, NULL, NULL),
(581, 'Prueba', 'Mercaderia', NULL, '2016-02-02', NULL, NULL, 'Documento', NULL, NULL, NULL, 'Factura123', 2, 1, 0, NULL, 0, NULL, NULL),
(583, 'test', 'test', NULL, '2016-02-02', NULL, NULL, 'test', NULL, NULL, NULL, 'test', 3, 1, 0, '9', 0, NULL, NULL),
(584, 'testImp', 'mercaderia', 'transporte', NULL, '2016-02-02', '2016-02-02', 'doc', 'docdjai', '2016-02-02', '2016-02-02', 'factTestImp', 3, 2, 1, '9', 0, '2016-01-05', '2016-01-10'),
(585, 'Referencia', 'Respuestos petroleros', NULL, '2016-02-02', NULL, NULL, 'Documento', NULL, NULL, NULL, '0001-00000123123', 6, 1, 0, '9', 0, NULL, NULL),
(586, 'Referencia234234', 'Mercaderia', NULL, '2016-02-02', NULL, NULL, 'Documento', NULL, NULL, NULL, 'factura12313123', 7, 1, 1, '9', 0, NULL, NULL),
(587, 'RefPrueba', 'mercaderia', 'Avion', NULL, '2016-02-02', '2016-02-02', 'Doc', 'Docdjai', '2016-02-02', '2016-02-02', 'fact345345', 7, 2, 0, '9', 0, NULL, NULL),
(588, 'RefPrue', 'Mercaderia', 'transporte', NULL, '2016-02-02', '2016-02-02', 'doc', 'SIMI', '2016-02-02', '2015-02-02', 'afacas', 7, 2, 0, '1', 0, NULL, NULL),
(589, 'Ref', 'Merc', NULL, '2016-02-02', NULL, NULL, 'Doc', NULL, NULL, NULL, 'Factasd', 3, 1, 0, NULL, 0, NULL, NULL),
(590, 'Refer', 'Merc', NULL, '2016-02-20', NULL, NULL, 'Doc', NULL, NULL, NULL, 'Factref', 3, 1, 0, '10', 0, NULL, NULL),
(591, 'Prueba 1 ccomercial', 'porotos', 'DHL', NULL, '2016-01-20', '2016-01-28', 'colocar numero de documento llegado el moment', 'colocar numero de SIMI', '2016-01-29', '2016-02-08', 'colocar factura scaneda', 3, 2, 1, '15', 0, '2016-01-05', '2016-01-29'),
(592, 'xx1', 'jabalÃ±ina', 'dhl', NULL, '2016-01-20', '2016-01-29', 'xxx', 'simi2', '2016-01-29', '2016-02-08', '000128', 3, 2, 0, '1', 0, '2016-01-28', '2016-01-29'),
(593, 'RefPrueba191', 'Mercaderia', 'transporte', NULL, '2016-01-22', '2016-01-22', 'docaduanero', 'dsimi', '2016-01-22', '2016-01-22', 'facturadeprueba01', 3, 2, 1, '1', 0, '2016-01-22', '2016-01-30'),
(594, 'asdagaax', 'asdnaxzni1sd', 'asnf08nsc', NULL, '2016-01-22', '2016-01-22', 'asgheacf|', 'sadcsdfsd', '2016-01-22', '2016-01-22', 'asdads3axc23', 3, 2, 0, '1', 0, '2016-01-22', '1970-01-01'),
(595, 'refcli', 'merc', 'tran', NULL, '2016-01-29', '2016-01-29', 'asasd', 'asdasd', '2016-01-29', '2016-01-29', 'fact231', 3, 2, 0, '1', 0, '2016-01-29', '1970-01-01'),
(596, 'sddsewf', 'fwe', 'wefwefwef', NULL, '2016-01-01', '2016-01-01', 'SADDA', 'ASDASD', '2016-10-01', '2016-01-10', 'DADFSAF', 3, 2, 0, '1', 0, '2016-01-01', '1970-01-01'),
(597, 'snosdjns', 'sdfndsofns', 'dfsfsf', NULL, '2016-01-01', '2016-01-01', 'asoknaosn', 'snsandaskn', '2016-01-01', '2016-01-01', 'dsasdlasdasd', 3, 2, 0, 'null', 0, '2016-01-01', '1970-01-01'),
(598, 'asdasd', 'asdasdsd', 'asdasdasd', NULL, '2016-01-01', '2016-01-01', 'ssasd', 'aadssad', '2016-01-01', '2016-01-01', 'asdasdasdasdasdasd', 3, 2, 0, '1', 0, '2016-01-01', '1970-01-01'),
(599, 'tttthh', 'ddsfsdfsd', 'fsdfsdfsdf', NULL, '2016-02-01', '2016-01-01', 'asdasdasdas', 'asasdasdasd', '2016-01-01', '2016-01-01', 'sdfsdfsdfsdfsdf', 3, 2, 0, '1', 0, '2016-01-01', '1970-01-01'),
(600, 'ggggtttt', 'sdaasdasd', 'asdasdasd', NULL, '2016-01-01', '2016-01-01', 'asdasdasd', 'asdasdasd', '2016-01-01', '2016-01-01', 'aasdasdasdasd', 3, 2, 0, '1', 0, '2016-01-01', '1970-01-01'),
(601, 'qqqqqqqq', 'asasdas', 'dasdasd', NULL, '2016-01-01', '2016-01-01', 'asdasdasd', 'asdasdasd', '2016-01-01', '2016-01-01', 'askmapmasd', 3, 2, 0, '1', 0, '2016-01-01', '2016-01-01'),
(602, '12asdad123', 'za', 'ascasass', NULL, '2016-01-01', '2016-11-11', 'asdsad', 'asdad', '2016-01-01', '2016-01-01', 'asdasdasdaaq2234', 3, 2, 0, '9', 0, '2016-01-01', '1970-01-01'),
(603, 'wwwwww_deleted', 'wwww', 'wwww', NULL, '2016-02-01', '2016-01-01', 'asdasd', 'asdasd', '2016-01-01', '2016-01-01', 'assaaaszzzzzzzz', 3, 2, 0, '1', 1, '2016-01-01', '1970-01-01'),
(604, 'ttttrrrrrr_deleted', 'asasdas', 'dasdasdasdas', NULL, '2016-01-01', '2016-01-01', 'aasassaassa', 'asasassa', '2016-01-01', '2016-01-01', 'aaaazzzzzz', 3, 2, 0, '1', 1, '2016-01-01', '1970-01-01'),
(605, 'gggg', 'ggg', NULL, '2016-01-01', NULL, NULL, 'ggg', NULL, NULL, NULL, 'asaasdasd', 2, 1, 0, '1', 0, NULL, NULL),
(606, 'ffffddd', 'dfdfss', NULL, '2016-01-01', NULL, NULL, 'fdfsdfsdfsd', NULL, NULL, NULL, 'asdasdsaasaaaaa', 2, 1, 0, '9', 0, NULL, NULL),
(607, NULL, 'mercaderiaa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Fact-123y', 9, 3, 1, '9', 1, NULL, NULL),
(608, 'ref23423234234', 'mercaderia', NULL, '2016-01-01', NULL, NULL, 'doc', NULL, NULL, NULL, 'fact21342342', 10, 1, 0, '1', 0, '2016-01-01', '2016-01-01'),
(609, NULL, NULL, NULL, '2016-02-05', NULL, NULL, 'Documento Aduanero', 'Documento Simi', NULL, '2016-02-05', NULL, 9, 4, 1, '1', 1, NULL, NULL),
(610, NULL, NULL, NULL, '2016-02-05', NULL, NULL, 'Documento Aduanero', 'Documento SIMI', NULL, '2016-02-06', NULL, 3, 4, 0, '9', 0, NULL, NULL),
(611, NULL, NULL, NULL, '2016-02-11', NULL, NULL, 'Doc Aduanero ejemplo', 'Doc Simi Ejemplo', NULL, '2016-02-08', NULL, 3, 4, 0, '10', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operation_type`
--

CREATE TABLE IF NOT EXISTS `operation_type` (
  `operationTypeId` int(1) NOT NULL AUTO_INCREMENT,
  `operation_desc` varchar(45) NOT NULL,
  PRIMARY KEY (`operationTypeId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `operation_type`
--

INSERT INTO `operation_type` (`operationTypeId`, `operation_desc`) VALUES
(1, 'exportacion'),
(2, 'importacion'),
(3, 'facturas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `section`
--

CREATE TABLE IF NOT EXISTS `section` (
  `id_section` int(3) NOT NULL AUTO_INCREMENT,
  `section_desc` varchar(45) NOT NULL,
  `ngState` varchar(45) NOT NULL,
  `section_type` varchar(45) NOT NULL,
  `icon` varchar(45) NOT NULL,
  `fileTypeId` int(10) DEFAULT NULL,
  PRIMARY KEY (`id_section`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=28 ;

--
-- Volcado de datos para la tabla `section`
--

INSERT INTO `section` (`id_section`, `section_desc`, `ngState`, `section_type`, `icon`, `fileTypeId`) VALUES
(1, 'Exportaciones', 'mylsl.export', 'Query', 'list-alt', NULL),
(2, 'Importaciones', 'mylsl.import', 'Query', 'list-alt', NULL),
(3, 'Importaciones Temp.', 'mylsl.import_temp', 'Query', 'list-alt', NULL),
(4, 'Facturas', 'mylsl.bills', 'Query', 'list-alt', NULL),
(5, 'Courrier Imp.', '.download', 'Download', 'download-alt', 2),
(6, 'Courrier Exp.', '.download', 'Download', 'download-alt', NULL),
(7, 'Honorarios', '.download', 'Download', 'download-alt', NULL),
(8, 'Tarifas', 'mylsl.fares', 'Query', 'list-alt', NULL),
(9, 'Seguimiento', '.download', 'Download', 'download-alt', 1),
(10, 'Reintegros', '.download', 'Download', 'download-alt', 3),
(11, 'LNA ARCORE', '.download', 'Download', 'download-alt', NULL),
(12, 'LNA FAPERSA', '.download', 'Download', 'download-alt', NULL),
(13, 'DJAI LNA', '.download', 'Download', 'download-alt', NULL),
(14, 'EXCEP LCM', '.download', 'Download', 'download-alt', NULL),
(15, 'Tarifas Imp.', '.download', 'Download', 'download-alt', NULL),
(16, 'Tarifas Exp.', '.download', 'Download', 'download-alt', NULL),
(17, 'Cargas', '.download', 'Download', 'download-alt', NULL),
(18, 'Otros', '.download', 'Download', 'download-alt', 4),
(19, 'LNA Imp.', '.download', 'Download', 'download-alt', NULL),
(20, 'Desc. Tarifa', '.download', 'Download', 'download-alt', NULL),
(21, 'Desc. Tarifa', '.download', 'Download', 'download-alt', NULL),
(22, 'Administrar Operaciones', 'mylsl.cpanel', 'Admin', 'list-alt', NULL),
(23, 'Administrar Usuarios', 'mylsl.cpanel_users', 'Admin', 'user', NULL),
(24, 'Administrar Clientes', 'mylsl.cpanel_clients', 'Admin', 'briefcase', NULL),
(25, 'Administrar E-Mails', 'mylsl.cpanel_emails', 'Admin', 'envelope', NULL),
(26, 'Videos', 'mylsl.videos', 'Query', 'film', NULL),
(27, 'Operaciones Lineal', 'mylsl.cpanel_lineal', 'Admin', 'list-alt', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temp_impo`
--

CREATE TABLE IF NOT EXISTS `temp_impo` (
  `temp_impoId` int(10) NOT NULL AUTO_INCREMENT,
  `ctit` varchar(65) NOT NULL,
  `start_date` datetime NOT NULL,
  `request_exp` varchar(65) NOT NULL,
  `filename` varchar(65) DEFAULT NULL,
  `fileSystemname` varchar(100) DEFAULT NULL,
  `clientId` int(20) NOT NULL,
  `deleted` int(11) NOT NULL DEFAULT '0',
  `owner` int(11) NOT NULL,
  PRIMARY KEY (`temp_impoId`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Volcado de datos para la tabla `temp_impo`
--

INSERT INTO `temp_impo` (`temp_impoId`, `ctit`, `start_date`, `request_exp`, `filename`, `fileSystemname`, `clientId`, `deleted`, `owner`) VALUES
(1, 'E 0002-00000067', '2016-02-05 00:00:00', 'Repuestos', NULL, NULL, 3, 0, 1),
(2, 'E-0990-123131', '2016-02-06 00:00:00', 'CaÃ±erias', '2015-12-29_arboles_de_decision_(4).pdf', '3652899d5ad265c6fa4578505f95ee3448c3c00f22f1037f7252e30e24a09b8f.pdf', 3, 0, 1),
(3, 'num', '2016-06-02 00:00:00', 'caÃ±os', 'AmEx_HomePageGuidelines_31313_lo-res2_5514(1).pdf', '65857f65f00c556f07d2964d644c5c126b888033201cee64bf631be042accf15.pdf', 3, 1, 1),
(4, 'CTITT', '2016-02-10 00:00:00', 'solicitud', '2015-12-29_arboles_de_decision_(2).pdf', '782838874cbed10c645d1e97c2a48914a13d23f7649a30875a2a5a3a82e25ee1.pdf', 3, 0, 9),
(5, 'fgdfhdf', '2016-02-02 00:00:00', 'asdasdasdasd', '2015-12-29_arboles_de_decision_(4).pdf', '9d3c11b9d511d69774d0892c66b3ffb50ee3e7fa8f7bf7968e585c6d64ca41aa.pdf', 3, 0, 9),
(6, 'CTIT ej', '2016-02-25 00:00:00', 'solicitud ej', '2015-12-29_arboles_de_decision_(3).pdf', '99c165aa25ef1ca5c13a4eafc655aa42c3b0b2cf9a7da311d019c7b2a308f636.pdf', 3, 0, 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `userId` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(64) NOT NULL,
  `name` varchar(65) NOT NULL,
  `role` varchar(100) NOT NULL,
  `tel` varchar(45) NOT NULL,
  `active` int(1) NOT NULL,
  `clientId` int(10) NOT NULL,
  `deleted` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`userId`, `username`, `password`, `name`, `role`, `tel`, `active`, `clientId`, `deleted`) VALUES
(1, 'admin', 'admin', 'Nicolas Sigal', '6', '153013907', 0, 1, 0),
(2, 'santiago.lloret@escosa.com', '123456', 'Santiago Lloret', '1, 2, 3, 4, 5', '11429784', 0, 2, 0),
(3, 'jas', 'adriana', 'Roberto Santos', '1, 2, 4', '4784451', 0, 3, 0),
(4, 'roberto.suarez@jas.com', '123456', 'Roberto Suarez', '1, 2, 4', '15619856198', 0, 3, 0),
(5, 'mpelufo', 'mari', 'Mariana Peluffo', '1, 2, 3, 4, 5', '011-159753', 0, 3, 0),
(6, 'paula.ruiz_deleted', '1234', 'Paula Ruiz', '1, 2, 3, 4, 5', '0261 249878', 0, 4, 1),
(7, 'paula.perez_deleted', '1234', 'Paula Perez', '1, 2, 3, 4, 5', '0261 425789', 0, 4, 1),
(8, 'santi', 'admin', 'Santiago Lloret', '1, 2, 3, 4, 5', '0261 123123123', 0, 6, 0),
(9, 'micaela@linealsoluciones.com', '1234', 'Micaela Perez', '6', '123123123', 0, 1, 0),
(10, 'nico', 'nico', 'Carlos Asrica', '6', '123456', 0, 1, 0),
(11, 'emiliano@prueba3.com', '1234', 'Emiliano Saavedra', '1, 2, 3, 4, 5', '234234234', 0, 7, 0),
(12, 'pruebaotros', '1234', 'Prueba Otros', '1, 2, 3, 4, 5', '123124', 0, 8, 0),
(13, 'capitol', 'alexandre', 'Alexandre', '1, 2, 3, 4, 5', '42133123', 0, 9, 0),
(14, 'jas2', 'adriana', 'adriana', '1, 2, 3, 4, 5', '4564564', 0, 3, 0),
(15, 'comercial', 'santiago', 'Santiago LLoret', '6', '123456', 0, 1, 0),
(16, 'publico', 'santiago', 'Santiago LLoret', '1, 2, 3, 4, 5', '1234596', 0, 3, 0),
(17, 'buhlmann', 'marina', 'Marina Buhlmenn', '1, 2, 3, 4, 5', '4567891', 0, 10, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `videos`
--

CREATE TABLE IF NOT EXISTS `videos` (
  `videoId` int(10) NOT NULL AUTO_INCREMENT,
  `clientId` int(10) NOT NULL,
  `filetitle` varchar(65) NOT NULL,
  `filename` varchar(65) NOT NULL,
  `filesSystemname` varchar(100) NOT NULL,
  `fileDesc` varchar(150) NOT NULL,
  `uploadDate` varchar(65) NOT NULL,
  `videoSrc` varchar(150) NOT NULL,
  `deleted` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`videoId`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Volcado de datos para la tabla `videos`
--

INSERT INTO `videos` (`videoId`, `clientId`, `filetitle`, `filename`, `filesSystemname`, `fileDesc`, `uploadDate`, `videoSrc`, `deleted`) VALUES
(9, 10, 'Carga de caÃ±erias buhlmann', 'buhlmann.mp4', '1ae04aec48da8a032dec2700b273e704ad5afcec6e9b622ac5902177b7f9c2ad.mp4', 'Muestra de carga de caÃ±erias buhlmann en el galpon NÂ°12311', '1454677228568', '/mylsl/files/1ae04aec48da8a032dec2700b273e704ad5afcec6e9b622ac5902177b7f9c2ad.mp4', 0),
(8, 10, 'otro ejemplo de buhlmann Titulo', 'buhlmann.mp4', '94cf9228e4c23d6e66d2544cdc0faf7c7a31547d48177f5aa71d4c22a2ba97f3.mp4', 'otro ejemplo de buhlman Descripcion', '1454677787061', '/mylsl/files/94cf9228e4c23d6e66d2544cdc0faf7c7a31547d48177f5aa71d4c22a2ba97f3.mp4', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
