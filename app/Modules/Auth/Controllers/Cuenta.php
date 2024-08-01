<?php

namespace App\Modules\Auth\Controllers;

use App\Controllers\BaseController;
use App\Modules\Auth\Models\CuentaModel;

class Cuenta extends BaseController
{
    protected $session;
    protected $CuentaModel;

    public function __construct()
    {
        //Load model
        $this->session =  \Config\Services::session();
        $this->CuentaModel = new CuentaModel();
    }


    public function iniciar_sesion()
    {
        $data_view = [
            "ruta" => 'Iniciar sesión',
            "css" => [],
            "scripts" => [
                ["src" => base_url("assets_panel/js/cuenta.js")],
                ["src" => base_url('assets_panel/js/plugins/parsley.min.js?v=' . date('YmdHis'))],
                ["src" => base_url('assets_panel/js/plugins/parsley.es.js?v=' . date('YmdHis'))],
            ],
        ];

        return $this->renderSimpleView(["Auth/Views/iniciar_sesion"], $data_view);
    }

    public function error_404()
    {
        $data_view = [
            "ruta" => 'error_404',
        ];

        return $this->renderSimpleView(["404"], $data_view);
    }

    public function error_403()
    {
        $data_view = [
            "ruta" => 'error_403',
        ];

        return $this->renderSimpleView(["403"], $data_view);
    }

    public function post_login()
    {
        if (!$this->request->isAJAX()) {
            return $this->response->setJSON(['error' => 'Acceso no permitido.'])->setStatusCode(403);
        }

        $correo = $this->request->getPost("correo", FILTER_SANITIZE_EMAIL);
        $contrasena = $this->request->getPost("contrasena");

        if (empty($correo) || empty($contrasena)) {
            return $this->response->setJSON(['error' => 'Datos de ingreso incompletos.'])->setStatusCode(400);
        }

        if ($this->CuentaModel->verificar_bloqueo($correo, $this->request->getIPAddress())) {
            $this->CuentaModel->registrar_intento_fallido($correo, $this->request->getIPAddress());
            return $this->response->setJSON(['error' => 'Demasiados intentos. Cuenta bloqueada temporalmente.'])->setStatusCode(429);
        }

        $respuesta = $this->CuentaModel->auth([
            "correo"     => $correo,
            "contrasena" => $contrasena,
        ]);

        if (isset($respuesta['success'])) {
            $this->CuentaModel->reiniciarIntentosFallidos($correo, $this->request->getIPAddress());
            return $this->response->setJSON(['success' => true])->setStatusCode(200);
        } else {
            $this->CuentaModel->registrar_intento_fallido($correo, $this->request->getIPAddress());
            return $this->response->setJSON(['error' => 'Correo electrónico o contraseña incorrecta.'])->setStatusCode(401);
        }
    }


    public function logout()
    {
        $this->CuentaModel->logout($this->session->id_usuario);
        $this->session->destroy();
        return redirect()->back();
    }

    public function cambiar_contrasena()
    {
        $cactual     = $this->request->getPost('cactual');
        $contrasena  = $this->request->getPost('contrasena');

        if ($this->CuentaModel->cambiar_contrasena($cactual, $contrasena)) {
            $this->response->setStatusCode(200);
            return true;
        } else {
            $this->response->setStatusCode(203);
            return true;
        }
    }

    public function actualizar_contrasena()
    {
        $data_view = [
            "ruta" => 'Iniciar sesión',
            "nombres" => $this->session->nombres,
            "scripts" => [
                ["src" => base_url('assets_panel/js/plugins/parsley.min.js?v=' . date('YmdHis'))],
                ["src" => base_url('assets_panel/js/plugins/parsley.es.js?v=' . date('YmdHis'))],
            ]
        ];

        return $this->renderSimpleView(["Auth/Views/actualizar_contrasena"], $data_view);
    }
}
