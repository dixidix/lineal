<?php
require 'db.php';
$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();


$errors = array();

if (empty($_POST['name_desc'])){
	$errors['name_descError'] = "Nombre Inválido.";
}

if (empty($_POST['address'])){
	$errors['addressError'] = "Dirección Inválida.";
}

if (empty($_POST['manager'])){
	$errors['managerError'] = "Encargado Inválido";
}

if (empty($_POST['tel'])){
	$errors['telError'] = "Teléfono inválido";
}
if (empty($_POST['fax'])){
	$errors['faxError'] = "Fax inválido.";
}
if (empty($_POST['web'])){
	$errors['webError'] = "web inválida.";
}

if (empty($_POST['logo'])){
	$errors['logoError'] = "Logo inválido.";
}
if (empty($_POST['cuit'])){
	$errors['cuitError'] = "Cuit invalido.";
}

if (empty($errors)){

  $clientId = $_POST['clientId'];
  $name_desc = $_POST['name_desc'];
  $address = $_POST['address'];
  $manager = $_POST['manager'];
  $tel = $_POST['tel'];
  $fax = $_POST['fax'];
  $web = $_POST['web'];
  $logo =  $_POST['logo'];
	$cuit =  $_POST['cuit'];
	$emails = $_POST['emails'];

	MysqliDB::getInstance()->query("UPDATE `client` SET `name_desc`='".$name_desc."',`address`='".$address."',`manager`='".$manager."',`tel`='".$tel."',`fax`='".$fax."',`web`='".$web."',`clientLogoPath`='".$logo."',`cuit`='".$cuit."' WHERE clientId = '".$clientId."'");

  foreach ($emails as $email) {
	MysqliDB::getInstance()->query("UPDATE `client_email` SET `email`=[value-3] WHERE 1");
  }	
}
?>
