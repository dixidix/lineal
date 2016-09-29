<?php
require 'db.php';
$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();
if (empty($_POST['ownerId'])){
	$errors['ownerId'] = "ownerId inválida.";
}

if (empty($_POST['clientId'])){
	$errors['clientId'] = "clientId inválido.";
}

if (empty($errors)){
	$release_date = date("Y-m-d", strtotime($_POST['release_date']));
	$shipment = date("Y-m-d", strtotime($_POST['shipment']));
	$ownerId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['ownerId']));
	if(!is_numeric($ownerId)){
		$ownerId = 1;
	}
	$clientId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['clientId']));
	$custom_doc= MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['custom_document']));
	$simi_doc = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['simi_document']));
	$ref_lsl = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['ref_lsl']));
	$op_state = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['op_state']));
	MysqliDB::getInstance()->query("UPDATE `operation` SET `shipment`='".$shipment."',`clientId`='".$clientId."',`release_date`='".$release_date."',`owner`='".$ownerId."',`custom_document`='".$custom_doc."',`custom_document_djai`='".$simi_doc."',`operation_state`='".$op_state."' WHERE `ref_lsl` = '".$ref_lsl."'");
}
?>
