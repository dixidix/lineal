<?php

require 'db.php';

session_start();

$errors = array();
$data = array();

// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);

// checking for blank values.
if (empty($_POST['username'])){
$errors['usernameError'] = 'Ingrese un usuario.';
}
if (empty($_POST['password'])){
$errors['passwordError'] = 'Ingrese una contraseña.';
}

if (!empty($errors)){
	$data['errors'] = $errors;
  	echo json_encode($data);
}else{

    $username=$_POST['username'];

	$userpass=$_POST['password'];
       
	//no sqlinjection
	$username=stripslashes($username);
  
 
	$username = MysqliDB::getInstance()->real_escape_string($username);

	$res = MysqliDB::getInstance()->query("SELECT * FROM users WHERE username='" . $username . "' AND password='" . $userpass . "'");
	$rows = mysqli_num_rows($res);
	if ($rows == 1){
       $rss = $res->fetch_array(MYSQLI_ASSOC);

       if ($rss['active'] == 0){
              $data['userId'] = $rss['userId'];
	          $data['username'] = $rss['username'];
	          $data['password'] = $rss['password'];
	          $data['name'] = $rss['name'];
              $data['surname'] = $rss['surname'];
              $data['role'] = $rss['role'];
              $data['tel'] = $rss['tel'];
	          $data['active'] = "1";
			echo json_encode($data);

			MysqliDB::getInstance()->query("UPDATE users SET active=1 WHERE userId=" . $rss['userId']);
		}else{
            $data['active'] = $rss['active'];
			$errors['loginError'] = 'El usuario se encuentra conectado.';
			$data['errors'] = $errors;
			echo json_encode($data);
		}
	}else{
		$errors['loginError'] = 'Los datos ingresados no son correctos.';
        $data['errors'] = $errors;
        echo json_encode($data);
	}
	MysqliDB::getInstance()->close();
}
?>