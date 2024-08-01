<main class="main-content mt-0 ps">
    <section>
        <div class="page-header min-vh-100">
            <div class="container">
                <div class="row">
                    <div class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                        <div id="password">
                            <div class="card-header pb-0 text-start">
                                <h3 class="font-weight-bolder text-info text-gradient">Actualizar contraseña</h3>
                                <p class="mb-0 text-xs"><?= ucfirst(strtolower(explode(' ', $nombres)[0])) ?? 'Hola' ?>, por seguridad es importante que actualizemos tu contraseña.</p>
                            </div>
                            <form class="card-body pt-2 form_cambiar_contrasena">
                                <label hidden class="form-label">Contraseña actual</label>
                                <div hidden class="form-group">
                                    <input class="form-control cactual" type="password" value="12345678" placeholder="Escribe tu contraseña acutal..." required onfocus="focused(this)" onfocusout="defocused(this)">
                                </div>
                                <label class="form-label">Nueva</label>
                                <div class="form-group">
                                    <input class="form-control contrasena_1" type="password" placeholder="Escribe tu nueva contraseña..." required onfocus="focused(this)" onfocusout="defocused(this)" data-parsley-maxlength="16" data-parsley-minlength="8" data-parsley-uppercase="1" data-parsley-lowercase="1" data-parsley-number="1">
                                </div>
                                <label class="form-label">Confirma tu contraseña</label>
                                <div class="form-group">
                                    <input class="form-control contrasena_2" type="password" placeholder="Escribe nuevamente tu nueva contraseña..." required onfocus="focused(this)" onfocusout="defocused(this)" data-parsley-maxlength="16" data-parsley-minlength="8" data-parsley-uppercase="1" data-parsley-lowercase="1" data-parsley-number="1" data-parsley-equalto=".contrasena_1">
                                </div>
                                <h5 class="mt-4">Requerimientos</h5>
                                <ul class="text-muted w-100 text-sm ps-4 mb-0 float-start requerimientos_contrasena">
                                    <li data-val-regex="^.{8,16}$">
                                        <span class="text-sm">Debe contener 8-16 caracteres de longitud</span>
                                    </li>
                                    <li data-val-regex="[A-Z]">
                                        <span class="text-sm">Al menos 1 mayuscula</span>
                                    </li>
                                    <li data-val-regex="[a-z]">
                                        <span class="text-sm">Al menos 1 minuscula</span>
                                    </li>
                                    <li data-val-regex="[0-9]">
                                        <span class="text-sm">Al menos 1 número</span>
                                    </li>
                                </ul>

                                <button class="btn bg-gradient-dark btn-sm float-end mt-4 nt-sm-6 col-xxl-7 col-md-12 col-sm-12 mb-0 btn_cambiar_contrasena ms-auto">Guardar contraseña</button>
                            </form>
                        </div>
                    </div>
                    <div class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                        <div class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden" style="background-image: url('<?= base_url('assets_web/img/fotos/interior_11.webp') ?>'); background-size: cover;">
                            <span class="mask bg-gradient-info opacity-6"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<script>
    const url_redireccion = "<?= $url_redireccion ?? null ?>";

    window.addEventListener('load', () => {
        //Cambiar contraseña
        $('.btn_cambiar_contrasena').click((e) => {
            disable_btn('.btn_cambiar_contrasena');

            e.preventDefault();

            if (!$('.form_cambiar_contrasena').parsley().isValid()) {
                $('.form_cambiar_contrasena').parsley().validate();
                return false;
            }

            if ($(".requerimientos_contrasena li.text-danger").length > 0) {
                enable_btn('.btn_cambiar_contrasena', '<i class="fa-solid fa-times me-2"></i>No cumple los requisitos, ingresa una distinta...', 'error');
                return false;
            }

            $.ajax({
                url: '/cuenta/cambiar_contrasena',
                data: {
                    cactual: $('.cactual').val(),
                    contrasena: $('.contrasena_1').val()
                },
                type: 'POST',
                success: function(respuesta, text, xhr) {
                    if (xhr.status == 203) {
                        enable_btn('.btn_cambiar_contrasena', '<i class="fa-solid fa-times me-2"></i>' + text, 'error');

                    } else if (xhr.status == 200) {
                        enable_btn('.btn_cambiar_contrasena', '<i class="fa-solid fa-check me-2"></i>Gracias, serás redireccionado en unos momentos...', 'success');
                        setTimeout(() => location.reload(), 2000);
                    }

                },
                error: (e, e2, e3) => {
                    console.log(e, e2, e3);
                }
            }); // Fin ajax

        })

        var result = $('#password-strength')

        $('.contrasena_1').keyup(async function() {
            let value = $('.contrasena_1').val();

            $(".requerimientos_contrasena li").each(function() {
                var reg = new RegExp($(this).data("val-regex"));

                $(this).removeClass("text-success").removeClass("text-danger");

                if (reg.test(value)) {
                    $(this).addClass("text-success");
                } else {
                    $(this).addClass("text-danger");
                }
            });

        })

    });
</script>