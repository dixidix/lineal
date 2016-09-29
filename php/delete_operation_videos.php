<?php
require 'db.php';
session_start();
// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);
$videoId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['videoId']));
MysqliDB::getInstance()->query("UPDATE `videos` SET `deleted`= 1 WHERE videoId=" . $videoId);
?>
