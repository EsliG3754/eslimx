<?php

namespace App\Modules\Auth\Models;

use CodeIgniter\Model;

class CuentaModel extends Model
{
	protected $db;
	protected $session;
	protected $usuarios;
	protected $log_sesiones;

	public function __construct()
	{
		$this->db = \Config\Database::connect();
		$this->session  =  \Config\Services::session();

		$this->usuarios = $this->db->table('usuarios');
		$this->log_sesiones = $this->db->table('log_sesiones_acreditacion');
	}

	public function get_permisos($id_usuario)
	{
		$consulta = $this->db->table("usuarios_permisos as up");
		$consulta->where('up.id_usuario', $id_usuario);

		$resultados = $consulta->get()->getResult();
		$permisos_finales = (object)[];

		foreach ($resultados as $registro) {
			foreach ($registro as $clave => $valor) {
				if (isset($permisos_finales->$clave)) {
					$permisos_finales->$clave = $permisos_finales->$clave || $valor;
				} else {
					$permisos_finales->$clave = $valor;
				}
			}
		}

		return $permisos_finales;
	}

	public function usuario_representante($id_usuario)
	{
		$consulta = $this->db->table("cuenta_espejo as ce");
		$consulta->where('ce.id_usuario_representante', $id_usuario);

		return $consulta->get()->getRowObject();
	}

	public function auth($data)
	{
		$this->usuarios->where("correo", $data["correo"]);
		$usuario = $this->usuarios->get()->getRowObject();

		if (is_null($usuario)) {
			// Devolver un mensaje de error sin especificar si el correo existe o no mejora la seguridad
			return ['error' => "Las credenciales no son válidas."];
		}

		if (!password_verify($data["contrasena"], $usuario->contrasena)) {
			// Igualmente, mantenemos un mensaje genérico de error
			return ['error' => "Las credenciales no son válidas."];
		}

		// Verificamos el estado del usuario antes de permitir el inicio de sesión
		if ($usuario->estatus !== "activo") {
			return ['error' => "La cuenta e7stá " . $usuario->estatus . "."];
		}

		$session_Data = [
			"id_usuario"           => $usuario->id_usuario,
			"nombres"              => $usuario->nombres,
			"ape_paterno"          => $usuario->ape_paterno,
			"ape_materno"          => $usuario->ape_materno,
			"correo"               => $usuario->correo,
			"perfil"               => $usuario->perfil,
			"nivel"                => $usuario->nivel,
			"permisos"             => $this->get_permisos($usuario->id_usuario),
			"is_logged"            => true
		];

		$this->session->set($session_Data);

		// Actualizar el último login
		$this->usuarios->where('id_usuario', $usuario->id_usuario);
		$this->usuarios->update(['logged_at' => date('Y-m-d H:i:s')]);

		return ['success' => true];
	}

	public function verificar_bloqueo($correo, $ip_cliente)
	{
		$resultado = $this->db->table('usuarios_intentos_login')
			->where('correo', $correo)
			->where('ip_ultimo_intento', $ip_cliente)
			->get()
			->getRow();

		if ($resultado && $resultado->bloqueado_hasta && new \DateTime() < new \DateTime($resultado->bloqueado_hasta)) {
			return true; // La cuenta está bloqueada
		}

		return false; // La cuenta no está bloqueada
	}

	public function registrar_intento_fallido($correo, $ip_cliente)
	{
		$fila = $this->db->table('usuarios_intentos_login')
			->where('correo', $correo)
			->where('ip_ultimo_intento', $ip_cliente)
			->get()
			->getRow();

		if ($fila) {
			$intentos = $fila->intentos + 1;
			$datos = [
				'intentos' => $intentos,
				'ip_ultimo_intento' => $ip_cliente, // Guardar la IP del último intento
			];

			// Si se excede el número de intentos permitidos, se bloquea la cuenta
			if ($intentos >= 3) {
				$datos['bloqueado_hasta'] = date('Y-m-d H:i:s', strtotime('+5 minutes')); // Bloquear por 30 minutos
			}

			$this->db->table('usuarios_intentos_login')
				->where('correo', $correo)
				->where('ip_ultimo_intento', $ip_cliente)
				->update($datos);
		} else {
			// Primer intento fallido
			$this->db->table('usuarios_intentos_login')
				->insert([
					'correo' => $correo,
					'ip_ultimo_intento' => $ip_cliente,
					'intentos' => 1,
					'ultimo_intento' => date('Y-m-d H:i:s'),
				]);
		}
	}

	// Función para reiniciar los intentos de inicio de sesión
	public function reiniciarIntentosFallidos($correo, $ip_cliente)
	{
		$this->db->table('usuarios_intentos_login')
			->where('correo', $correo)
			->where('ip_ultimo_intento', $ip_cliente)
			->update(['intentos' => 0, 'bloqueado_hasta' => null]);
	}

	public function recuperar_contrasena($data)
	{
		if (empty($data["correo"])) {
			return "Necesitamos un correo para recuperar la contraseña";
		}

		return "Envio de correo para recuperar la contraseña";
	}


	public function get_usuario($id_usuario, $id_empleado = '')
	{
		$usuarios = $this->db->table("usuarios");
		$usuarios->select('*');
		$usuarios->where("id_usuario", $id_usuario);
		$usuario = $usuarios->get()->getRowObject();

		$datos = $usuario;

		return (object) $datos; // Datos del usuario
	}

	public function cambiar_contrasena($cactual, $contrasena, $id_empleado = '')
	{
		//Verifica que la contraseña actual sea correcta
		if (!empty($this->session->id_usuario)) {
			$usuarios = $this->db->table("usuarios");
			$usuarios->where("id_usuario", $this->session->id_usuario);

			$usuarios->select("contrasena");
			$usuario = $usuarios->get()->getRowObject();

			if (password_verify($cactual, $usuario->contrasena)) {
				$data_password = [
					'contrasena' => password_hash($contrasena, PASSWORD_BCRYPT),
					'updated_at' => date('Y-m-d H:i:s'),
					'updated_by' => $this->session->id_usuario
				];

				$usuarios = $this->db->table("usuarios");
				$usuarios->where("id_usuario", $this->session->id_usuario);
				$usuarios->set($data_password);
				
				return $usuarios->update();;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}


	public function logout($id)
	{
	}
}
