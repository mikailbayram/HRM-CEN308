<?php

interface StaffSalaryInterface 
{
    public function get_staff_salaries($id);
    public function get_staff_salary($id);
    public function insert_staff_salary($data);
    public function update_staff_salary($id, $data);
    public function delete_staff_salary($id);
}