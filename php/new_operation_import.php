	<?php	require 'db.php';
	// $_POST = json_decode(file_get_contents('php://input'), true);
	$errors = array();
	if (empty($_POST['ref_cliente'])){
		$errors['refClienteError'] = "ref Cliente inválida.";
	}
	if (empty($_POST['owner'])){
		$errors['ownerError'] = "Owner Inválido.";
	}
	if(!empty($_FILES['file_imp_pdf'])){
		if($_FILES['file_imp_pdf']['type'] != "application/pdf"){
			$errors['typePdfError'] = "El archivo no es PDF";
		}
	}
	if(!empty($_FILES['file_imp_fcl'])){
		if($_FILES['file_imp_fcl']['type'] != "application/pdf"){
			$errors['typePdfError'] = "El archivo no es PDF";
		}
	}
	if(!empty($_FILES['file_imp_simi'])){
		if($_FILES['file_imp_simi']['type'] != "application/pdf"){
			$errors['typePdfError'] = "El archivo no es PDF";
		}
	}
	if(!empty($_FILES['file_imp_reqfound'])){
		if($_FILES['file_imp_reqfound']['type'] != "application/pdf"){
			$errors['typePdfError'] = "El archivo no es PDF";
		}
	}
	if (empty($_POST['timeStamp'])){
		$errors['timeStampError'] = "ingrese una fecha de subida";
	}
	if (empty($errors)){
		$shipment_origin = date("Y-m-d", strtotime($_POST['shipment_origin']));
		$estimated_arrival = date("Y-m-d", strtotime($_POST['estimated_arrival']));
		$arrival_date = date("Y-m-d", strtotime($_POST['arrival_date']));
		$release_date = date("Y-m-d", strtotime($_POST['release_date']));
		$request_funding = date("Y-m-d", strtotime($_POST['request_funding']));
		$recived_funds = date("Y-m-d", strtotime($_POST['recived_funds']));
		$ref_client = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['ref_cliente']));
		$operation_number = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['operation_number']));
		$merchandise = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['merchandise']));
		$transport= MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['transport']));
		$custom_doc = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['custom_document']));
		$custom_doc_djai = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['custom_document_djai']));
		$lsl_bill = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['lsl_bill']));
		$client_id = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['client_id']));
		$op_type = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['op_type']));
		$owner = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['owner']));
		if(!empty($_FILES['file_imp_pdf'])){
			$file_name_pdf = $_FILES['file_imp_pdf']['name'];
			$file_name_pdf = str_replace(' ', '_', $file_name_pdf);
			$file_size_pdf =$_FILES['file_imp_pdf']['size'];
			$file_tmp_pdf = $_FILES['file_imp_pdf']['tmp_name'];
			$file_type_pdf =$_FILES['file_imp_pdf']['type'];
			$file_ext_pdf = strtolower(pathinfo($file_name_pdf, PATHINFO_EXTENSION));
			$timestamp = $_POST['timeStamp'];
			$fileSystemname_pdf = $file_name_pdf . $timestamp;
			$fileSystemname_pdf = hash('sha256', $fileSystemname_pdf);
			$fileSystemname_pdf = "$fileSystemname_pdf.$file_ext_pdf";
			$tmp_path_pdf = "../files/".$fileSystemname_pdf;
			$path_pdf = "/mylsl/files/".$fileSystemname_pdf;
		}
		if(!empty($_FILES['file_imp_fcl'])){
			$file_name_fcl = $_FILES['file_imp_fcl']['name'];
			$file_name_fcl = str_replace(' ', '_', $file_name_fcl);
			$file_size_fcl =$_FILES['file_imp_fcl']['size'];
			$file_tmp_fcl = $_FILES['file_imp_fcl']['tmp_name'];
			$file_type_fcl =$_FILES['file_imp_fcl']['type'];
			$file_ext_fcl = strtolower(pathinfo($file_name_fcl, PATHINFO_EXTENSION));
			$timestamp = $_POST['timeStamp'];
			$fileSystemname_fcl = $file_name_fcl . $timestamp;
			$fileSystemname_fcl = hash('sha256', $fileSystemname_fcl);
			$fileSystemname_fcl = "$fileSystemname_fcl.$file_ext_fcl";
			$tmp_path_fcl = "../files/".$fileSystemname_fcl;
			$path_fcl = "/mylsl/files/".$fileSystemname_fcl;
		}
		if(!empty($_FILES['file_imp_simi'])){
			$file_name_simi = $_FILES['file_imp_simi']['name'];
			$file_name_simi = str_replace(' ', '_', $file_name_simi);
			$file_size_simi =$_FILES['file_imp_simi']['size'];
			$file_tmp_simi = $_FILES['file_imp_simi']['tmp_name'];
			$file_type_simi =$_FILES['file_imp_simi']['type'];
			$file_ext_simi = strtolower(pathinfo($file_name_simi, PATHINFO_EXTENSION));
			$timestamp = $_POST['timeStamp'];
			$fileSystemname_simi = $file_name_simi . $timestamp;
			$fileSystemname_simi = hash('sha256', $fileSystemname_simi);
			$fileSystemname_simi = "$fileSystemname_simi.$file_ext_simi";
			$tmp_path_simi = "../files/".$fileSystemname_simi;
			$path_simi = "/mylsl/files/".$fileSystemname_simi;
		}
		if(!empty($_FILES['file_imp_reqfound'])){
			$file_name_reqfound = $_FILES['file_imp_reqfound']['name'];
			$file_name_reqfound = str_replace(' ', '_', $file_name_reqfound);
			$file_size_reqfound =$_FILES['file_imp_reqfound']['size'];
			$file_tmp_reqfound = $_FILES['file_imp_reqfound']['tmp_name'];
			$file_type_reqfound =$_FILES['file_imp_reqfound']['type'];
			$file_ext_reqfound = strtolower(pathinfo($file_name_reqfound, PATHINFO_EXTENSION));
			$timestamp = $_POST['timeStamp'];
			$fileSystemname_reqfound = $file_name_reqfound . $timestamp;
			$fileSystemname_reqfound = hash('sha256', $fileSystemname_reqfound);
			$fileSystemname_reqfound = "$fileSystemname_reqfound.$file_ext_reqfound";
			$tmp_path_reqfound = "../files/".$fileSystemname_reqfound;
			$path_reqfound = "/mylsl/files/".$fileSystemname_reqfound;
		}
		if(!file_exists("../files/")){
			mkdir("../files/");
			if(!empty($_FILES['file_imp_pdf'])){
				move_uploaded_file($file_tmp_pdf, "$tmp_path_pdf");
			}
			if(!empty($_FILES['file_imp_fcl'])){
				move_uploaded_file($file_tmp_fcl, "$tmp_path_fcl");
			}
			if(!empty($_FILES['file_imp_simi'])){
				move_uploaded_file($file_tmp_simi, "$tmp_path_simi");
			}
			if(!empty($_FILES['file_imp_reqfound'])){
				move_uploaded_file($file_tmp_reqfound, "$tmp_path_reqfound");
			}
		}
		else{
			if(!empty($_FILES['file_imp_pdf'])){
				move_uploaded_file($file_tmp_pdf, "$tmp_path_pdf");
			}
			if(!empty($_FILES['file_imp_fcl'])){
				move_uploaded_file($file_tmp_fcl, "$tmp_path_fcl");
			}
			if(!empty($_FILES['file_imp_simi'])){
				move_uploaded_file($file_tmp_simi, "$tmp_path_simi");
			}
			if(!empty($_FILES['file_imp_reqfound'])){
				move_uploaded_file($file_tmp_reqfound, "$tmp_path_reqfound");
			}
		}
		echo
		MysqliDB::getInstance()->query("INSERT INTO `operation` (`ref_lsl`,`ref_client`,`operation_number`, `merchandise`, `transport`,`shipment`, `shipment_origin`, `estimated_arrival`, `custom_document`, `custom_document_djai`, `arrival_date`, `release_date`, `lsl_bill`, `clientId`, `operationTypeId`,`owner`,`funding_request_date`, `recived_funds_date`) VALUES (null,'".$ref_client."','".$operation_number."','".$merchandise."','".$transport."',null,'".$shipment_origin."','".$estimated_arrival."','".$custom_doc."','".$custom_doc_djai."','".$arrival_date."','".$release_date."','".$lsl_bill."','".$client_id."','".$op_type."','".$owner."','".$request_funding."','".$recived_funds."')");
		echo
		MysqliDB::getInstance()->error();
		$res = MysqliDB::getInstance()->query("SELECT ref_lsl FROM operation WHERE ref_client='". $ref_client . "'");
		$rss = $res->fetch_array(MYSQLI_ASSOC);
		$ref_lsl = $rss['ref_lsl'];
		if(!empty($_FILES['file_imp_pdf'])){
			MysqliDB::getInstance()->query("INSERT INTO `document`(`clientId`, `operationTypeId`, `ref_lsl`, `document_path`,`document_name`, `document_ext`, `doc_type`) VALUES ('" . $client_id . "','" . $op_type . "','" . $ref_lsl . "','" . $path_pdf . "','" . $file_name_pdf . "','" . $file_ext_pdf . "','pdf')");
			echo
			MysqliDB::getInstance()->error();
		}
		else{
			MysqliDB::getInstance()->query("INSERT INTO `document`(`clientId`, `operationTypeId`, `ref_lsl`, `doc_type`) VALUES ('" . $client_id . "','" . $op_type . "','" . $ref_lsl . "','pdf')");
			echo
			MysqliDB::getInstance()->error();
		}
		if(!empty($_FILES['file_imp_fcl'])){
			MysqliDB::getInstance()->query("INSERT INTO `document`(`clientId`,`operationTypeId`, `ref_lsl`, `document_path`,`document_name`,  `document_ext`, `doc_type`) VALUES ('" . $client_id . "','" . $op_type . "','" . $ref_lsl . "','" . $path_fcl . "','" . $file_name_fcl . "','" . $file_ext_fcl . "','fcl')");
			echo
			MysqliDB::getInstance()->error();
		}
		else{
			MysqliDB::getInstance()->query("INSERT INTO `document`(`clientId`,`operationTypeId`, `ref_lsl`, `doc_type`) VALUES ('" . $client_id . "','" . $op_type . "','" . $ref_lsl . "','fcl')");
			echo
			MysqliDB::getInstance()->error();
		}
		if(!empty($_FILES['file_imp_simi'])){
			MysqliDB::getInstance()->query("INSERT INTO `document`(`clientId`,`operationTypeId`, `ref_lsl`, `document_path`,`document_name`, `document_ext`, `doc_type`) VALUES ('" . $client_id . "','" . $op_type . "','" . $ref_lsl . "','" . $path_simi . "','" . $file_name_simi . "','" . $file_ext_simi . "','simi')");
			echo
			MysqliDB::getInstance()->error();
		}
		else{
			MysqliDB::getInstance()->query("INSERT INTO `document`(`clientId`,`operationTypeId`, `ref_lsl`, `doc_type`) VALUES ('" . $client_id . "','" . $op_type . "','" . $ref_lsl . "','simi')");
			echo
			MysqliDB::getInstance()->error();
		}
		if(!empty($_FILES['file_imp_reqfound'])){
			MysqliDB::getInstance()->query("INSERT INTO `document`(`clientId`,`operationTypeId`, `ref_lsl`, `document_path`,`document_name`, `document_ext`, `doc_type`) VALUES ('" . $client_id . "','" . $op_type . "','" . $ref_lsl . "','" . $path_reqfound . "','" . $file_name_reqfound . "','" . $file_ext_reqfound . "','reqfound')");
			echo
			MysqliDB::getInstance()->error();
		}
		else{
			MysqliDB::getInstance()->query("INSERT INTO `document`(`clientId`,`operationTypeId`, `ref_lsl`, `doc_type`) VALUES ('" . $client_id . "','" . $op_type . "','" . $ref_lsl . "','reqfound')");
			echo
			MysqliDB::getInstance()->error();
		}
	}
	else{
		print_r($errors);
	}
	?>