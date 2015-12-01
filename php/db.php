<?php

class MysqliDB{

	private static $_instance;
	
	protected $host='localhost';
	protected $user='root';
	protected $passwd='';
	protected $db='mylsl';

	protected $_mysqli;

	public static function getInstance() { //singleton pattern
		if(!self::$_instance) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
   	
   	private function __construct(){
        MysqliDB::connect();
	}

    public function connect()
    {
        $this->_mysqli = new mysqli ($this->host, $this->user, $this->passwd, $this->db);
        if (mysqli_connect_errno()) {
			die( "Fallo la conexión a MySQL: (" . mysqli_connect_errno() . ") " . mysqli_connect_error());
	    }
	}

    public function close(){
    	mysqli_close($this->_mysqli);
    }

    public function error(){
    	return $this->_mysqli->error;
    }
    public function query($query)
     {
    	return $this->_mysqli->query($query);
     }

	public function real_escape_string($str)
 	{
    	return $this->_mysqli->real_escape_string($str);
 	}

}

?>