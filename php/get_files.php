<?php
require 'db.php';

session_start();

$client_id = $_GET['client_id'];

$seguimiento = MysqliDB::getInstance()->query("SELECT document_path, doc_type,upload_date FROM `document` WHERE clientId ='". $client_id ."' and upload_date = (SELECT max(upload_date) FROM document AS D2 WHERE clientId = '". $client_id ."' AND doc_type = 'seguimiento' AND deleted=0)");
$reintegros = MysqliDB::getInstance()->query("SELECT document_path, doc_type,upload_date FROM `document` WHERE clientId ='". $client_id ."' and upload_date = (SELECT max(upload_date) FROM document AS D2 WHERE clientId = '". $client_id ."' AND doc_type = 'reintegros' AND deleted=0)");
$courrier_imp = MysqliDB::getInstance()->query("SELECT document_path, doc_type,upload_date FROM `document` WHERE clientId ='". $client_id ."' and upload_date = (SELECT max(upload_date) FROM document AS D2 WHERE clientId = '". $client_id ."' AND doc_type = 'courrier_imp' AND deleted=0)");
$outp="";
while($rs = $seguimiento->fetch_array(MYSQLI_ASSOC)) {
  if($rs["doc_type"] == "seguimiento" || $rs["doc_type"] == "reintegros" || $rs["doc_type"] == "courrier_imp"){
    if ($outp != "") {$outp .= ",";}

    $outp .= '{"path":"'  . $rs["document_path"] . '",';
    $outp .= '"date":"'  . $rs["upload_date"] . '",';
    $outp .= '"doc_type":"'   . $rs["doc_type"]  . '"}';
}
}
while($rss = $reintegros->fetch_array(MYSQLI_ASSOC)) {
  if($rss["doc_type"] == "seguimiento" || $rss["doc_type"] == "reintegros" || $rss["doc_type"] == "courrier_imp"){
    if ($outp != "") {$outp .= ",";}

    $outp .= '{"path":"'  . $rss["document_path"] . '",';
    $outp .= '"date":"'  . $rss["upload_date"] . '",';
    $outp .= '"doc_type":"'   . $rss["doc_type"]  . '"}';
}
}
while($rsss = $courrier_imp->fetch_array(MYSQLI_ASSOC)) {
  if($rsss["doc_type"] == "seguimiento" || $rsss["doc_type"] == "reintegros" || $rsss["doc_type"] == "courrier_imp"){
    if ($outp != "") {$outp .= ",";}

    $outp .= '{"path":"'  . $rsss["document_path"] . '",';
    $outp .= '"date":"'  . $rsss["upload_date"] . '",';
    $outp .= '"doc_type":"'   . $rsss["doc_type"]  . '"}';
}
}
$outp ='{"files":['.$outp.']}';

echo($outp);
?>
