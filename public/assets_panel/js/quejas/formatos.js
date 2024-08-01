let quejas;
let editor_formato;

const guardar_formato = () => {

    let template = editor_formato.getData();
    let id_formato = $('.formatos').val();

    id_formato = id_formato == "0" ? false : id_formato;

    Swal.fire({
        title: 'Guardar formato',
        text: id_formato ? '¿Deseas sobreescribir el formato actual?' : 'Ingresa el nombre del nuevo formato',
        input: id_formato ? null : 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        reverseButtons: true,
        buttonsStyling: false,
        inputPlaceholder: 'Escribe aquí...',
        customClass: {
            confirmButton: 'btn bg-gradient-info btn-md mx-2 move-icon-left',
            cancelButton: 'btn btn-gradient-danger btn-md mx-2 move-icon-left',
            loader: 'custom-loader'
        },
    }).then(function (inputValue) {
        if (inputValue.value) {
            let nombre_formato = inputValue.value; // Recibir nombre del nuevo formato
            let datos = new FormData(); // Inicializar form data

            datos.append('nombre_formato', nombre_formato);
            datos.append('template', template);
            datos.append('id_expediente', id_expediente);
            datos.append('id_formato', id_formato);

            $.ajax({
                url: '/panel/expedientes/post_formato',
                data: datos,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function (respuesta) {
                    if (respuesta) {
                        Swal.fire({
                            title: 'Guardado con éxito',
                            html: 'Tu formato se ha guardado correctamente, serás redirigido en breve al detalle del expediente',
                            footer: '<center><i class="fas fa-info-circle" aria-hidden="true"></i>&nbsp;Si presentas algún inconveniente, no dudes en contactarnos</center>',
                            icon: 'success',
                            confirmButtonText: 'Ver el expediente <i class="fas fa-arrow-right ms-2"></i>',
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: 'btn bg-gradient-info btn-md mx-2 move-icon-left',
                                cancelButton: 'btn btn-gradient-danger btn-md mx-2 move-icon-left',
                                loader: 'custom-loader'
                            },
                        }).then(() => {
                            if (!isNaN(respuesta)) {
                                let array_url = window.location.href.split('/');
                                let longitud = array_url.length;
                                array_url[longitud-1] = 'detalle'
                                window.location.href = array_url.join('/')
                            } else {
                                error_ajax(respuesta);
                            }
                        })
                    } else {
                        error_ajax(respuesta);
                    }
                },
                error: (err, texto) => {
                    error_ajax(JSON.parse(err.responseText)['message']);
                }
            });
        }
    });
}

const get_formatos = async (id_formato = '') => {
    await $.ajax({
        url: '/panel/expedientes/get_formatos',
        dataType: 'JSON',
        type: 'POST',
        data: {
            id_formato
        },
        success: (respuesta, text, xhr) => {
            if (id_formato == '') {
                let opciones_formatos = '';
                let inputs = '.formatos';

                if (xhr.status == 204) {
                    return false;
                } else if (xhr.status == 200) {
                    $(inputs).empty();
                    $(inputs).append(`<option value="">Selecciona una opción</option>`);
                    $(inputs).append(`<option value="0">No usar formato/plantilla</option>`);

                    respuesta.forEach(formato => {
                        opciones_formatos += `<option value="${formato.id_formato}">${formato.nombre_formato}</option>`;
                    });

                    $(inputs).append(opciones_formatos);
                }
            } else if (id_formato != '' && id_formato != 0) {
                $('.crear_formato').html(`Actualizar formato <i class="fas fa-folder-plus ms-2" aria-hidden="true"></i>`);
                editor_formato.setData(respuesta.template); // Aquí es donde cambiamos la forma de pegar el contenido HTML
                generar_anexo();
            } else if (id_formato != '' && id_formato == 0) {
                $('.crear_formato').html(`Guardar nuevo formato <i class="fas fa-folder-plus ms-2" aria-hidden="true"></i>`);
            }
        },
        beforeSend: () => {
            $('.contenedor_quill').removeClass('is-loading');
            $('.contenedor_quill').addClass('is-loading');
        },
        complete: () => {
            $('.contenedor_quill').removeClass('is-loading');
        }
    });
};

