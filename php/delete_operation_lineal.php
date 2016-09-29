<?php
require 'db.php';
session_start();
// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);
$ref_lsl = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['ref_lsl']));
MysqliDB::getInstance()->query("UPDATE `operation` SET `deleted`= 1 WHERE ref_lsl=" . $ref_lsl);
?>
