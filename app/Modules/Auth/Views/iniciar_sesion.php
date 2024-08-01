<style>
    .spinner {
        width: 15px !important;
        height: 15px !important;
        top: 0 !important;
        left: 0 !important;
        bottom: 0 !important;
        right: 0 !important;
        position: absolute !important;
        margin: auto auto !important;
    }

    .double-bounce1,
    .double-bounce2 {
        width: 100% !important;
        height: 100% !important;
        border-radius: 50% !important;
        background-color: white !important;
        opacity: 0.6 !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;

        -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
        animation: sk-bounce 2.0s infinite ease-in-out;
    }

    .double-bounce2 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }

    @-webkit-keyframes sk-bounce {

        0%,
        100% {
            -webkit-transform: scale(0.0)
        }

        50% {
            -webkit-transform: scale(1.0)
        }
    }

    @keyframes sk-bounce {

        0%,
        100% {
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
        }

        50% {
            transform: scale(1.0);
            -webkit-transform: scale(1.0);
        }
    }
</style>

<main class="main-content mt-0 ps">
    <section>

        <div class="page-header min-vh-100">
            <div class="container">
                <div class="row">
                    <div class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                        <div class="card card-plain">

                            <div class="col-12 card-header pb-0 text-start mb-5">
                                <a class="navbar-brand m-0 text-center" href="<?= base_url("panel") ?>">
                                    <h1 class="c-dorado">ESLIMX</h1>
                                </a>
                            </div>

                            <div class="card-header pb-0 text-start">
                                <h4 class="font-weight-bolder">Iniciar sesión</h4>
                                <p class="mb-0">Ingresa tus credenciales para acceder</p>
                            </div>

                            <div class="card-body">
                                <form role="form" class="login_form">
                                    <div class="mb-3">
                                        <input type="text" class="form-control form-control-lg correo" placeholder="correo@cedhj.org.mx" aria-label="Correo">
                                    </div>
                                    <div class="mb-3">
                                        <input type="password" class="form-control form-control-lg contrasena" placeholder="*********" aria-label="Contraseña">
                                    </div>
                                    <div class="text-center">
                                        <button type="button" style="min-height: 40px" class="btn btn-lg btn-primary position-relative btn-lg w-100 mt-2 mb-0 icon-move-right btn_acceder">Entrar <i class="fas fa-sign-in-alt ms-2"></i></button>
                                    </div>

                                    <div id="alert_placeholder"></div>

                                </form>
                            </div>

                            <div class="card-footer text-center pt-0 px-lg-2 px-1">
                                <p class="mb-4 text-sm mx-auto">
                                    ¿Olvidaste tu contraseña?
                                    <a href="javascript:alert('Contacta a soporte');" class="text-primary font-weight-bold">Recuperala aquí</a>
                                </p>
                            </div>

                        </div>
                    </div>

                    <div class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                        <div class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden" style="background-image: url('<?= base_url('assets_panel/img/varios/lucky.png') ?>'); background-size: cover;">
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
</main>