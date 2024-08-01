<?php

namespace App\Modules\Auth\Config; // Cambiado a namespace del módulo Auth
$routes->setDefaultNamespace('App\Modules\Auth\Controllers');

//Rutas pulicas
$routes->get('actualizar_contrasena', 'Cuenta::actualizar_contrasena', ['filter' => 'Validar_contrasena']);
$routes->get('salir', 'Cuenta::cerrar_sesion');

//Rutas protegidas
$rutas_iniciar_sesion = ['cuenta', 'iniciar_sesion', 'login'];
foreach ($rutas_iniciar_sesion as $ruta) {
    $routes->group($ruta, ['filter' => 'auth'], function ($routes) {
        $routes->post('post_login', 'Cuenta::post_login');
        $routes->post('post_recuperar_contraseña', 'Cuenta::recuperar_contrasena');
        $routes->get('/', 'Cuenta::iniciar_sesion');
        $routes->post('cambiar_contrasena', 'Cuenta::cambiar_contrasena');
    });
}
