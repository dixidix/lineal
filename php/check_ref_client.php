<?php
require 'db.php';
session_start();
$ref = $_GET['ref_client'];
$result = false;
$res = MysqliDB::getInstance()->query("SELECT * from operation WHERE ref_client = '".$ref."' and deleted ='0'");
$rss = $res->fetch_array(MYSQLI_ASSOC);
if(empty($rss['ref_client'])){
  $result = false;
} else {
  $result = true;
}
echo $result;
?>
