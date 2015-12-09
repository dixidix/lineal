<?php
require 'db.php';

session_start();

$res = MysqliDB::getInstance()->query("SELECT * from client");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}

  
    $outp .= '{"id":"'  . $rs["clientId"].'",';
    $outp .= '"name":"'   . $rs["name_desc"] .'",';
    $outp .= '"username":"'   . $rs["username"].'",';
    $outp .= '"address":"'   . $rs["address"].'",';
    $outp .= '"manager":"'   . $rs["manager"].'",';
    $outp .= '"tel":"'   . $rs["tel"].'",';
    $outp .= '"fax":"'   . $rs["fax"].'",';
    $outp .= '"web":"'   . $rs["web"].'",';
    $outp .= '"logo":"'   . $rs["clientLogoPath"].'",';
    $outp .= '"cuit":"'   . $rs["cuit"].'"}'; 

}
$outp ='{"clients":['.$outp.']}';

echo($outp);
?>