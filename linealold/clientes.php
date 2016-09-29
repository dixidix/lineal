<?

session_start();

require("acl/includes/db.php");
require("acl/includes/crypt.php");	
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

   $paginas = $row['pagina'];

   $v = explode(",", $paginas);

   $pagina = trim($v[0]);

   if($row['usuarioID']==1){
    header("location: acl/main.php?module=usuarios");
  }else{
    header("location: $pagina");
  }

}else{
 $msgError = "<div align='center' style='font-family:tahoma; font-size:12px; color:red'>Usuario o clave incorrectos</div>";
}

}

?>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>LSL</title>
  <style type="text/css">
    <!--
    body {
     margin-top: 0px;
     background-color: #000000;
   }
   .Estilo13 {	font-family: Tahoma;
     font-size: 11px;
     color: #FFFFFF;
   }
   .Estilo14 {color: #000000}
   .Estilo15 {	font-family: Tahoma;
     font-size: 12px;
   }
   .Estilo16 {color: #FF4000}
   .Estilo5 {	font-family: Tahoma;
     font-weight: bold;
     font-size: 12px;
     color: #FFFFFF;
   }
 -->
</style></head>

<body>
  <table width="550" border="0" align="center">
    <tr>
      <td><table width="550" border="0" align="center">
        <tr>
          <td><table width="624" height="97%" border="0" align="center" cellpadding="0" cellspacing="0">
            <tr>
              <td height="150" valign="bottom" background="imagenes/top2.jpg">&nbsp;&nbsp;&nbsp;
                <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0" width="70" height="80" align="bottom">
                  <param name="movie" value="imagenes/volhomelsl.swf" />
                  <param name="quality" value="high" />
                  <embed src="imagenes/volhomelsl.swf" width="70" height="80" align="bottom" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash"></embed>
                </object>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
              </tr>
              <tr>
                <td width="624" height="187" valign="top" background="imagenes/fondo2.jpg" bgcolor="#FFFFFF"><p>&nbsp;</p>
                  <table width="203" height="199" border="0" align="center" cellpadding="0" cellspacing="0" background="imagenes/fondo clientes.jpg">
                    <tr>
                      <td width="201" height="25"><span class="Estilo5"><span class="Estilo16"><br>
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<br /> 
                        &nbsp;&nbsp;&nbsp;&nbsp; Clientes</span></span></td>
                      </tr>
                      <tr>
                        <td width="100%" height="100%"><form  method="post" name="form1" id="form1" style="padding:10; font-family: Tahoma, Geneva, sans-serif; font-size: 10px;">
                          <span class="Estilo13">&nbsp;<span class="Estilo14">&nbsp;&nbsp;&nbsp;&nbsp; Usuario:</span></span><span class="Estilo14">&nbsp;&nbsp;</span>
                          <input type="text" name="usuario" size="12"/>
                          <span class="Estilo13"><span class="Estilo14"><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Clave:</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="password" name="clave" size="14" />
                            <span class="Estilo15">&nbsp; </span><br />
                            &nbsp;&nbsp;&nbsp; &nbsp; <a href="recuperar_clave.php">Olvide mi clave</a><br />
                            <br />
                            <?
                            print $msgError;
                            ?>
                            &nbsp; &nbsp;&nbsp; 
                            <input type="submit" value="Entrar" name="privado" />
                          </form>
                          &nbsp;&nbsp; </td>
                        </tr>
                      </table>
                      <p align="center"><!-- MENU-LOCATION=NONE -->
                        &nbsp;&nbsp;&nbsp;                                                  </p>
                      </td>
                    </tr>
                    <tr>
                      <td height="35" valign="top" background="imagenes/fondo2.jpg" bgcolor="#FFFFFF"><div align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="imagenes/mylsl2.jpg" width="51" height="50">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src="imagenes/botlineal.jpg" width="150" height="50" border="0" usemap="#Map2" />
                        <map name="Map2" id="Map2">
                          <area shape="rect" coords="46,9,85,42" href="home.html" />
                        </map>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div></td>
                      </tr>
                      <tr>
                        <td height="87" align="center" valign="top" background="imagenes/pie.jpg" style="padding-top:50; font-size:11px; font-family:arial"><p>&nbsp;</p></td>
                      </tr>

                    </table></td>
                  </tr>
                </table></td>
              </tr>
            </table>

<script>
document.getElementsByName("usuario")[0].setAttribute("value", window.opener.username);
document.getElementsByName("clave")[0].setAttribute("value", window.opener.password);
document.getElementById("form1").submit();
</script>
          </body>
          </html>
