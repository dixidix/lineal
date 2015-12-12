<?php
require 'db.php';

session_start();

$res = MysqliDB::getInstance()->query("SELECT * from client");
$outp="";

while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}


    $outp .= '{"id":"'  . $rs["clientId"].'",';
    $outp .= '"name_desc":"'   . $rs["name_desc"] .'",';
    $outp .= '"address":"'   . $rs["address"].'",';
    $outp .= '"manager":"'   . $rs["manager"].'",';
    $outp .= '"tel":"'   . $rs["tel"].'",';
    $outp .= '"fax":"'   . $rs["fax"].'",';
    $outp .= '"web":"'   . $rs["web"].'",';
    $outp .= '"logo":"'   . $rs["clientLogoPath"].'",';
    $ress = MysqliDB::getInstance()->query("SELECT * from client_email where clientId = ".$rs["clientId"]."");
    $a=array();
    while($rss = $ress->fetch_array(MYSQLI_ASSOC)) {
    array_push($a, $rss["email"]);
    }
    $emails = implode(", ", $a);
    $outp .= '"emails":"'   . $emails .'",';
    $outp .= '"cuit":"'   . $rs["cuit"].'"}';

}
$outp ='{"clients":['.$outp.']}';

echo($outp);
?>
