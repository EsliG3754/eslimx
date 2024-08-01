<div class="container position-sticky z-index-sticky top-0">
    <div class="row">
        <div class="col-12">

            <nav class="navbar navbar-expand-lg blur border-radius-lg top-0 z-index-3 shadow position-absolute mt-4 py-2 start-0 end-0 mx-4">
                <div class="container-fluid">
                    <a class="navbar-brand m-0" style="max-width: 120px;" href="<?= base_url("panel") ?>">
                        <img src="<?= base_url("assets_panel/img/iconos/logotipo.png") ?>" class="navbar-brand-img w-100 mh-100" alt="main_logo">
                    </a>
                    <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Menú">
                        <span class="navbar-toggler-icon mt-2">
                            <span class="navbar-toggler-bar bar1"></span>
                            <span class="navbar-toggler-bar bar2"></span>
                            <span class="navbar-toggler-bar bar3"></span>
                        </span>
                    </button>
                    <div class="collapse navbar-collapse" id="navigation">

                        <ul class="navbar-nav mx-auto">
                        </ul>

                        <ul class="navbar-nav d-lg-block d-none">
                            <li class="nav-item">
                                <a href="<?= base_url('/') ?>" class="btn btn-sm mb-0 me-1 btn-danger icon-move-left"><i class="fas fa-arrow-left me-2"></i> Volver a la pagina principal</a>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>

        </div>
    </div>
</div>