<?php

namespace App\Modules\Web\Config;

// use App\Modules\Panel\Pagina\Conocenos\Controllers\Conocenos as Conocenos;

$routes->setDefaultNamespace('App\Modules\Web\Controllers');

$routes->get('/',                   								'Inicio::inicio');						// Redirigir en automático a inicio

$routes->group('presidencia', static function ($routes) {													// Grupo de "Presidencia"
	$routes->get('/', 												'Presidencia::inicio');					// Landing principal de la presidenta donde se muestra su informe y agenda
	$routes->get('inicio', 											'Presidencia::inicio');					// Landing principal de la presidenta donde se muestra su informe y agenda
	$routes->post('get_ag', 										'Presidencia::get_ag');					// Obtener agenda para la pag web

	$routes->get('convenios', 										'Presidencia::convenios');				// Convenios
	$routes->post('get_conv', 										'Presidencia::get_conv');				// Obtener convenios para la pag web

	$routes->get('acuerdos', 										'Presidencia::acuerdos');				// Acuerdos
	$routes->post('get_acu', 										'Presidencia::get_acu');				// Obtener convenios para la pag web

	$routes->get('informes', 										'Presidencia::informes');				// Informes anuales e informes especiales
	$routes->post('get_inf', 										'Presidencia::get_inf');				// Obtener informes para la pag web

	$routes->group('convenios', static function ($routes) {													// Convenios con detalle
		$routes->get('/', 											'Convenio::convenios');
		$routes->get('(:num)/detalle', 								'Convenio::detalle/$1');				// Detalle individual de convenios
	});
});


$routes->group('micrositio', ['namespace' => 'App\Modules\Panel\Pagina\Micrositio\Controllers'], function ($routes) {

	// Simples, sin backend
	$routes->get('/', 												'Micrositio::inicio');					// Landing de concentrados de micrositios
	$routes->get('inicio', 											'Micrositio::inicio');					// Landing de concentrados de micrositios
	$routes->get('uig', 											'Micrositio::uig');						// Micrositio de igualdad de género
	$routes->get('materialesnna', 									'Micrositio::materialesnna');			// Micrositio Materiales de la Niñez
	$routes->get('cedh', 											'Micrositio::cedh');					// Micrositio de Centro de Estudios de Derechos Humanos
	$routes->get('lgbtttiq', 										'Micrositio::lgbtttiq');				// Micrositio LGBT
	$routes->get('card/luzdelcarmen', 								'Micrositio::luzdelcarmen');			// Luz del carmen card
	// 

	// Con backend
	// Comité de ética y conducta (oic)
	$routes->get('cec', 											'Micrositio::cec');
	$routes->post('post_cec', 										'Micrositio::post_cec');
	$routes->post('guardar_archivo', 								'Micrositio::guardar_archivo');
	// 

	// Micrositio hiram							
	$routes->get('monitoreogenero', 								'Micrositio::monitoreogenero');

	// Micrositio de discapacidad - niñez - etc - 6ta visitaduría
	$routes->get('comiteninez', 									'Micrositio::comiteninez');

	// Discapacidad
	$routes->get('comitediscapacidad', 								'Micrositio::comitediscapacidad');
	$routes->get('comitesmecanismos/comitediscapacidad', 			'Micrositio::comitediscapacidad');
	// Micrositio de discapacidad - niñez - etc - 6ta visitaduría

	// Derechos fundamentales al debate (instituto)
	$routes->group('dfundamentales', static function ($routes) {	// Vista con datos sin necesidad de login
		$routes->get('/', 											'Micrositio::dfundamentales');
		$routes->post('get_by_ajax', 								'Micrositio::get_by_ajax');
		$routes->get('(:num)/detalle', 								'Micrositio::detalle/$1');
	});
	// 

});

