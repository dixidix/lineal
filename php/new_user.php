<?php
require 'db.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$errors = array();

if (empty($_POST['name'])){
	$errors['nameError'] = "Nombre Inválido.";
}

if (empty($_POST['username'])){
	$errors['usernameError'] = "Usuario Inválido";
}

if (empty($_POST['tel'])){
	$errors['telError'] = "Teléfono inválido";
}
if (empty($_POST['role'])){
	$errors['roleError'] = "Roles inválidos.";
}
if (empty($_POST['client_id'])){
	$errors['clientError'] = "Cliente inválido.";
}

if (empty($_POST['password'])){
	$errors['passwordError'] = "Contraseña inválida.";
}

if (empty($errors)){

  $name = $_POST['name'];
  $username = $_POST['username'];
  $tel = $_POST['tel'];
  $role = $_POST['role'];
  $client_id = $_POST['client_id'];
  $password =  $_POST['password'];
echo
	MysqliDB::getInstance()->query("INSERT INTO `users`(`username`, `password`, `name`,`role`, `tel`, `active`, `clientId`) VALUES ('".$username."','".$password."','".$name."','".$role."','".$tel."','0','".$client_id."')");

	echo MysqliDB::getInstance()->error();
}else{
	print_r($errors);
}
?>
