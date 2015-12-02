<?php
require 'db.php';

session_start();

$res = MysqliDB::getInstance()->query("SELECT * from operation where clientId='1' and operationTypeId='2'");

$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"ref_lsl":"'  . $rs["ref_lsl"].'",';
    $outp .= '"ref_client":"'   . $rs["ref_client"] .'",';
    $outp .= '"merchandise":"'   . $rs["merchandise"].'",';
    $outp .= '"transport":"'   . $rs["transport"].'",';
    $outp .= '"shipment_origin":"'   . $rs["shipment_origin"].'",';
    $outp .= '"estimated_arrival":"'   . $rs["estimated_arrival"].'",';
    $outp .= '"custom_document":"'   . $rs["custom_document"].'",';
    $outp .= '"custom_document_djai":"'   . $rs["custom_document_djai"].'",';
    $outp .= '"arrival_date":"'   . $rs["arrival_date"].'",';
    $outp .= '"release_date":"'   . $rs["release_date"].'",';
    $outp .= '"lsl_bill":"'. $rs["lsl_bill"].'"}'; 
}
$outp ='{"operations_imp":['.$outp.']}';

echo($outp);
?>