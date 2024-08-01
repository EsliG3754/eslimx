const card_queja = async id_queja => {
    try {
        const queja = await $.ajax({
            url: "/panel/quejas/get_by_ajax",
            data: { id_queja },
            dataType: "JSON",
            type: "POST"
        });

        if (queja) {
            render_queja(queja[0]);
        } else {
            Swal.fire("Oops!", "No se pudo encontrar la queja.", "error");
        }
    } catch (error) {
        console.error(error);
    }
};

const render_queja = async (queja) => {
    const { palabras_clave, derechos, id_estatus, personas, descripcion, tiempo, modo, lugar, tipo_servicio } = queja;
    const personas_array = JSON.parse(personas);
    let derechos_array = JSON.parse(derechos ?? '[]');
    $('.card_queja').empty();

    let html_derechos = ''; // Inicializar la variable que contendrá el HTML de los badges

    if (derechos_array) {
        for (const obj of derechos_array) {
            let derecho_numero = obj.derecho;
            let descripcion_derecho = obj.descripcion;
            // Añadir cada 'derecho' como un badge de Bootstrap 5 con un tooltip
            html_derechos += `<span class="badge bg-primary mt-2" data-bs-toggle="tooltip" data-bs-placement="top" title="${descripcion_derecho}">${derecho_numero}</span> `;
        }
        $('.card_queja').html(html_derechos); // Insertar los badges en el elemento con la clase 'card_queja'
    }

    let palabras_clave_array = JSON.parse(palabras_clave ?? '[]'); // Asumiendo que 'palabras_clave' es la variable que contiene el JSON de palabras clave
    let html_palabras_clave = ''; // Inicializar la variable que contendrá el HTML de los badges

    // Iterar sobre el array de palabras clave y crear un badge para cada una
    if (palabras_clave_array && palabras_clave_array.length > 0) {
        // Iterar sobre el array de palabras clave y crear un badge para cada una
        for (const palabra of palabras_clave_array) {
            let palabra_texto = palabra.palabra_clave; // Asumiendo que 'palabra_clave' es la propiedad en tu objeto JSON
            // Añadir cada 'palabra_clave' como un badge de Bootstrap 5
            html_palabras_clave += `<span class="badge bg-success mt-2">${palabra_texto}</span> `;
        }
    } else {
        // Si no hay palabras clave, mostrar un badge que lo indique
        html_palabras_clave = `<span class="badge bg-danger mt-2">Sin palabras clave</span> `;
    }

    let html_botones = '';

    if ((id_estatus == 2 || id_estatus == 3 || id_estatus == 4) && (queja.ruta_queja == null || queja.ruta_queja == '')) {
        html_botones += `
            <button type="button" class="btn btn-info text-white text-center subir_queja_firmada ms-2" id_queja="${queja.id_queja}" id_expediente="${queja.id_expediente}">
                <i class="far fa-edit me-2"></i>
                Subir queja firmada
            </button>
        `;
    } else if ((id_estatus == 2 || id_estatus == 3 || id_estatus == 4) && (queja.ruta_queja != null || queja.ruta_queja != '')) {
        html_botones += `
            <a href="/${queja.ruta_queja}" target="_blank" class="btn btn-info text-white text-center ms-2">
                <i class="fas fa-file-download me-2"></i>
                Descargar Queja firmada
            </a>
        `;
    }

    if (id_estatus == 1 || id_estatus == 2) {
        html_botones += `
            <a href="/panel/quejas/${queja.id_queja}/formato_queja" target="_blank" class="btn btn-info text-white text-center ms-2">
                <i class="fas fa-file-download me-2"></i>
                Descargar Queja
            </a>
        `;
    }

    if (id_estatus == 3) {
        html_botones += `
            <a href="/panel/quejas/${queja.id_queja}/formato_queja_2" target="_blank" class="btn btn-info text-white text-center ms-2">
                <i class="fas fa-file-download me-2"></i>
                Descargar caratula
            </a>
        `;
    }

    const roles = {
        'agraviado': 'Agraviado',
        'quejoso': 'Quejoso',
        'agraviado_quejoso': 'Ambos',
        'Atendido': 'Atendido'
    };

    let html_personas = '';

    if (personas_array) {
        personas_array.forEach(persona => {
            html_personas += generar_html_persona(persona, queja, roles[persona.tipo]);
        });
    }

    let li_personas = '';
    if (html_personas) {
        li_personas = `
            <li class="list-group-item d-flex justify-content-between align-items-center flex-column accordion p-0">
                <button class="collapsed accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_expendiente_personas" aria-expanded="true" aria-controls="collapse_expendiente_personas">
                    Personas
                    <div class="collapse-close badge badge-primary badge-pill pt-1 position-absolute end-0 me-3">
                        <i class="fa fa-plus text-xs" aria-hidden="true"></i>
                    </div>
                    <div class="collapse-open badge badge-primary badge-pill pt-1 position-absolute end-0 me-3">
                        <i class="fa fa-minus text-xs" aria-hidden="true"></i>
                    </div>
                </button>
                <div class="collapse p-3 w-100 show" id="collapse_expendiente_personas">
                    <div class="card card-body">
                        <ul class="list-group border-0">
                            ${html_personas}
                        </ul>
                    </div>
                </div>
            </li>
        `;
    }

    let li_queja = `
        <li class="list-group-item d-flex justify-content-between align-items-center flex-column accordion p-0">
            <button class="collapsed accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_descripcion_queja" aria-expanded="false" aria-controls="collapse_descripcion_queja">
                Detalle del trámite
                <div class="collapse-close badge badge-primary badge-pill pt-1 position-absolute end-0 me-3">
                    <i class="fa fa-plus text-xs" aria-hidden="true"></i>
                </div>
                <div class="collapse-open badge badge-primary badge-pill pt-1 position-absolute end-0 me-3">
                    <i class="fa fa-minus text-xs" aria-hidden="true"></i>
                </div> 
            </button>

            <div class="collapse p-3 w-100" id="collapse_descripcion_queja">
                <div class="card card-body">
                    ${descripcion.trim() ?? 'Sin descripcion'}
                </div>
            </div>
        </li>
    `;

    let li_tiempo_modo_lugar = ``;
    if (queja.tipo_servicio === 'Queja') {
        li_tiempo_modo_lugar = `
            <li class="list-group-item d-flex justify-content-between align-items-center flex-column accordion p-0">
                <button class="collapsed accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_tiempo_modo_lugar" aria-expanded="false" aria-controls="collapse_tiempo_modo_lugar">
                    Información adicional
                    <div class="collapse-close badge badge-primary badge-pill pt-1 position-absolute end-0 me-3">
                        <i class="fa fa-plus text-xs" aria-hidden="true"></i>
                    </div>
                    <div class="collapse-open badge badge-primary badge-pill pt-1 position-absolute end-0 me-3">
                        <i class="fa fa-minus text-xs" aria-hidden="true"></i>
                    </div>
                </button>
            
                <div class="collapse p-3 w-100" id="collapse_tiempo_modo_lugar">
                    <div class="card card-body">
                        <div class="row gy-3">

                            <div class="col-12">
                                <h6>Descripción breve:</h6>
                                ${queja.descripcion_breve ?? 'Sin descripcion breve'}
                            </div>

                            <div class="col-3">
                                <h6>¿Se indica tiempo?</h5>
                                <p class="card-text" id="si_no_tiempo">${queja.tiempo === null ? 'Sí' : 'No'}</p>
                            </div>
            
                            <div class="col-9">
                                <h6>¿Por qué no se incluye el Tiempo?</h5>
                                <p class="card-text" id="tiempo">${queja.tiempo ?? 'Se indica en la queja'}</p>
                            </div>
            
                            <div class="col-3">
                            <h6>¿Se indica lugar?</h5>
                            <p class="card-text" id="si_no_lugar">${queja.lugar === null ? 'Sí' : 'No'}</p>
                            </div>
            
                            <div class="col-9">
                            <h6>¿Por qué no se incluye el Lugar?</h5>
                            <p class="card-text" id="lugar">${queja.lugar ?? 'Se indica en la queja'}</p>
                            </div>
            
                            <div class="col-3">
                            <h6>¿Se indica modo?</h5>
                            <p class="card-text" id="si_no_modo">${queja.modo === null ? 'Sí' : 'No'}</p>
                            </div>
            
                            <div class="col-9">
                            <h6>¿Por qué no se incluye el modo?</h5>
                            <p class="card-text" id="modo">${queja.modo ?? 'Se indica en la queja'}</p>
                            </div>
            
                            <div class="col-12">
                            <h6>¿En caso de que fuera viable, permitiría que la CEDHJ busque una resolución ágil?</h5>
                            <p class="card-text" id="solucion_agil">${queja.solucion_agil ?? 'No aplica'}</p>
                            </div>
            
                            <div class="col-12">
                            <h6>¿En qué sentido le gustaría que se generara esta conciliación o qué resultado espera de su queja?</h5>
                            <p class="card-text" id="sentido_conciliacion">${queja.sentido_conciliacion ?? 'No aplica'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        `;
    }

    let card_body = `
        <div class="card-header pb-0 text-left">
            <div class="d-flex justify-content-between align-items-center">
                <h3 class="font-weight-bolder mb-4 text-info text-gradient">${queja.tipo_servicio}</h3>
                <h3 class="far fa-file-alt mb-4 text-info text-gradient"></h3>
            </div>
            <div class="row px-2">
                <div class="col-lg-6">
                    <p class="text-bold mb-0">
                        <i class="fas fa-calendar-alt text-xs me-1" aria-hidden="true"></i> Fecha de captura
                    </p>
                    <p>
                        ${queja.created_at}
                    </p>
                </div>
                
            </div>
        </div>
        <div class="card-body">

            <ul class="list-group">
                
                ${li_personas}      
                               
                ${li_queja}

                ${li_tiempo_modo_lugar}
                
            </ul>

        </div>

        <div class="card-footer text-center pt-0">
            <div class="d-flex w-100 justify-content-end ">
                ${html_botones}
            </div>
        </div>
    `;


    let btn_turnar = '';
    if ((id_estatus == 1 || id_estatus == 2 || id_estatus == 3) && permisos.permiso_turnar_quejas == 1) {
        btn_turnar = `
            <button type="button" class="btn btn-xs btn-success bg-gradient-success text-white text-center turnar mt-2" id_queja="${queja.id_queja}" id_expediente="${queja.id_expediente}">
                <i class="fas fa-directions me-2"></i>
                Turnar
            </button>
        `;
    }

    let btn_abogado = '';
    if (id_estatus == 3 && permisos.permiso_turnar_quejas == 1 && id_visitaduria) {
        btn_abogado = `
            <button type="button" class="btn btn-xs btn-success bg-gradient-success text-white text-center abogado mt-2 ms-auto" id_queja="${queja.id_queja}" id_expediente="${queja.id_expediente}">
                <i class="fas fa-directions me-2"></i>
                Asignar 
            </button>
        `;
    } else {
        btn_abogado = `<p class="mt-2">Sin asignar <i class="fas fa-exclamation-triangle"></i></p>`;
    }

    let btn_returno = '';
    if ((queja.visitaduria) && permisos.permiso_turnar_quejas == 1 && queja.id_estatus != 7) {
        btn_returno = `
            <button type="button" class="btn btn-xs btn-danger bg-gradient-danger text-white text-center retornar mt-2" id_queja="${queja.id_queja}" id_expediente="${queja.id_expediente}">
                <i class="fas fa-arrow-circle-left me-2"></i>
                Retornar a quejas
            </button>
        `;
    } else if (queja.id_estatus == 7) {
        btn_returno = `
            <button type="button" class="btn btn-xs btn-success bg-gradient-success text-white text-center mt-2" id_queja="${queja.id_queja}" id_expediente="${queja.id_expediente}">
                <i class="fas fa-arrow-circle-left me-2"></i>
                Retornado a quejas
            </button>
        `;
    }

    let btn_palabras_clave = '';
    if (permisos.permiso_palabras_clave == 1) {
        btn_palabras_clave = `
            <button type="button" class="btn btn-xs btn-info bg-gradient-info text-white text-center palabras_clave my-0 ms-2" id_queja="${queja.id_queja}" id_expediente="${queja.id_expediente}">
                <i class="fas fa-plus me-2"></i>
                Añadir
            </button>
        `;
    }

    let btn_calificar_visitador = '';
    if (permisos.permiso_palabras_clave == 1 && !queja.observaciones_calificacion_visitaduria) {
        btn_calificar_visitador = `
            <button type="button" class="btn btn-xs btn-info bg-gradient-info text-white text-center calificar_visitador my-0 ms-2 me-n4" id_queja="${queja.id_queja}" id_expediente="${queja.id_expediente}">
                <i class="fab fa-watchman-monitoring me-2"></i>
                Calificar
            </button>
        `;
    }

    let card_body_calificacion = '';
    if ((id_estatus == 1 || id_estatus == 2) && permisos.permiso_calificar_quejas == 1) {
        card_body_calificacion += `
            <p class="text-bold mb-0">
                <i class="fas fa-tasks text-xs me-1" aria-hidden="true"></i> Realizar calificación
            </p>
            <button type="button" class="btn btn-xs btn-success bg-gradient-success text-white text-center calificar mt-2" id_queja="${queja.id_queja}" id_expediente="${queja.id_expediente}">
                <i class="fas fa-check me-2"></i>
                Calificar
            </button>
        `;
    } else {
        card_body_calificacion = `
            <div class="row">
                <div class="col-lg-8">
                    <p class="text-bold mb-0">
                        <i class="fas fa-hands text-xs me-1" aria-hidden="true"></i> Derechos
                    </p>
                    ${html_derechos == '' ? 'No disponibles' : '<p>' + html_derechos + '</p>'}
                </div>
                <div class="col-lg-4 justify-content-end text-end">
                    <p class="text-bold mb-0">&nbsp;</p>
                    ${btn_calificar_visitador != '' ? btn_calificar_visitador : ''}
                </div>
            </div>
        `;
    }

    let card_body_visitaduria = ``;
    if (permisos.permiso_turnar_quejas == 1) {
        card_body_visitaduria = `
            <div class="row">
                <div class="col-lg-7">
                    <p class="text-bold mb-0">
                        <i class="fas fa-user text-xs me-1" aria-hidden="true"></i> Abogado responsable
                    </p>                    
                    ${queja.visitador ? '<p>' + queja.visitador + '</p>' : queja.visitaduria ? btn_abogado : permisos.permiso_turnar_quejas == 1 ? btn_turnar : 'Sin visitaduria asignada'}
                </div>
                <div class="col-lg-5">
                    <p class="text-bold mb-0">
                        <i class="fas fa-undo-alt text-xs me-1" aria-hidden="true"></i> Returno
                    </p>
                    ${btn_returno}
                </div>
            </div>
        `;
    }

    let card_body_palabras_clave = ``;
    card_body_palabras_clave = `
        <div class="row">
            <div class="col-lg-12">
                <p class="text-bold mb-0">
                    <i class="fas fa-key text-xs me-1 mb-2" aria-hidden="true"></i> Listado de palabras
                </p>
                ${html_palabras_clave} ${btn_palabras_clave}
            </div>
        </div>
    `;

    //Insertar html en el cuerpo del modal
    $('.card_queja').html(card_body);
    $('.card_body_calificacion').html(card_body_calificacion);
    $('.card_body_visitaduria').html(card_body_visitaduria);
    $('.card_body_palabras_clave').html(card_body_palabras_clave);
    $('.badge_calificar').html(`
        <!-- Badge para las quejas -->
        <span class="badge bg-info ms-2" data-bs-toggle="tooltip" data-bs-placement="top" title="${queja.observaciones_calificacion == '' ? 'Sin observaciones' : queja.observaciones_calificacion}">
            <i class="fas fa-info-circle me-1"></i> Quejas <!-- Aquí se añade el icono con Font Awesome -->
        </span>

        <!-- Badge para la visitaduría, si hay información disponible -->
        ${queja.observaciones_calificacion_visitaduria ? `
            <span class="badge bg-success ms-2" data-bs-toggle="tooltip" data-bs-placement="top" title="${queja.observaciones_calificacion_visitaduria}">
                <i class="fas fa-info-circle me-1"></i> Visitaduría <!-- Y aquí para el segundo badge -->
            </span>
        ` : ''}
    `);

    $('.badge_visitaduria').html((queja.id_visitaduria == '' && queja.visitaduria) ? 'Sin asignar' : queja.visitaduria);
    $('.card').removeClass('is-loading');

    evento_btn_subir_generales();
    evento_btn_calificar();
    evento_btn_calificar_visitaduria();
    evento_btn_turnar();
    evento_btn_abogado();
    evento_btn_retornar();
    evento_btn_palabras_clave();
    evento_btn_subir_ratificacion();
    evento_btn_editar_persona();
    evento_btn_subir_queja();
    inicializar_tooltips_bs();
}

