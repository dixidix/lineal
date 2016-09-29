<?php
require 'db.php';
//$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();
if (empty($_POST['lsl_bill'])){
	$errors['lslBillError'] = "Factura lsl inválida.";
}
if (empty($_POST['owner'])){
	$errors['ownerError'] = "Owner Inválido.";
}
if(!empty($_FILES['file_bills_pdf'])){
	if($_FILES['file_bills_pdf']['type'] != "application/pdf"){
		$errors['typePdfError'] = "El archivo no es PDF";
	}
}
if(!empty($_FILES['file_bills_fcl'])){
	if($_FILES['file_bills_fcl']['type'] != "application/pdf"){
		$errors['typePdfError'] = "El archivo no es PDF";
	}
}
if(!empty($_FILES['file_bills_simi'])){
	if($_FILES['file_bills_simi']['type'] != "application/pdf"){
		$errors['typePdfError'] = "El archivo no es PDF";
	}
}
if (empty($_POST['timeStamp'])){
	$errors['timeStampError'] = "ingrese una fecha de subida";
}
if (empty($errors)){
	$merchandise = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['merchandise']));
	$lsl_bill = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['lsl_bill']));
	$client_id = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['client_id']));
	$op_type = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['op_type']));
	$owner = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['owner']));
	$op_state = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['operation_state']));
	$ref_lsl = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['ref_lsl']));
	if(!empty($_FILES['file_bills_pdf'])){
		$file_name_pdf = $_FILES['file_bills_pdf']['name'];
		$file_name_pdf = str_replace(' ', '_', $file_name_pdf);
		$file_size_pdf =$_FILES['file_bills_pdf']['size'];
		$file_tmp_pdf = $_FILES['file_bills_pdf']['tmp_name'];
		$file_type_pdf =$_FILES['file_bills_pdf']['type'];
		$file_ext_pdf = strtolower(pathinfo($file_name_pdf, PATHINFO_EXTENSION));
		$timestamp = $_POST['timeStamp'];
		$fileSystemname_pdf = $file_name_pdf . $timestamp;
		$fileSystemname_pdf = hash('sha256', $fileSystemname_pdf);
		$fileSystemname_pdf = "$fileSystemname_pdf.$file_ext_pdf";
		$tmp_path_pdf = "../files/".$fileSystemname_pdf;
		$path_pdf = "/mylsl/files/".$fileSystemname_pdf;
	}
	if(!empty($_FILES['file_bills_fcl'])){
		$file_name_fcl = $_FILES['file_bills_fcl']['name'];
		$file_name_fcl = str_replace(' ', '_', $file_name_fcl);
		$file_size_fcl =$_FILES['file_bills_fcl']['size'];
		$file_tmp_fcl = $_FILES['file_bills_fcl']['tmp_name'];
		$file_type_fcl =$_FILES['file_bills_fcl']['type'];
		$file_ext_fcl = strtolower(pathinfo($file_name_fcl, PATHINFO_EXTENSION));
		$timestamp = $_POST['timeStamp'];
		$fileSystemname_fcl = $file_name_fcl . $timestamp;
		$fileSystemname_fcl = hash('sha256', $fileSystemname_fcl);
		$fileSystemname_fcl = "$fileSystemname_fcl.$file_ext_fcl";
		$tmp_path_fcl = "../files/".$fileSystemname_fcl;
		$path_fcl = "/mylsl/files/".$fileSystemname_fcl;
	}
	if(!empty($_FILES['file_bills_simi'])){
		$file_name_simi = $_FILES['file_bills_simi']['name'];
		$file_name_simi = str_replace(' ', '_', $file_name_simi);
		$file_size_simi =$_FILES['file_bills_simi']['size'];
		$file_tmp_simi = $_FILES['file_bills_simi']['tmp_name'];
		$file_type_simi =$_FILES['file_bills_simi']['type'];
		$file_ext_simi = strtolower(pathinfo($file_name_simi, PATHINFO_EXTENSION));
		$timestamp = $_POST['timeStamp'];
		$fileSystemname_simi = $file_name_simi . $timestamp;
		$fileSystemname_simi = hash('sha256', $fileSystemname_simi);
		$fileSystemname_simi = "$fileSystemname_simi.$file_ext_simi";
		$tmp_path_simi = "../files/".$fileSystemname_simi;
		$path_simi = "/mylsl/files/".$fileSystemname_simi;
	}
	if(!file_exists("../files/")){
		mkdir("../files/");
		if(!empty($_FILES['file_bills_pdf'])){
			move_uploaded_file($file_tmp_pdf, "$tmp_path_pdf");
		}
		if(!empty($_FILES['file_bills_fcl'])){
			move_uploaded_file($file_tmp_fcl, "$tmp_path_fcl");
		}
		if(!empty($_FILES['file_bills_simi'])){
			move_uploaded_file($file_tmp_simi, "$tmp_path_simi");
		}
	}else{
		if(!empty($_FILES['file_bills_pdf'])){
			move_uploaded_file($file_tmp_pdf, "$tmp_path_pdf");
		}
		if(!empty($_FILES['file_bills_fcl'])){
			move_uploaded_file($file_tmp_fcl, "$tmp_path_fcl");
		}
		if(!empty($_FILES['file_bills_simi'])){
			move_uploaded_file($file_tmp_simi, "$tmp_path_simi");
		}
	}
	if(!empty($_FILES['file_bills_pdf'])){
		MysqliDB::getInstance()->query("UPDATE `document` SET `document_path`='".$path_pdf."',`document_name`='".$file_name_pdf."' WHERE ref_lsl='".$ref_lsl."' and doc_type='pdf'");
		echo MysqliDB::getInstance()->error();
	}
	if(!empty($_FILES['file_bills_fcl'])){
		MysqliDB::getInstance()->query("UPDATE `document` SET `document_path`='".$path_fcl."',`document_name`='".$file_name_fcl."' WHERE ref_lsl='".$ref_lsl."' and doc_type='fcl'");
		echo MysqliDB::getInstance()->error();
	}
	if(!empty($_FILES['file_bills_simi'])){
		MysqliDB::getInstance()->query("UPDATE `document` SET `document_path`='".$path_simi."',`document_name`='".$file_name_simi."' WHERE ref_lsl='".$ref_lsl."' and doc_type='simi'");
		echo MysqliDB::getInstance()->error();
	}
	MysqliDB::getInstance()->query("UPDATE `operation` SET `merchandise`='".$merchandise."',`owner`='".$owner."',`lsl_bill`='".$lsl_bill."',`operation_state`='".$op_state."' WHERE `ref_lsl` = '".$ref_lsl."'");
}else{
	print_r($errors);
}
?>
