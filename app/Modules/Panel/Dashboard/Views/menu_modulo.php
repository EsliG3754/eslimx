<?php
$rutas_convenios = [
    'ESLIMX - Dashboard',      //0
    'ESLIMX - Inicio',      //0
];

if (isset($session->permisos->permiso_web_convenios)) {
    if ($session->permisos->permiso_web_convenios == 1) {
?>

        <li class="nav-item">
            <a class="nav-link <?= in_array($ruta, $rutas_convenios) ? 'active' : '' ?>" href="<?= base_url('panel/') ?>">
                <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                    <i class="ni ni-circle-08 text-dark text-sm opacity-10"></i>
                </div>
                <span class="nav-link-text ms-1">Dashboard</span>
            </a>
        </li>

<?php
    }
}
?>