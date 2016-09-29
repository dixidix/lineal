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
	$name = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['name']));
	$username = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['username']));
	$tel = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['tel']));
	$roles = $_POST['role'];
	$client_id = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['client_id']));
	$password =  MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['password']));
	echo
	MysqliDB::getInstance()->query("INSERT INTO `users`(`username`, `password`, `name`, `tel`, `active`, `clientId`) VALUES ('".$username."','".$password."','".$name."','".$tel."','0','".$client_id."')");
	$uname = MysqliDB::getInstance()->query("SELECT userId FROM users WHERE username='".$username."'");
	$rss = $uname->fetch_array(MYSQLI_ASSOC);
	$userId = $rss['userId'];
	foreach ($roles as $role) {
		echo
		MysqliDB::getInstance()->query("INSERT INTO `roles`(`userId`, `sectionId`) VALUES ('".$userId."','".$role."')");
	}
	echo MysqliDB::getInstance()->error();
}else{
	print_r($errors);
}
?>
