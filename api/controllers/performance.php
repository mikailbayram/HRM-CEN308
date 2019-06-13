<?php

// Flight::route('GET /staff', function () {
//     $auth = new Auth();
//     $staff = new StaffStorage();
//     $token_data = $auth->is_jwt_valid($auth->getBearerToken());    
//     $staff = $staff->get_staff($token_data[1]['id']);
//     //var_dump($token_data[1]['id']); exit;
//     if ($token_data[0])
//         Flight::halt(200, json_encode($staff));
//     else
//         Flight::halt(401, "Unauthorized");
// });

Flight::route('GET /performance/@id', function($id){
    $data = array();
    $auth = new Auth();
    $staff = new PerformanceRepository();
    $token_data = $auth->is_jwt_valid($auth->getBearerToken());
    $staff = $staff->get_staff_ratings($id);

    if($token_data[0])        
        Flight::halt(200, json_encode($staff));
    else 
        Flight::halt(401, 'Unauthorized');    
});

Flight::route('POST /performance', function () {
    $auth = new Auth();
    $performance = new PerformanceRepository();
    $request = Flight::request();
    $request = $request->data->getData();

    $token_data = $auth->is_jwt_valid($auth->getBearerToken());
    
    $performance = $performance->insert_rating($request);

    if ($token_data[0])
        Flight::halt(200, json_encode($performance));
    else
        Flight::halt(401, "Unauthorized");
});
