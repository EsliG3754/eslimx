<?php

namespace App\Modules\Panel\Dashboard\Controllers;

use App\Controllers\BaseController;
use App\Modules\Panel\Dashboard\Models\DashboardModel;

class Dashboard extends BaseController
{

	//////////////// 
	// Conexión DB
	protected $session;
	protected $db;
	protected $DashboardModel;

	public function __construct()
	{
		$this->session          = \Config\Services::session();
		$this->db               = \Config\Database::connect();

		//Cargar modelos
		$this->DashboardModel  = new DashboardModel();
	}
	// Conexión DB
	//////////////// 

	//////////////// 
	// VISTA

	public function inicio()
	{
		$data_view = [
			"ruta" => "Dashboard",
			"usuario" => $this->session->nombres . " " . $this->session->ape_paterno,
			"scripts" => [
				["src" => "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"],
				["src" => base_url("assets_panel/js/quejas/graficas.js?v=" . date("YmdHis"))],
				["src" => base_url("vendors/alpinejs/alpine.js")],
				["src" => base_url("vendors/flatpickr/4.6.9/js/flatpickr.js")],
				["src" => base_url("assets_panel/js/quejas/relacion_orientaciones_quejas.js?v=" . date("YmdHis"))],
			]
		];

		//Imprimir vista
		return $this->renderPanelView(["Dashboard/Views/inicio"], $data_view);
	}

	// VISTA
	//////////////// 
}
