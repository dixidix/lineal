<?php
require 'db.php';
session_start();
$res = MysqliDB::getInstance()->query("SELECT * from fileTypes");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outpm ="";
    $outp .= '{"id":"'  . $rs["fileTypeId"].'",';
    $outp .= '"fileType":"'   . $rs["fileType"].'"}';
}
$outp ='{"fileTypes":['.$outp.']}';
echo($outp);
?>
