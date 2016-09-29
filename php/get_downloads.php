<?php
require 'db.php';
session_start();
$client_id = $_GET['client_id'];
$res = MysqliDB::getInstance()->query("SELECT section.id_section,section.fileTypeId, section.section_desc  FROM `client_section` INNER JOIN section ON client_section.id_section = section.id_section WHERE client_section.id_client ='".$client_id."' AND section.section_type = 'Download'");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
	if ($outp != "") {$outp .= ",";}
	$outpm ="";
	$outp .= '{"id":"'  . $rs["fileTypeId"].'",';
	$outp .= '"id_section":"'   . $rs["id_section"] .'",';
	$outp .= '"fileType":"'   . $rs["section_desc"].'"}';
}
$outp ='{"fileTypes":['.$outp.']}';
echo($outp);
?>
