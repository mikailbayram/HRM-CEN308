<?php

// Interface
include "repositories/contracts/staff_salary.php";

class StaffSalaryRepository implements StaffSalaryInterface
{
    private $config;
    private $database;

    public function __construct()
    {
        $this->config = include('config.php');
        $this->database = new Database();
    }

    public function get_staff_salaries($id)
    {
        $data = array();
        $query = "";
        $query .= "SELECT ss.id, st.type, s.name, ss.amount, ss.date ";
        $query .= "FROM staff_salary AS ss ";
        $query .= "INNER JOIN salary_type AS st ON ";
        $query .= "st.id = ss.salary_type_id ";
        $query .= "INNER JOIN staff AS s ON ";
        $query .= "s.id = ss.staff_id ";
        $query .= "WHERE ss.company_id=" . $id;                
        // Executing real query
        $stmt = $this->database->handler->prepare($query);
        $stmt->execute();
        $staff = $stmt->fetchAll();
        $data['data'] = $staff;              
        return $data;
    }

    public function get_staff_salary($id)
    {
        $data = array();
        $query = "";
        $query .= "SELECT * ";
        $query .= "FROM staff_salary WHERE id=" . $id;

        // Executing real query
        $stmt = $this->database->handler->prepare($query);
        $stmt->execute();
        $staff = $stmt->fetch();
        $data['data'] = $staff; 
        $data['salary_types'] = $this->get_salary_types();   
        $data['staff'] = $this->get_staff();          
        return $data;
    }

    public function insert_staff_salary($data)
    {
        // PDO complains if there are unused parameters, so we are removing additional parameters
        unset($data['id']);
        unset($data['staff']);
        unset($data['salary_types']);

        $query = "";
        $query .= "INSERT INTO staff_salary (staff_id, salary_type_id, amount, description, company_id) VALUES ";
        $query .= "(:staff_id, :salary_type_id, :amount, :description, :company_id)";
        $stmt = $this->database->handler->prepare($query);
        $stmt->execute($data);
        //$stmt->fetch();
        return $this->database->handler->lastInsertId();
    }

    public function update_staff_salary($id, $data)
    {
        unset($data['staff']);
        unset($data['salary_types']);
        $data['id'] = $id;
        $query = "";
        $query .= "UPDATE staff_salary SET ";
        $query .= "staff_id=:staff_id,";
        $query .= "salary_type_id=:salary_type_id,";
        $query .= "description=:description,";
        $query .= "amount=:amount ";        
        $query .= "WHERE id = :id"; 
        $stmt = $this->database->handler->prepare($query);
        $stmt->execute($data);
    }

    public function delete_staff_salary($id)
    {
        $stmt = $this->database->handler->prepare('DELETE FROM staff_salary WHERE id = :id');
        $stmt->execute(['id' => $id]);                
        //$stmt->fetch();
    }

    private function get_salary_types()
    {
        $query = "";
        $query .= "SELECT * ";
        $query .= "FROM salary_type";;

        // Executing real query
        $stmt = $this->database->handler->prepare($query);
        $stmt->execute();
        $salary_type = $stmt->fetchAll();
        return $salary_type;
    }

    private function get_staff()
    {
        $auth = new Auth();
        $staff = new StaffRepository();
        $token_data = $auth->is_jwt_valid($auth->getBearerToken());    
        $staff = $staff->get_staff($token_data[1]['id']);
        return $staff['data'];
    }
}
