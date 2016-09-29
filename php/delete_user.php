<?php
require 'db.php';
session_start();
// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);
$userId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['userId']));
$milliseconds = round(microtime(true) * 1000);
MysqliDB::getInstance()->query("UPDATE `users` SET `deleted`= 1,username= concat(username, '_deleted_".$milliseconds."') WHERE userId=" . $userId);
MysqliDB::getInstance()->query("UPDATE `operation` SET `owner`= 1 WHERE userId=" . $userId);
MysqliDB::getInstance()->query("DELETE FROM `roles` WHERE `userId` = '".$userId."'");
?>
