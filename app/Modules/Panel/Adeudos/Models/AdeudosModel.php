<?php

namespace App\Modules\Panel\Adeudos\Models;

use CodeIgniter\Model;
use PhpParser\Node\Stmt\Switch_;

class AdeudosModel extends Model
{
    protected $db;
    protected $session;

    public function __construct()
    {
        $this->db       = \Config\Database::connect();
        $this->session  =  \Config\Services::session();
    }
}
