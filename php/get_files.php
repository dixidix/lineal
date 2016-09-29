<?php
require 'db.php';
session_start();
$client_id = $_GET['client_id'];
$res = MysqliDB::getInstance()->query("SELECT t1.* FROM files t1 LEFT JOIN files t2 ON ( t1.fileTypeId = t2.fileTypeId AND t1.uploadDate < t2.uploadDate ) WHERE t2.uploadDate IS NULL AND t1.clientId = '".$client_id."'");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"fileId":"'  . $rs["fileId"].'",';
    $outp .= '"clientId":"'   . $rs["clientId"] .'",';
    $outp .= '"operationId":"'   . $rs["operationId"] .'",';
    $outp .= '"fileTypeId":"'   . $rs["fileTypeId"] .'",';
    $outp .= '"filename":"'   . $rs["filename"] .'",';
    $outp .= '"fileSystemname":"'   . $rs["fileSystemname"] .'",';
    $outp .= '"uploadDate":"'   . $rs["uploadDate"] .'",';
    $outp .= '"extension":"'. $rs["extension"].'"}';
}
$outp ='{"clientFiles":['.$outp.']}';
echo($outp);
?>
