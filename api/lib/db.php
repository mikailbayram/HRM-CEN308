<?php

class Database 
{
    public $handler;

    public function __construct()
    {
        $config = include('config.php');                
        $host = $config['host'];
        $db   = $config['database'];
        $user = $config['db_username'];
        $pass = $config['db_password'];
        $dsn = "mysql:host=$host;dbname=$db;";

        $opt = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        $this->handler = new PDO($dsn, $user, $pass, $opt);        
    }
}

?>