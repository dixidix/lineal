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
<!DOCTYPE html>
<html lang="en"><head>
<title>LSL Group</title>
<meta charset="utf-8">
<link rel="stylesheet" href="css/reset.css" type="text/css" media="all">
<link rel="stylesheet" href="css/layout.css" type="text/css" media="all">
<link rel="stylesheet" href="css/style.css" type="text/css" media="all">

<style type="text/css">
	body {
		background-color: #000000;
	}
	a:link {
		text-decoration: none;
		color: #FFFFFF;
	}
	a:visited {
		text-decoration: none;
	}
	a:hover {
		text-decoration: none;
		color: #000;
	}
	a:active {
		text-decoration: none;
	}
</style>
<script type="text/javascript" src="js/jquery-1.6.js" ></script>
<script type="text/javascript" src="js/cufon-yui.js"></script>
<script type="text/javascript" src="js/cufon-replace.js"></script>
<script type="text/javascript" src="js/Swis721_Cn_BT_400.font.js"></script>
<script type="text/javascript" src="js/Swis721_Cn_BT_700.font.js"></script>
<script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="js/tms-0.3.js"></script>
<script type="text/javascript" src="js/tms_presets.js"></script>
<script type="text/javascript" src="js/jcarousellite.js"></script>
<script type="text/javascript" src="js/script.js"></script>
  <!--[if lt IE 9]>
  	<script type="text/javascript" src="js/html5.js"></script>
	<style type="text/css">
		.bg{ behavior: url(js/PIE.htc); }
	</style>
	<![endif]-->
	<!--[if lt IE 7]>
		<div style=' clear: both; text-align:center; position: relative;'>
			<a href="http://www.microsoft.com/windows/internet-explorer/default.aspx?ocid=ie6_countdown_bannercode"><img src="http://www.theie6countdown.com/images/upgrade.jpg" border="0"  alt="" /></a>
		</div>
		<![endif]-->
	</head>
	<body id="page1">
		<div class="body1">
			<div class="body2">
				<div class="main">
					<!-- header -->
					<header>
						<div class="wrapper">
							<h1><a href="index.php" id="logo">LSL Group</a></h1>
							<nav>
								<ul id="menu">
									<li class="active"><a href="index.php">Inicio<span>web site</span></a></li>
									<li><a href="empresa.php">Empresa<span>LSL group</span></a></li>
									<li><a href="servicios.php">Servicios<span>Soluciones</span></a></li>
									<li><a href="contacto.php">Contacto<span>Buenos Aires</span></a></li>
									<li><a href="home.html">English<span>version</span></a></li>

								</ul>
							</nav>
						</div>
						<div class="wrapper">
							<div class="slider">
								<ul class="items">
									<li><img src="images/imgc.jpg" alt=""></li>
									<li><img src="images/imga.jpg" alt=""></li>
									<li><img src="images/imgb.jpg" alt=""></li>
									<li><img src="images/img4.jpg" alt=""></li>
								</ul>
							</div>
						</div>
					</header>
					<!-- header end-->
				</div>
			</div>
		</div>
		<div class="body3">
			<div class="main">
				<!-- content -->
				<article id="content">
					<div class="wrapper">
						<section class="cols">
							<h3><span class="dropcap">1</span>Soluciones<span>Trade</span></h3>
							<p class="pad_bot1">Servicios Trade, importación y exportación de mercaderías desde origen tanto en territorio nacional como internacional.</p>
							<a href="servicios.html" class="link1"><h7>+ info</h7></a>
						</section>
						<section class="cols pad_left1">
							<h3><span class="dropcap">2</span>Soluciones<span>Transporte</span></h3>
							<p class="pad_bot1">Servicios de paquetes courrier expresso, tanto por sistema aéreo, terrestre como por marítimo desde origen a destino.</p>
							<a href="servicios.html" class="link1"><h7>+ info</h7></a>
						</section>
						<section class="cols pad_left1">
							<h3><span class="dropcap">3</span>Soluciones<span>Aduana</span></h3>
							<p class="pad_bot1">Soluciones a medida de cada cliente tanto temporales como definitivas. Asesoramiento en procesos Aduaneros afines.</p>
							<a href="servicios.html" class="link1"><h7>+ info</h7></a>
						</section>
						<section class="col2 pad_left1">

							<div class="testimonials">
								<div id="testimonials">
									<ul>
										<li>
											<div>
												“LSL ofrece a sus clientes Soluciones en materia de desarrollo, búsqueda de proveedores y productos ubicados en cualquier punto del mundo.”
											</div>

										</li>
										<li>
											<div>
												“Carga, aérea, marítima o camión de modo rápido y seguro para optimisar su tiempo y mejorar su utilidad en cada envío de su mercadería.”
											</div>

										</li>
										<li>
											<div>
												“Instrumentación de operaciones Aduaneras Definitivas, Especiales y Temporales. Asesoramiento en sus gestiones comerciales.”
											</div>

										</li>

									</ul>
								</div>
								<a href="#" class="up"></a>
								<a href="#" class="down"></a>
							</div>
						</section>

					</div>
					<div class="wrapper">
						<section class="col1">
							<h2 class="under">Lineal Soluciones Logísticas</h2>
							<div class="wrapper">
								<figure class="left marg_right1"><img src="images/page1_img1.jpg" alt=""></figure>
								<p class="pad_bot1">Somos una empresa dedicada a brindar Soluciones Integrales de Comercio Exterior. Focalizada en ofrecer al mercado  Servicios de Comercialización, Servicios Aduaneros y Servicios de Transporte en todas sus variantes.</p>
								<p>
									Hoy una empresa joven pero con la experiencia de haber transcurrido y crecido constante y  eficientemente durante tiempos complejos para el comercio Exterior.</p>

								</div>
							</section>
							<section class="col2 pad_left1">
								<h2>Seguinos</h2>
								<div class="testimonials">
									<div id="testimonials">
										<a class="twitter-timeline"  href="https://twitter.com/SolucionesLSL" data-widget-id="644535986383400960">Tweets por el @SolucionesLSL.</a>
										<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>






									</li>	
								</div>
							</div>
						</section>
					</div>
				</article>
			</div>
		</div>
		<div class="body4">
			<div class="main">
				<article id="content2">
					<div class="wrapper">
						<section class="col3">
							<h4>LSL y la comunidad</h4>
							<ul class="list1">
								<li><a href="images/chicos x la fe.pdf" target="_blank">Chicos por la Fé</a></li>


							</ul>
						</section>
						<section class="col3 pad_left2">
							<h4>LSL Group</h4>
							<ul class="address">
								<li>&nbsp;Av. Roque Saenz Peña 917</li>
								<li>&nbsp;Piso 2 - CABA - Argentina</li>
								<li><span>Rotativo:</span> +54 11 4326 3315</li>
								<li>&nbsp;<a href="mailto:info@linealsoluciones.com">info@linealsoluciones.com</a></li>
							</ul>
						</section>
						<section class="col3 pad_left2">
							<h4>Seguinos</h4>
							<ul id="icons">
								<li><a href="https://www.facebook.com/linealsoluciones.logisticas?fref=ts" target="_blank"><img src="images/face.png" alt="">Facebook</a></li>
								<li><a href="https://twitter.com/SolucionesLSL" target="_blank"><img src="images/twitter.png" alt="">Twitter</a></li>
								<li><a href="https://www.linkedin.com/profile/view?id=AAkAAAIBWXEBMKQoWJs5rH8HhHWQd9zcSpcnNzU&authType=NAME_SEARCH&authToken=MJ0L&locale=es_ES&trk=tyah&trkInfo=clickedVertical%3Amynetwork%2CclickedEntityId%3A33642865%2CauthType%3ANAME_SEARCH%2Cidx%3A1-2-2%2CtarId%3A1443210758954%2Ctas%3Asantiago%20lloret" target="_blank"><img src="images/linked.png" alt="">LinkedIn</a></li>
								<li><a href="https://login.skype.com/login?message=signin_continue&client_id=360605&redirect_uri=https%3A%2F%2Fsecure.skype.com%2Fportal%2Flogin%3Freturn_url%3Dhttps%253A%252F%252Fsecure.skype.com%252Fportal%252Foverview" target="_blank" title="sllbue"><img src="images/skype.png" alt="">Skype</a></li>
							</ul>
						</section>
