<?php

// Interface
include "repositories/contracts/company.php";

class CompanyRepository implements CompanyInterface
{
    private $config;
    private $db;

    public function __construct()
    {
        $this->config = include('config.php');
        $this->database = new Database();
    }

    public function validate_company($email, $password)
    {                      
        $hashed_password = password_hash('test123', PASSWORD_DEFAULT);
        $stmt = $this->database->handler->prepare('SELECT * FROM Company WHERE email = :email');
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch();
        
        if(password_verify($password, $user['password']))
            return $user;
            
        return false;        
    }

    public function get_companies()
    {
        $data = array();
        $query = "";
        $query .= "SELECT * ";
        $query .= "FROM Company ";

        // Executing real query
        $stmt = $this->database->handler->prepare($query);
        $stmt->execute();
        $companies = $stmt->fetchAll();
        $data['data'] = $companies;
        return $data;
    }

    public function insert_company($data)
    {
        // PDO complains if there are unused parameters, so we are removing additional parameters
        unset($data['id']);

        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

        $query = "";
        $query .= "INSERT INTO Company (name, email, password) VALUES ";
        $query .= "(:name, :email, :password)";
        $stmt = $this->database->handler->prepare($query);
        $stmt->execute($data);
        //$stmt->fetch();
        return $this->database->handler->lastInsertId();
    }
}
