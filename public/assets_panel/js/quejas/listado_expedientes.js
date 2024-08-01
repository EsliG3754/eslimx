const escapeHTML = (unsafe = '') => {
    if (unsafe) {
        return unsafe.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    } else {
        return unsafe;
    }
}

function generar_texto_filtro() {
    // Obtener los valores de los campos de filtro
    let rango_fechas = $('.fechas_expedientes').val();
    let estatus = $('select[name="id_estatus"]').select2('data').filter(function (item) { return item.id !== ''; });
    let visitaduria = $('select[name="id_visitaduria"]').select2('data').filter(function (item) { return item.id !== ''; });
    let tipo_servicio = $('select[name="tipo_servicio"]').select2('data').filter(function (item) { return item.id !== ''; });
    let capturista = $('.filtro_capturista').select2('data').filter(function (item) { return item.id !== ''; });
    let oficina_regional = $('.select_oficinas_regionales').select2('data').filter(function (item) { return item.id !== ''; });

    // Inicializar el texto del filtro
    let texto_filtro = "Estás filtrando por: ";

    // Agregar rango de fechas al texto del filtro si existe
    if (rango_fechas) {
        texto_filtro += "<b>Rango de Fechas: </b>" + rango_fechas + ". ";
    }

    // Agregar estatus al texto del filtro si existe
    if (estatus && estatus.length > 0) {
        let nombres_estatus = estatus.map(function (item) { return item.text; });
        texto_filtro += "<b>Estatus: </b>" + nombres_estatus.join(", ") + ". ";
    }

    // Agregar visitaduria al texto del filtro si existe
    if (visitaduria && visitaduria.length > 0) {
        let nombres_visitaduria = visitaduria.map(function (item) { return item.text; });
        texto_filtro += "<b>Visitaduría: </b>" + nombres_visitaduria.join(", ") + ". ";
    }

    // Agregar tipo de servicio al texto del filtro si existe
    if (tipo_servicio && tipo_servicio.length > 0) {
        let tipo_servicio = tipo_servicio.map(function (item) { return item.text; });

        texto_filtro += "<b>Tipo de Servicio: </b>" + tipo_servicio.join(", ") + ". ";
    }

    // Agregar capturista al texto del filtro si existe
    if (capturista && capturista.length > 0) {
        var nombres_capturista = capturista.map(function (item) { return item.text; });
        texto_filtro += "<b>Capturista: </b>" + nombres_capturista.join(", ") + ". ";
    }

    // Agregar oficina regional al texto del filtro si existe
    if (oficina_regional && oficina_regional.length > 0) {
        var nombres_oficina_regional = oficina_regional.map(function (item) { return item.text; });
        texto_filtro += "<b>Oficina Regional: </b>" + nombres_oficina_regional.join(", ") + ". ";
    }

    // Verificar si no se ha seleccionado ningún filtro
    if (
        !rango_fechas &&
        estatus === 'Selecciona una opción' &&
        visitaduria === 'Selecciona una opción' &&
        tipo_servicio === 'Selecciona una opción' &&
        capturista.length === 0 &&
        oficina_regional.length === 0
    ) {
        texto_filtro += '<b>Todos los registros</b>';
    }

    // Mostrar el texto del filtro
    $('.texto_filtro').html(texto_filtro);
}


