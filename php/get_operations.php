<?php
require 'db.php';
session_start();
$client_id = $_GET['client_id'];
$optype = $_GET['op_type'];
$compare_date = date("d-m-Y", strtotime('1970-01-01'));
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
    $outp .= '"operation_number":"'   . $rs["operation_number"] .'",';
    $outp .= '"client_id":"'   . $client_id .'",';
    $outp .= '"merchandise":"'   . $rs["merchandise"].'",';
    $outp .= '"transport":"'   . $rs["transport"].'",';
    if($shipment != $compare_date){
        $outp .= '"shipment":"'   . $shipment .'",';
    }else{
        $shipment = "";
        $outp .= '"shipment":"'   . $shipment .'",';
    }
    if($shipment_origin != $compare_date){
       $outp .= '"shipment_origin":"'   . $shipment_origin .'",';
   }else{
    $shipment_origin = "";
    $outp .= '"shipment_origin":"'   . $shipment_origin .'",';
    }
    if($estimated_arrival != $compare_date){
        $outp .= '"estimated_arrival":"'   . $estimated_arrival .'",';
    }else{
        $estimated_arrival = "";
        $outp .= '"estimated_arrival":"'   . $estimated_arrival .'",';
    }
    $outp .= '"custom_document":"'   . $rs["custom_document"].'",';
    $outp .= '"custom_document_djai":"'   . $rs["custom_document_djai"].'",';
    if($arrival_date != $compare_date){
       $outp .= '"arrival_date":"'   . $arrival_date .'",';
    }else{
        $arrival_date = "";
        $outp .= '"arrival_date":"'   . $arrival_date .'",';
    }
    if($release_date != $compare_date){
       $outp .= '"release_date":"'   . $release_date .'",';
    }else{
        $release_date = "";
        $outp .= '"release_date":"'   . $release_date .'",';
    }    
if(!empty($rs["funding_request_date"])){
    $request_funding_date = date("d-m-Y", strtotime($rs["funding_request_date"]));
    if($request_funding_date != $compare_date){
        $outp .= '"request_funding_date":"'   . $request_funding_date .'",';
    }else{
        $request_funding_date = "";
        $outp .= '"request_funding_date":"'   . $request_funding_date .'",';
    }
}else{
    $request_funding_date = "";
    $outp .= '"request_funding_date":"'   . $request_funding_date .'",';
}
if(!empty($rs["recived_funds_date"])){
    $recived_funds_date = date("d-m-Y", strtotime($rs["recived_funds_date"]));
    if($recived_funds_date != $compare_date){
        $outp .= '"recived_funds_date":"'   . $recived_funds_date .'",';
    }else{
        $recived_funds_date = "";
        $outp .= '"recived_funds_date":"'   . $recived_funds_date .'",';
    }
}else{
    $recived_funds_date = "";
    $outp .= '"recived_funds_date":"'   . $recived_funds_date .'",';
}
$outp .= '"opTypeId":"'   . $rs["operationTypeId"] .'",';
$outp .= '"operation_state":"'   . $rs["operation_state"] .'",';
if(!empty($rs["owner"])){
    $uname = MysqliDB::getInstance()->query("SELECT name FROM users WHERE userId=" . $rs["owner"]);
    $rss = $uname->fetch_array(MYSQLI_ASSOC);
    $outp .= '"ownerId":"'   . $rs["owner"] .'",';
    $outp .= '"owner":"'   . $rss["name"] .'",';
}
$ress = MysqliDB::getInstance()->query("SELECT * from document where clientId='". $client_id ."'and operationTypeId='". $optype ."'and ref_lsl='". $rs["ref_lsl"] ."' and doc_type='pdf' and deleted=0");
while($rss = $ress->fetch_array(MYSQLI_ASSOC)) {
    $outp .= '"file_name_pdf":"'   . $rss["document_name"].'",';
    $outp .= '"file_pdf":"'   . $rss["document_path"].'",';
}
$ress = MysqliDB::getInstance()->query("SELECT * from document where clientId='". $client_id ."'and operationTypeId='". $optype ."'and ref_lsl='". $rs["ref_lsl"] ."' and doc_type='fcl' and deleted=0");
while($rss = $ress->fetch_array(MYSQLI_ASSOC)) {
    $outp .= '"file_name_fcl":"'   . $rss["document_name"].'",';
    $outp .= '"file_fcl":"'   . $rss["document_path"].'",';
}
$ress = MysqliDB::getInstance()->query("SELECT * from document where clientId='". $client_id ."'and operationTypeId='". $optype ."'and ref_lsl='". $rs["ref_lsl"] ."' and doc_type='simi' and deleted=0");
while($rss = $ress->fetch_array(MYSQLI_ASSOC)) {
    $outp .= '"file_name_simi":"'   . $rss["document_name"].'",';
    $outp .= '"file_simi":"'   . $rss["document_path"].'",';
}
$ress = MysqliDB::getInstance()->query("SELECT * from document where clientId='". $client_id ."'and operationTypeId='". $optype ."'and ref_lsl='". $rs["ref_lsl"] ."' and doc_type='reqfound' and deleted=0");
while($rss = $ress->fetch_array(MYSQLI_ASSOC)) {
    $outp .= '"file_name_reqfound":"'   . $rss["document_name"].'",';
    $outp .= '"file_reqfound":"'   . $rss["document_path"].'",';
}
$outp .= '"lsl_bill":"'. $rs["lsl_bill"].'"}';
}
$outp ='{"operations":['.$outp.']}';
echo($outp);
?>