const get_quejas = async () => {
    try {
        const response = await $.ajax({
            url: '/panel/quejas/get_by_ajax',
            dataType: 'JSON',
            data: { id_expediente: id_expediente },
            type: 'POST'
        });

        quejas = response;

        if (response.status === 204) return false;

        const opciones_quejas = response.map(queja => `<option ${response.length == 1 ? 'selected' : ''} value="${queja.id_queja}">${queja.folio}</option>`).join('');

        $('.quejas').empty().append(`<option value="">Selecciona una opción</option>${opciones_quejas}`).trigger('change');

    } catch (error) {
        console.error(error);
    }
};

$(".guardar_anexo").off("click");
$(".guardar_anexo").click((e) => {

    Swal.fire({
        icon: "question",
        title: "Nombre del archivo",
        input: "text",
        showCancelButton: true,
        confirmButtonText: 'Siguiente <i class="fas fa-arrow-right ms-2"></i> ',
        cancelButtonText: "Cancelar",
        buttonsStyling: false,
        reverseButtons: true,
        customClass: {
            confirmButton: "btn bg-gradient-info ms-3",
            cancelButton: "btn bg-gradient-secondary",
        }, inputValidator: value => {
            if (!value) {
                return 'El campo es obligatorio'
            }
        },
    }).then((result2) => {
        if (result2.isConfirmed) {
            Swal.fire({
                icon: "question",
                title: "Observaciones",
                input: "textarea",
                showCancelButton: true,
                confirmButtonText: 'Subir <i class="fas fa-file-upload ms-2"></i>',
                cancelButtonText: "Cancelar",
                buttonsStyling: false,
                reverseButtons: true,
                customClass: {
                    confirmButton: "btn bg-gradient-info ms-3",
                    cancelButton: "btn bg-gradient-secondary",
                },
                preConfirm: function (observaciones) {
                    Swal.showLoading() //Boton con animación de carga

                    var formData = new FormData();

                    console.log($(e.currentTarget));

                    formData.append("template", editor_formato.getData());
                    formData.append("id_expediente", id_expediente);
                    formData.append("nombre_anexo", result2.value);
                    formData.append("observaciones", observaciones);

                    return new Promise(function (resolve, reject) {
                        $.ajax({
                            method: "post",
                            url: "/panel/quejas/anexos/post_anexo",
                            data: formData,
                            processData: false,
                            contentType: false,
                            dataType: "json", // Esperamos una respuesta JSON del servidor
                            success: function (resp) {
                                console.log(resp);
                                if (resp == true) {
                                    resolve();
                                } else {
                                    Swal.showValidationMessage(`El archivo no pudo ser subido con éxito: ${resp.error}`);
                                }
                            },
                            error: function (e, ee, eee) {
                                console.log(e, ee, eee);
                                Swal.showValidationMessage(`Hay un problema con tu archivo: ${eee}`);
                            },
                            complete: function () {
                                get_anexos();
                                Swal.hideLoading()
                            },
                        });

                    });
                }
            }).then((result3) => {
                if (result3.isConfirmed) {
                    Swal.fire("Archivo subido con éxito", "El documento se ha cargado en el sistema correctamente", "success");
                }
            })
        }
    })
});

const generar_anexo = async () => {
    console.log(editor_formato);
    let template = editor_formato.getData();
    let id_formato = $('.formatos').val();
    let id_queja = $('.quejas').val();

    const response = await $.ajax({
        url: `/panel/expedientes/${id_expediente}/formatos/generar_pdf`,
        dataType: 'JSON',
        type: 'POST',
        data: {
            template: template,
            id_formato: id_formato,
            id_queja: id_queja,
        },
        success: function (response) {
            var pdf_base64 = response.pdf_base64;
            var embed = document.createElement('embed');
            embed.src = "data:application/pdf;base64," + pdf_base64;
            embed.type = "application/pdf";
            embed.style.width = '100%';
            embed.style.height = '700px';

            // Obtiene el contenedor donde quieras mostrar el PDF
            var pdf_contenedor = document.getElementById('pdf_contenedor');

            // Vacía el contenedor antes de agregar el nuevo embed
            pdf_contenedor.innerHTML = '';

            // Agrega el elemento embed al contenedor
            pdf_contenedor.appendChild(embed);
        },
        beforeSend: () => {
            $('.generar_formato, .crear_formato').removeClass('is-loading')
            $('.generar_formato, .crear_formato').addClass('is-loading')
        },
        complete: () => {
            $('.generar_formato, .crear_formato').removeClass('is-loading')
        }

    });

    console.log(response);
}

