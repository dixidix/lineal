<?php
require 'db.php';
$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();
if (empty($_POST['ref_client'])){
	$errors['refClientError'] = "ref Cliente inválida.";
}

if (empty($_POST['merchandise'])){
	$errors['merchandiseError'] = "mercadería inválida.";
}


if (empty($_POST['shipment'])){
	$errors['shipmentError'] = "Fecha de embarque inválida.";
}

if (empty($_POST['custom_document'])){
	$errors['customDocumentError'] = "Documento aduanero inválido.";
}

if (empty($_POST['lsl_bill'])){
	$errors['lslBillError'] = "Factura lsl inválida.";
}

if (empty($errors)){
  
  $shipment = date("Y-m-d", strtotime($_POST['shipment']));
    
  $ref_client = $_POST['ref_client'];
  $merchandise = $_POST['merchandise'];
  $custom_doc = $_POST['custom_document'];
  $lsl_bill = $_POST['lsl_bill'];
  $ref_lsl = $_POST['ref_lsl'];
  
	MysqliDB::getInstance()->query("UPDATE `operation` SET `ref_client`='".$ref_client."',`merchandise`='".$merchandise."',`shipment`='".$shipment."',`custom_document`='".$custom_doc."',`lsl_bill`='".$lsl_bill."' WHERE `ref_lsl` = '".$ref_lsl."'");
}
?>