	<?php
require 'db.php';
	//$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();
if (empty($_POST['ctit'])){
	$errors['ctit'] = "ctit inválida.";
}
if (empty($_POST['start_date'])){
	$errors['start_date'] = "start_date inválida.";
}
if (empty($_POST['request_exp'])){
	$errors['request_exp'] = "request_exp Inválido.";
}
if(!empty($_FILES['file_ctit'])){
	if($_FILES['file_ctit']['type'] != "application/pdf"){
		$errors['file_ctit'] = "El archivo no es PDF";
	}
}
if (empty($_POST['timeStamp'])){
	$errors['timeStampError'] = "ingrese una fecha de subida";
}
if (empty($errors)){
	$ctit = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['ctit']));
	$start_date = date("Y-m-d", strtotime($_POST['start_date']));
	$client_id = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['clientId']));
	$request_exp = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['request_exp']));
	$ownerId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['ownerId']));
	if(!is_numeric($ownerId)){
		$ownerId = 1;
	}
	if(!empty($_FILES['file_ctit'])){
		$file_name_pdf = $_FILES['file_ctit']['name'];
		$file_name_pdf = str_replace(' ', '_', $file_name_pdf);
		$file_size_pdf =$_FILES['file_ctit']['size'];
		$file_tmp_pdf = $_FILES['file_ctit']['tmp_name'];
		$file_type_pdf =$_FILES['file_ctit']['type'];
		$file_ext_pdf = strtolower(pathinfo($file_name_pdf, PATHINFO_EXTENSION));
		$timestamp = $_POST['timeStamp'];
		$fileSystemname_pdf = $file_name_pdf . $timestamp;
		$fileSystemname_pdf = hash('sha256', $fileSystemname_pdf);
		$fileSystemname_pdf = "$fileSystemname_pdf.$file_ext_pdf";
		$tmp_path_pdf = "../files/".$fileSystemname_pdf;
		$path_pdf = "/mylsl/files/".$fileSystemname_pdf;
	}
	if(!file_exists("../files/")){
		mkdir("../files/");
		if(!empty($_FILES['file_ctit'])){
			move_uploaded_file($file_tmp_pdf, "$tmp_path_pdf");
		}
	}else{
		if(!empty($_FILES['file_ctit'])){
			move_uploaded_file($file_tmp_pdf, "$tmp_path_pdf");
		}
	}
	echo
	MysqliDB::getInstance()->query("INSERT INTO `temp_impo`(`ctit`, `start_date`, `request_exp`, `filename`, `fileSystemname`, `clientId`, `owner`) 
		VALUES ('".$ctit."','".$start_date."','".$request_exp."','".$file_name_pdf."','".$fileSystemname_pdf."','".$client_id."','".$ownerId."')");
	echo MysqliDB::getInstance()->error();	  
	
}else{
	print_r($errors);
}
?>
