<?php
require 'vendor/autoload.php';

$config = include('config.php');

require 'lib/auth.php';
require 'lib/db.php';

require 'repositories/providers/company.php';
require 'repositories/providers/staff.php';
require 'repositories/providers/performance.php';
require 'repositories/providers/staff_salary.php';

require 'controllers/auth.php';
require 'controllers/staff.php';
require 'controllers/performance.php';
require 'controllers/staff_salary.php';

Flight::start();
