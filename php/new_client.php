<?php
require 'db.php';

$_POST = json_decode(file_get_contents('php://input'), true);

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

if (empty($_POST['logo'])){
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
  $logo =  $_POST['logo'];
	$cuit =  $_POST['cuit'];
	$emails = $_POST['emails'];


echo MysqliDB::getInstance()->query("INSERT INTO `client`(`name_desc`, `address`, `manager`, `tel`, `fax`, `web`, `clientLogoPath`, `cuit`) VALUES ('".$name_desc."','".$address."','".$manager."','".$tel."','".$fax."','".$web."','".$logo."','".$cuit."')");
	echo MysqliDB::getInstance()->error();


}else{
	print_r($errors);
}

$res = MysqliDB::getInstance()->query("SELECT clientId FROM client WHERE name_desc='" . $_POST['name_desc']."'");

while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
	$clientId = $rs["clientId"];
}

	foreach ($emails as $email) {
		echo MysqliDB::getInstance()->query("INSERT INTO `client_email`(`clientId`, `email`) VALUES ('".$clientId."','".$email."')");
		echo MysqliDB::getInstance()->error();
	}


?>
