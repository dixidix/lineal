<?php
require 'db.php';
session_start();
$ref = $_GET['ref_lsl'];
$result = false;
$res = MysqliDB::getInstance()->query("SELECT * from operation WHERE lsl_bill = '".$ref."' and deleted ='0'");
$rss = $res->fetch_array(MYSQLI_ASSOC);
if(empty($rss['ref_lsl'])){
  $result = false;
} else {
  $result = true;
}
echo $result;
?>