const ajax_grafica_expediente = async () => {
    //Traer grafica
    let { fecha_inicio, fecha_fin } = obtener_fechas()
    $.ajax({
        url: '/panel/quejas/get_quejas_grafica',
        type: 'POST',
        dataType: 'json',
        data: {
            fecha_inicio,
            fecha_fin,
            estatus: $('[name=id_estatus]').val(),
            id_visitaduria: $('[name=id_visitaduria]').val(),
            tipo_servicio: $('[name=tipo_servicio]').val(),
            usuarios: $('[name=created_by]').val(),
            agrupar_por: 'created_at'
        },
        success: function (respuesta) {

            // Obtener el total de total_quejas
            if (respuesta && respuesta.length > 0) {
                let total = respuesta.reduce(function (acc, obj) {
                    return acc + parseInt(obj.total_quejas);
                }, 0);

                $('.total_resultados').text(total)

                // Procesar los datos de respuesta
                let labels = respuesta.map(function (data) {
                    return data.mes;
                });

                let dataValues = respuesta.map(function (data) {
                    return parseInt(data.total_quejas);
                });

                // Llamar a la función para renderizar la gráfica
                render_grafica_expediente(labels, dataValues);
            } else {
                $('.total_resultados').text(0)
                render_grafica_expediente(["Sin datos"], [0]);
            }
        },
        error: function (error) {
            // Maneja los errores en la función "error" según tus necesidades
            console.error(error);
        }
    });
}

const obtener_fechas = () => {
    let fechas_seleccionadas = $(".fechas_expedientes").val();
    let valores_fechas = fechas_seleccionadas.split(" al ");
    return {
        fecha_inicio: valores_fechas[0],
        fecha_fin: valores_fechas[1]
    };
}

let chartInstance; // Variable para almacenar la instancia de Chart
const render_grafica_expediente = (labels, dataValues) => {
    let ctx1 = document.getElementById("chart-line").getContext("2d");

    let gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);
    gradientStroke1.addColorStop(1, 'rgba(33,82,255,0.1)');
    gradientStroke1.addColorStop(0.2, 'rgba(33,82,255,0.0)');
    gradientStroke1.addColorStop(0, 'rgba(33,82,255,0)'); //purple colors

    // Destruir la instancia anterior de Chart si existe
    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx1, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Servicios",
                tension: 0.3,
                pointRadius: 2,
                pointBackgroundColor: "#2152ff",
                borderColor: "#2152ff",
                borderWidth: 2,
                backgroundColor: gradientStroke1,
                data: dataValues,
                maxBarThickness: 6,
                fill: true
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false
                    },
                    ticks: {
                        display: true,
                        padding: 10,
                        color: '#9ca2b7'
                    }
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false
                    },
                    ticks: {
                        color: '#252f40',
                        padding: 10
                    }
                }
            }
        }

    });
}

