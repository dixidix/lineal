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

if (empty($errors)){

  $shipment = date("Y-m-d", strtotime($_POST['shipment']));

  $ref_client = $_POST['ref_client'];
  $merchandise = $_POST['merchandise'];
  $custom_doc = $_POST['custom_document'];
  $lsl_bill = $_POST['lsl_bill'];
  $ref_lsl = $_POST['ref_lsl'];
	$client_id = $_POST['client_id'];
	$prev_ref_client = $_POST['prev_ref_client'];
	$op_type = $_POST['op_type'];
	
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

	if(!empty($_FILES['file_exp_pdf'])){
		MysqliDB::getInstance()->query("UPDATE `document` SET `document_path`='".$path_pdf."' WHERE ref_lsl='".$ref_lsl."' and doc_type='pdf'");
		echo MysqliDB::getInstance()->error();
	}

	if(!empty($_FILES['file_exp_fcl'])){
		MysqliDB::getInstance()->query("UPDATE `document` SET `document_path`='".$path_fcl."' WHERE ref_lsl='".$ref_lsl."' and doc_type='fcl'");
		echo MysqliDB::getInstance()->error();
	}


	MysqliDB::getInstance()->query("UPDATE `operation` SET `ref_client`='".$ref_client."',`merchandise`='".$merchandise."',`shipment`='".$shipment."',`custom_document`='".$custom_doc."',`lsl_bill`='".$lsl_bill."' WHERE `ref_lsl` = '".$ref_lsl."'");

		rename("../files/".$client_id."/operations/1/".$prev_ref_client."","../files/".$client_id."/operations/1/".$ref_client."");
}
?>
