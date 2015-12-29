<?php
require 'db.php';

//$_POST = json_decode(file_get_contents('php://input'), true);

$errors = array();

if (empty($_POST['name_desc'])){
	$errors['name_descError'] = "Nombre Inválido.";
}

if (empty($_POST['address'])){
	$errors['addressError'] = "Dirección Inválida.";
}

if (empty($_POST['manager'])){
	$errors['managerError'] = "Encargado Inválido";
}

if (empty($_POST['tel'])){
	$errors['telError'] = "Teléfono inválido";
}
if (empty($_POST['fax'])){
	$errors['faxError'] = "Fax inválido.";
}
if (empty($_POST['web'])){
	$errors['webError'] = "web inválida.";
}

if (empty($_FILES['logo'])){
	$errors['logoError'] = "Logo inválido.";
}
if (empty($_POST['cuit'])){
	$errors['cuitError'] = "Cuit invalido.";
}

if (empty($errors)){

  $name_desc = $_POST['name_desc'];
  $address = $_POST['address'];
  $manager = $_POST['manager'];
  $tel = $_POST['tel'];
  $fax = $_POST['fax'];
  $web = $_POST['web'];
	$cuit =  $_POST['cuit'];

	$file_name = $_FILES['logo']['name'];
	$file_name = str_replace(' ', '_', $file_name);
	$file_size =$_FILES['logo']['size'];
	$file_tmp = $_FILES['logo']['tmp_name'];
	$file_type =$_FILES['logo']['type'];
	$file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));


	$tmp_path= "../logos/".$name_desc."/".$file_name;
	$path = "logos/".$name_desc."/".$file_name;


	if(!file_exists("../logos/".$name_desc."/")){
		mkdir("../logos/".$name_desc."/");
		if(!empty($_FILES['logo'])){
		move_uploaded_file($file_tmp, "$tmp_path");
		}
	}else{
		if(!empty($_FILES['logo'])){
		move_uploaded_file($file_tmp, "$tmp_path");
		}
	}

echo MysqliDB::getInstance()->query("INSERT INTO `client`(`name_desc`, `address`, `manager`, `tel`, `fax`, `web`, `clientLogoPath`, `cuit`) VALUES ('".$name_desc."','".$address."','".$manager."','".$tel."','".$fax."','".$web."','".$path."','".$cuit."')");
	echo MysqliDB::getInstance()->error();

$uname = MysqliDB::getInstance()->query("SELECT clientId FROM client WHERE cuit='".$cuit."'");
$rss = $uname->fetch_array(MYSQLI_ASSOC);
$client_id = $rss['clientId'];

mkdir("../files/".$client_id."/");
mkdir("../files/".$client_id."/operations/");
mkdir("../files/".$client_id."/operations/1/");
mkdir("../files/".$client_id."/operations/2/");
mkdir("../files/".$client_id."/documents/");
mkdir("../files/".$client_id."/documents/courrier_imp/");
mkdir("../files/".$client_id."/documents/reintegros/");
mkdir("../files/".$client_id."/documents/seguimiento/");
}else{
	print_r($errors);
}

?>
