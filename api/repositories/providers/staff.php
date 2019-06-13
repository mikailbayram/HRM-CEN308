<?php

// Interface
include "repositories/contracts/staff.php";

class StaffRepository implements StaffInterface
{
    private $config;
    private $database;

    public function __construct()
    {
        $this->config = include('config.php');
        $this->database = new Database();
    }

    public function get_staff($id)
    {
        $data = array();
        $query = "";
        $query .= "SELECT * ";
        $query .= "FROM Staff WHERE company_id=" . $id;

        // Executing real query
        $stmt = $this->database->handler->prepare($query);
        $stmt->execute();
        $staff = $stmt->fetchAll();
        $data['data'] = $staff;              
        return $data;
    }

    public function get_staff_member($id)
    {
        $data = array();
        $query = "";
        $query .= "SELECT * ";
        $query .= "FROM Staff WHERE id=" . $id;

        // Executing real query
        $stmt = $this->database->handler->prepare($query);
        $stmt->execute();
        $staff = $stmt->fetch();          
        return $staff;
    }

    public function insert_staff($data)
    {
        // PDO complains if there are unused parameters, so we are removing additional parameters
        unset($data['id']);

        $query = "";
        $query .= "INSERT INTO Staff (name, phone_number, email, company_id) VALUES ";
        $query .= "(:name, :phone_number, :email, :company_id)";
        $stmt = $this->database->handler->prepare($query);
        $stmt->execute($data);
        //$stmt->fetch();
        return $this->database->handler->lastInsertId();
    }

    public function update_staff($id, $data)
    {
        $data['id'] = $id;
        $query = "";
        $query .= "UPDATE Staff SET ";
        $query .= "name=:name,";
        $query .= "phone_number=:phone_number,";
        $query .= "email=:email ";        
        $query .= "WHERE id = :id"; 
              
        $stmt = $this->database->handler->prepare($query);
        $stmt->execute($data);
    }

    public function delete_staff($id)
    {
        $stmt = $this->database->handler->prepare('DELETE FROM Staff WHERE id = :id');
        $stmt->execute(['id' => $id]);                
        //$stmt->fetch();
    }
}
