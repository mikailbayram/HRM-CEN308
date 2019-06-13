<?php

Flight::route('GET /salary', function () {
    $auth = new Auth();
    $staff_salary = new StaffSalaryStorage();
    $token_data = $auth->is_jwt_valid($auth->getBearerToken());    
    $staff_salary = $staff_salary->get_staff_salaries($token_data[1]['id']);
    //var_dump($token_data[1]['id']); exit;
    if ($token_data[0])
        Flight::halt(200, json_encode($staff_salary));
    else
        Flight::halt(401, "Unauthorized");
});

Flight::route('GET /salary/@id', function($id){
    $data = array();
    $auth = new Auth();
    $staff_salary = new StaffSalaryStorage();
    $token_data = $auth->is_jwt_valid($auth->getBearerToken());
    $staff_salary = $staff_salary->get_staff_salary($id);

    if($token_data[0])        
        Flight::halt(200, json_encode($staff_salary));
    else 
        Flight::halt(401, 'Unauthorized');    
});

Flight::route('POST /salary', function () {
    $auth = new Auth();
    $staff_salary = new StaffSalaryStorage();
    $request = Flight::request();
    $request = $request->data->getData();

    $token_data = $auth->is_jwt_valid($auth->getBearerToken());
    $request['company_id'] = $token_data[1]['id'];
    
    $staff_salary = $staff_salary->insert_staff_salary($request);

    if ($token_data[0])
        Flight::halt(200, json_encode($staff_salary));
    else
        Flight::halt(401, "Unauthorized");
});

Flight::route('PUT /salary/@id', function ($id) {
    $auth = new Auth();
    $staff_salary = new StaffSalaryStorage();
    $request = Flight::request();
    $request = $request->data->getData();
    $token_data = $auth->is_jwt_valid($auth->getBearerToken());
    $staff_salary = $staff_salary->update_staff_salary($id, $request);

    if ($token_data[0])
        Flight::halt(200, json_encode($staff_salary));
    else
        Flight::halt(401, "Unauthorized");
});

Flight::route('DELETE /salary/@id', function($id){
    $auth = new Auth();
    $staff_salary = new StaffSalaryStorage();
    $token_data = $auth->is_jwt_valid($auth->getBearerToken());
    $staff_salary = $staff_salary->delete_staff_salary($id);

    if($token_data[0])    
        Flight::halt(200, json_encode($staff_salary));
    else
        Flight::halt(401, 'Unauthorized');
});