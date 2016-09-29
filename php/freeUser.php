<?php
require 'db.php';
$_POST = json_decode(file_get_contents('php://input'), true);
$userId =  MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['userId']));
MysqliDB::getInstance()->query("UPDATE users SET active = '0' WHERE userId = '" . $userId . "'");
?>