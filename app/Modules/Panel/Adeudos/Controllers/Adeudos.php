<?php

namespace App\Modules\Panel\Adeudos\Controllers;

use App\Controllers\BaseController;
use App\Modules\Panel\Adeudos\Models\AdeudosModel;

class Adeudos extends BaseController
{

	//////////////// 
	// Conexión DB
	protected $session;
	protected $db;
	protected $AdeudosModel;

	public function __construct()
	{
		$this->session          = \Config\Services::session();
		$this->db               = \Config\Database::connect();

		//Cargar modelos
		$this->AdeudosModel  = new AdeudosModel();
	}
	// Conexión DB
	//////////////// 

	//////////////// 
	// VISTA

	public function inicio()
	{
		$data_view = [
			"ruta" => "Adeudos",
			"usuario" => $this->session->nombres . " " . $this->session->ape_paterno,
			"scripts" => [
				["src" => "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.min.js"]
			]
		];

		//Imprimir vista
		return $this->renderPanelView(["Adeudos/Views/inicio"], $data_view);
	}

	// VISTA
	//////////////// 
}
