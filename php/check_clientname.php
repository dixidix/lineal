<?php
require 'db.php';
session_start();
$client = $_GET['client'];
$result = false;
$res = MysqliDB::getInstance()->query("SELECT * from client WHERE name_desc = '".$client."'");
$rss = $res->fetch_array(MYSQLI_ASSOC);
if(empty($rss['name_desc'])){
$result = false;
} else {
$result = true;
}
echo $result;
?>
