<?php
require 'db.php';
session_start();
// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);

$ref_lsl = $_POST['ref_lsl'];

MysqliDB::getInstance()->query("DELETE FROM operation WHERE ref_lsl=" . $ref_lsl);

?>