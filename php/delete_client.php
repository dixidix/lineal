<?php
require 'db.php';
session_start();
// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);

$clientId = $_POST['clientId'];

MysqliDB::getInstance()->query("UPDATE `client` SET `deleted`= 1  WHERE clientId = '".$clientId."'");
MysqliDB::getInstance()->query("UPDATE `users` SET `deleted`= 1  WHERE clientId = '".$clientId."'");
MysqliDB::getInstance()->query("UPDATE `client_email` SET `deleted`= 1  WHERE clientId = '".$clientId."'");
MysqliDB::getInstance()->query("UPDATE `document` SET `deleted`= 1  WHERE clientId = '".$clientId."'");
MysqliDB::getInstance()->query("UPDATE `operation` SET `deleted`= 1  WHERE clientId = '".$clientId."'");

?>
