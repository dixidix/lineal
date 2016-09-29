	<?php
	require 'db.php';
	$_POST = json_decode(file_get_contents('php://input'), true);
	$errors = array();
	if (empty($_POST['ownerId'])){
		$errors['ownerId'] = "ownerId inválida.";
	}
	if (empty($_POST['clientId'])){
		$errors['clientId'] = "clientId inválido.";
	}
	if (empty($errors)){
		$release_date = date("Y-m-d", strtotime($_POST['release_date']));
		$shipment = date("Y-m-d", strtotime($_POST['shipment']));
		$ownerId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['ownerId']));
		if(!is_numeric($ownerId)){
			$ownerId = 1;
		}
		$clientId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['clientId']));
		$custom_doc= MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['custom_document']));
		$simi_doc = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['simi_document']));
		echo
		MysqliDB::getInstance()->query("INSERT INTO `operation` (`ref_lsl`,`ref_client`, `merchandise`, `transport`,`shipment`,`shipment_origin`, `estimated_arrival`, `custom_document`, `custom_document_djai`, `arrival_date`, `release_date`,`lsl_bill`, `clientId`, `operationTypeId`,`owner`,`funding_request_date`, `recived_funds_date`) VALUES (null,null,null,null,'".$shipment."',null,null,'".$custom_doc."','".$simi_doc."',null,'".$release_date."',null,'".$clientId."','27','".$ownerId."',null,null)");
		echo MysqliDB::getInstance()->error();
		
	}else{
		print_r($errors);
	}
	?>