//Obtener seguimiento
const get_seguimiento = () => {
    const contenedor_chat = $('.contenedor_chat');
    const ult_act_seguimiento = $('.ult_act_seguimiento');
    const paperclip = $('.fa-paperclip');

    $.ajax({
        type: 'post',
        url: '/panel/quejas/get_seguimiento_by_ajax',
        data: {
            id_expediente
        },
        dataType: 'json',
        success: (response) => {
            contenedor_chat.empty();

            if (!response) {
                contenedor_chat.append(template({
                    msg: 'Este expediente no cuenta con mensajes',
                    creador: 'Sistema',
                    created_at: '...',
                    alineacion: 'justify-content-end',
                    fondo: 'bg-gray-200'
                }));
                return;
            }

            ult_act_seguimiento.text(response[response.length - 1].created_at ?? 'Nunca');
            response.forEach(({
                id_usuario_msg,
                seguimiento,
                creador,
                created_at,
                ruta_archivo,
                nombre_archivo
            }) => {

                let alineacion = id_usuario == id_usuario_msg ? 'justify-content-end' : 'justify-content-start';
                let fondo = id_usuario == id_usuario_msg ? 'bg-gray-200' : '';

                const templateData = {
                    msg: seguimiento,
                    creador,
                    created_at,
                    alineacion,
                    fondo,
                    ruta_archivo,
                    nombre_archivo
                };

                if (ruta_archivo) {
                    templateData.ruta_archivo = ruta_archivo;
                    contenedor_chat.append(template_file(templateData));
                } else {
                    contenedor_chat.append(template(templateData));
                }
            });

            scrollBottom();
            paperclip.removeClass('text-success');
        },
        error: (err) => {
            console.log(err);
            paperclip.removeClass('text-success');
        }
    });
};

