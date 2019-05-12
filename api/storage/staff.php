<?php
class StaffStorage
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
        $query .= "SELECT *";
        $query .= "FROM Staff Where company_id=" . $id;

        // Executing real query
        $stmt = $this->database->handler->prepare($query);
        $stmt->execute();
        $staff = $stmt->fetchAll();
        $data['data'] = $staff;
        return $data;
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
}
