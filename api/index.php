<?php
require 'vendor/autoload.php';

$config = include('config.php');

require 'lib/auth.php';
require 'lib/db.php';

require 'storage/company.php';
require 'storage/staff.php';
require 'storage/performance.php';
require 'storage/staff_salary.php';

require 'modules/auth.php';
require 'modules/staff.php';
require 'modules/performance.php';
require 'modules/staff_salary.php';

Flight::start();
