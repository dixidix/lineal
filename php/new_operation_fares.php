<?php
require 'db.php';
	//$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();
if (empty($_POST['start'])){
	$errors['startError'] = "tarifa 'Desde' inválida.";
}
if (empty($_POST['end'])){
	$errors['endError'] = "tarifa 'hasta' inválida.";
}
if (empty($_POST['fare'])){
	$errors['fareError'] = "tarifa inválida.";
}
if (empty($_POST['clientId'])){
	$errors['clientIdError'] = "id cliente inválida.";
}
if (empty($errors)){
	$start = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['start']));
	$end = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['end']));
	$fare = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['fare']));
	$clientId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['clientId']));
	echo
	MysqliDB::getInstance()->query("INSERT INTO `fares`(`start`, `end`, `fare`, `clientId`) VALUES  ('".$start."','".$end."','".$fare."','".$clientId."')");
	echo MysqliDB::getInstance()->error();
}else{
	print_r($errors);
}
?>
