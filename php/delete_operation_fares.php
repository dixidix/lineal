<?php
require 'db.php';
session_start();
// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);
$fareId =MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['fareId']));
MysqliDB::getInstance()->query("UPDATE `fares` SET `deleted`= 1 WHERE faresId=" . $fareId);
?>
