<?php

interface StaffInterface 
{
    public function get_staff($id);
    public function get_staff_member($id);
    public function insert_staff($data);
    public function update_staff($id, $data);
    public function delete_staff($id);
}