<?php
require 'db.php';

session_start();
$cuit = $_GET['cuit'];

$res = MysqliDB::getInstance()->query("SELECT * from client WHERE cuit = '".$cuit."'");
$rss = $res->fetch_array(MYSQLI_ASSOC);

if(empty($rss['cuit'])){
  echo false;
} else {
  echo true;
}

?>
