<?php

// Interface
include "repositories/contracts/project.php";

class ProjectRepository implements ProjectInterface
{
    private $config;
    private $database;

    public function __construct()
    {
        $this->config = include('config.php');
        $this->database = new Database();
    }

    public function get_projects($id)
    {
        $data = array();
        $query = "";
        $query .= "SELECT * ";
        $query .= "FROM project WHERE company_id = ". $id;     

        // Executing real query
        $stmt = $this->database->handler->prepare($query);
        $stmt->execute();
        $staff = $stmt->fetchAll();
        $data['data'] = $staff;              
        return $data;
    }

    public function get_project($id)
    {
        $data = array();
        $query = "";
        $query .= "SELECT * ";
        $query .= "FROM project WHERE id=" . $id;

        // Executing real query
        $stmt = $this->database->handler->prepare($query);
        $stmt->execute();
        $project = $stmt->fetch();
        $data['data'] = $project;        
        return $data;
    }

    public function insert_project($data)
    {
        // PDO complains if there are unused parameters, so we are removing additional parameters
        unset($data['id']);

        $query = "";
        $query .= "INSERT INTO project (name, details, company_id) VALUES ";
        $query .= "(:name, :details, :company_id)";
        $stmt = $this->database->handler->prepare($query);
        $stmt->execute($data);
        //$stmt->fetch();
        return $this->database->handler->lastInsertId();
    }

    public function update_project($id, $data)
    {
        $data['id'] = $id;
        $query = "";
        $query .= "UPDATE project SET ";
        $query .= "name=:name,";
        $query .= "details=:details "; 
        $query .= "WHERE id = :id"; 
        $stmt = $this->database->handler->prepare($query);
        $stmt->execute($data);
    }

    public function delete_project($id)
    {
        $stmt = $this->database->handler->prepare('DELETE FROM project WHERE id = :id');
        $stmt->execute(['id' => $id]);                
        //$stmt->fetch();
    }
}
