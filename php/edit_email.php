<?php
require 'db.php';
$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();
if (empty($_POST['name'])){
	$errors['nameError'] = "Nombre Inválido.";
}
if (empty($_POST['email'])){
	$errors['emailError'] = "Correo Inválido";
}
if (empty($_POST['client_id'])){
	$errors['clientError'] = "Cliente inválido.";
}
if (empty($_POST['emailId'])){
	$errors['emailIdError'] = "No se ha encontrado el correo.";
}
if (empty($errors)){
  $name = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['name']));
  $email = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['email']));
  $client_id = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['client_id']));
  $emailId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['emailId']));
	MysqliDB::getInstance()->query("UPDATE `client_email` SET `clientId`='".$client_id."',`email`='".$email."',`name`='".$name."' WHERE `emailId` = '".$emailId."'");
}
?>
