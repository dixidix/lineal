<?php
require 'db.php';
session_start();
$res = MysqliDB::getInstance()->query("SELECT userId, clientId, username, password, name, role, tel,active, clientId from users WHERE deleted = 0");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
 $outpm ="";
 $rolesString = "";
 $roleIdString = "";
 $roleDesc = array();
 $roleId = array();
 if ($outp != "") {$outp .= ",";}

 $uname = MysqliDB::getInstance()->query("SELECT name_desc FROM client WHERE clientId=" . $rs["clientId"]);
 $rss = $uname->fetch_array(MYSQLI_ASSOC);
 $unname = MysqliDB::getInstance()->query("SELECT roles.sectionId, section.section_desc FROM roles LEFT JOIN section ON roles.sectionId=section.id_section WHERE roles.userId = '".$rs["userId"]."' ORDER BY roles.sectionId");
 $outp .= '{"client_desc":"'  . $rss["name_desc"] . '",';
 $outp .= '"username":"'  . $rs["username"] . '",';
 $outp .= '"password":"'   . $rs["password"]        . '",';
 $outp .= '"name":"'   . $rs["name"]        . '",';
 while($ress = $unname->fetch_array(MYSQLI_ASSOC)) {
   if ($outpm != "") {$outpm .= ",";}
   $roleId[] = $ress["sectionId"];
   $roleDesc[] = $ress["section_desc"];
 }
 $outp .='"roles":['.$outpm.'],';
 $rolesString = implode(", ", $roleDesc);
 $roleIdString = implode(",", $roleId);
 $outp .= '"sectionId":"'   . $roleIdString. '",';
 $outp .= '"roleDesc":"'   . $rolesString. '",';
 $outp .= '"tel":"'   . $rs["tel"]        . '",';
 $outp .= '"active":"'   . $rs["active"]        . '",';
 $outp .= '"userId":"'   . $rs["userId"]        . '",';
 $outp .= '"clientId":"'. $rs["clientId"]     . '"}';
}
$outp ='{"users":['.$outp.']}';
echo($outp);
?>
