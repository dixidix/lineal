<?php
require 'db.php';
$_POST = json_decode(file_get_contents('php://input'), true);
$userId =  $_POST['userId'];

MysqliDB::getInstance()->query("UPDATE users SET active = '0' WHERE userId = '" . $userId . "'");



?>