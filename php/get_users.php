<?php
require 'db.php';

session_start();

$res = MysqliDB::getInstance()->query("SELECT userId, clientId, username, password, name, role, tel,active, clientId from users WHERE deleted = 0");


$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $uname = MysqliDB::getInstance()->query("SELECT name_desc FROM client WHERE clientId=" . $rs["clientId"]);
    $rss = $uname->fetch_array(MYSQLI_ASSOC);
    $string = $rs["role"];
    $newstring = str_replace("1", "Exportación", $string);
    $newstring = str_replace("2", "Importación", $newstring);
    $newstring = str_replace("3", "Seguimiento", $newstring);
    $newstring = str_replace("4", "Reintegro", $newstring);
    $newstring = str_replace("5", "Courrier Imp", $newstring);
    $newstring = str_replace("6", "Administrador", $newstring);

    $outp .= '{"client_desc":"'  . $rss["name_desc"] . '",';
    $outp .= '"username":"'  . $rs["username"] . '",';
    $outp .= '"password":"'   . $rs["password"]        . '",';
    $outp .= '"name":"'   . $rs["name"]        . '",';
    $outp .= '"role":"'   . $rs["role"]        . '",';
    $outp .= '"role_desc":"'   . $newstring . '",';
    $outp .= '"tel":"'   . $rs["tel"]        . '",';
    $outp .= '"active":"'   . $rs["active"]        . '",';
    $outp .= '"userId":"'   . $rs["userId"]        . '",';
    $outp .= '"clientId":"'. $rs["clientId"]     . '"}';
}
$outp ='{"users":['.$outp.']}';

echo($outp);
?>
