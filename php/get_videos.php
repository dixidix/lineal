<?php
require 'db.php';
session_start();
$id_client = $_GET['client_id'];
$res = MysqliDB::getInstance()->query("SELECT * FROM videos WHERE clientId='".$id_client."' and deleted=0");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"videoId":"'  . $rs["videoId"].'",';
    $outp .= '"uploadDate":"'  . $rs["uploadDate"].'",';
    $outp .= '"filename":"'  . $rs["filename"].'",';
    $outp .= '"filesSystemname":"'  . $rs["filesSystemname"].'",';
    $outp .= '"filetitle":"'  . $rs["filetitle"].'",';
    $outp .= '"fileDesc":"'  . $rs["fileDesc"].'",';
    $outp .= '"videoSrc":"'   . $rs["videoSrc"].'"}';
}
$outp ='{"videos":['.$outp.']}';
echo($outp);
?>
