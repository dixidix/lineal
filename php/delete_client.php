<?php
require 'db.php';
session_start();
// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);
$clientId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['clientId']));
$milliseconds = round(microtime(true) * 1000);
MysqliDB::getInstance()->query("UPDATE `client` SET `deleted`= 1,name_desc= concat(name_desc, '_deleted_".$milliseconds."')  WHERE clientId = '".$clientId."'");
MysqliDB::getInstance()->query("UPDATE `users` SET `deleted`= 1,username= concat(username, '_deleted_".$milliseconds."')  WHERE clientId = '".$clientId."'");
MysqliDB::getInstance()->query("UPDATE `client_email` SET `deleted`= 1,email= concat(email, '_deleted_".$milliseconds."')   WHERE clientId = '".$clientId."'");
MysqliDB::getInstance()->query("UPDATE `document` SET `deleted`= 1  WHERE clientId = '".$clientId."'");
MysqliDB::getInstance()->query("UPDATE `operation` SET `deleted`= 1, ref_client= concat(ref_client, '_deleted_".$milliseconds."')  WHERE clientId = '".$clientId."'");
MysqliDB::getInstance()->query("UPDATE `fares` SET `deleted`= 1  WHERE clientId = '".$clientId."'");
MysqliDB::getInstance()->query("UPDATE `videos` SET `deleted`= 1  WHERE clientId = '".$clientId."'");
MysqliDB::getInstance()->query("UPDATE `files` SET `deleted`= 1  WHERE clientId = '".$clientId."'");
MysqliDB::getInstance()->query("UPDATE `temp_impo` SET `deleted`= 1  WHERE clientId = '".$clientId."'");
?>
