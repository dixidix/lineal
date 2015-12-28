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


if (empty($errors)){

  $name = $_POST['name'];
  $email = $_POST['email'];
  $client_id = $_POST['client_id'];

echo
	MysqliDB::getInstance()->query("INSERT INTO `client_email`(`clientId`, `email`, `name`) VALUES ('".$client_id."','".$email."','".$name."')");

	echo MysqliDB::getInstance()->error();
}else{
	print_r($errors);
}
?>
