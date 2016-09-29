<?php
require 'db.php';
session_start();
$username = $_GET['user'];
$result = false;
$res = MysqliDB::getInstance()->query("SELECT * from users WHERE username = '".$username."'");
$rss = $res->fetch_array(MYSQLI_ASSOC);
if(empty($rss['username'])){
$result = false;
} else {
$result = true;
}
echo $result;
?>
