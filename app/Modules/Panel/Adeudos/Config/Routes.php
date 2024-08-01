<?php

namespace App\Modules\Web\Config;

$routes->setDefaultNamespace('App\Modules\Panel\Adeudos\Controllers');

$routes->group('panel', ['filter' => 'auth'], static function ($routes) {

	//Usuarios
	$routes->group('adeudos', static function ($routes) {
		$routes->get('/', 					'Adeudos::inicio');
	});

});
