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
if (empty($_POST['fareId'])){
	$errors['fareIdError'] = "id tarifa inválida.";
}
if (empty($errors)){

	$start = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['start']));
	$end = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['end']));
	$fare = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['fare']));
	$fareId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['fareId']));
	MysqliDB::getInstance()->query("UPDATE `fares` SET `start`='".$start."',`end`='".$end."',`fare`='".$fare."' WHERE `faresId` = '".$fareId."'");
}else{
	print_r($errors);
}
?>