//Obtener anexos
const get_anexos = () => {

    $.ajax({
        type: 'post',
        url: '/panel/quejas/get_anexos_by_ajax',
        data: {
            id_expediente
        },
        dataType: 'json',
        success: ((response) => {

            $('.anexos_vacios').remove();
            $('.lista_anexos').empty();

            if (!response) {
                $('.lista_anexos').append(`
                    <li class="list-group-item d-flex justify-content-between align-items-center p-3 anexos_vacios">
                        Sin anexos
                        <span class="badge badge-primary badge-pill cursor_pointer">
                            <i class="far fa-file-pdf" aria-hidden="true"></i>
                        </span>
                    </li>
                `);
                return;
            }

            const lista_anexos = $('.lista_anexos');

            response.forEach(element => {
                const ext = element.ruta_anexo.split('.').pop();

                let html_observaciones = '';
                if (element.observaciones) {
                    html_observaciones = `
                    <a href="javascript:void(0);" texto="${element.observaciones}" class="badge badge-primary badge-pill cursor_pointer sa_leer_mas">
                        <i class="fas fa-comment"></i>
                    </a>
                `;
                }

                const li = `
                <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                    <div>
                        <b>${element.nombre_anexo}</b> <br> <small><i class="far fa-calendar-alt me-2" aria-hidden="true"></i>${element.ultima_modificacion}</small>
                    </div>
                    <div>
                        ${html_observaciones}
                        <a download="${element.nombre_anexo}.${ext}" href="/${element.ruta_anexo}" class="badge badge-primary badge-pill cursor_pointer">
                        <i class="fas fa-download" aria-hidden="true"></i>
                        </a>
                    </div>
                </li>
              `;

                lista_anexos.append(li);
            });

            lista_anexos.on('click', '.sa_leer_mas', (e) => {
                sa_leer_mas($(e.currentTarget).attr('texto'));
            });

        }),
        error: ((err) => {
            console.log(err);
        })
    });

};

