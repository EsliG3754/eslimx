<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class Auth implements FilterInterface
{
    protected $session;

    public function __construct()
    {
        $this->session = \Config\Services::session();
    }

    public function before(RequestInterface $request, $arguments = null)
    {
        $logger = service('logger');
        $db = \Config\Database::connect();

        $ruta = $request->getUri()->getPath();

        // Definimos las rutas públicas y la ruta de salida
        $rutasPublicas = ['/cuenta', '/iniciar_sesion', '/login', '', '/', '/cuenta/post_login'];
        $rutaSalir = '/salir';
        $rutaPostContrasena = '/cuenta/cambiar_contrasena';

        if ($this->session->has('is_logged')) {
            $usuario = $db->table('usuarios')
                ->where('id_usuario', $this->session->get('id_usuario'))
                ->get()
                ->getRowObject();

            if (!$usuario || $usuario->estatus != 'activo') {
                // Si el usuario no está activo o no se encuentra, destruir la sesión
                $this->session->destroy();
                $logger->log('warning', 'Usuario inactivo o no encontrado con ID: ' . $this->session->get('id_usuario') ?? 'Sin ID');
                return redirect()->to(site_url('cuenta'));
            }

            if ($usuario->contrasena === '$2y$10$H/dUxV9nGSSAQbh0PuZgzuH84cgX91nIo1PFAMQ/xWfY1y1U8QpRi' && ($ruta !== $rutaSalir && $ruta !== $rutaPostContrasena)) {
                // Si la contraseña es la contraseña por defecto y la ruta no es la de salir, redirigir a actualizar contraseña
                $logger->log('info', 'Usuario con contraseña por defecto intentando acceder a: ' . $ruta);
                return redirect()->to(site_url('actualizar_contrasena'));
            }


            if (in_array($ruta, $rutasPublicas)) {
                // Si el usuario está logueado y accede a una ruta pública, redirigir a la página principal
                $logger->log('info', 'Usuario ya logueado intentando acceder a ruta pública: ' . $ruta);

                switch (true) {
                    case $this->session->permisos->permiso_dashboard == 1:
                        return redirect()->to(site_url('panel/'));
                        break;
                    case $this->session->permisos->permiso_quejas == 1:
                        return redirect()->to(site_url('panel/quejas/expedientes'));
                        break;
                    case $this->session->permisos->permiso_mesa_solicitudes == 1:
                        return redirect()->to(site_url('panel/mesa_ayuda/solicitudes'));
                        break;
                    case $this->session->permisos->permiso_bitacora == 1:
                        return redirect()->to(site_url('panel/mesa_ayuda/bitacora'));
                        break;
                    case $this->session->permisos->permiso_calificar_quejas == 1:
                        return redirect()->to(site_url('panel/quejas/expedientes'));
                        break;
                    case $this->session->permisos->permiso_personas == 1:
                        return redirect()->to(site_url('panel/quejas/personas'));
                        break;
                    case $this->session->permisos->permiso_guardias == 1:
                        return redirect()->to(site_url('panel/quejas/guardias'));
                        break;
                    case $this->session->permisos->permiso_web_licitaciones == 1:
                        return redirect()->to(site_url('panel/licitaciones'));
                        break;
                    case $this->session->permisos->permiso_web_dfundamentales == 1:
                        return redirect()->to(site_url('panel/mdfundamentales'));
                        break;
                    case $this->session->permisos->permiso_web_autoridades == 1:
                        return redirect()->to(site_url('panel/autoridades'));
                        break;
                    case $this->session->permisos->permiso_web_herramientas == 1:
                        return redirect()->to(site_url('panel/herramientas'));
                        break;
                    case $this->session->permisos->permiso_web_cec == 1:
                        return redirect()->to(site_url('panel/oic'));
                        break;
                    case $this->session->permisos->permiso_web_convenios == 1:
                        return redirect()->to(site_url('panel/convenios'));
                        break;
                    case $this->session->permisos->permiso_usuarios == 1:
                        return redirect()->to(site_url('panel/usuarios'));
                        break;
                    case $this->session->permisos->permiso_instituto == 1:
                        return redirect()->to(site_url('panel/instituto/constancias'));
                        break;
                    default:
                        return redirect()->to(site_url('403'));
                        break;
                }
            }
        } else if (!in_array($ruta, $rutasPublicas)) {
            // Si no está logueado y trata de acceder a una ruta no pública, redirigir al inicio de sesión
            $logger->log('warning', 'Acceso no autorizado a ruta protegida sin sesión: ' . $ruta);
            return redirect()->to('/cuenta');
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        //
    }
}