const inicializar_select_variables = (variables, editor_formato) => {
    const select = document.createElement('select');

    const opcion_default = document.createElement('option');
    opcion_default.selected = true;
    opcion_default.disabled = true;
    opcion_default.textContent = 'Insertar variables';
    select.appendChild(opcion_default);

    // Filtro de variables
    variables = variables.filter(variable => {
        console.log(variable);
        // Asegurarse de que el valor no sea nulo o indefinido
        return variable.value &&
            // Excluir variables que empiecen con 'id_'
            !variable.label.startsWith('id_') &&
            // Excluir variables específicas
            variable.title != 'null' &&
            variable.label !== 'ultima_modificacion_timestamp' &&
            variable.label !== 'created_by' &&
            variable.label !== 'created_at' &&
            variable.label !== 'updated_by' &&
            variable.label !== 'updated_at';
    });

    variables.forEach(variable => {
        // Convertir el nombre de la variable a formato de oración
        const label_en_oracion = variable.label.replace(/_/g, ' ').charAt(0).toUpperCase() + variable.label.slice(1);

        // Crear una opción con el nombre en formato de oración
        const opcion = document.createElement('option');
        opcion.textContent = label_en_oracion;
        opcion.value = variable.value;
        opcion.title = variable.hint; // Hint para el nombre de la variable
        select.appendChild(opcion);
    });

    select.addEventListener('change', function () {
        const valor_seleccionado = this.value;
        const variable_seleccionada = variables.find(v => v.value === valor_seleccionado);
        if (variable_seleccionada) {
            editor_formato.model.change(writer => {
                // Inserción del texto en la posición actual del cursor
                writer.insert(" " + variable_seleccionada.value + " \n", editor_formato.model.document.selection.getFirstPosition());
            });
        }
        this.value = opcion_default.value;
    });

    return select;
};

const init_editor = (queja) => {
    const variables = Object.keys(queja).map(clave => ({ label: clave, value: `{{${clave}}}`, hint: queja[clave] }));

    ClassicEditor
        .create(document.querySelector('.contenedor_descripcion_formato'), {
            toolbar: ['bold', 'italic', 'underline', '|', 'bulletedList', 'numberedList', 'indent', 'outdent', '|', 'heading', 'fontSize', 'alignment', '|', 'imageUpload', 'blockQuote', 'insertTable', '|', 'undo', 'redo'],
        })
        .then(editor => {
            editor.setData('Escribe aquí...<br>');
            const select = inicializar_select_variables(variables, editor);
            editor.ui.view.toolbar.element.appendChild(select);

            editor_formato = editor; // Guardar la referencia al editor aquí

            // Estilo para el select
            select.style.cssText = `
                display: inline-block;
                font-size: 13px;
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                color: #444;
                background-color: #fff;
                border: 0px;
                padding: 6px 10px;
                border-radius: 4px;
                margin: 0px 6px;
                outline: none;
                transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
            `;
        })
        .catch(error => {
            console.error(error);
        });

    console.log(editor_formato);
};

$(document).ready(async () => {

    if (quejas && quejas.length > 0) {
        init_editor(quejas[0]);
    }

    // Escucha los cambios en el selector de quejas
    $('.quejas').change((e) => {
        const selectedQuejaId = $(e.currentTarget).val();
        const selectedQueja = quejas.find(queja => queja.id_queja == selectedQuejaId);
        console.log(selectedQueja, selectedQuejaId);
        init_editor(selectedQueja);
    });

    const preview_template = () => {
        const template = quill.getText();
        let preview = template;
        variables.forEach(variable => {
            preview = preview.replace(new RegExp(variable.value, 'g'), queja[variable.label]);
        });
        // Mostrar la vista previa donde sea necesario
        // Por ejemplo: document.getElementById('preview').innerText = preview;
    };

    $('.crear_formato').click(guardar_formato);
    $('.generar_formato').click(generar_anexo);

    $('.formatos').change((e) => {
        get_formatos($(e.currentTarget).val())
    });

    $('.select2').select2({
        placeholder: "Selecciona una opción",
        language: { noResults: () => "Sin resultados" },
    });

    await get_quejas(); // Asegúrate de definir la variable id_quejas si es necesaria en la función
    await get_formatos();
    await generar_anexo();

});