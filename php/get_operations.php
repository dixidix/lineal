<?php
require 'db.php';

session_start();
$client_id = $_GET['client_id'];
$optype = $_GET['op_type'];

$res = MysqliDB::getInstance()->query("SELECT * from operation where clientId='". $client_id ."' and operationTypeId='". $optype ."' and deleted=0");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $shipment_origin = date("d-m-Y", strtotime($rs["shipment_origin"]));
    $shipment = date("d-m-Y", strtotime($rs["shipment"]));
    $estimated_arrival = date("d-m-Y", strtotime($rs["estimated_arrival"]));
    $arrival_date = date("d-m-Y", strtotime($rs["arrival_date"]));
    $release_date = date("d-m-Y", strtotime($rs["release_date"]));

    $outp .= '{"ref_lsl":"'  . $rs["ref_lsl"].'",';
    $outp .= '"ref_client":"'   . $rs["ref_client"] .'",';
    $outp .= '"merchandise":"'   . $rs["merchandise"].'",';
    $outp .= '"transport":"'   . $rs["transport"].'",';
    $outp .= '"shipment":"'   . $shipment .'",';
    $outp .= '"shipment_origin":"'   . $shipment_origin .'",';
    $outp .= '"estimated_arrival":"'   . $estimated_arrival .'",';
    $outp .= '"custom_document":"'   . $rs["custom_document"].'",';
    $outp .= '"custom_document_djai":"'   . $rs["custom_document_djai"].'",';
    $outp .= '"arrival_date":"'   . $arrival_date .'",';
    $outp .= '"release_date":"'   . $release_date .'",';
    $outp .= '"opTypeId":"'   . $rs["operationTypeId"] .'",';
    $outp .= '"lsl_bill":"'. $rs["lsl_bill"].'"}';
}
$outp ='{"operations":['.$outp.']}';

echo($outp);
?>
