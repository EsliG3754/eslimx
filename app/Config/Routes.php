<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

foreach (glob(APPPATH . 'Modules/{*,*/*}/Config/Routes.php', GLOB_BRACE) as $routeFile) {
    if (file_exists($routeFile)) {
        require_once $routeFile;
    }
}

foreach (glob(APPPATH . 'Modules/{*/*/*}/Config/Routes.php', GLOB_BRACE) as $routeFile) {
    if (file_exists($routeFile)) {
        require_once $routeFile;
    }
}