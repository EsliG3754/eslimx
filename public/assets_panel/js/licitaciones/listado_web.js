let tabla_licitaciones_web;
$(document).ready(async () => {
    let tabla_licitaciones_web = await $(".tabla_licitaciones_web").DataTable({
        dom: "Blrtip",
        buttons: [
            {
                extend: "excelHtml5",
                exportOptions: {
                    columns: [0, 1, 2, 3],
                },
            },
            {
                extend: "pdfHtml5",
                exportOptions: {
                    columns: [0, 1, 2, 3],
                },
            },
        ],
        ajax: {
            url: "/transparencia/get_lic",
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
        order: [[3, "asc"]],
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
        columnDefs: [
            {
                width: "25%",
                targets: [0, 1],
                createdCell: function (td) {
                    $(td).addClass('wrap-content');
                }
            },
        ],
        columns: [
            {
                mData: "expediente",
                mRender: function (data, type, row) {
                    let contador = 0;

                    return `
                    <div class="align-middle d-flex flex-wrap">
                        <h6 class="mb-0 text-xs wrap-content">${data}</h6>
                    </div>
                    `;
                },
            },
            {
                mData: "titulo",
                mRender: function (data, type, row) {
                    let contador = 0;

                    return `
                    <div class="align-middle d-flex flex-wrap">
                        <h6 class="mb-0 text-xs wrap-content text-justify">${data}</h6>
                    </div>
                    `;
                },
            },
            {
                mData: "created_at",
                mRender: function (data, type, row) {
                    // Convertir el string a una fecha y formatearla
                    var date = new Date(data);
                    var formattedDate = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
                    return `
                    <div class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">${formattedDate}</span>
                    </div>
                    `;
                },
            },
            {
                mData: "id_licitacion",
                mRender: function (data, type, row) {
                    let contador = 0;

                    return `
                    <div class="align-middle text-center">
                        <a target="_blank" rel="norrefer" href="/transparencia/licitaciones/${data}/detalle" class="btn btn-primary text-xs font-weight-bold">Visitar</a>
                    </div>
                    `;
                },
            },
        ],
    });

    tabla_licitaciones_web
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
        tabla_licitaciones_web.search($(this).val()).draw();
    });
});
