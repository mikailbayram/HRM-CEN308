<?php

interface ProjectInterface 
{
    public function get_projects($id);
    public function get_project($id);
    public function insert_project($data);
    public function update_project($id, $data);
    public function delete_project($id);
}