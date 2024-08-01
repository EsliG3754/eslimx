const select_autoridad_responsable = async (id_select) => {
    await $.ajax({
        url: '/panel/quejas/autoridades/get_by_ajax',
        data: {
            id_direccion: $('[name=id_direccion]').val()
        },
        dataType: 'JSON',
        type: 'POST',
        success: function (respuesta, text, xhr) {

            let opciones_autoridades = '';
            let select = '.input_queja.autoridades';

            if (xhr.status == 204) {
                return false;
            } else if (xhr.status == 200) {
                $(select).empty();
                $(select).append(`<option value="">Selecciona una opción</option>`);

                respuesta.forEach(autoridad => {
                    opciones_autoridades += `<option value="${autoridad.id_autoridad}">${autoridad.autoridad_nombre}</option>`;
                });

                $(select).append(opciones_autoridades);

            }
        }
    }); // Fin ajax
}

const select_autoridad_derivacion = async (id_select) => {
    await $.ajax({
        url: '/panel/quejas/autoridades/get_instituciones_by_ajax',
        dataType: 'JSON',
        type: 'POST',
        success: function (respuesta, text, xhr) {

            let opciones_autoridades = '';
            let select = `.input_queja[name=id_autoridad_derivada]`;

            if (xhr.status == 204) {
                return false;
            } else if (xhr.status == 200) {
                $(select).empty();
                $(select).append(`<option value="">Selecciona una opción</option>`);

                respuesta.forEach(autoridad => {
                    opciones_autoridades += `<option value="${autoridad.id_autoridad}">${autoridad.autoridad_institucion}</option>`;
                });

                $(select).append(opciones_autoridades);

            }
        }
    }); // Fin ajax
}

const crear_autoridad_responsable = async () => {

    //Crar una autoridad_responsable nueva
    Swal.fire({ 
        title: 'Nueva autoridad',
        buttonsStyling: false,
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonText: `Crear autoridad <i class="fas fa-arrow-right ms-2"></i>`,
        cancelButtonText: `Cancelar`,
        customClass: {
            confirmButton: 'btn bg-gradient-info btn-md mx-2 move-icon-left',
            cancelButton: 'btn btn-gradient-danger btn-md mx-2 move-icon-left',
            loader: 'custom-loader'
        },
        html: `
        <form class="w-100 m-auto row p-2 text-start form_autoridad_responsable" data-validate="parsley">
            <div class="col-lg-12">
                <div class="form-group">
                    <label class="form-control-label"><i class="fas fa-user"></i> Nombre de la autoridad:</label>
                    <input required class="input_autoridad form-control" name="autoridad_nombre" placeholder="Escribe el nombre...">
                </div>
            </div>
            <div class="col-lg-12">
                <div class="form-group">
                    <label class="form-control-label"><i class="fas fa-building"></i> Sobrenombre de la autoridad:</label>
                    <input class="input_autoridad form-control" name="autoridad_sobrenombre" placeholder="Escribe el sobrenombre">
                </div>
            </div>
            <div class="col-lg-12">
                <div class="form-group">
                    <label class="form-control-label"><i class="fas fa-building"></i> Cargo de la autoridad:</label>
                    <input class="input_autoridad form-control" name="autoridad_cargo" placeholder="Escribe el cargo">
                </div>
            </div>
            <div class="col-lg-12">
                <div class="form-group">
                    <label class="form-control-label"><i class="fas fa-building"></i> Institución de la autoridad:</label>
                    <input class="input_autoridad form-control" name="autoridad_institucion" placeholder="Escribe la institución">
                </div>
            </div>
            <div class="col-lg-12">
                <div class="form-group">
                    <label class="form-control-label"><i class="fas fa-phone-alt"></i> Observaciones:</label>
                    <textarea name="autoridad_observaciones" class="input_autoridad form-control input-lg p-2" placeholder="Escribe aquí tus observaciones"></textarea>
                </div>
            </div>
        </form>
        `,
        focusConfirm: false,
        loaderHtml: '<div class="spinner-border text-info text-gradient"></div>',
        preConfirm: function () {
            Swal.showLoading() //Boton con animación de carga
            let autoridad_nombre = Swal.getPopup().querySelector('.input_autoridad[name="autoridad_nombre"]').value.trim()
            let autoridad_sobrenombre = Swal.getPopup().querySelector('.input_autoridad[name="autoridad_sobrenombre"]').value.trim()
            let autoridad_observaciones = Swal.getPopup().querySelector('.input_autoridad[name="autoridad_observaciones"]').value.trim()
            let autoridad_cargo = Swal.getPopup().querySelector('.input_autoridad[name="autoridad_cargo"]').value.trim()
            let autoridad_institucion = Swal.getPopup().querySelector('.input_autoridad[name="autoridad_institucion"]').value.trim()

            //Validar con parsley el formulario
            if (!$(Swal.getPopup().querySelector('.form_autoridad_responsable')).parsley().isValid()) {
                $(Swal.getPopup().querySelector('.form_autoridad_responsable')).parsley().validate()
                Swal.showValidationMessage(`Por favor llena correctamente los campos`)
            }

            return {
                autoridad_nombre,
                autoridad_sobrenombre,
                autoridad_observaciones,
                autoridad_cargo,
                autoridad_institucion
            }
        }
    }).then(async (result) => {

        if (result.isConfirmed) { //Validar clic en boton de aceptar
            await $.ajax({
                url: '/panel/quejas/post_autoridades_responsables',
                data: {
                    autoridad_nombre: result.value.autoridad_nombre,
                    autoridad_sobrenombre: result.value.autoridad_sobrenombre,
                    autoridad_observaciones: result.value.autoridad_observaciones,
                    autoridad_cargo: result.value.autoridad_cargo,
                    autoridad_institucion: result.value.autoridad_institucion
                },
                dataType: 'JSON',
                type: 'POST',
                success: function (respuesta, text, xhr) {
                    console.log(xhr.status);
                    if (xhr.status == 500) {
                        Swal.fire({
                            title: '¡Hay un problema!',
                            text: text,
                            icon: 'error',
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: "btn bg-gradient-info me-3",
                                cancelButton: "btn bg-gradient-secondary"
                            }
                        });

                        return false;

                    } else if (xhr.status == 202) {

                        Swal.fire({
                            title: '¡Hay un problema!',
                            text: 'Ya hay una autoridad responsable con ese nombre o correo',
                            icon: 'error',
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: "btn bg-gradient-info me-3",
                                cancelButton: "btn bg-gradient-secondary"
                            }
                        });

                        return false;

                    } else if (xhr.status == 200) {
                        Swal.fire({
                            title: '¡Creada!',
                            text: 'La autoridad responsable se añadió con éxito',
                            icon: 'success',
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: "btn bg-gradient-info me-3",
                                cancelButton: "btn bg-gradient-secondary"
                            }
                        });

                        select_autoridad_responsable($('[name=id_autoridad_responsable]'));

                        return true;
                    }
                },
                error: (e, e1, e2) => {
                    console.log(e, e1, e2);
                }
            }); // Fin ajax

        }
    });

};

