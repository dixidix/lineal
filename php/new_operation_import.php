<?php
require 'db.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$errors = array();

if (empty($_POST['ref_cliente'])){
	$errors['refClienteError'] = "ref Cliente inválida.";
}

if (empty($_POST['merchandise'])){
	$errors['merchandiseError'] = "mercadería inválida.";
}

if (empty($_POST['transport'])){
	$errors['transportError'] = "Transporte inválido.";
}

if (empty($_POST['shipment_origin'])){
	$errors['shipmentOriginError'] = "Fecha de origen de embarque inválida.";
}
if (empty($_POST['estimated_arrival'])){
	$errors['estimatedArrivalError'] = "Arribo estimado inválido.";
}
if (empty($_POST['custom_document'])){
	$errors['customDocumentError'] = "Documento aduanero inválido.";
}
if (empty($_POST['custom_document_djai'])){
	$errors['customDocumentDjaiError'] = "Documento DJAI inválido.";
}
if (empty($_POST['arrival_date'])){
	$errors['arrivalDateError'] = "Fecha de arribo inválida.";
}
if (empty($_POST['release_date'])){
	$errors['releaseDateError'] = "Fecha de liberación inválida.";
}
if (empty($_POST['lsl_bill'])){
	$errors['lslBillError'] = "Factura lsl inválida.";
}

if (empty($errors)){
  
  $shipment_origin = date("Y-m-d", strtotime($_POST['shipment_origin']));
  $estimated_arrival = date("Y-m-d", strtotime($_POST['estimated_arrival']));
  $arrival_date = date("Y-m-d", strtotime($_POST['arrival_date']));
  $release_date = date("Y-m-d", strtotime($_POST['release_date']));
    
  $ref_client = $_POST['ref_cliente'];
  $merchandise = $_POST['merchandise'];
  $transport= $_POST['transport'];
  $custom_doc = $_POST['custom_document'];
  $custom_doc_djai = $_POST['custom_document_djai'];
  $lsl_bill = $_POST['lsl_bill'];
  $client_id = $_POST['client_id'];
  $op_type = $_POST['op_type'];
echo 
	MysqliDB::getInstance()->query("INSERT INTO `operation` (`ref_lsl`,`ref_client`, `merchandise`, `transport`,`shipment`, `shipment_origin`, `estimated_arrival`, `custom_document`, `custom_document_djai`, `arrival_date`, `release_date`, `lsl_bill`, `clientId`, `operationTypeId`) VALUES (null,'".$ref_client."','".$merchandise."','".$transport."',null,'".$shipment_origin."','".$estimated_arrival."','".$custom_doc."','".$custom_doc_djai."','".$arrival_date."','".$release_date."','".$lsl_bill."','".$client_id."','".$op_type."')");

	echo MysqliDB::getInstance()->error();
}else{
	print_r($errors);
}
?>