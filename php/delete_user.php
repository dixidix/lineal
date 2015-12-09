<?php
require 'db.php';
session_start();
// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);

$userId = $_POST['userId'];

MysqliDB::getInstance()->query("DELETE FROM users WHERE userId=" . $userId);

?>