const crear_autoridad_derivada = async () => {
    //Crar una autoridad_responsable nueva
    Swal.fire({ 
        title: 'Nueva autoridad',
        buttonsStyling: false,
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonText: `Crear autoridad <i class="fas fa-arrow-right ms-2"></i>`,
        cancelButtonText: `Cancelar`,
        footer: `<center><i class="fas fa-info-circle" aria-hidden="true"></i>&nbsp;Por favor, captura el nombre con ortografía correcta y respetando mayúsculas y minúsculas.</center>`,
        customClass: {
            confirmButton: 'btn bg-gradient-info btn-md mx-2 move-icon-left',
            cancelButton: 'btn btn-gradient-danger btn-md mx-2 move-icon-left',
            loader: 'custom-loader'
        },
        html: `
        <form class="w-100 m-auto row p-2 text-start form_autoridad_derivada" data-validate="parsley">
            <div class="col-lg-12">
                <div class="form-group">
                    <label class="form-control-label"><i class="fas fa-building"></i> Institución:</label>
                    <input class="input_autoridad form-control" name="autoridad_institucion" placeholder="Escribe la institución">
                </div>
            </div>
        </form>
        `,
        focusConfirm: false,
        loaderHtml: '<div class="spinner-border text-info text-gradient"></div>',
        preConfirm: function () {
            Swal.showLoading() //Boton con animación de carga
            let autoridad_institucion = Swal.getPopup().querySelector('.input_autoridad[name="autoridad_institucion"]').value.trim()

            //Validar con parsley el formulario
            if (!$(Swal.getPopup().querySelector('.form_autoridad_derivada')).parsley().isValid()) {
                $(Swal.getPopup().querySelector('.form_autoridad_derivada')).parsley().validate()
                Swal.showValidationMessage(`Por favor llena correctamente los campos`)
            }

            return {
                autoridad_institucion
            }
        }
    }).then(async (result) => {

        if (result.isConfirmed) { //Validar clic en boton de aceptar
            await $.ajax({
                url: '/panel/quejas/post_autoridades_derivadas',
                data: {
                    autoridad_institucion: result.value.autoridad_institucion
                },
                dataType: 'JSON',
                type: 'POST',
                success: function (respuesta, text, xhr) {
                    console.log(xhr.status);
                    if (xhr.status == 500) {
                        Swal.fire({
                            title: '¡Hay un problema!',
                            text: text,
                            icon: 'error',
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: "btn bg-gradient-info me-3",
                                cancelButton: "btn bg-gradient-secondary"
                            }
                        });

                        return false;

                    } else if (xhr.status == 202) {

                        Swal.fire({
                            title: '¡Hay un problema!',
                            text: 'Ya hay una autoridad con ese nombre',
                            icon: 'error',
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: "btn bg-gradient-info me-3",
                                cancelButton: "btn bg-gradient-secondary"
                            }
                        });

                        return false;

                    } else if (xhr.status == 200) {
                        Swal.fire({
                            title: '¡Creada!',
                            text: 'La autoridad se añadió con éxito',
                            icon: 'success',
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: "btn bg-gradient-info me-3",
                                cancelButton: "btn bg-gradient-secondary"
                            }
                        });

                        select_autoridad_derivacion($('[name=id_autoridad_derivada]'));

                        return true;
                    }
                },
                error: (e, e1, e2) => {
                    console.log(e, e1, e2);
                }
            }); // Fin ajax

        }
    });
};

$(document).ready(function () {

    //Vincular evento al boton para añadir autoridad
    $('.crear_autoridad_responsable').click(function (e) {
        crear_autoridad_responsable();
    })

    //Vincular evento al boton para añadir autoridad
    $('.crear_autoridad_derivada').click(function (e) {
        crear_autoridad_derivada();
    })

    //Evento para traer el select cada que se selecciona una dependencia
    //select_autoridad_responsable($('[name=id_autoridad_responsable]'))
    select_autoridad_derivacion($('[name=id_autoridad_derivada]'));

});