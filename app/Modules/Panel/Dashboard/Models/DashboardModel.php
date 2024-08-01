<?php

namespace App\Modules\Panel\Dashboard\Models;

use CodeIgniter\Model;
use PhpParser\Node\Stmt\Switch_;

class DashboardModel extends Model
{
    /////////////////////
    // Conexión a DB

    protected $db;
    protected $session;

    public function __construct()
    {
        $this->db       = \Config\Database::connect();
        $this->session  =  \Config\Services::session();
    }

    // Conexión a DB
    /////////////////////

    //////////////////////    
    // Autenticación para login

    public function auth($data)
    {
        $usuarios = $this->db->table("usuarios");
        $usuarios->where("correo", $data["correo"]);

        if ($usuarios->countAllResults() > 0) { //Existe el usuario

            $usuarios = $this->db->table("usuarios");
            $usuarios->select("usuarios.*");
            $usuarios->where("correo", $data["correo"]);

            $result = $usuarios->get()->getRowObject(); // Datos del usuario
            //echo $usuarios->getCompiledSelect();exit();

            if (password_verify($data["contrasena"], $result->contrasena)) { //Verifica que la contraseña sea correcta

                switch ($result->estatus) {
                    case "activo":

                        $session_Data = [
                            "id_usuario"           => $result->id_usuario,
                            "nombres"              => $result->nombres,
                            "ape_paterno"          => $result->ape_paterno,
                            "ape_materno"          => $result->ape_materno,
                            "correo"               => $result->correo,
                            "perfil"               => $result->perfil,
                            "nivel"                => $result->nivel,
                            "permisos"             => $this->get_permisos($result->id_usuario),
                            "is_logged"            => true
                        ];

                        $this->session->set($session_Data);

                        return true;
                        break;
                    case "inactivo":
                        echo "La cuenta esta inactiva";
                        return false;
                        break;
                    case "suspendido":
                        echo "La cuenta esta suspendida";
                        return false;
                        break;
                }
            } else {
                echo "La contraseña no es correcta";
                return false;
            }
        } else {
            echo "El correo no está registrado";
            return false;
        }
    }

    // Autenticación para login
    //////////////////////    

    //////////////////////////
    // Login - Logout - Permisos - Cambiar contraseña - Perfiles

    public function get_permisos($id_usuario)
    {
        $consulta = $this->db->table("usuarios_permisos as p");
        $consulta->where('p.id_usuario', $id_usuario);

        return $consulta->get()->getRowObject();
    }

    public function logout()
    {
        $this->CuentaModel->logout($this->session->id_usuario);
        $this->session->destroy();
        return redirect()->to(site_url("cuenta"));
    }


    public function cambiar_contrasena($cactual, $contrasena)
    {

        //Verifica que la contraseña actual sea correcta
        $usuarios = $this->db->table("usuarios");
        $usuarios->select("contrasena");
        $usuarios->where("id_usuario", $this->session->id_usuario);
        $usuario = $usuarios->get()->getRowObject();

        if (password_verify($cactual, $usuario->contrasena)) {
            $data_password = [
                'contrasena' => password_hash($contrasena, PASSWORD_BCRYPT),
                'updated_at' => date('Y-m-d H:i:s')
            ];

            $usuarios = $this->db->table("usuarios");
            $usuarios->where("id_usuario", $this->session->id_usuario);

            return $usuarios->update($data_password);
        } else {
            return false;
        }
    }

    public function perfil($perfil)
    {
        $filename = $this->session->id_usuario . ".jpg";
        if ($perfil->move(FCPATH . "uploads/perfiles", $filename, true)) {
            $usuario = $this->db->table("usuarios");
            $usuario->where("id_usuario", $this->session->id_usuario);

            //Update perfil session
            $this->session->set("perfil", $filename);

            return $usuario->update([
                "perfil" => $filename,
                "updated_at" => date('Y-m-d H:i:s'),
                "updated_by" => $this->session->id_usuario
            ]);
        } else {
            return false;
        }
    }

    // Login - Logout - Permisos - Cambiar contraseña - Perfiles
    //////////////////////////

}
