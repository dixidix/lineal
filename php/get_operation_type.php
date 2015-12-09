<?php
require 'db.php';

session_start();

$res = MysqliDB::getInstance()->query("SELECT * from operation_type");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}

  
    $outp .= '{"id":"'  . $rs["operationTypeId"].'",';
    $outp .= '"desc":"'   . $rs["operation_desc"].'"}'; 

}
$outp ='{"operation_types":['.$outp.']}';

echo($outp);
?>