let tabla_expedientes;
const render_tabla_expedientes = async () => {

    tabla_expedientes = await $('.tabla_expedientes').DataTable({
        serverSide: true,
        dom: 'Blrtip',
        buttons: [{
            extend: 'excelHtml5',
            exportOptions: {
                columns: [0, 1, 2]
            }
        },
        {
            extend: 'pdfHtml5',
            exportOptions: {
                columns: [0, 1, 2]
            }
        }
        ],
        ajax: {
            url: '/panel/quejas/get_by_ajax',
            type: 'POST',
            data: function (data) {
                // Append formdata
                let { fecha_inicio, fecha_fin } = obtener_fechas()
                data.fecha_inicio = fecha_inicio;
                data.fecha_fin = fecha_fin;
                data.estatus = $('[name=id_estatus]').val();
                data.id_visitaduria = $('[name=id_visitaduria]').val();
                data.tipo_servicio = $('[name=tipo_servicio]').val();
                data.usuarios = $('[name=created_by]').val();
                $('.table').addClass('is-loading');
                $('.table td button').text('');
            },
            dataSrc: "data"
        },
        order: [
            [0, 'desc']
        ],
        language: {
            "url": "https://cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json",
            paginate: {
                next: `
                <li class="page-item">
                    <a class="page-link" href="javascript:;" aria-label="Next">
                    <i class="fa fa-angle-right"></i>
                    <span class="sr-only">Next</span>
                    </a>
                </li>
                `,
                previous: `
                <li class="page-item">
                    <a class="page-link" href="javascript:;" aria-label="Previous">
                        <i class="fa fa-angle-left"></i>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                `
            }
        },
        columnDefs: [{
            "width": "25%",
            "targets": 0
        },],
        columns: [{
            "mData": "id_expediente",
            "mRender": function (data, type, row) {
                if (type == 'display') {

                    let personas = JSON.parse(row.personas);

                    let textoPersonas = "";
                    if (personas) { // verifica si 'personas' no es null antes de intentar acceder a su propiedad 'length'
                        if (personas.length === 1) {
                            textoPersonas = personas[0].nombre_persona;
                        } else if (personas.length > 1) {
                            textoPersonas = `${personas[0].nombre_persona} +${personas.length - 1}`;
                        }
                    }

                    return `
                    <div class="d-flex align-items-center px-2">
                        <div>
                            <button class="btn btn-link text-gradient p-0 m-0 text-dark">
                                <i class="fas fa-id-card-alt text-md rounded-circle me-2 text-dark"></i>
                            </button>
                        </div>
                        <h6 class="mb-0 text-xs">Folio: ${escapeHTML(row.folio)}</h6>
                    </div>
                    <div class="d-flex px-2">
                        <span class="text-xs p-0 m-0 ver_personas cursor-pointer text-wrap" personas='${escapeHTML(row.personas)}' row='${escapeHTML(JSON.stringify(row))}'>
                            <i class="fas fa-users text-sm me-2 text-dark text-md rounded-circle me-2"></i>
                            ${textoPersonas}
                        </span>
                    </div>
                `;
                } else {
                    return row.id_expediente;
                }
            }
        },
        {
            "mData": "tipo_servicio",
            "mRender": function (data, type, row) {
                return `<div class="align-middle text-start ver_mas cursor-pointer" texto="${escapeHTML(row.descripcion_breve ?? row.descripcion)}">
                                <span class="text-xs w-100 text-start font-weight-bold"><i class="far fa-file-alt text-sm me-2 text-dark"></i>${escapeHTML(data)}</span> <br>
                                <span class="text-xs w-100 text-start font-weight-bold"><i class="fas fa-file-import text-sm me-1 text-dark"></i>${escapeHTML(row.origen)}</span>
                            </div>`;
            }
        },
        {
            "mData": "oficina_regional",
            "mRender": function (data, type, row) {
                return `<td class="align-middle text-start">
                            <span class="text-xs w-100 text-start font-weight-bold"><i class="fas fa-building text-sm me-2 text-dark"></i>${escapeHTML(data)}</span>
                            <br>
                            <span class="text-xs w-100 text-start font-weight-bold text-wrap"><i class="fas fa-user-tie text-sm me-2 text-dark "></i>${escapeHTML(row.creador)}</span>
                        </td>`;
            }
        },
        {
            "mData": "ultima_modificacion",
            "mRender": function (data, type, row) {
                if (type === 'display') {
                    return `<div class="align-middle cursor-pointer btn_historial_borrador" data-order="${row.ultima_modificacion_timestamp}" id_modificacion="${row.id_queja}" nombre="${row.id_queja}">
                                <span class="fas fa-clock text-xs"></span>
                                <span class="font-weight-bold text-wrap text-xs">${escapeHTML(data ?? '---')}</span>
                            </div>`;
                } else {
                    return row.id_expediente
                }
            }
        },
        {
            "mData": "estatus",
            "mRender": function (data, type, row) {
                return `<div class="align-middle">
                            <span class="font-weight-bold text-wrap text-xs">${escapeHTML(data ?? '---')}</span>
                        </div>`;
            }
        },
        {
            "mData": "id_expediente",
            "mRender": (data, type, row) => {

                let id_estatus = row.id_estatus;
                let ruta_queja = row.ruta_queja || '';
                let html_opciones = '';

                if (row.tipo_servicio == 'Queja') {
                    if ([1, 2].includes(Number(id_estatus)) && !ruta_queja) {
                        html_opciones += boton_queja('far fa-edit', 'Subir queja', row.id_queja);
                    }

                    if ([1, 2].includes(Number(id_estatus))) {
                        html_opciones += descargar_queja(row.id_queja);
                    }

                    if (Number(id_estatus) == 2) {
                        html_opciones += boton_queja('fas fa-check', 'Calificar', row.id_queja, row.id_expediente, 'calificar');
                    }

                    if (Number(id_estatus) == 3) {
                        html_opciones += descargar_queja(row.id_queja, '_2');
                    }
                }

                let html_elipsis = '';
                if (html_opciones) {
                    html_elipsis = `
                        <a href="javascript:;" class="cursor-pointer my-1 mx-1 btn btn-xs bg-gradient-info shadow text-center text-white rounded" id="dropdown_expediente_${row.id_expediente}" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-ellipsis-h text-white" aria-hidden="true"></i>
                        </a>
                        <ul class="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdown_expediente_${row.id_expediente}" style="">
                            ${html_opciones}
                        </ul>`;
                }
                html_elipsis = '';

                return `
                    <div class="dropdown d-flex flex-column float-lg-end ms-auto">
                        ${html_elipsis}
                        <a href="/panel/expedientes/${row.id_expediente}/detalle" class="cursor-pointer my-1 mx-1 btn btn-xs bg-gradient-success shadow text-white rounded">
                            <i class="fa fa-arrow-right text-white" aria-hidden="true"></i>
                        </a>
                    </div>`;
            }
        }],

        initComplete: function () {

            //Agregar panel de filtros
            $('#DataTables_Table_0_length').after(`<div class="contenedor_filtros"></div>`);

            tabla_expedientes.buttons().container().appendTo('.contenedor_filtros');

            $('.dt-buttons .dt-button').first().addClass('btn btn-icon btn-xs mx-1 my-auto btn-success bg-gradient-success').html(`<span class="btn-inner--icon"><i class="fas fa-file-excel"></i></span>`);
            $('.dt-buttons .dt-button').last().addClass('btn btn-icon btn-xs mx-1 my-auto btn-danger bg-gradient-danger').html(`<span class="btn-inner--icon"><i class="fas fa-file-pdf"></i></span>`);
        },
    });


    tabla_expedientes.on('preDraw', async () => {
        startTime = new Date().getTime();
        $('.tabla_expedientes').addClass('is-loading');

        await $('.select2_init').select2({placeholder: 'Selecciona una opción'}).on('change', function () {
            // Obtener todas las opciones seleccionadas
            var opciones_seleccionadas = $(this).val();
            // Si 'Todos' está en las opciones seleccionadas
            if (opciones_seleccionadas.includes('*')) {
                // Si 'Todos' es la única opción seleccionada, no hacer nada
                if (opciones_seleccionadas.length == 1) {
                    return;
                } else {
                    // Si se seleccionó 'Todos' junto con otras opciones, deseleccionar las otras
                    $(this).val('*').trigger('change');
                }
            }
        });

        // Cuando se abre el dropdown, deseleccionar 'Todos' si hay otras opciones seleccionadas
        await $('.select2_init').on('select2:opening', function (e) {
            var opciones_seleccionadas = $(this).val();
            if (opciones_seleccionadas.length > 1 && opciones_seleccionadas.includes('*')) {
                // Deseleccionar 'Todos' y actualizar el Select2
                var sin_opcion_todos = opciones_seleccionadas.filter(function (value) {
                    return value != '*';
                });
                $(this).val(sin_opcion_todos).trigger('change');
            }
        });

        generar_texto_filtro();
    })
        .on('draw.dt', function () {
            console.log('La tabla tardó: ' + (new Date().getTime() - startTime) + 'ms en cargar');
            $('.tabla_expedientes').removeClass('is-loading')
            $('.table').removeClass('is-loading');

            ajax_grafica_expediente();

            $('.ver_mas').off('click');
            $('.ver_mas').click((e) => {
                Swal.fire({
                    'title': 'Descripción:',
                    'html': $(e.currentTarget).attr('texto'),
                    'icon': 'info',
                    buttonsStyling: false,
                    confirmButtonText: 'Cerrar',
                    customClass: {
                        confirmButton: "btn bg-gradient-info me-3",
                        popup: 'swal-wide'
                    }
                })
            })

            $('.input_filtro').change((e) => {
                tabla_expedientes.ajax.reload();
                ajax_grafica_expediente();
            });

            //Cambiar color paginacion
            $('#DataTables_Table_0_paginate .pagination').addClass('pagination-danger');

            evento_btn_subir_ratificacion()
            evento_btn_calificar()
            evento_btn_turnar()
            evento_btn_subir_queja();

            $('.ver_personas').off("click");
            $('.ver_personas').click((e) => {
                let html_personas = '';
                let row = $(e.currentTarget).attr('row');
                let json_personas = $(e.currentTarget).attr('personas');

                console.log(json_personas);

                if (json_personas && json_personas != 'null') {
                    JSON.parse(json_personas).forEach(persona => {
                        +
                            console.log(persona);
                        html_personas += generar_html_persona(persona, row, ((persona.tipo) && persona.tipo != '') ? persona.tipo : 'Atendido');
                    });
                }

                Swal.fire({
                    title: 'Personas involucradas',
                    html: `
                    <div class="card card-body">
                        <ul class="list-group border-0 gy-2">
                            ${html_personas}
                        </ul>
                    </div>
                    `,
                    icon: 'info',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: "btn bg-gradient-info me-3",
                        cancelButton: "btn bg-gradient-secondary",
                        popup: "swal-wide",
                    },
                    didOpen: () => {
                        $('#swal2-html-container').addClass('overflow-visible')
                    }
                });
            });

        });
}