const template = ({
    msg,
    creador,
    created_at,
    alineacion,
    fondo
}) => {
    return `
    <div class="row ${alineacion} mb-4">
        <div class="col-auto">
            <div class="card ${fondo}">
                <div class="card-body py-2 px-3">
                    <p class="mb-1">
                        ${msg}
                    </p>
                    <div class="d-flex align-items-center justify-content-between text-sm opacity-6">
                        <p class="text-xs mb-0 me-3">${creador}</p>
                        <small>${created_at}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
};

const template_file = ({
    msg,
    creador,
    created_at,
    alineacion,
    fondo,
    ruta_archivo,
    nombre_archivo
}) => {
    const ext = ruta_archivo.split('.').pop();

    return `
        <div class="row ${alineacion} mb-4">
            <div class="col-auto">
                <div class="card ${fondo}">
                    <div class="card-body py-2 px-3">
                        <p class="mb-1">
                            ${msg}
                        </p>
                        <p class="bg-gray-100 rounded py-2 px-4 mb-3 mt-2">
                            <a href="/${ruta_archivo}" download="${nombre_archivo}.${ext}">
                                <i class="${getFileIcon('pdf')} me-2"></i> ${nombre_archivo}
                            </a>
                        </p>
                        <div class="d-flex align-items-center justify-content-between text-sm opacity-6">
                            <p class="text-xs mb-0 me-3">${creador}</p>
                            <small>${created_at}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};

const post_seguimiento = (texto) => {

    var formdata = new FormData();
    formdata.append('id_expediente', id_expediente);
    formdata.append('seguimiento', texto);

    $.ajax({
        type: 'post',
        url: '/panel/quejas/seguimiento/post_seguimiento',
        data: formdata,
        cache: false,
        contentType: false,
        processData: false,
        success: ((response) => {
            get_seguimiento();
            $('.texto_seguimiento').val('')
        }),
        error: ((err) => {
            console.log(err);
        })
    });

}

//Scroll de chat abajo
const scrollBottom = () => {
    $('.contenedor_chat').stop().animate({
        scrollTop: 20000
    }, 800);
}

$(document).ready(async () => {

    //Habilitar evento para subir anexos
    evento_btn_subir_anexos();

    //Traer el seguimiento del expediente
    get_seguimiento();

    //Traer los anexos
    get_anexos();

    //Llamar a la primera queja del expediente al cargar la pagina
    $('.listado_quejas .nav-item').first().click();

    $('.enviar_seguimiento').click((e) => {
        post_seguimiento($('.texto_seguimiento').val());
    })

})