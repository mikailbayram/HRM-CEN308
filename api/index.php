<?php
require 'vendor/autoload.php';

$config = include('config.php');

require 'lib/auth.php';
require 'lib/db.php';

require 'storage/company.php';

require 'modules/auth.php';


Flight::start();
