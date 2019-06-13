<?php

Flight::route('GET /project', function () {
    $auth = new Auth();
    $project = new ProjectRepository();
    $token_data = $auth->is_jwt_valid($auth->getBearerToken());    
    $project = $project->get_projects($token_data[1]["id"]);

    if ($token_data[0])
        Flight::halt(200, json_encode($project));
    else
        Flight::halt(401, "Unauthorized");
});

Flight::route('GET /project/@id', function($id){
    $data = array();
    $auth = new Auth();
    $project = new ProjectRepository();
    $token_data = $auth->is_jwt_valid($auth->getBearerToken());
    $project = $project->get_project($id);

    if($token_data[0])        
        Flight::halt(200, json_encode($project));
    else 
        Flight::halt(401, 'Unauthorized');    
});

Flight::route('POST /project', function () {
    $auth = new Auth();
    $project = new ProjectRepository();
    $request = Flight::request();
    $request = $request->data->getData();

    $token_data = $auth->is_jwt_valid($auth->getBearerToken());
    $request['company_id'] = $token_data[1]['id'];
    
    $project = $project->insert_project($request);

    if ($token_data[0])
        Flight::halt(200, json_encode($project));
    else
        Flight::halt(401, "Unauthorized");
});

Flight::route('PUT /project/@id', function ($id) {
    $auth = new Auth();
    $project = new ProjectRepository();
    $request = Flight::request();
    $request = $request->data->getData();
    $token_data = $auth->is_jwt_valid($auth->getBearerToken());
    $project = $project->update_project($id, $request);

    if ($token_data[0])
        Flight::halt(200, json_encode($project));
    else
        Flight::halt(401, "Unauthorized");
});

Flight::route('DELETE /project/@id', function($id){
    $auth = new Auth();
    $project = new ProjectRepository();
    $token_data = $auth->is_jwt_valid($auth->getBearerToken());
    $project = $project->delete_project($id);

    if($token_data[0])    
        Flight::halt(200, json_encode($project));
    else
        Flight::halt(401, 'Unauthorized');
});