<?php
require 'db.php';
session_start();
// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);
$emailId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['emailId']));
$milliseconds = round(microtime(true) * 1000);
MysqliDB::getInstance()->query("UPDATE `client_email`  SET `deleted`= 1,email= concat(email, '_deleted_".$milliseconds."') WHERE emailId=" . $emailId);
?>
