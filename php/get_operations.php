<?php
require 'db.php';

session_start();
$client_id = $_GET['client_id'];
$optype = $_GET['op_type'];

$res = MysqliDB::getInstance()->query("SELECT * from operation where clientId='". $client_id ."' and operationTypeId='". $optype ."'");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}

  
    $outp .= '{"ref_lsl":"'  . $rs["ref_lsl"].'",';
    $outp .= '"ref_client":"'   . $rs["ref_client"] .'",';
    $outp .= '"merchandise":"'   . $rs["merchandise"].'",';
    $outp .= '"transport":"'   . $rs["transport"].'",';
    $outp .= '"shipment":"'   . $rs["shipment"] .'",';
    $outp .= '"shipment_origin":"'   . $rs["shipment_origin"] .'",';
    $outp .= '"estimated_arrival":"'   . $rs["estimated_arrival"] .'",';
    $outp .= '"custom_document":"'   . $rs["custom_document"].'",';
    $outp .= '"custom_document_djai":"'   . $rs["custom_document_djai"].'",';
    $outp .= '"arrival_date":"'   . $rs["arrival_date"] .'",';
    $outp .= '"release_date":"'   . $rs["release_date"] .'",';
    $outp .= '"opTypeId":"'   . $rs["operationTypeId"] .'",';
    $outp .= '"lsl_bill":"'. $rs["lsl_bill"].'"}'; 
}
$outp ='{"operations":['.$outp.']}';

echo($outp);
?>