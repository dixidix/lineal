<?php
require 'db.php';
session_start();
$client_id = $_GET['client_id'];
if(!empty($_GET['user_id'])){
  $userId =$_GET['user_id'];  
$res = MysqliDB::getInstance()->query("SELECT section.id_section, section.section_desc, section.ngState, section.section_type, section.icon, files . *
    FROM roles
    INNER JOIN section ON roles.sectionId = section.id_section
    LEFT JOIN (
        SELECT t1. *
        FROM files t1
        LEFT JOIN files t2 ON ( t1.fileTypeId = t2.fileTypeId
            AND t1.uploadDate < t2.uploadDate )
WHERE t2.uploadDate IS NULL
AND t1.clientId =  '".$client_id."'
) AS files ON section.fileTypeId = files.fileTypeId
WHERE roles.userId = '".$userId."'");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"sectionId":"'  . $rs["id_section"].'",';
    $outp .= '"ngState":"'   . $rs["ngState"] .'",';
    $outp .= '"section_type":"'   . $rs["section_type"] .'",';
    $outp .= '"icon":"'   . $rs["icon"] .'",';
    if($rs["fileId"]!=NULL){
        $outp .= '"sectionDesc":"'   . $rs["section_desc"] .'",';
        $outp .= '"fileId":"'   . $rs["fileId"] .'",';
        $outp .= '"operationId":"'   . $rs["operationId"] .'",';
        $outp .= '"fileTypeId":"'   . $rs["fileTypeId"] .'",';
        $outp .= '"filename":"'   . $rs["filename"] .'",';
        $outp .= '"fileSystemname":"'   . $rs["fileSystemname"] .'",';
        $outp .= '"uploadDate":"'   . $rs["uploadDate"] .'",';
        $outp .= '"extension":"'. $rs["extension"].'"}';
    } else {
        $outp .= '"sectionDesc":"'. $rs["section_desc"].'"}';
    }
}
$outp ='{"section":['.$outp.']}';
echo($outp);
} else {
$res = MysqliDB::getInstance()->query("SELECT section.id_section, section.section_desc, section.ngState, section.section_type, section.icon, files . *
FROM client_section
INNER JOIN section ON client_section.id_section = section.id_section
LEFT JOIN (
SELECT t1. *
FROM files t1
LEFT JOIN files t2 ON ( t1.fileTypeId = t2.fileTypeId
AND t1.uploadDate < t2.uploadDate )
WHERE t2.uploadDate IS NULL
AND t1.clientId =  '".$client_id."'
) AS files ON section.fileTypeId = files.fileTypeId
WHERE client_section.id_client = '".$client_id."'");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"sectionId":"'  . $rs["id_section"].'",';
    $outp .= '"ngState":"'   . $rs["ngState"] .'",';
    $outp .= '"section_type":"'   . $rs["section_type"] .'",';
    $outp .= '"icon":"'   . $rs["icon"] .'",';
    if($rs["fileId"]!=NULL){
        $outp .= '"sectionDesc":"'   . $rs["section_desc"] .'",';
        $outp .= '"fileId":"'   . $rs["fileId"] .'",';
        $outp .= '"operationId":"'   . $rs["operationId"] .'",';
        $outp .= '"fileTypeId":"'   . $rs["fileTypeId"] .'",';
        $outp .= '"filename":"'   . $rs["filename"] .'",';
        $outp .= '"fileSystemname":"'   . $rs["fileSystemname"] .'",';
        $outp .= '"uploadDate":"'   . $rs["uploadDate"] .'",';
        $outp .= '"extension":"'. $rs["extension"].'"}';
    } else {
        $outp .= '"sectionDesc":"'. $rs["section_desc"].'"}';
    }
}
$outp ='{"section":['.$outp.']}';
echo($outp);    
}
?>
