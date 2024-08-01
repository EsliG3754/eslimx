<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use App\Modules\Auth\Models\CuentaModel;

class Validar_contrasena implements FilterInterface
{
    protected $session;
    protected $db;
    protected $CuentaModel;

    public function __construct()
    {
        $this->session = \Config\Services::session();
        $this->db      = \Config\Database::connect();
        $this->CuentaModel = new CuentaModel();
    }

    public function before(RequestInterface $request, $arguments = null)
    {
        $result = (object) $this->CuentaModel->get_usuario($this->session->id_usuario, $this->session->id_empleado);

        if(!empty($result) && $this->session->has('is_logged')){
            if ($result->contrasena != '$2y$10$H/dUxV9nGSSAQbh0PuZgzuH84cgX91nIo1PFAMQ/xWfY1y1U8QpRi') {  //Si la contra es default
                return redirect()->to(site_url('cuenta'));
            }
        }else{
            return redirect()->to(site_url('cuenta'));
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        //
    }
}
