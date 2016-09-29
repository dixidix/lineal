<?php 
require 'db.php';
//$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();
if (empty($_POST['clientId'])){
	$errors['clientIdError'] = "Ingrese un id de cliente";
}
if (empty($_POST['fileTypeId'])){
	$errors['fileTypeIdError'] = "Ingrese un tipo de archivo";
}
if (empty($_POST['uploadDate'])){
	$errors['uploadDateError'] = "ingrese una fecha de subida";
}
if (empty($_POST['timeStamp'])){
	$errors['timeStampError'] = "ingrese una fecha de subida";
}
if (empty($_FILES['client_file'])){
	$errors['clientFileError'] = "Archivo vacio";
}
if (empty($errors)){
	$clientId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['clientId']));
	$fileTypeId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['fileTypeId']));
	$uploadDate = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['uploadDate']));
	$filename = $_FILES['client_file']['name'];
	$ext = pathinfo($filename, PATHINFO_EXTENSION);
	$timestamp = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['timeStamp']));
	$fileSystemname = $filename . $timestamp;
	$fileSystemname = hash('sha256', $fileSystemname);
	$fileSystemname = "$fileSystemname.$ext";
	$file_tmp = $_FILES['client_file']['tmp_name'];
	$tmp_path= "../files/".$fileSystemname;	
	if(!file_exists("../files/")){
		mkdir("../files/");	
		if(!empty($_FILES['client_file'])){	
			move_uploaded_file($file_tmp, "$tmp_path");
		}
	}else{	
		if(!empty($_FILES['client_file'])){
			move_uploaded_file($file_tmp, "$tmp_path");
		}
	}
	if(!empty($_FILES['client_file'])){	
		MysqliDB::getInstance()->query("INSERT INTO `files`(`clientId`, `operationId`, `fileTypeId`, `filename`, `fileSystemname`, `uploadDate`, `extension`, `deleted`) VALUES  ('".$clientId."',NULL,'".$fileTypeId."','".$filename."','".$fileSystemname."','".$uploadDate."','".$ext."', 0)");
		echo MysqliDB::getInstance()->error();
	}
}else{	
	print_r($errors);
}
?>