<?php
require 'db.php';
session_start();
// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);

$emailId = $_POST['emailId'];

MysqliDB::getInstance()->query("UPDATE `client_email` SET `deleted`= 1 WHERE emailId=" . $emailId);

?>
