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
  $client_id = $_POST['client_id'];
  $op_type = $_POST['op_type'];
echo 
	MysqliDB::getInstance()->query("INSERT INTO `operation` (`ref_lsl`,`ref_client`, `merchandise`, `transport`,`shipment`, `shipment_origin`, `estimated_arrival`, `custom_document`, `custom_document_djai`, `arrival_date`, `release_date`, `lsl_bill`, `clientId`, `operationTypeId`) VALUES (null,'".$ref_client."','".$merchandise."',null,'".$shipment."',null,null,'".$custom_doc."',null,null,null,'".$lsl_bill."','".$client_id."','".$op_type."')");

	echo MysqliDB::getInstance()->error();
}else{
	print_r($errors);
}
?>