const boton_queja = (icon, text, id_queja, id_expediente = '', clase = '') => {
    return `
            <li>
                <a class="dropdown-item d-flex align-items-center ${clase} cursor-pointer" id_queja="${escapeHTML(id_queja)}" id_expediente="${escapeHTML(id_expediente)}">
                    <i class="${icon} me-2" aria-hidden="true"></i>${text}
                </a>
            </li>`;
};

const descargar_queja = (id_queja, suffix = '') => {
    return `
            <li>
                <a href="/panel/quejas/${escapeHTML(id_queja)}/formato_queja${suffix}" target="_blank" class="dropdown-item d-flex align-items-center">
                    <i class="fas fa-file-download me-2" aria-hidden="true"></i>Descargar queja
                </a>
            </li>`;
};

$(document).ready(async () => {

    render_tabla_expedientes();

    get_oficinas();

    $.ajax({
        url: '/panel/usuarios/get_by_ajax',
        type: 'POST',
        processData: false,
        contentType: false,
        success: (respuesta) => {
            if (respuesta && respuesta.length > 0) {
                respuesta.forEach(elemento => {
                    $('.filtro_capturista').append(`<option value="${elemento.id_usuario}">${elemento.usuario}</option>`);
                });
            } else {
                Swal.fire('Upps', 'No se encontraron usuarios', 'error');
            }
        },
        error: (err, texto) => {
            error_ajax(JSON.parse(err.respuestaText)['message']);
        }
    });

    //Inicializar buscador
    $('.busqueda_nav').keyup(function () {
        tabla_expedientes.search($(this).val()).draw();
        //console.log($(this).val());
    });

    //Vincular evento al boton para añadir autoridad
    $('.crear_persona').click(function (e) {
        crear_persona();
    });

    $('.btn_reporte').click(function (e) {
        ajax_reporte();
    });

    $('.editar_persona').click(function (e) {
        console.log(e);
        crear_persona('Editar persona', $(e.target).attr('nombre_persona'));
    });
    //crear_persona();

    const ahora = new Date();
    const hace_una_semana = new Date(ahora.getTime() - (7 * 24 * 60 * 60 * 1000));
    
    let fechas_expedientes = await flatpickr('.fechas_expedientes', {
        minDate: '2023-01-01',
        maxDateHasTime: true,
        locale: {
            firstDayOfWeek: 1,
            weekdays: {
                shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
            },
            months: {
                shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                longhand: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
            },
            rangeSeparator: ' al ',
        },
        mode: "range",
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        defaultDate: [hace_una_semana, ahora],
        altInput: true,
        altFormat: "d/m/Y h:i K"
    });

});