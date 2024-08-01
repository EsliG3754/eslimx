const guardar_formulario = () => {

    let datos = new FormData(); // Inicializar form data

    datos.append('ratificacion_txt', editor_ratificacion.root.innerHTML)
    datos.append('id_queja',         $('[name=id_queja]').val())
    datos.append('id_personas',       $('.personas').val())
    datos.append('id_ratificacion',  $('[name=id_ratificacion]').val())

    Swal.fire({
        title: "¿Deseas guardar la ratifiacion?",
        html: '',
        icon: "question",
        showCancelButton: true,
        reverseButtons: true,
        buttonsStyling: false,
        confirmButtonText: `Crear ratificación <i class="fas fa-arrow-right ms-2"></i>`,
        cancelButtonText: 'No, cancelar',
        customClass: {
            confirmButton: 'btn bg-gradient-info btn-md mx-2 move-icon-left',
            cancelButton: 'btn btn-gradient-danger btn-md mx-2 move-icon-left',
            loader: 'custom-loader'
        },
    }).then(function (respuesta) {

        if (respuesta.value) {
            $.ajax({
                url: '/panel/quejas/post_ratificacion',
                data: datos,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function (respuesta) {
                    if (respuesta) {
                        Swal.fire({
                            title: 'Guardado con éxito',
                            html: `Tu ratificación se ha guardado correctamente, serás redirigido en breve al pdf
									`,
                            footer: `
									<center><i class="fas fa-info-circle" aria-hidden="true"></i>&nbsp;Si presentas algún iconveniente, no dudes en contactarnos <br> 33 3669 1101 ext. 171</center>
									`,
                            icon: 'success',
                            buttonsStyling: false,
                            reverseButtons: true,
                            confirmButtonText: `Ver la ratificación <i class="fas fa-arrow-right ms-2"></i>`,
                            customClass: {
                                confirmButton: 'btn bg-gradient-info btn-md mx-2 move-icon-left',
                                cancelButton: 'btn btn-gradient-danger btn-md mx-2 move-icon-left',
                                loader: 'custom-loader'
                            },
                        }).then(() => {
                            if(!isNaN(respuesta)){
                                window.location.href = '/panel/quejas/ratificaciones/'+respuesta
                            }else{
                                error_ajax(respuesta)
                            }
                        })
                    } else {
                        error_ajax(respuesta)
                    }
                },
                error: (err, texto) => {
                    error_ajax(JSON.parse(err.responseText)['message']);
                }
            });
        } // Fin if value
    }) // Fin Then SweetAlert
}

const get_personas = async () => {
    await $.ajax({
        url: '/panel/quejas/personas/get_by_ajax',
        data: {
            id_queja: $('[name=id_queja]').val(),
            disponibles_ratificacion: 1
        },
        dataType: 'JSON',
        type: 'POST',
        success: function (respuesta, text, xhr) {

            let opciones_personas = '';
            let inputs = '.personas';

            if (xhr.status == 204) {
                return false;
            } else if (xhr.status == 200) {
                $(inputs).empty();
                $(inputs).append(`<option value="">Selecciona una opción</option>`);

                respuesta.forEach(persona => {
                    opciones_personas += `<option value="${persona.id_persona}">${persona.persona_nombre} ${persona.persona_apellido_1} ${persona.persona_apellido_2}</option>`;
                });

                $(inputs).append(opciones_personas);
            }
        }
    }); // Fin ajax
}

let editor_ratificacion;

$(document).ready(async () => {


    // Specify Quill fonts
    var fontList = ['Times New Roman'];
    var fontNames = fontList.map(font => getFontName(font));
    var fonts = Quill.import('attributors/class/font');
    fonts.whitelist = fontNames;
    Quill.register(fonts, true);

    // Add fonts to CSS style
    var fontStyles = "";
    fontList.forEach(function (font) {
        var fontName = getFontName(font);
        fontStyles += ".ql-snow .ql-picker.ql-font .ql-picker-label[data-value=" + fontName + "]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=" + fontName + "]::before {" +
            "content: '" + font + "';" +
            "font-family: '" + font + "', sans-serif;" +
            "}" +
            ".ql-font-" + fontName + "{" +
            " font-family: '" + font + "', sans-serif;" +
            "}";
    });

    // Configure Quill editor options
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        [{
            'list': 'ordered'
        }, {
            'list': 'bullet'
        }],
        [{
            'script': 'sub'
        }, {
            'script': 'super'
        }], // superscript/subscript
        [{
            'indent': '-1'
        }, {
            'indent': '+1'
        }], // outdent/indent
        [{
            'direction': 'rtl'
        }], // text direction

        [{
            'size': ['small', false, 'large', 'huge']
        }], // custom dropdown
        [{
            'header': [1, 2, 3, 4, 5, 6, false]
        }],

        [{
            'color': []
        }, {
            'background': []
        }], // dropdown with defaults from theme
        [{
            'font': fonts.whitelist
        }],
        [{
            'align': []
        }],

        ['clean'] // remove formatting button
    ];

    // Generate code-friendly font names
    function getFontName(font) {
        return font.toLowerCase().replace(/\s/g, "-");
    }

    var node = document.createElement('style');
    node.innerHTML = fontStyles;
    document.body.appendChild(node);

    editor_ratificacion = new Quill($('.contenedor_descripcion_ratificacion')[0], {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow'
    });


    $('.crear_ratificacion').click(() => {
        guardar_formulario();
    })
    
    $('.select2').select2({
        placeholder: "Selecciona una opción",
        language: {
            noResults: function () {
                return "Sin resultados";
            }
        },
        multiple: true

    });

    get_personas();
})
