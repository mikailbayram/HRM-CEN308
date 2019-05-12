<?php
require 'vendor/autoload.php';

$config = include('config.php');

require 'lib/auth.php';
require 'lib/db.php';

require 'storage/company.php';
require 'storage/staff.php';

require 'modules/auth.php';
require 'modules/staff.php';


Flight::start();
