<div class="position-sticky z-index-sticky top-0">
    <div class="row">
        <div class="col-12">

            <nav class="navbar navbar-expand-lg  blur top-0  z-index-3 shadow position-absolute start-0 end-0 p-3">
                <a class="navbar-brand font-weight-bold p-0" href="<?= base_url('/') ?>" rel="tooltip" title="CEDHJ" data-placement="bottom"><img src="<?= base_url('assets_panel/img/iconos/logotipo.png') ?>" style="width: 200px;" alt="Logotipo ESLIMX"></a>
                <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon mt-2">
                        <span class="navbar-toggler-bar bar1"></span>
                        <span class="navbar-toggler-bar bar2"></span>
                        <span class="navbar-toggler-bar bar3"></span>
                    </span>
                </button>
                <div class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0" id="navigation">

                    <ul class="navbar-nav navbar-nav-hover mx-auto">

                        <!--  drop down -->
                        <li class="nav-item dropdown dropdown-hover mx-2">

                            <a class="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center" id="drop-servicios" data-bs-toggle="dropdown" aria-expanded="false" role="button">
                                Servicios
                                <i class="fa-solid fa-chevron-down ms-1"></i>
                            </a>

                            <div class="dropdown-menu dropdown-menu-animation dropdown-xl p-3 border-radius-xl mt-0 mt-lg-3" aria-labelledby="drop-servicios">
                                <div class="row d-none d-lg-block">
                                    <div class="col-12 px-4 py-2">
                                        <div class="row">
                                            <div class="col-12 position-relative">

                                                <div class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center px-0">
                                                    <div class="d-inline-block">
                                                        <i class="fa-solid fa-handshake bg-gradient-primary text-white p-2 rounded me-2"></i>
                                                    </div>
                                                    Conócenos
                                                </div>

                                                <a href="<?= base_url('conocenos/estructura') ?>" class="dropdown-item border-radius-md">
                                                    <i class="fa-solid fa-diagram-project"></i><span class="ps-2">Estructura</span>
                                                </a>

                                                <ul class="list-group">
                                                    <li class="nav-item dropdown dropdown-hover dropdown-subitem list-group-item border-0 p-0">
                                                        <a class="dropdown-item border-radius-md ps-3 d-flex align-items-center justify-content-between mb-1" id="dropdownSignIn">
                                                            <i class="fa-solid fa-location-dot"></i><span>Módulos</span>
                                                            <!-- <img src="<?= base_url('assets_web/img/vectores/down-arrow.svg') ?>" alt="down-arrow" class="arrow"> -->
                                                        </a>
                                                        <div class="dropdown-menu mt-0 py-3 px-2" aria-labelledby="dropdownSignIn">

                                                            <a class="dropdown-item ps-3 border-radius-md mb-1 d-flex justify-content-between align-items-center" href="<?= base_url('conocenos/modulos') ?>">
                                                                </i><span class="ps-3">AMG</span><i class="fa-solid fa-arrow-right me-4"></i>
                                                            </a>

                                                            <a class="dropdown-item ps-3 border-radius-md mb-1 d-flex justify-content-between align-items-center" href="<?= base_url('conocenos/modulos') ?>">
                                                                </i><span class="ps-3">Autlán de Navarro</span><i class="fa-solid fa-arrow-right me-4"></i>
                                                            </a>

                                                            <a class="dropdown-item ps-3 border-radius-md mb-1 d-flex justify-content-between align-items-center" href="<?= base_url('conocenos/modulos') ?>">
                                                                </i><span class="ps-3">Colotlán</span><i class="fa-solid fa-arrow-right me-4"></i>
                                                            </a>

                                                            <a class="dropdown-item ps-3 border-radius-md mb-1 d-flex justify-content-between align-items-center" href="<?= base_url('conocenos/modulos') ?>">
                                                                </i><span class="ps-3">Lagos de Moreno</span><i class="fa-solid fa-arrow-right me-4"></i>
                                                            </a>

                                                            <a class="dropdown-item ps-3 border-radius-md mb-1 d-flex justify-content-between align-items-center" href="<?= base_url('conocenos/modulos') ?>">
                                                                </i><span class="ps-3">Ocotlán</span><i class="fa-solid fa-arrow-right me-4"></i>
                                                            </a>

                                                            <a class="dropdown-item ps-3 border-radius-md mb-1 d-flex justify-content-between align-items-center" href="<?= base_url('conocenos/modulos') ?>">
                                                                </i><span class="ps-3">Pto. Vallarta</span><i class="fa-solid fa-arrow-right me-4"></i>
                                                            </a>

                                                            <a class="dropdown-item ps-3 border-radius-md mb-1 d-flex justify-content-between align-items-center" href="<?= base_url('conocenos/modulos') ?>">
                                                                </i><span class="ps-3">Tepatitlán de Morelos</span><i class="fa-solid fa-arrow-right me-4"></i>
                                                            </a>

                                                            <a class="dropdown-item ps-3 border-radius-md mb-1 d-flex justify-content-between align-items-center" href="<?= base_url('conocenos/modulos') ?>">
                                                                </i><span class="ps-3">Tequila</span><i class="fa-solid fa-arrow-right me-4"></i>
                                                            </a>

                                                            <a class="dropdown-item ps-3 border-radius-md mb-1 d-flex justify-content-between align-items-center" href="<?= base_url('conocenos/modulos') ?>">
                                                                </i><span class="ps-3">Zapotlán el Grande</span><i class="fa-solid fa-arrow-right me-4"></i>
                                                            </a>

                                                            <a href="<?= base_url('conocenos/modulos') ?>" class="dropdown-item text-center border-radius-md bg-gradient-primary mt-3">
                                                                <span class="text-white">Todo</span>
                                                            </a>

                                                        </div>
                                                    </li>
                                                </ul>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </li>
                        <!--  drop down -->

                        <!--  drop down -->
                        <li class="nav-item dropdown dropdown-hover mx-2">

                            <a class="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center" id="drop-servicios" data-bs-toggle="dropdown" aria-expanded="false" role="button">
                                Asociaciones
                                <i class="fa-solid fa-chevron-down ms-1"></i>
                            </a>

                            <div class="dropdown-menu dropdown-menu-animation dropdown-xl p-3 border-radius-xl mt-0 mt-lg-3" aria-labelledby="drop-servicios">
                                <div class="row d-none d-lg-block">
                                    <div class="col-12 px-4 py-2">
                                        <div class="row">
                                            <div class="col-12 position-relative">
                                                <div class="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center px-0">
                                                    <div class="d-inline-block">
                                                        <i class="fa-solid fa-landmark bg-gradient-primary text-white p-2 rounded me-2"></i>
                                                    </div>
                                                    Presidencia
                                                </div>

                                                <a href="<?= base_url('presidencia/') ?>" class="dropdown-item border-radius-md">
                                                    <i class="fa-solid fa-school"></i><span class="ps-2">Información</span>
                                                </a>

                                                <a href="<?= base_url('presidencia/convenios') ?>" class="dropdown-item border-radius-md">
                                                    <i class="fa-solid fa-handshake-simple"></i><span class="ps-2">Convenios</span>
                                                </a>

                                                <a href="<?= base_url('presidencia/acuerdos') ?>" class="dropdown-item border-radius-md">
                                                    <i class="fa-solid fa-hands"></i><span class="ps-2">Acuerdos</span>
                                                </a>

                                                <a href="<?= base_url('presidencia/informes') ?>" class="dropdown-item border-radius-md">
                                                    <i class="fa-solid fa-bullhorn"></i><span class="ps-2">Informes</span>
                                                </a>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </li>
                        <!--  drop down -->

                    </ul>

                    <ul class="navbar-nav d-lg-block d-none">
                        <li class="nav-item">
                            <a href="<?= base_url('/cuenta') ?>" class="btn btn-sm  bg-gradient-primary  btn-round mb-0 me-1">Contáctanos</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</div>

<div class="position-fixed bottom-1 end-1 z-index-3">
    <div class="d-flex flex-column">
        <div class="d-flex">
            <div class="toast fade show p-2 mx-auto" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header border-0">
                    <i class="fas fa-bullhorn me-2"></i>
                    <span class="me-auto font-weight-bold">Aviso importante</span>
                    <i class="fas fa-times text-md ms-3 cursor-pointer" data-bs-dismiss="toast" aria-label="Close"></i>
                </div>
                <hr class="horizontal dark m-0">
                <div class="toast-body">
                    Estás consultando la nueva versión de la página web oficial de la CEDHJ.
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center mt-3">
            <a href="<?= base_url('/queja') ?>" class="text-white bg-primary shadow rounded-pill px-3 py-2 me-3 border border-white">Presenta tu queja</a>
            <a href="" id="TOP" class="bg-secondary px-3 py-2 rounded-circle text-white shadow border border-white"><i class="fas fa-arrow-up"></i></a>
        </div>
    </div>
</div>