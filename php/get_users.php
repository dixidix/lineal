<?php
require 'db.php';

session_start();

$res = MysqliDB::getInstance()->query("SELECT userId, clientId, username, password, name, surname, role, tel,active, clientId from users");


$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $uname = MysqliDB::getInstance()->query("SELECT name_desc FROM client WHERE clientId=" . $rs["clientId"]);
    $rss = $uname->fetch_array(MYSQLI_ASSOC);
    $outp .= '{"client_desc":"'  . $rss["name_desc"] . '",';
    $outp .= '"username":"'  . $rs["username"] . '",';
    $outp .= '"password":"'   . $rs["password"]        . '",';
    $outp .= '"name":"'   . $rs["name"]        . '",';
    $outp .= '"surname":"'   . $rs["surname"]        . '",';
    $outp .= '"role":"'   . $rs["role"]        . '",';
    $outp .= '"tel":"'   . $rs["tel"]        . '",';
    $outp .= '"active":"'   . $rs["active"]        . '",';
    $outp .= '"userId":"'   . $rs["userId"]        . '",';
    $outp .= '"clientId":"'. $rs["clientId"]     . '"}';
}
$outp ='{"users":['.$outp.']}';

echo($outp);
?>
