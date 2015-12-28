<?php
require 'db.php';

session_start();

$res = MysqliDB::getInstance()->query("SELECT * from client_email WHERE deleted = 0");


$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $uname = MysqliDB::getInstance()->query("SELECT name_desc FROM client WHERE clientId=" . $rs["clientId"]);
    $rss = $uname->fetch_array(MYSQLI_ASSOC);

    $outp .= '{"company_name":"'  . $rss["name_desc"] . '",';
    $outp .= '"emailId":"'  . $rs["emailId"] . '",';
    $outp .= '"clientId":"'  . $rs["clientId"] . '",';
    $outp .= '"email":"'  . $rs["email"] . '",';
    $outp .= '"name":"'   . $rs["name"]  . '"}';
}
$outp ='{"emails":['.$outp.']}';

echo($outp);
?>
