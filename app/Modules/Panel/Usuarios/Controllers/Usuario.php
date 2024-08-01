<?php

namespace App\Modules\Panel\Usuarios\Controllers;

use App\Controllers\BaseController;
use App\Modules\Panel\Usuarios\Models\UsuarioModel;

class Usuario extends BaseController
{
    protected $session;
    protected $db;
    protected $UsuarioModel;

    public function __construct()
    {
        $this->session =  \Config\Services::session();
        $this->db      = \Config\Database::connect();

        //Cargar modelos
        $this->UsuarioModel    = new UsuarioModel();
    }

    public function perfil()
    {
        $data_view = [
            "ruta" => 'Perfil'
        ];

        $data_tramites = [
            ''
        ];

        //Incluir scripts custom para esa unica vista sin afectar el include general
        $scripts_view = [
            'scripts' => [
                0 => [
                    'src' => base_url('js/formularios/tramite.js')
                ]
            ]
        ];

        echo view('dashboard/base/head', $data_view) . view('dashboard/base/menu', $this->session->get()) . view('dashboard/usuarios/perfil', $data_tramites) . view('dashboard/base/footer', $scripts_view);
    }

    public function usuarios()
    {
        $data_view = [
            "ruta" => 'Usuarios'
        ];

        $data_selects = [
            #"coordinaciones" => json_decode($this->get_coordinaciones(), true)
            #"direcciones" => json_decode($this->get_direcciones(), true),
            #"unidades" => json_decode($this->get_unidades(), true)
        ];

        //Incluir scripts custom para esa unica vista sin afectar el include general
        $scripts_view = [
            'scripts' => [
                0 => [
                    'src' => base_url('js/formularios/usuarios.js')
                ]
            ]
        ];

        echo view('dashboard/base/head', $data_view) . view('dashboard/base/menu', $this->session->get()) . view('dashboard/usuarios', $data_selects) . view('dashboard/base/footer', $scripts_view);
    }

    /**
     * Obtiene todas las regulaciones basado en los filtros
     *
     * @param data[]: search
     */

    public function get_usuarios_by_ajax()
    {
        if ($this->request->isAJAX()) {
            $data_filtros = $this->request->getPost();
            if ($response = $this->UsuarioModel->get_usuarios($data_filtros)) {
                $this->response->setStatusCode(200);
                return $this->response->setJSON($response);
            } else {
                $this->response->setStatusCode(204);
            }
        } else {
            throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
        }
    }

}
