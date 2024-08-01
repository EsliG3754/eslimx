const mostrar_alerta = (mensaje, tipo) => {
    const alert_placeholder = document.getElementById('alert_placeholder');
    const alerta = `<div class="alert text-${tipo} border-${tipo} bg-white alert-dismissible mb-0 mt-4 text-xs pe-3" role="alert">
                        ${mensaje}
                        <button type="button" class="close text-${tipo}" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`;

    alert_placeholder.innerHTML = alerta;
};

const ocultar_alerta = () => {
    const alert_placeholder = document.getElementById('alert_placeholder');
    alert_placeholder.innerHTML = '';
};

$('.form-control').keypress(function (e) {
    if (e.which == 13) {
        $('.btn_acceder').click();
        return false; //<---- Add this line
    }
});

document.querySelector('.btn_acceder').addEventListener('click', (e) => {
    e.preventDefault();
    ocultar_alerta()

    // Validación del formulario con Parsley
    if (!$('.login_form').parsley().validate()) {
        mostrar_alerta('Por favor, corrige los errores en el formulario.', 'warning');
        return;
    }

    disable_btn('.btn_acceder');

    $.ajax({
        type: 'POST',
        url: '/cuenta/post_login',
        data: {
            correo: $('.correo').val(),
            contrasena: $('.contrasena').val(),
        },
        success: function (response) {
            // Manejo exitoso de la respuesta
            if (response.success) {
                enable_btn('.btn_acceder', '<i class="fa-solid fa-check me-2"></i>Serás redireccionado en un instante...', 'success');
                setTimeout(() => location.reload(), 2000);
            } else {
                mostrar_alerta(response.error || 'Acceso no autorizado', 'danger');
                enable_btn('.btn_acceder', '<i class="fa-thin fa-rotate-right me-2"></i>Intentar nuevamente');
            }
        },
        error: function (xhr, status, error) {
            let error_message = xhr.responseJSON && xhr.responseJSON.error ? xhr.responseJSON.error : 'Error desconocido';
            mostrar_alerta(`${error_message}`, 'danger');
            enable_btn('.btn_acceder', '<i class="fa-thin fa-rotate-right me-2"></i>Intentar nuevamente');
        }
    });
});
