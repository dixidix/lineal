<?php
require 'db.php';
session_start();
$compare_date = date("d-m-Y", strtotime('1970-01-01'));
$res = MysqliDB::getInstance()->query("SELECT * from operation where operationTypeId='27' and deleted=0");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}

    $getClient = MysqliDB::getInstance()->query("SELECT name_desc FROM client WHERE clientId=" . $rs["clientId"]);
    $result = $getClient->fetch_array(MYSQLI_ASSOC);

    $release_date = date("d-m-Y", strtotime($rs["release_date"]));
    $shipment = date("d-m-Y", strtotime($rs["shipment"]));
    $outp .= '{"ref_lsl":"'  . $rs["ref_lsl"].'",';
    $outp .= '"custom_document":"'   . $rs["custom_document"] .'",'; 
    if($shipment != $compare_date){
        $outp .= '"shipment":"'   . $shipment .'",';
    }else{
        $shipment = "";
        $outp .= '"shipment":"'   . $shipment .'",';
    }  
    $outp .= '"clientId":"'   . $rs["clientId"] .'",';
    $outp .= '"client_name":"'   . $result["name_desc"] .'",';    
    $outp .= '"simi_document":"'   . $rs["custom_document_djai"] .'",';
    $outp .= '"operation_state":"'   . $rs["operation_state"] .'",';
    if(!empty($rs["owner"])){
        $uname = MysqliDB::getInstance()->query("SELECT name FROM users WHERE userId=" . $rs["owner"]);
        $rss = $uname->fetch_array(MYSQLI_ASSOC);
        $outp .= '"ownerId":"'   . $rs["owner"] .'",';
        $outp .= '"owner":"'   . $rss["name"] .'",';
    }
    if($release_date != $compare_date){
    $outp .= '"release_date":"'. $release_date .'"}';
    }else{
        $release_date = "";
        $outp .= '"release_date":"'   . $release_date .'"}';
    } 
}
$outp ='{"op_lineal":['.$outp.']}';
echo($outp);
?>
