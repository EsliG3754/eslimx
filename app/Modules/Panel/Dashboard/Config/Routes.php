<?php

namespace App\Modules\Web\Config;

$routes->setDefaultNamespace('App\Modules\Panel\Dashboard\Controllers');

$routes->group('panel', ['filter' => 'auth'], static function ($routes) {
	$routes->get('/', 					'Dashboard::inicio');
	$routes->get('cerrar_sesion', 		'Cuenta::logout');

	//Usuarios
	$routes->group('usuarios', static function ($routes) {
		$routes->get('/', 'Usuario::index', ['filter' => 'permiso:permiso_usuarios']);
		$routes->post('get_by_ajax', 'Usuario::get_usuarios_by_ajax');
	});
});
