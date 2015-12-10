<?php
require 'db.php';
$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();

if (empty($_POST['name'])){
	$errors['nameError'] = "Nombre Inválido.";
}

if (empty($_POST['surname'])){
	$errors['surnameError'] = "Apellido Inválido.";
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
  $surname = $_POST['surname'];
  $username = $_POST['username'];
  $tel = $_POST['tel'];
  $role = $_POST['role'];
  $client_id = $_POST['client_id'];
  $userId = $_POST['userId'];

	MysqliDB::getInstance()->query("UPDATE `users` SET `username`='".$username."',`name`='".$name."',`surname`='".$surname."',`role`='".$role."',`tel`='".$tel."',`clientId`='".$client_id."' WHERE `userId` = '".$userId."'");
}
?>
