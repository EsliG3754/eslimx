<?php

namespace App\Modules\Web\Config;

$routes->setDefaultNamespace('App\Modules\Panel\Clientes\Controllers');

$routes->group('panel', ['filter' => 'auth'], static function ($routes) {

    //Usuarios
    $routes->group('clientes', static function ($routes) {
        $routes->get('/',                     'Clientes::inicio');
    });
});
