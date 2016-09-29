<?php
require 'db.php';
session_start();
$id_client = $_GET['client_id'];
$res = MysqliDB::getInstance()->query("SELECT * FROM temp_impo WHERE clientId='".$id_client."' and deleted=0");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
	if ($outp != "") {$outp .= ",";}
	$start_date = date("d-m-Y", strtotime($rs["start_date"]));
	$outp .= '{"temp_impoId":"'  . $rs["temp_impoId"].'",';
	$outp .= '"ctit":"'  . $rs["ctit"].'",';
	$outp .= '"start_date":"'  . $start_date .'",';
	if(!empty($rs["owner"])){
		$uname = MysqliDB::getInstance()->query("SELECT name FROM users WHERE userId=" . $rs["owner"]);
		$rss = $uname->fetch_array(MYSQLI_ASSOC);
		$outp .= '"ownerId":"'   . $rs["owner"] .'",';
		$outp .= '"owner":"'   . $rss["name"] .'",';
	}
	$outp .= '"filename":"'  . $rs["filename"].'",';
	$outp .= '"fileSystemname":"'  . $rs["fileSystemname"].'",';
	$outp .= '"request_exp":"'   . $rs["request_exp"]  . '"}';
}
$outp ='{"temp_impo":['.$outp.']}';
echo($outp);
?>
