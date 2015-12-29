<?php
require 'db.php';

//$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();

if (empty($_POST['client_id'])){
	$errors['refClientError'] = "ref Cliente inválida.";
}

if (empty($_POST['doc_type'])){
	$errors['doc_typeError'] = "tipo de documento inválido.";
}


if (empty($_POST['upload_date'])){
	$errors['upload_dateError'] = "Fecha inválida.";
}

if (empty($_FILES['client_file'])){
	$errors['client_fileError'] = "Archivo inválido.";
}


if (empty($errors)){


	$file_name = $_FILES['client_file']['name'];
	$file_name = str_replace(' ', '_', $file_name);
	$file_size =$_FILES['client_file']['size'];
	$file_tmp = $_FILES['client_file']['tmp_name'];
	$file_type =$_FILES['client_file']['type'];
	$file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

  $date = $_POST['upload_date'];

  $client_id = $_POST['client_id'];
  $doc_type = $_POST['doc_type'];


	$tmp_path= "../files/".$client_id."/documents/".$doc_type."/".$file_name;

	$path = "/lineal/files/".$client_id."/documents/".$doc_type."/".$file_name;


	if(!file_exists("../files/".$client_id."/documents/".$doc_type."/")){
		mkdir("../files/".$client_id."/documents/".$doc_type."/");
		if(!empty($_FILES['client_file'])){

		move_uploaded_file($file_tmp, "$tmp_path");

		}
	}else{
		if(!empty($_FILES['client_file'])){

		move_uploaded_file($file_tmp, "$tmp_path");
		}
	}

if(!empty($_FILES['client_file'])){
	MysqliDB::getInstance()->query("INSERT INTO `document`( `clientId`, `document_path`, `document_ext`, `doc_type`, `upload_date`) VALUES ('" . $client_id . "','" . $path . "','" . $file_ext . "','".$doc_type."','".$date."')");
	echo MysqliDB::getInstance()->error();
}


}else{
	print_r($errors);
}
?>
