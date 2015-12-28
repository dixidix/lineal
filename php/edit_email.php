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

  $name = $_POST['name'];
  $email = $_POST['email'];
  $client_id = $_POST['client_id'];
  $emailId = $_POST['emailId'];


	MysqliDB::getInstance()->query("UPDATE `client_email` SET `clientId`='".$client_id."',`email`='".$email."',`name`='".$name."' WHERE `emailId` = '".$emailId."'");
}
?>
