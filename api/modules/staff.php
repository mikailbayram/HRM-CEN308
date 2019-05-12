<?php

Flight::route('GET /staff', function () {
    $auth = new Auth();
    $staff = new StaffStorage();
    $token_data = $auth->is_jwt_valid($auth->getBearerToken());    
    $staff = $staff->get_staff($token_data[1]['id']);

    if ($token_data[0])
        Flight::halt(200, json_encode($staff));
    else
        Flight::halt(401, "Unauthorized");
});

Flight::route('GET /staff/@id', function($id){
    $data = array();
    $auth = new Auth();
    $staff = new StaffStorage();
    $token_data = $auth->is_jwt_valid($auth->getBearerToken());
    $staff = $staff->get_staff_member($id);

    if($token_data[0])        
        Flight::halt(200, json_encode($staff));
    else 
        Flight::halt(401, 'Unauthorized');    
});

Flight::route('POST /staff', function () {
    $auth = new Auth();
    $staff = new StaffStorage();
    $request = Flight::request();
    $request = $request->data->getData();

    $token_data = $auth->is_jwt_valid($auth->getBearerToken());
    $request['company_id'] = $token_data[1]['id'];
    
    $staff = $staff->insert_staff($request);

    if ($token_data[0])
        Flight::halt(200, json_encode($staff));
    else
        Flight::halt(401, "Unauthorized");
});

Flight::route('PUT /staff/@id', function ($id) {
    $auth = new Auth();
    $staff = new StaffStorage();
    $request = Flight::request();
    $request = $request->data->getData();
    $token_data = $auth->is_jwt_valid($auth->getBearerToken());
    $staff = $staff->update_staff($id, $request);

    if ($token_data[0])
        Flight::halt(200, json_encode($staff));
    else
        Flight::halt(401, "Unauthorized");
});