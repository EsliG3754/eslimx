let opciones = [
    {
        id_estatus: 1,
        estatus: "Creada",
        visible: 0,
    },
    {
        id_estatus: 2,
        estatus: "Publicada",
        visible: 1,
    },
    {
        id_estatus: 3,
        estatus: "Cerrada",
        visible: 1,
    },
    {
        id_estatus: 4,
        estatus: "Archivada",
        visible: 0,
    },
];

let html_opciones_filtro = opciones.map((option) => {
    return `<option value="${option.id_estatus}">${option.estatus}</option>`;
});

$(document).ready(async () => {
    let tabla_licitaciones = await $(".tabla_licitaciones").DataTable({
        dom: "Blrtip",
        buttons: [
            {
                extend: "excelHtml5",
                exportOptions: {
                    columns: [0, 1, 2],
                },
            },
            {
                extend: "pdfHtml5",
                exportOptions: {
                    columns: [0, 1, 2],
                },
            },
        ],
        ajax: {
            url: "/panel/licitaciones/get_by_ajax",
            type: "POST",
            data: function (data) {
                // Append formdata
                data.usuarios = $("#filtro_usuarios").val();
                data.estatus = $("#filtro_estatus").val();
                $(".table").addClass("is-loading");
                $(".table td button").text("");
            },
            dataSrc: "",
        },
        order: [[3, "desc"]],
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json",
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
            `,
            },
        },
        initComplete: async function () {
            let opciones_usuarios = {};

            await $.ajax({
                url: "/panel/usuarios/get_by_ajax",
                type: "POST",
                processData: false,
                contentType: false,
                success: (respuesta) => {
                    //Validar si la respuesta arrojó datos
                    if (respuesta) {
                        //Validar si los datos tienen al menos 1 elemento
                        if (respuesta.length > 0) {
                            //Iterar los elementos para insertarlos
                            respuesta.forEach((elemento) => {
                                opciones_usuarios += `
                            <option value="${elemento.id_usuario}">
                            ${elemento.usuario}
                            </option>
                        `;
                            });
                        } else {
                            //Limpiar elementos y añadir otro para indicar que no hay resultados
                            Swal.fire(
                                "Upps",
                                "No se encontraron usuarios",
                                "error"
                            );
                        }
                    } else {
                        //Limpiar elementos y añadir otro para indicar que no hay resultadosx
                        Swal.fire(
                            "Upps",
                            "No se encontraron usuarios",
                            "error"
                        );
                    }
                },
                error: (err, texto) => {
                    error_ajax(JSON.parse(err.responseText)["message"]);
                },
            });

            //Agregar panel de filtros
            $("#DataTables_Table_0_length").after(`
            <div class="contenedor_filtros row w-70 justify-content-end">
                <div class="form-group col-xl-6 col-lg-5 col-md-6 col-sm-6">
                    <label class="form-control-label" for="filtro_usuarios">Usuarios:</label>
                    <div class="input-group">
                    <select class="form-select form-select-sm pe-5 select2_init w-100" id="filtro_usuarios" multiple>
                        <option value="">Todos</option>
                        ${opciones_usuarios}
                    </select>
                    </div>
                </div>
              
                <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-6">
                    <label class="form-control-label" for="filtro_estatus">Estatus:</label>
                    <div class="input-group">
                    <select class="form-select form-select-sm pe-5 select2_init w-100" id="filtro_estatus" multiple>
                        ${html_opciones_filtro.join("")}
                    </select>
                    </div>
                </div>
            </div>
        `);

            $(".select2_init").select2({
                width: "100%",
                placeholder: "Selecciona",
            });

            $(".select2_init").change(() => {
                tabla_licitaciones.ajax.reload();
            });

            tabla_licitaciones
                .buttons()
                .container()
                .appendTo(".contenedor_filtros")
                .addClass("col-xl-2 col-lg-3 col-md-4 col-sm-6");
            $(".dt-buttons .dt-button")
                .first()
                .addClass(
                    "btn btn-icon btn-xs mx-1 my-1 btn-success bg-gradient-success"
                )
                .html(
                    `<span class="btn-inner--icon"><i class="fas fa-file-excel"></i></span>`
                );
            $(".dt-buttons .dt-button")
                .last()
                .addClass(
                    "btn btn-icon btn-xs mx-1 my-1 btn-danger bg-gradient-danger"
                )
                .html(
                    `<span class="btn-inner--icon"><i class="fas fa-file-pdf"></i></span>`
                );
        },
        columnDefs: [
            {
                width: "40%",
                targets: 0,
            },
        ],
        columns: [
            {
                mData: "titulo",
                mRender: function (data, type, row) {
                    let contador = 0;

                    return `
                    <div class="d-flex px-2  text-wrap">
                        <div>
                            <button class="btn btn-link text-gradient p-0 m-0 text-dark">
                                <i class="fas fa-id-card-alt text-md avatar avatar-sm rounded-circle me-2 text-dark"></i>
                            </button>
                        </div>
                        <div class="my-auto text-wrap">
                            <h6 class="mb-0 text-xs  text-wrap">${data}</h6>
                        </div>
                    </div>
                `;
                },
            },
            {
                mData: "fecha_inicio",
                mRender: function (data, type, row) {
                    return `<td class="align-middle text-start">
                            <span class="text-xs w-100 text-start font-weight-bold text-wrap"><i class="far fa-file-alt text-sm me-2 text-dark"></i>${data}</span>
                        </td>`;
                },
            },
            {
                mData: "ultima_modificacion",
                mRender: function (data, type, row) {
                    if (type == "sort") {
                        return row.ultima_modificacion_timestamp;
                    }

                    return `<td class="align-middle text-start">
                            <span class="text-xs w-100 text-start font-weight-bold"><i class="fas fa-building text-sm me-2 text-dark"></i>${data}</span>
                            <br>
                            <span class="text-xs w-100 text-start font-weight-bold"><i class="fas fa-user-tie text-sm me-2 text-dark"></i>${row.creador}</span>
                        </td>`;
                },
            },
            {
                mData: "id_estatus",
                mRender: function (data, type, row) {
                    let html_opciones = opciones.map((option) => {
                        return `<option value="${option.id_estatus}" ${
                            data == option.id_estatus ? "selected" : ""
                        }>${option.estatus}</option>`;
                    });

                    return `<div class="align-middle">
                            <select class="form-select form-select-sm" data-id_licitacion="${
                                row.id_licitacion
                            }" onchange="cambiar_estatus(event)">
                                ${html_opciones.join("")}
                            </select>
                        </div>`;
                },
            },
            {
                mData: "id_licitacion",
                mRender: function (data, type, row) {
                    return `<div class="float-lg-center text-center ms-auto">
                            <a href="/transparencia/licitaciones/${data}/detalle" class="cursor-pointer my-auto mx-auto me-2 btn btn-xs bg-gradient-success shadow text-white rounded"  target="_blank">
                                <i class="fas fa-eye text-white" aria-hidden="true"></i>
                            </a>
                            <a href="/panel/licitaciones/${data}/editar" class="cursor-pointer my-auto mx-auto btn btn-xs bg-gradient-info shadow text-white rounded"  target="_blank">
                                <i class="fas fa-edit text-white" aria-hidden="true"></i>
                            </a>
                        </div>
                        `;
                },
            },
        ],
    });

    tabla_licitaciones
        .on("preDraw", function () {
            startTime = new Date().getTime();
            $(".btn_get_modificaciones").get();
        })
        .on("draw.dt", function () {
            console.log(
                "La tabla tardó: " +
                    (new Date().getTime() - startTime) +
                    "ms en cargar"
            );
            $(".table").removeClass("is-loading");

            //Cambiar color paginacion
            $("#DataTables_Table_0_paginate .pagination").addClass(
                "pagination-warning"
            );
        });

    //Inicializar buscador
    $(".busqueda_nav").keyup(function () {
        tabla_licitaciones.search($(this).val()).draw();
        //console.log($(this).val());
    });

    $(".cambiar_estatus").click(function (e) {
        editar_licitacion($(e.target).attr("id_licitacion"), ["visible", "0"]);
    });
});

const cambiar_estatus = (e) => {
    const select = e.currentTarget;
    const id_estatus = select.value;
    const id_licitacion = select.getAttribute("data-id_licitacion");

    $.ajax({
        type: "POST",
        url: "/panel/licitaciones/post_licitacion", // Reemplaza esto con la URL de tu servidor para procesar la solicitud
        data: {
            id_estatus: id_estatus,
            id_licitacion: id_licitacion,
        },
        success: function (response) {
            Swal.fire({
                title: "¡Actualizado!",
                text: "Se actualizó con éxito",
                icon: "success",
                buttonsStyling: false,
                customClass: {
                    confirmButton:
                        "btn bg-gradient-info btn-md mx-2 move-icon-left",
                },
            }).then(() => {
                tabla_licitaciones.ajax.reload();
            });
        },
        error: function (error) {
            console.log(error);
            Swal.fire({
                title: "¡Error!",
                text: "No se pudo actualizar " + error.responseJSON.message,
                icon: "error",
                buttonsStyling: false,
                customClass: {
                    confirmButton:
                        "btn bg-gradient-info btn-md mx-2 move-icon-left",
                },
            });
        },
    });
};
