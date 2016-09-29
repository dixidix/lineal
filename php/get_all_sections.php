<?php
require 'db.php';

session_start();

$res = MysqliDB::getInstance()->query("SELECT * from section");

$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}

    $outp .= '{"id_section":"'  . $rs["id_section"] . '",';
    $outp .= '"section_desc":"'  . $rs["section_desc"] . '",';
    $outp .= '"ngState":"'  . $rs["ngState"] . '",';
    $outp .= '"section_type":"'  . $rs["section_type"] . '",';
    $outp .= '"icon":"'  . $rs["icon"] . '",';
    $outp .= '"fileTypeId":"'   . $rs["fileTypeId"]  . '"}';
}
$outp ='{"allSections":['.$outp.']}';

echo($outp);
?>
