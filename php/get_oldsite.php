<?php
require 'db.php';
session_start();
$client_id = $_GET['client_id'];
$user_id = $_GET['user_id'];
$res = MysqliDB::getInstance()->query("SELECT users.oldUser, users.oldPassword, client.oldSiteUrl FROM users left join client ON users.clientId=client.clientId  where userId = '".$user_id."' AND client.clientId ='".$client_id."'");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"oldUser":"'  . $rs["oldUser"].'",';
    $outp .= '"oldPassword":"'   . $rs["oldPassword"] .'",';
    $outp .= '"oldSiteUrl":"'. $rs["oldSiteUrl"].'"}';
}
$outp ='{"oldSite":['.$outp.']}';
echo($outp);
?>
