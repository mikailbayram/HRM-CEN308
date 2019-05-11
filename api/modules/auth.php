<?php

Flight::route('POST /token', function () {
    $auth = new Auth();
    $company = new CompanyStorage();
    $request = Flight::request();
    $company = $company->validate_company($request->data['email'], $request->data['password']);

    // If array is returned and there is data
    if (is_array($company) && count($company) > 0) {
        $jwt = $auth->generate_jwt($company);

        $return_data = [
            'fullname' => $company['name'],
            'token' => $jwt
        ];
        Flight::halt(200, json_encode($return_data));
    }
    Flight::halt(401, 'Unauthorized');
});


Flight::route('POST /register', function () {
    // $auth = new Auth();
    $company = new CompanyStorage();
    $request = Flight::request();

    $company = $company->insert_company($request->data->getData());
    Flight::halt(200, json_encode($company));

    Flight::halt(401, 'Unauthorized');
});
