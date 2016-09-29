<?php
require 'db.php';

session_start();

$res = MysqliDB::getInstance()->query("SELECT * from client WHERE deleted = 0");
$outp="";


while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outpm ="";
    $sectionsString = "";
    $sectionIdString = "";
    $sectionDesc = array();
    $sectionId = array();
    $outpm ="";
    $outp .= '{"id":"'  . $rs["clientId"].'",';
    $outp .= '"name_desc":"'   . $rs["name_desc"] .'",';
    $outp .= '"address":"'   . $rs["address"].'",';
    $outp .= '"manager":"'   . $rs["manager"].'",';
    $outp .= '"tel":"'   . $rs["tel"].'",';
    $outp .= '"fax":"'   . $rs["fax"].'",';
    $outp .= '"web":"'   . $rs["web"].'",';
    $outp .= '"logo":"'   . $rs["clientLogoPath"].'",';
    $ress = MysqliDB::getInstance()->query("SELECT * from client_email where clientId = ".$rs["clientId"]."");
    while($rss = $ress->fetch_array(MYSQLI_ASSOC)) {
      if ($outpm != "") {$outpm .= ",";}
      $outpm .= '{"id":"'   . $rss["emailId"].'",';
      $outpm .= '"email":"'   . $rss["email"].'"}';
  }
  $outp .='"emails":['.$outpm.'],';
  $unname = MysqliDB::getInstance()->query("SELECT client_section.id_section, section.section_desc FROM client_section LEFT JOIN section ON client_section.id_section=section.id_section WHERE client_section.id_client = '".$rs["clientId"]."' ORDER BY client_section.id_section");
  while($rsss = $unname->fetch_array(MYSQLI_ASSOC)) {
   if ($outpm != "") {$outpm .= ",";}
   $sectionId[] = $rsss["id_section"];
   $sectionDesc[] = $rsss["section_desc"];
}
 $sectionsString = implode(", ", $sectionDesc);
 $sectionIdString = implode(",", $sectionId);
 $outp .= '"sectionId":"'   . $sectionIdString. '",';
 $outp .= '"sectionDesc":"'   . $sectionsString. '",';
$outp .= '"cuit":"'   . $rs["cuit"].'"}';

}
$outp ='{"clients":['.$outp.']}';

echo($outp);
?>
