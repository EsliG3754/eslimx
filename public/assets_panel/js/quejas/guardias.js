const get_guardias = () => {

    $.ajax({
        url: '/panel/quejas/guardias/get_by_ajax',
        type: 'POST',
        processData: false,
        dataType: 'json',
        success: function (respuesta, text, xhr) {

            console.log(respuesta);

            let buckets = [];

            $('.ultimos_reportes').empty();
            $('.contenedor_lista_guardias').empty();

            if (respuesta) {

                $('.lista_vacia').remove();

                respuesta.forEach((e, i) => {

                    if (buckets.includes(e.bucket)) { } else {
                        $('.contenedor_lista_guardias').append(`
                    <h6 class="text-uppercase text-body text-xs font-weight-bolder my-3">${e.bucket}</h6>
                    <ul class="list-group lista_${e.bucket.replace(' ', '_')}">
                    
                    </ul>
                    `);
                        buckets.push(e.bucket)
                    }

                })

                respuesta.forEach((e, i) => {

                    let color = e.closed_at == null ? 'warning' : 'success';
                    let cierre = e.closed_at == null ? 'en curso' : e.closed_at;
                    let btn_cerra_guardia = '';

                    if (e.closed_at == null) {
                        btn_cerra_guardia = `
                        <div class="btn btn-info ms-3 text-white mb-0 btn_cerrar_guardia" id_guardia="${e.id_guardia}">
                            Cerrar
                        </div>
                    `;
                    }

                    quejas = JSON.parse(e.quejas);

                    let contadores = '<b>Totales: &nbsp;</b> ';

                    if (quejas.length == 0) {
                        contadores += " Vacío  ";
                    } else {
                        quejas.forEach(queja => {
                            console.log(contadores);
                            contadores += " " + queja.tipo_servicio + ": " + queja.total + " - "
                        });
                    }

                    $(`.lista_${e.bucket.replace(' ', '_')}`).append(`
                    <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                        <div class="d-flex align-items-center">
                            <a target="_blank" href="/panel/quejas/guardias/${e.id_guardia}/reporte" class="btn btn-icon-only btn-rounded btn-outline-${color} mb-0 me-3 btn-sm d-flex align-items-center justify-content-center"><i class="fas fa-file-alt" aria-hidden="true"></i></a>
                            <div class="d-flex flex-column">
                                <h6 class="mb-1 text-dark text-sm">${e.creador}</h6>
                                <span class="text-xs">${e.created_at} - ${cierre}</span>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="d-flex align-items-center text-${color} text-gradient text-sm font-weight-bold">
                                ${contadores.substring(0, contadores.length - 2)}
                                </div>
                                
                            ${btn_cerra_guardia}
                        </div>
                    </li>
                    `);

                    $('.ultimos_reportes').append(`
                        <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                            <div class="d-flex flex-column">
                                <h6 class="mb-1 text-dark font-weight-bold text-sm">${e.fecha}</h6>
                                <span class="text-xs">${e.creador}</span>
                            </div>
                            <div class="d-flex align-items-center text-sm">
                                ${contadores.substring(0, contadores.length - 2)}
                                <a target="_blank" href="/panel/quejas/guardias/${e.id_guardia}/reporte" class="btn btn-link text-dark text-sm mb-0 px-0 ms-4"><i class="fas fa-file-pdf text-lg me-1" aria-hidden="true"></i> PDF</a>
                            </div>
                        </li>
                    `);
                })

                $('.btn_cerrar_guardia').off("click");
                $('.btn_cerrar_guardia').click(async (e) => {

                    let opciones = {};

                    await $.ajax({
                        url: '/panel/quejas/guardias/cerrar_guardia/' + $(e.currentTarget).attr('id_guardia'),
                        type: 'POST',
                        processData: false,
                        contentType: false,
                        success: (respuesta) => {
                            //Validar si la respuesta arrojó datos
                            if (respuesta) {
                                //Validar si los datos tienen al menos 1 elemento
                                Swal.fire('¡Genial!', 'La guardia se cerró correctamente', 'success').then(() => {
                                    get_guardias();
                                    guardia_activa = false;
                                    validar_guardia();
                                });

                            } else {
                                //Limpiar elementos y añadir otro para indicar que no hay resultadosx
                                Swal.fire('Upps', 'No se logró cerrar la guardia', 'error')
                            }

                        },
                        error: (err, texto) => {
                            error_ajax(JSON.parse(err.responseText)['message']);
                        }
                    });
                });
            } else {
                $('.contenedor_lista_guardias, .ultimos_reportes').append(`
                    <div class="bg-gray-100 py-3 px-4 border-radius-lg lista_vacia">
                    <h6 class="text-uppercase text-body text-xs font-weight-bolder my-3">
                        Sin guardias registradas
                    </h6>
                    <ul class="list-group">
                        <li class="list-group-item bg-gray-100 border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                        <div class="d-flex align-items-center">
                            Por favor crea una guardia primero
                        </div>
                    </li>
                    </ul>
                    </div>
                    `);
            }


        },
        error: (err, texto, xhr) => {
            console.log(err, texto, xhr);
            if (err.status == 403) {
                Swal.fire('Upps', 'Actualmente hay una guardia en proceso', 'error')
            } else {
                error_ajax(JSON.parse(err.responseText)['message']);
            }
        }
    });
}

