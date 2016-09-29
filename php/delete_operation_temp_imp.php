<?php
require 'db.php';
session_start();
// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);
$temp_impoId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['temp_impoId']));
MysqliDB::getInstance()->query("UPDATE `temp_impo` SET `deleted`= 1 WHERE temp_impoId=" . $temp_impoId);
?>
