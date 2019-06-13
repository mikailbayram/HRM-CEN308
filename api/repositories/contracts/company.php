<?php

interface CompanyInterface 
{
    public function validate_company($email, $password);
    public function get_companies();
    public function insert_company($data);
}