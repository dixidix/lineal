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
echo $_POST['role'];
if (empty($_POST['role'])){
	$errors['roleError'] = "Debe seleccionar al menos un rol de usuario.";
}
if (empty($_POST['client_id'])){
	$errors['clientError'] = "Cliente inválido.";
}
if (empty($errors)){
	$name = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['name']));
	$username = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['username']));
	$tel = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['tel']));
	$roles = $_POST['role'];
	$client_id = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['client_id']));
	$userId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['userId']));
	MysqliDB::getInstance()->query("UPDATE `users` SET `username`='".$username."',`name`='".$name."',`tel`='".$tel."',`clientId`='".$client_id."' WHERE `userId` = '".$userId."'");
	if(!empty($_POST['password'])){
		MysqliDB::getInstance()->query("UPDATE `users` SET `password`='".$_POST['password']."' WHERE `userId` = '".$userId."'");
	}
	MysqliDB::getInstance()->query("DELETE FROM `roles` WHERE `userId` = '".$userId."'");
	foreach ($roles as $role) {
		echo
		MysqliDB::getInstance()->query("INSERT INTO `roles`(`userId`, `sectionId`) VALUES ('".$userId."','".$role."')");
	}
}else{
	print_r($errors);
}
?>
