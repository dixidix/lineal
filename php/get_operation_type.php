<?php
require 'db.php';
session_start();
$id_client = $_GET['id_client'];
$res = MysqliDB::getInstance()->query("SELECT section.id_section, section.section_desc  FROM `client_section` INNER JOIN section ON client_section.id_section = section.id_section WHERE client_section.id_client ='" . $id_client . "' AND section.section_type != 'Download'");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id_section":"'  . $rs["id_section"].'",';
    $outp .= '"section_desc":"'   . $rs["section_desc"].'"}';
}
$outp ='{"operation_types":['.$outp.']}';
echo($outp);
?>
