<?php
require 'db.php';

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

if(empty($errors)){

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
  $ref_lsl = $_POST['ref_lsl'];
	$client_id = $_POST['client_id'];
	$prev_ref_client = $_POST['prev_ref_client'];


	$file_name_pdf = $_FILES['file_imp_pdf']['name'];
	$file_name_pdf = str_replace(' ', '_', $file_name_pdf);
	$file_size_pdf =$_FILES['file_imp_pdf']['size'];
	$file_tmp_pdf = $_FILES['file_imp_pdf']['tmp_name'];
	$file_type_pdf =$_FILES['file_imp_pdf']['type'];
	$file_ext_pdf = strtolower(pathinfo($file_name_pdf, PATHINFO_EXTENSION));


	$file_name_fcl = $_FILES['file_imp_fcl']['name'];
	$file_name_fcl = str_replace(' ', '_', $file_name_fcl);
	$file_size_fcl =$_FILES['file_imp_fcl']['size'];
	$file_tmp_fcl = $_FILES['file_imp_fcl']['tmp_name'];
	$file_type_fcl =$_FILES['file_imp_fcl']['type'];
	$file_ext_fcl = strtolower(pathinfo($file_name_fcl, PATHINFO_EXTENSION));

	$tmp_path_pdf = "../files/".$client_id."/operations/".$op_type."/".$ref_client."/". $file_name_pdf;
	$tmp_path_fcl = "../files/".$client_id."/operations/".$op_type."/".$ref_client."/". $file_name_fcl;
	$path_pdf = "/lineal/files/".$client_id."/operations/".$op_type."/".$ref_client."/". $file_name_pdf;
	$path_fcl = "/lineal/files/".$client_id."/operations/".$op_type."/".$ref_client."/". $file_name_fcl;


	if(!file_exists("../files/".$client_id."/operations/".$op_type."/".$ref_client."/")){
		mkdir("../files/".$client_id."/operations/".$op_type."/".$ref_client."/");
		if(!empty($_FILES['file_imp_pdf'])){
		move_uploaded_file($file_tmp_pdf, "$tmp_path_pdf");
		}
		if(!empty($_FILES['file_imp_fcl'])){
		move_uploaded_file($file_tmp_fcl, "$tmp_path_fcl");
		}
	}else{
		if(!empty($_FILES['file_imp_pdf'])){
		move_uploaded_file($file_tmp_pdf, "$tmp_path_pdf");
		}
		if(!empty($_FILES['file_imp_fcl'])){
		move_uploaded_file($file_tmp_fcl, "$tmp_path_fcl");
		}
	}

	if(!empty($_FILES['file_imp_pdf'])){
		MysqliDB::getInstance()->query("UPDATE `document` SET `document_path`='".$path_pdf."' WHERE ref_lsl='".$ref_lsl."' and doc_type='pdf'");
		echo MysqliDB::getInstance()->error();
	}

	if(!empty($_FILES['file_imp_fcl'])){
		MysqliDB::getInstance()->query("UPDATE `document` SET `document_path`='".$path_fcl."' WHERE ref_lsl='".$ref_lsl."' and doc_type='fcl'");
		echo MysqliDB::getInstance()->error();
	}

	MysqliDB::getInstance()->query("UPDATE `operation` SET `ref_client`='".$ref_client."',`merchandise`='".$merchandise."',`transport`='".$transport."',`shipment_origin`='".$shipment_origin."',`estimated_arrival`='".$estimated_arrival."',`custom_document`='".$custom_doc."',`custom_document_djai`='".$custom_doc_djai."',`arrival_date`='".$arrival_date."',`release_date`='".$release_date."',`lsl_bill`='".$lsl_bill."' WHERE `ref_lsl` = '".$ref_lsl."'");

	rename("../files/".$client_id."/operations/2/".$prev_ref_client."","../files/".$client_id."/operations/2/".$ref_client."");

}
?>