<!-- 					<section class="col2 right">
						<h4>My LSL</h4>
						<form  method="post" name="form1" id="form1" style="padding:10; font-family: Tahoma, Geneva, sans-serif; font-size: 10px;">
							<span class="Estilo13">&nbsp;<span class="Estilo14"> </span></span><span class="usuario">Usuario:</span><span class="Estilo14">&nbsp;&nbsp;</span>
							<input type="text" name="usuario" size="14" />
							<span class="Estilo13"><span class="Estilo14"><br />
								&nbsp; </span></span><span class="usuario">Clave:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<input type="password" name="clave" size="14" />
								<span class="Estilo15">&nbsp; </span><br />
								&nbsp;&nbsp;&nbsp; <a href="recuperar_clave.php"><br>&nbsp;&nbsp;<span class="usuario">Olvide mi clave</span></a><br />
								<br />
								<?
								print $msgError;
								?>
								&nbsp; &nbsp;&nbsp; 
								<input type="submit" value="Entrar" name="privado" />
							</form>
						</section> -->
						<section class="col2 right" ng-app="mylsl" ng-controller="login_controller">
							<h4>My LSL</h4>
							<form  method="post" name="form1" id="form1" style="padding:10; font-family: Tahoma, Geneva, sans-serif; font-size: 10px;">
								<span class="Estilo13">&nbsp;<span class="Estilo14"> </span></span><span class="usuario">Usuario:</span><span class="Estilo14">&nbsp;&nbsp;</span>
								<input type="text" name="username" size="14" ng-model="username"/><span style="color: orange;font-size: 13px;margin-left: 1%;position: absolute;">{{usernameError}}</span>						 
								<span class="Estilo13"><span class="Estilo14"><br />
									&nbsp; </span></span><span class="usuario">Clave:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<input type="password" name="password" size="14" ng-model="password"/><span style="color: orange;font-size: 13px;margin-left: 1%;position: absolute;">{{passwordError}}</span>								
									<span class="Estilo15">&nbsp; </span><br />
									<span style="color: orange;font-size: 13px; position:absolute;">{{loginError}}</span>
									&nbsp;&nbsp;&nbsp; <a href="recuperar_clave.php"><br>&nbsp;&nbsp;<span class="usuario">Olvide mi clave</span></a><br />
									<br />
									&nbsp; &nbsp;&nbsp; 
									<input type="submit" value="Entrar" name="privado" ng-click="submit_login()"/>
									
								</form>
								<!-- 								<a href="#" ng-show="isLogged" ng-click="irCp()"/> Ir a My LSL > </a> -->
							</section>
						</div>
					</article>
					<!-- content end -->
				</div>
			</div>

			<div class="main">
				<!-- footer -->
				<footer>
					by <a href="http://www.otul.com.ar/" target="_blank" rel="nofollow">OTUL estudio</a><br>

				</footer>
				<!-- footer end -->
			</div>
			<script type="text/javascript"> Cufon.now(); </script>
			<script src="mylsl/bower_components/angular/angular.js"></script>
			<script src="mylsl/bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
			<script src="https://code.angularjs.org/1.4.8/i18n/angular-locale_es-ar.js" type="text/javascript"></script>
			<script src="mylsl/scripts/base.js" type="application/javascript"></script>
			<script src="mylsl/bower_components/angular-cookies/angular-cookies.min.js" type="application/javascript"></script>
			<script src="mylsl/bower_components/angular-ui-router/release/angular-ui-router.min.js" type="application/javascript"></script>
			<script src="mylsl/scripts/login_controller.js" type="application/javascript"></script>
			<script src="mylsl/scripts/routes.js" type="application/javascript"></script>
		</body>
		</html>