$(document).ready(async () => {

    get_guardias();

    $(".flatpckr").flatpickr({
        mode: "range",
        //enableTime: true,
        //time_24hr: true,
        maxDate: "today",
        locale: "es",
        defaultDate: [new Date(), "today"]
    });

    $('.json_usuarios_guardia').change((e) => {
        let json = JSON.parse($(e.currentTarget).val());

        if (json.length > 0) {
            $('.lista_usuarios').empty();
            let contador = 0;
            json.forEach(e => {
                $('.lista_usuarios').append(`
                <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                    <div class="row">
                        <div class="col-lg-9">
                            <h6 class="mt-2 text-sm">${e.nombre_usuario}</h6>
                            <span class="mb-2 text-xs">Rol asignado: <i class="text-dark ms-sm-2 font-weight-bold">${e.rol}</i></span>
                        </div>
                        <div class="col-lg-3 ms-auto text-end">
                            <div class="btn btn-link text-info px-3 mb-0" href="javascript:;"><i class="fas fa-pencil-alt text-dark me-2" id_usuario="${e.id_usuario}" aria-hidden="true"></i></div>
                            <div class="btn btn-link text-danger text-gradient px-3 mb-0 eliminar_usuario" posicion="${contador}"><i class="far fa-trash-alt me-2" id_usuario="${e.id_usuario}" aria-hidden="true"></i></div>
                        </div>
                    </div>
                </li>
                `);
                contador++;
            });

            $('.eliminar_usuario').off('click');
            $('.eliminar_usuario').click(async (e) => {
                let posicion = $(e.currentTarget).attr('posicion');
                console.log(posicion);
                json.splice(posicion, 1);

                $('.json_usuarios_guardia').val(JSON.stringify(json)).trigger('change');

            })
        }
    })


    $('.crear_guardia').click(async (e) => {

        let json = $('.json_usuarios_guardia').val() == '' ? '[]' : $('.json_usuarios_guardia').val();
        json = JSON.parse(json);

        if (json.length > 0) {

            console.log(typeof json, json);
            await $.ajax({
                url: '/panel/quejas/guardias/post_guardia',
                type: 'POST',
                data: {
                    datos: JSON.stringify(json)
                },
                dataType: 'json',
                success: function (respuesta, text, xhr) {
                    console.log(respuesta);
                    if (xhr.status == 200) {
                        //Validar si los datos tienen al menos 1 elemento
                        Swal.fire('Guardia creada correctamente', 'La guardia permanecerá activa hasta que la cierres', 'success');
                        get_guardias();
                    } else {
                        //Limpiar elementos y añadir otro para indicar que no hay resultadosx
                        Swal.fire('Upps', respuesta, 'error')
                    }

                    guardia_activa = true;
                    validar_guardia();
                },
                error: (err, texto, xhr) => {
                    console.log(err, texto, xhr);
                    if (err.status == 403) {
                        Swal.fire('Upps', 'Actualmente hay una guardia en proceso', 'error')
                    } else {
                        error_ajax(JSON.parse(err.responseText)['message']);
                    }
                },
                beforeSend: () => {
                    disableBtn(e.currentTarget)
                },
                complete: () => {
                    enableBtn(e.currentTarget, '<i class="fas fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;Crear guardia')
                }
            });

        } else {
            Swal.fire('Error', 'No puedes crear una guardia sin usuarios encargados', 'error');
        }
    });

    $('.agregar_usuario').click(async (e) => {
        let opciones = {};

        await $.ajax({
            url: '/panel/usuarios/get_by_ajax',
            type: 'POST',
            processData: false,
            contentType: false,
            success: (respuesta) => {
                if (respuesta && respuesta.length > 0) {
                    respuesta.forEach(elemento => {
                        let id_usuario = elemento.id_usuario;
                        let usuario = elemento.usuario;
                        opciones[id_usuario] = usuario;
                    });
                } else {
                    Swal.fire('Upps', 'No se encontraron usuarios', 'error');
                }
            },
            error: (err, texto) => {
                error_ajax(JSON.parse(err.responseText)['message']);
            },
            beforeSend: () => {
                disableBtn('.agregar_usuario');
            },
            complete: () => {
                enableBtn('.agregar_usuario', '<i class="fas fa-plus" aria-hidden="true"></i>');
            }
        });

        const { value: formValues } = await Swal.fire({
            title: 'Asignar a la guardia',
            confirmButtonText: 'Guardar <i class="fas fa-arrow-right ms-2"></i>',
            cancelButtonText: 'Salir',
            showCancelButton: true,
            reverseButtons: true,
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn bg-gradient-info btn-md mx-2 move-icon-left',
                cancelButton: 'btn btn-gradient-danger btn-md mx-2 move-icon-left',
                loader: 'custom-loader'
            },
            html: `
                <div class="mb-3 text-start">
                    <label for="usuario" class="form-label">Usuario</label>
                    <select id="usuario" class="form-select swal2-select">
                        ${Object.keys(opciones).map(id_usuario => `<option value="${id_usuario}">${opciones[id_usuario]}</option>`).join('')}
                    </select>
                </div>
                <div class="mb-3 text-start">
                    <label for="rol" class="form-label">Rol en la guardia</label>
                    <select id="rol" class="form-select swal2-select">
                        <option value="Responsable">Responsable</option>
                        <option value="Auxiliar">Auxiliar</option>
                    </select>
                </div>
            `,
            focusConfirm: false,
            preConfirm: () => {
                let id_usuario = document.getElementById('usuario').value;
                let rol = document.getElementById('rol').value;

                if (id_usuario === '' || rol === '') {
                    Swal.showValidationMessage('Por favor, selecciona las opciones requeridas.');
                } else {
                    return {
                        id_usuario: id_usuario,
                        nombre_usuario: opciones[id_usuario],
                        rol: rol
                    };
                }
            },
            onOpen: function () {
                $('.swal2-select').select2();
            }
        });

        if (formValues) {
            let id_usuario = formValues.id_usuario;
            let nombre_usuario = formValues.nombre_usuario;
            let rol = formValues.rol;

            let json = $('.json_usuarios_guardia').val() == '' ? '[]' : $('.json_usuarios_guardia').val();
            json = JSON.parse(json);

            let cancelar = 0;

            json.forEach(e => {
                if (e.id_usuario == id_usuario) {
                    cancelar = 1;
                }
            });

            if (cancelar == 1) {
                Swal.fire('Error', 'No puedes asignar al mismo usuario para la guardia', 'error');
                return;
            }

            json.push({
                id_usuario: id_usuario,
                nombre_usuario: nombre_usuario,
                rol: rol
            });

            $('.json_usuarios_guardia').val(JSON.stringify(json)).trigger('change');
        }
    });

    //Inicializar buscador
    $('.busqueda_nav').keyup(function () {
        tabla_quejas.search($(this).val()).draw();
        //console.log($(this).val());
    })


});

const validar_guardia = () => {
    if (guardia_activa) {
        $('.crear_guardia').text('Guardia en curso').prop('disabled', true);
    } else {
        $('.crear_guardia').text('Crear guardia').prop('disabled', false);
    }
}