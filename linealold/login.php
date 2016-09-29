<?

	session_start();

	require("includes/db.php");
	require("includes/crypt.php");	

	$msgError = "";
	
	if(isset($_POST['usuario'])){		
		
		$usuario = strip_tags($_POST['usuario']);		
		$clave = strip_tags($_POST['clave']);				
		$usuario = substr($usuario, 0,20);
		$clave = substr($clave, 0,20);		
		$clave = encrypt($clave, $usuario);		
		
		$sql = "select * from usuarios where usuario = '$usuario' and clave = '$clave'";
		
		
		$result = mysql_query($sql) or die("Error validando el usuario");		
		
		if(mysql_num_rows($result)){

			$row = mysql_fetch_array($result);
			
			$_SESSION["UID"] = $row['usuarioID'];
			$_SESSION['nombre'] = $row['nombre'];
			
			$pagina = $row['pagina'];
						
			if($row['usuarioID']==1){
				header("location: main.php?module=usuarios");
			}else{
				header("location: ../$pagina");
			}
			
		}else{
			$msgError = "Usuario o clave incorrectos";
		}
		
	}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Login</title>
</head>

<body>
<form method="post">
<table width="249" border="0" align="center" cellpadding="1" cellspacing="1">
  <tr>
    <td width="308" align="center">&nbsp;</td>
  </tr>
  <tr>
    <td align="center"><?=$msgError?></td>
  </tr>
  <tr>
    <td align="center"><a href="../../recuperar_clave.php">Recuperar clave</a></td>
  </tr>
</table>
<div align="center"><br />
    <a href="../index.php"><img src="../images/botvolver.gif" width="62" height="20" border="0" /></a></div>
</form>
</body>
</html>
