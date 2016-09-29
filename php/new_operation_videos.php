<?php
require 'db.php';
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
//$_POST = json_decode(file_get_contents('php://input'), true);
$errors = array();
if (empty($_POST['fileTitle'])){
	$errors['fileTitle'] = "fileTitle inválida.";
}
if (empty($_POST['fileDesc'])){
	$errors['fileDesc'] = "fileDesc inválida.";
}
if (empty($_POST['clientId'])){
	$errors['clientId'] = "clientId inválida.";
}
if (empty($_POST['timeStamp'])){
	$errors['timeStamp'] = "timeStamp inválida.";
}
if (empty($errors)){
	$fileTitle = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['fileTitle']));
	$fileDesc = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['fileDesc']));
	$clientId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['clientId']));
	$timestamp = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['timeStamp']));
	if(!empty($_FILES['clientVideo'])){
		$file_name = $_FILES['clientVideo']['name'];
		$file_name = str_replace(' ', '_', $file_name);
		$file_size =$_FILES['clientVideo']['size'];
		$file_tmp = $_FILES['clientVideo']['tmp_name'];
		$file_type =$_FILES['clientVideo']['type'];
		$file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
		$timestamp = $_POST['timeStamp'];
		$fileSystemname = $file_name . $timestamp;
		$fileSystemname= hash('sha256', $fileSystemname);
		$fileSystemname = "$fileSystemname.$file_ext";
		$tmp_path = "../files/".$fileSystemname;
		$path = "/mylsl/files/".$fileSystemname;
	}
	
	if(!file_exists("../files/")){
		mkdir("../files/");
		if(!empty($_FILES['clientVideo'])){
			move_uploaded_file($file_tmp, "$tmp_path");
		}
	}else{
		if(!empty($_FILES['clientVideo'])){
			move_uploaded_file($file_tmp, "$tmp_path");
		}
	}
	if(!empty($_FILES['clientVideo'])){
		MysqliDB::getInstance()->query("INSERT INTO `videos`(`clientId`, `filetitle`, `filename`, `filesSystemname`,`fileDesc`,`uploadDate`, `videoSrc`)
			VALUES ('" . $clientId . "','" . $fileTitle . "','" . $file_name . "','" . $fileSystemname . "','" . $fileDesc . "','" . $timestamp . "','" . $path . "')");
		echo MysqliDB::getInstance()->error();
	}
}else{
	print_r($errors);
}
?>
