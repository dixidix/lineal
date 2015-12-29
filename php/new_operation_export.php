<?php
require 'db.php';

//$_POST = json_decode(file_get_contents('php://input'), true);
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

if($_FILES['file_exp_pdf']['type'] != "application/pdf"){
		$errors['typePdfError'] = "El archivo no es PDF";
}
if($_FILES['file_exp_fcl']['type'] != "application/pdf"){
		$errors['typePdfError'] = "El archivo no es PDF";
}

if (empty($errors)){


	$file_name_pdf = $_FILES['file_exp_pdf']['name'];
	$file_name_pdf = str_replace(' ', '_', $file_name_pdf);
	$file_size_pdf =$_FILES['file_exp_pdf']['size'];
	$file_tmp_pdf = $_FILES['file_exp_pdf']['tmp_name'];
	$file_type_pdf =$_FILES['file_exp_pdf']['type'];
	$file_ext_pdf = strtolower(pathinfo($file_name_pdf, PATHINFO_EXTENSION));


	$file_name_fcl = $_FILES['file_exp_fcl']['name'];
	$file_name_fcl = str_replace(' ', '_', $file_name_fcl);
	$file_size_fcl =$_FILES['file_exp_fcl']['size'];
	$file_tmp_fcl = $_FILES['file_exp_fcl']['tmp_name'];
	$file_type_fcl =$_FILES['file_exp_fcl']['type'];
	$file_ext_fcl = strtolower(pathinfo($file_name_fcl, PATHINFO_EXTENSION));

  $shipment = date("Y-m-d", strtotime($_POST['shipment']));

  $ref_client = $_POST['ref_client'];
  $merchandise = $_POST['merchandise'];
  $custom_doc = $_POST['custom_document'];
  $lsl_bill = $_POST['lsl_bill'];
  $client_id = $_POST['client_id'];
  $op_type = $_POST['op_type'];
	$tmp_path_pdf = "../files/".$client_id."/operations/".$op_type."/".$ref_client."/". $file_name_pdf;
	$tmp_path_fcl = "../files/".$client_id."/operations/".$op_type."/".$ref_client."/". $file_name_fcl;
	$path_pdf = "/lineal/files/".$client_id."/operations/".$op_type."/".$ref_client."/". $file_name_pdf;
	$path_fcl = "/lineal/files/".$client_id."/operations/".$op_type."/".$ref_client."/". $file_name_fcl;

	if(!file_exists("../files/".$client_id."/operations/".$op_type."/".$ref_client."/")){
		mkdir("../files/".$client_id."/operations/".$op_type."/".$ref_client."/");
		if(!empty($_FILES['file_exp_pdf'])){
		move_uploaded_file($file_tmp_pdf, "$tmp_path_pdf");
		}
		if(!empty($_FILES['file_exp_fcl'])){
		move_uploaded_file($file_tmp_fcl, "$tmp_path_fcl");
		}
	}else{
		if(!empty($_FILES['file_exp_pdf'])){
		move_uploaded_file($file_tmp_pdf, "$tmp_path_pdf");
		}
		if(!empty($_FILES['file_exp_fcl'])){
		move_uploaded_file($file_tmp_fcl, "$tmp_path_fcl");
		}
	}

echo
	MysqliDB::getInstance()->query("INSERT INTO `operation` (`ref_lsl`,`ref_client`, `merchandise`, `transport`,`shipment`, `shipment_origin`, `estimated_arrival`, `custom_document`, `custom_document_djai`, `arrival_date`, `release_date`, `lsl_bill`, `clientId`, `operationTypeId`) VALUES (null,'".$ref_client."','".$merchandise."',null,'".$shipment."',null,null,'".$custom_doc."',null,null,null,'".$lsl_bill."','".$client_id."','".$op_type."')");

	echo MysqliDB::getInstance()->error();

	$res = MysqliDB::getInstance()->query("SELECT ref_lsl FROM operation WHERE ref_client='". $ref_client . "'");
	$rss = $res->fetch_array(MYSQLI_ASSOC);
	$ref_lsl = $rss['ref_lsl'];

if(!empty($_FILES['file_exp_pdf'])){
	MysqliDB::getInstance()->query("INSERT INTO `document`(`clientId`, `operationTypeId`, `ref_lsl`, `document_path`, `document_ext`, `doc_type`) VALUES ('" . $client_id . "','" . $op_type . "','" . $ref_lsl . "','" . $path_pdf . "','" . $file_ext_pdf . "','pdf')");
	echo MysqliDB::getInstance()->error();
}

if(!empty($_FILES['file_exp_fcl'])){
	MysqliDB::getInstance()->query("INSERT INTO `document`(`clientId`,`operationTypeId`, `ref_lsl`, `document_path`, `document_ext`, `doc_type`) VALUES ('" . $client_id . "','" . $op_type . "','" . $ref_lsl . "','" . $path_fcl . "','" . $file_ext_fcl . "','fcl')");
	echo MysqliDB::getInstance()->error();
}

}else{
	print_r($errors);
}
?>
