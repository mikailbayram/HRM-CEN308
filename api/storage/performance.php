<?php
class PerformanceStorage
{
    private $config;
    private $db;

    public function __construct()
    {
        $this->config = include('config.php');
        $this->database = new Database();
    }

    public function insert_rating($data)
    {
        // PDO complains if there are unused parameters, so we are removing additional parameters

        $query = "";
        $query .= "INSERT INTO Performances (staff_id, rating, date) VALUES ";
        $query .= "(:staff_id, :rating, :date)";
        $stmt = $this->database->handler->prepare($query);
        $stmt->execute($data);
        //$stmt->fetch();
        return $this->database->handler->lastInsertId();
    }

    public function get_staff_ratings($id)
    {
        $data = array();
        $query = "";
        $query .= "SELECT * ";
        $query .= "FROM Performances WHERE staff_id=" . $id;

        // Executing real query
        $stmt = $this->database->handler->prepare($query);
        $stmt->execute();
        $staff = $stmt->fetchAll();
        $data['data'] = $staff;              
        return $data;
    }
}
