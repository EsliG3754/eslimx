<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class Permiso implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $session = service('session');
        $logger = service('logger');
        
        // Obteniendo el objeto UserAgent
        $userAgent = $request->getUserAgent();

        // Obteniendo detalles del UserAgent
        $agente_usuario = $userAgent->getAgentString(); // Cadena completa del UserAgent
        $navegador = $userAgent->getBrowser(); // Navegador
        $version_navegador = $userAgent->getVersion(); // Versión del navegador
        $plataforma = $userAgent->getPlatform(); // Plataforma/SO

        $ip_cliente = $request->getIPAddress(); // Obtiene la IP del cliente

        // Información básica para todos los logs
        $info_basica_log = "IP: {$ip_cliente}, Agente: {$agente_usuario}, Navegador: {$navegador} {$version_navegador}, Plataforma: {$plataforma}";

        if (!$session->get('is_logged')) {
            $logger->log('error', "Intento de acceso sin sesión a URL: " . $this->getCurrentUrl($request) . " {$info_basica_log}, JSON: " . json_encode($session->get()));
            return redirect()->to('/cuenta');
        }

        $tipo_permiso = $arguments[0] ?? null;
        $permisos = $session->get('permisos');

        if ($tipo_permiso) {
            if (is_object($permisos) && isset($permisos->{$tipo_permiso}) && !$permisos->{$tipo_permiso}) {
                $id_usuario = $session->get('id_usuario') ?? 'No ID';
                $nombres = $session->get('nombres') ?? 'Sin Nombre';
                $logger->log('warning', "Acceso no autorizado de {$id_usuario} {$nombres}. {$info_basica_log} - Permiso requerido: {$tipo_permiso}");

                return redirect()->to('/403');
            } elseif (!is_object($permisos) || !isset($permisos->{$tipo_permiso})) {
                $logger->log('error', "La estructura de permisos no es válida o el permiso {$tipo_permiso} no está definido para el usuario: {$session->get('id_usuario')}. {$info_basica_log}");

                // Opcionalmente, redirigir al usuario a una página de error o inicio
                return redirect()->to('/error-estructura');
            }
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // No es necesario modificar este método para este caso
    }

    private function getCurrentUrl(RequestInterface $request): string
    {
        return $request->getUri()->getPath();
    }
}
