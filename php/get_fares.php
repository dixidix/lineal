<?php
require 'db.php';
session_start();
$id_client = $_GET['client_id'];
$res = MysqliDB::getInstance()->query("SELECT * FROM fares WHERE clientId='".$id_client."' and deleted=0");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"faresId":"'  . $rs["faresId"].'",';
    $outp .= '"start":"'  . $rs["start"].'",';
    $outp .= '"end":"'  . $rs["end"].'",';
    $outp .= '"fare":"'   . $rs["fare"].'"}';
}
$outp ='{"fares":['.$outp.']}';
echo($outp);
?>
