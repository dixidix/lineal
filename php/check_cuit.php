<?php
require 'db.php';
session_start();
$cuit = $_GET['cuit'];
$result = false;
$res = MysqliDB::getInstance()->query("SELECT * from client WHERE cuit = '".$cuit."'");
$rss = $res->fetch_array(MYSQLI_ASSOC);
if(empty($rss['cuit'])){
  $result = false;
} else {
  $result = true;
}
echo $result;
?>
