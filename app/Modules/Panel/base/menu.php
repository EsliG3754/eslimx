<?php $session = session(); ?>

<body class="g-sidenav-show bg-gray-100">

    <aside class="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0  fixed-start z-index-fixed" id="sidenav-main" data-color="info">

        <div class="sidenav-header" style="height: auto;">
            <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
            <a class="navbar-brand m-0" href="<?= base_url("panel") ?>">
                <h3 class="c-dorado">ESLIMX</h3>
            </a>
        </div>

        <hr class="horizontal dark mt-0">
        <div class="collapse navbar-collapse w-auto " id="sidenav-collapse-main">
            <ul class="navbar-nav">

                <li class="nav-item mt-3">
                    <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Aplicaciones</h6>
                </li>

                <?php
                foreach (glob(APPPATH . 'Modules/Panel/{*}/Views/menu_modulo.php', GLOB_BRACE) as $menu_archivo) {
                    if (file_exists($menu_archivo)) {
                        require_once $menu_archivo;
                    }
                }
                ?>

                <li class="nav-item mt-3">
                    <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Cuenta</h6>
                </li>

                <li class="nav-item">
                    <a class="nav-link " href="../pages/profile.html">
                        <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
                        </div>
                        <span class="nav-link-text ms-1">Mi perfil</span>
                    </a>
                </li>

            </ul>
        </div>

        <div class="sidenav-footer mx-3 ">
            <div class="btn btn-danger btn-sm mb-0 w-100 btn_cerrar_session icon-move-right">Salir <i class="ms-2 fa-solid fa-right-from-bracket fs-6"></i></div>
        </div>

    </aside>

    <main class="main-content position-relative border-radius-lg">
        <!-- Navbar -->
        <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
            <div class="container-fluid py-1 px-3">

                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                        <li class="breadcrumb-item text-sm"><a class="opacity-5 c-gris-oscuro" href="javascript:;">ESLIMX</a></li>
                        <li class="breadcrumb-item text-sm c-gris-oscuro active" aria-current="page">Panel</li>
                    </ol>
                    <h6 class="font-weight-bolder c-gris-oscuro mb-0"><?= $ruta ?></h6>
                </nav>

                <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                    <div class="ms-md-auto pe-md-3 d-flex align-items-center shadow rounded">

                        <?php
                        if (isset($busqueda) && $busqueda == 1) {
                        ?>
                            <div class="input-group">
                                <span class="input-group-text text-body"><i class="fas fa-search" aria-hidden="true"></i></span>
                                <input type="text" class="form-control busqueda_nav" placeholder="Buscar...">
                            </div>
                        <?php
                        }
                        ?>

                    </div>

                    <ul class="navbar-nav  justify-content-end">

                        <li class="nav-item d-flex align-items-center">
                            <a href="javascript:;" class="nav-link font-weight-bold px-0 c-gris-oscuro">
                                <i class="fa fa-user me-sm-1"></i>
                                <span class="d-sm-inline d-none"><?= $_SESSION['nombres'] . " " . $_SESSION['ape_paterno'] ?></span>
                            </a>
                        </li>

                        <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                            <a href="javascript:;" class="nav-link text-white p-0" id="iconNavbarSidenav">
                                <div class="sidenav-toggler-inner">
                                    <i class="sidenav-toggler-line bg-gris-claro"></i>
                                    <i class="sidenav-toggler-line bg-gris-claro"></i>
                                    <i class="sidenav-toggler-line bg-gris-claro"></i>
                                </div>
                            </a>
                        </li>

                        <li class="nav-item ps-3 d-flex align-items-center">
                            <a href="javascript:;" class="nav-link c-gris-oscuro p-0" onclick="darkMode(this)">
                                <i dark-toggle class="fa fa-moon c-gris-oscuro"></i>
                            </a>
                        </li>

                        <li class="nav-item px-3 d-flex align-items-center">
                            <a href="javascript:;" class="nav-link c-gris-oscuro p-0">
                                <i class="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                            </a>
                        </li>

                        <li class="nav-item dropdown pe-2 d-flex align-items-center">
                            <a href="javascript:;" class="nav-link c-gris-oscuro p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-bell cursor-pointer"></i>
                            </a>
                            <ul class="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                                <li class="mb-2">
                                    <a class="dropdown-item border-radius-md" href="javascript:;">
                                        <div class="d-flex py-1">
                                            <div class="my-auto">
                                                <img src="<?= base_url('/assets_web/img/icon/fav.png'); ?>" class="avatar avatar-sm  me-3 ">
                                            </div>
                                            <div class="d-flex flex-column justify-content-center">
                                                <h6 class="text-sm font-weight-normal mb-1">
                                                    <span class="font-weight-bold">Nuevo mensaje</span> de Sistema
                                                </h6>
                                                <p class="text-xs text-secondary mb-0">
                                                    <i class="fa fa-clock me-1"></i>
                                                    Hace 13 minutos
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
        <!-- End Navbar -->