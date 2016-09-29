<?php
require 'db.php';
session_start();
// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);
$ref_lsl = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['ref_lsl']));
$milliseconds = round(microtime(true) * 1000);
MysqliDB::getInstance()->query("UPDATE `operation` SET `deleted`= 1, ref_client= concat(ref_client, '_deleted_".$milliseconds."') WHERE ref_lsl=" . $ref_lsl);
?>
