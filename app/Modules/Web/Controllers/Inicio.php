<?php

namespace App\Modules\Web\Controllers;

use App\Controllers\BaseController;
// use App\Modules\Panel\Mesa\Models\SolicitudModel;

class Inicio extends BaseController
{

	////////////////////////////////////////////////// 
	// Conexión a DB

	protected $session;
	private $db;
	// private $SolicitudModel;

	public function __construct()
	{
		$this->session =  \Config\Services::session();
		$this->db      = \Config\Database::connect();

		//Cargar modelos
		// $this->SolicitudModel    = new SolicitudModel();
	}

	// Conexión a DB
	////////////////////////////////////////////////// 

	////////////////////////////////////////////////// 
	// Vistas

	public function inicio()
	{
		$data_view = [
			"ruta" => "Inicio",
			"scripts" => [
				// ["src" => base_url("assets_web/js/accesorios/owlCarousel/owl.carousel.min.js")],
			],
			// "mapa_regionales" => view("Web/Views/recursos/mapa")
		];

		return $this->renderPaginaview(["inicio"], $data_view);
	}

	// Vistas
	////////////////////////////////////////////////// 

}
