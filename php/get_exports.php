<?php
require 'db.php';

session_start();

$res = MysqliDB::getInstance()->query(" SELECT * from operation where clientId='2' and operationTypeId='1'");

$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"ref_lsl":"'  . $rs["ref_lsl"].'",';
    $outp .= '"ref_client":"'   . $rs["ref_client"] .'",';
    $outp .= '"merchandise":"'   . $rs["merchandise"].'",';
    $outp .= '"shipment":"'   . $rs["shipment"].'",';
    $outp .= '"custom_document":"'   . $rs["custom_document"].'",';
    $outp .= '"lsl_bill":"'. $rs["lsl_bill"].'"}'; 
}
$outp ='{"operations_exp":['.$outp.']}';

echo($outp);
?>