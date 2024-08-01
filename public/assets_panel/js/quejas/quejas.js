let editor_descripcion;
let editor_descripcion_breve;
let editor_autoridad;
let tipo_servicio;

const guardar_formulario = () => {

    let validar; //Definir validar como global para su uso en el bucle de inputs
    let guardar = 1; //Flag de guardado, si es erronea la validación de algun campo se detiene el guardado
    let datos = new FormData(); // Inicializar form data
    let url;

    let quejosoExistente = false;
    let agraviadoExistente = false;
    let personaExistente = false;

    if ($('[name=personas]').parsley().isValid()) {

        let personas = JSON.parse($('[name=personas]').val());

        if (personas.length > 0) {
            personaExistente = true;
        }

        for (let persona of personas) {
            if (persona.tipo === "quejoso" || persona.tipo === "ambas") {
                quejosoExistente = true;
            }
            if (persona.tipo === "agraviado" || persona.tipo === "ambas") {
                agraviadoExistente = true;
            }
        }
    }

    if (personaExistente === false && (tipo_servicio === 'Orientación' || tipo_servicio === 'Gestión' || tipo_servicio === 'Constancias')) {
        Swal.fire('Atención', 'Debe existir al menos 1 persona para este tipo de servicio', 'info');
    } else if (!quejosoExistente && tipo_servicio !== 'Orientación' && tipo_servicio !== 'Constancias' && tipo_servicio !== 'Gestión') {
        Swal.fire('Atención', 'Debe existir al menos 1 quejoso en la queja', 'info');
    } else if (!agraviadoExistente && (tipo_servicio != 'Orientación' || tipo_servicio == 'Constancias' && tipo_servicio !== 'Gestión')) {
        Swal.fire('Atención', 'Debe existir al menos 1 agraviado en la queja', 'info');
    } else {

        if (tipo_servicio == 'Queja') {

        }

        datos.append('descripcion', editor_descripcion.root.innerHTML)
        datos.append('descripcion_breve', editor_descripcion_breve.root.innerHTML)
        datos.append('descripcion_autoridad', editor_autoridad.root.innerHTML)

        $('.input_queja').each(function () {

            try {
                if ($(this).is(':visible')) {
                    $(this).attr('required', true);
                    console.log(this);
                    validar = $(this).parsley().validate();
                    if (validar != true) {
                        throw "Por favor llena el campo: " + $(this).siblings('label').text();
                    } else {
                        if (typeof $(this).attr('readonly') == 'undefined') {
                            if ($(this).attr('type') == 'file') {
                                datos.append($(this).attr('name'), $(this).val() != null ? $(this)[0].files[0] : 0);
                            } else {
                                datos.append($(this).attr('name'), $(this).val() != null ? $(this).val() : 0);
                            }
                        }
                    }
                }

            } catch (excepcion) {
                Swal.fire({
                    title: 'Error',
                    html: excepcion,
                    icon: 'error',
                    footer: `<center><i class="fas fa-info-circle" aria-hidden="true"></i>&nbsp;Si presentas algún iconveniente, no dudes en contactarnos: 33 3669 1101 ext. 171</center>`,
                });

                guardar = 0;
                return;
            }

        });

        // Guardar array de personas
        let personas = Array();
        let valid = true;
        $('.persona_item').each((i, e) => {
            $(e).find('select, input').each((i, input) => {
                if ($(input).parsley().isValid() === false) {
                    valid = false;
                    $(input).parsley().validate();  // Esto mostrará el mensaje de error
                }
            });

            if (!valid) {
                Swal.fire('Llena todos los campos correctamente', `Hay campos en la sección personas sin llenar`, 'error');
                return;
            }

            let persona = {
                id_persona: $(e).attr('id_persona'),
                nombre_persona: $(e).attr('nombre_persona'),
                tipo_victima: $(e).attr('tipo_victima'), // Sólo si aplica a todos los tipos
                representa_grupo: $(e).attr('representa_grupo'), // Sólo si aplica a todos los tipos
                relacion_agraviado: $(e).attr('relacion_agraviado'), // Sólo si aplica a todos los tipos
                requiere_ratificacion: $(e).attr('requiere_ratificacion'),
                tipo: $(e).attr('tipo'), // Este atributo debería indicar si es quejoso, agraviado, o agraviado_quejoso
            }

            persona = JSON.stringify(persona);
            personas.push(persona);
        })

        datos.append('personas', personas);

        if (guardar == 1 && valid) {
            console.log($('.formulario_quejas').parsley().validate());
            console.log(parsley);
            $('.formulario_quejas').parsley().reset();
            Swal.fire({
                title: "¿Deseas guardar el formulario?",
                html: '',
                icon: "question",
                showCancelButton: true,
                reverseButtons: true,
                buttonsStyling: false,
                confirmButtonText: `Crear <i class="fas fa-arrow-right ms-2"></i>`,
                cancelButtonText: 'No, cancelar',
                customClass: {
                    confirmButton: 'btn bg-gradient-info btn-md mx-2 move-icon-left',
                    cancelButton: 'btn btn-gradient-danger btn-md mx-2 move-icon-left',
                    loader: 'custom-loader'
                },
            }).then(function (respuesta) {
                if (respuesta.value) {

                    $.ajax({
                        url: '/panel/quejas/post_formulario',
                        data: datos,
                        cache: false,
                        contentType: false,
                        processData: false,
                        type: 'POST',
                        success: function (respuesta) {
                            if (respuesta) {
                                Swal.fire({
                                    title: 'Guardado con éxito',
                                    html: `Tu solicitud ha quedado registrada en nuestro sistema con el folio: ${respuesta}`,
                                    footer: `
									<center><i class="fas fa-info-circle" aria-hidden="true"></i>&nbsp;Si presentas algún iconveniente, no dudes en contactarnos <br> 33 3669 1101 ext. 171</center>
									`,
                                    icon: 'success',
                                    buttonsStyling: false,
                                    reverseButtons: true,
                                    confirmButtonText: `Ver solicitudes <i class="fas fa-arrow-right ms-2"></i>`,
                                    customClass: {
                                        confirmButton: 'btn bg-gradient-info btn-md mx-2 move-icon-left',
                                        cancelButton: 'btn btn-gradient-danger btn-md mx-2 move-icon-left',
                                        loader: 'custom-loader'
                                    },
                                }).then(() => {
                                    window.location.href = '/panel/quejas/expedientes'
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

    }
}

const evento_tipo_servicio = () => {
    $('[name=tipo_servicio]').change((e) => {
        tipo_servicio = $(e.currentTarget).val();
        $('.tipo_servicio').text(tipo_servicio)
        $('[name="personas"]').val('').trigger('change')

        switch (tipo_servicio) {
            case 'Queja':
                $('.titulo_autoridad').text('Descripción de las presuntas autoridades responsables')
                $('.label_autoridad').text('Por favor si es posible indica el nombre, cargo e institución de las presuntas autoridades involucadras ')
                editor_autoridad.setText('Describe aquí la autoridad...')
                editor_descripcion.setText(`Queja por comparecencia. En Guadalajara, Jalisco, siendo las XX:XX horas (hora con letra) del (día, mes y año), (nombre del visitador adjunto que firma el acta), visitador/a adscrito/a a Guardia, actuando en conjunto con [nombre de la persona que recibe la queja], personal de la Comisión Estatal de Derechos Humanos Jalisco(CEDHJ), con fundamento en lo dispuesto en los artículos 1°, 4° y 102, apartado B; y los demás aplicables de la Constitución Política de los Estados Unidos Mexicanos; 1°, 2°, 3°, 5° y demás aplicables de la Convención Americana sobre Derechos Humanos; 4° y 10 de la Constitución Política el Estado de Jalisco; 43, 44 y 50 de la Ley de la CEDHJ, hago constar que comparece una persona que dice llamarse […], cuyos datos generales se asientan en formato que acompaña a la presente, misma que se identifica con [...] [En caso de que la persona se identifique con algún género, así indicarlo], persona a la que invito para que se conduzca con la verdad en lo que va a manifestar, y luego de así haberlo y aceptado, toma el uso de la voz y textualmente dice: 


                [Describe la situación…]
                
                Por lo anteriormente narrado, solicita que se investiguen los hechos y se proceda conforme a derecho corresponda. 
                
                Acto seguido, se hace del conocimiento de la persona compareciente que de acuerdo con la Ley de Información Pública del Estado de Jalisco y sus Municipios, se le informa que las Visitadurías Generales I, II, III, IV, V y VI de la Comisión Estatal de Derechos Humanos del Estado de Jalisco (CEDHJ), es el responsable del tratamiento y protección de sus datos personales y al respecto le informa lo siguiente:
                
                ¿PARA QUÉ FINES UTILIZAREMOS SUS DATOS PERSONALES?
                Los datos personales que usted proporcione a la CEDHJ, serán única y exclusivamente utilizados para llevar a cabo los objetivos y atribuciones de esta Comisión y los utilizaremos para las siguientes finalidades: 
                • Atender las quejas por presuntas violaciones a derechos humanos recibidas en las diversas áreas de la CEDHJ, de conformidad con sus competencias.
                • Sustanciar el procedimiento de atención y registrar la información de los expedientes de queja, orientación directa, remisión e inconformidad hasta su conclusión.
                • Emitir y registrar las medidas precautorias o cautelares que, por la naturaleza del asunto, se requieran.
                • Realizar las notificaciones correspondientes, por los medios que se hayan señalado.
                • Dar seguimiento a las conciliaciones y recomendaciones emitidas.
                • Proporcionar orientación o asesoría jurídica.
                Es importante apuntar que sus datos personales se consideran información confidencial, con excepción de su nombre, las relativas a la función que desempeña o la erogación de recursos públicos, y cualquier otra información que permita transparentar las acciones y garantizar el derecho a la información pública o que obre en fuentes de acceso público, en virtud de que constituye información susceptible de ser publicada y difundida, de conformidad con lo establecido por la Ley de Transparencia y Acceso a la Información Pública del Estado de Jalisco y sus Municipios.
                Los datos personales recabados serán protegidos, incorporados y tratados en las bases de datos físicas y electrónicas de las Visitadurías Generales I, II, III, IV, V y VI.
                ¿CON QUIÉN COMPARTIMOS SU INFORMACIÓN PERSONAL Y PARA QUÉ FINES?
                Cuando se realicen transferencias de datos personales se informará lo siguiente: : se hace de su conocimiento que se podrán realizar transferencias de datos personales a las autoridades estatales o municipales respectivas, con el objeto de sustanciar el procedimiento de quejas, inconformidades; emitir, en su caso, medidas cautelares; brindar la orientación correspondiente; remitir el expediente a las instancias competentes para su atención; dar seguimiento a las recomendaciones y conciliaciones emitidas, así como para atender requerimientos de la autoridad competente.
                Asimismo, se podrán realizar transferencias nacionales de datos a otros organismos defensores de derechos humanos pertenecientes a las entidades federativas del estado mexicano y a la Comisión Nacional de los Derechos Humanos, a quienes les competa o sean parte del trámite del asunto. En dichos supuestos, no será requerido su consentimiento de conformidad con los artículos 7, 22 fracciones I, II y IV de la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados; artículos 5.2 fracción I y 5.3, 15.1 fracciones I, VIII y X de la Ley de Protección de Datos Personales en Posesión de Sujetos Obligados del Estado de Jalisco y sus Municipios, y artículo 6° de la Ley de la Comisión Estatal de Derechos Humanos.
                En lo que respecta a transferencias internacionales, cuando así lo requiera instancia alguna del Sistema Interamericano de Derechos Humanos para conocer de un asunto competencia de la CEDHJ, o bien, se requiera en el marco de la colaboración con las embajadas y consulados, durante la sustanciación del procedimiento de queja y/o el seguimiento a la recomendación o conciliación emitida, éstas podrán realizarse con el consentimiento expreso del titular de los datos personales. Usted podrá manifestar su negativa para el tratamiento de sus datos personales al momento que le sea requerido su consentimiento expreso para las finalidades descritas.
                Resulta importante que usted considere que, al brindar su consentimiento para la transmisión de los datos personales a las entidades a las que se hizo referencia, dicha información será tratada en un sistema de datos personales diverso al cual hace referencia el presente aviso de privacidad, por lo que se le sugiere consultar el aviso de privacidad que corresponda al sistema de datos personales en posesión del destinatario.
                USTED PUEDE REVOCAR SU CONSENTIMIENTO PARA EL TRATAMIENTO DE SUS DATOS PERSONALES CUANDO SE UTILICEN PARA FINALIDADES Y TRANSFERENCIAS SECUNDARIAS.
                Para revocar su consentimiento deberá presentar un escrito en la Unidad de Transparencia de esta CEDHJ, en donde manifieste su deseo de revocar el consentimiento para el uso de sus datos personales, o bien al siguiente correo electrónico: transparencia@cedhj.org.mx   
                Los requisitos que debe contener el escrito para solicitar la revocación del consentimiento son los siguientes:
                I. Nombre del solicitante
                II. Número de expediente (opcional)
                III. Manifestación clara y expresa de la revocación del consentimiento del uso de datos personales.
                IV. Firma del solicitante.
                 
                Para conocer el procedimiento para la revocación del consentimiento, puede acudir a la Unidad de Transparencia de la Comisión Estatal de Derechos Humanos del Estado de Jalisco a través del correo electrónico: transparencia@cedhj.org.mx.   
                MECANISMOS PARA QUE EL TITULAR CONOZCA EL AVISO DE PRIVACIDAD INTEGRAL
                Usted puede consultar el aviso de privacidad integral en el siguiente Link: https://cedhj.org.mx/avisos/APIVG. 
                  
                 Aviso de Privacidad Integral                                                                                                                          
                De igual manera, se les informa que la presente no interfiere ni interrumpe con otros derechos que la ley le otorga y que deriven de los hechos que motivan su inconformidad; asimismo, que para el seguimiento correspondiente de la misma deberá comunicarse vía telefónica dentro de cinco días hábiles al teléfono 3336691101, extensión 160, de las 08:30 a las 15:30 horas, con el fin de que solicite el seguimiento que se le brindó a su inconformidad. 
                Acto seguido, la parte peticionaria autoriza que las notificaciones se le realicen al correo electrónico, teléfono y/o WhatsApp proporcionados en su formato de generales. Asimismo, autoriza a esta defensoría pública de derechos humanos para que, en el supuesto de que los datos proporcionados sean incorrectos, se le notifique por estrados, aun las de carácter personal. 
                
                Sin más datos que asentar, se da por concluida la presente acta siendo las XX:XX horas del día (fecha) para todos sus efectos legales, firmando de conformidad en este acto la parte peticionaria, una vez que lee cuidadosamente el acta y está de acuerdo con el contenido de la misma. ---------------------------------------Conste.------------------------------------------
                `)
                $('.contenedor_ocultar').hide(300)
                $('.contenedor_personas_queja').show(300)
                $('.contenedor_descripcion_queja').show(300)
                $('.contenedor_descripcion_breve_queja').show(300)
                $('.contenedor_autoridades_queja').show(300)
                $('.contenedor_textarea_autoridad').show(300);
                $('.contenedor_tiempos').show(300);
                $('.contenedor_select_autoridad').hide(300);
                break;
            case 'Gestión':
                $('.titulo_autoridad').text('Autoridad')
                $('.label_autoridad').text('Por favor indica la autoridad')
                editor_autoridad.setText('Describe aquí la autoridad...')
                $('.label_queja').text('Por favor describe la situación')
                editor_descripcion.setText('Describe aquí la situación...')
                $('.contenedor_ocultar').hide(300)
                $('.contenedor_personas_queja').show(300)
                $('.contenedor_descripcion_queja').show(300)
                $('.contenedor_descripcion_breve_queja').hide(300)
                $('.contenedor_autoridades_queja').show(300)
                $('.contenedor_textarea_autoridad').hide(300);
                $('.contenedor_tiempos').hide(300);
                $('.contenedor_select_autoridad').show(300);
                break;

            case 'Orientación':
            case 'Constancias':
                $('.titulo_autoridad').text('Institución a la que se dirige')
                $('.label_autoridad').text('Por favor indica la institución')
                editor_autoridad.setText('Describe aquí la institución...')
                $('.label_queja').text('Por favor describe la situación')
                editor_descripcion.setText('Describe aquí la situación...')
                $('.contenedor_ocultar').hide(300)
                $('.contenedor_personas_queja').show(300)
                $('.contenedor_descripcion_queja').show(300)
                $('.contenedor_descripcion_breve_queja').hide(300)
                $('.contenedor_autoridades_queja').show(300)
                $('.contenedor_textarea_autoridad').hide(300);
                $('.contenedor_tiempos').hide(300);
                $('.contenedor_select_autoridad').show(300);
                break;

            default:
                break;
        }
    })
}

const callback_add_personas = () => {

    $('.select2_tags').select2({
        tags: true,
        placeholder: 'Selecciona'
    })

    $('.personas').val('').trigger('change');

    evento_btn_editar_persona();

    $('.eliminar_persona').off('click');
    $('.eliminar_persona').click(function (e) {
        console.log(e);
        e = e.currentTarget;
        let posicion = $(e).attr('posicion');
        let nombre_input = $(e).attr('name_input');


        //$('.quejosos').val([]).trigger('change');
        console.log(`[name=${nombre_input}]`, posicion);
        $("." + nombre_input + " .persona_posicion_" + posicion).remove(); //Eliminar el elemento de la lista en el front de usuario
        let json = JSON.parse($(`[name=${nombre_input}]`).val()); //Obtener valor del JSON para eliminar por posición
        console.log(`[name=${nombre_input}]`, posicion, json);
        json.splice(posicion, 1); //Eliminar el item por posición
        console.log(json);
        $(`[name=${nombre_input}]`).val(JSON.stringify(json)).trigger('change'); //Asignar el nuevo array procesado al JSON
    })

    $('.relacion_agraviado').change((e) => {
        $(e.currentTarget).closest('.persona_item').attr('relacion_agraviado', $(e.currentTarget).val());
    })

    $('.representa_grupo').change((e) => {
        $(e.currentTarget).closest('.persona_item').attr('representa_grupo', $(e.currentTarget).val());
    })

    $('.tipo_victima').change((e) => {
        $(e.currentTarget).closest('.persona_item').attr('tipo_victima', $(e.currentTarget).val());
    })
}

const get_personas = async () => {
    await $.ajax({
        url: '/panel/quejas/personas/get_by_ajax',
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

$(document).ready(async () => {
    evento_tipo_servicio();

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

    editor_descripcion = new Quill($('.contenedor_descripcion')[0], {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow'
    });

    editor_descripcion_breve = new Quill($('.contenedor_descripcion_breve')[0], {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow'
    });

    editor_autoridad = new Quill($('.contenedor_descripcion_autoridad')[0], {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow'
    });

    //Mostrar las personas en el input
    //get_personas();

    //Mostrar las oficinas en el input
    get_oficinas();
    get_regionales_municipios();

    //Si la queja viene por escrito se añade folio
    $('.input_queja[name=origen]').change((e) => {
        let valor = $(e.currentTarget).val();
        if (valor == 'Escrito') {
            $('.input_queja[name=folio]').parent().parent().show(300)
        } else {
            $('.input_queja[name=folio]').val('').parent().parent().hide(300)
        }
    })

    //Si desean agregar tiempo mostrar input
    $('.si_no_tiempo').change((e) => {
        let valor = $(e.currentTarget).val();
        console.log(valor);
        if (valor == 'No') {
            $('.input_queja[name=tiempo]').parent().parent().show(300)
        } else {
            $('.input_queja[name=tiempo]').val('').parent().parent().hide(300)
        }
    })

    //Si desean agregar tiempo mostrar input
    $('.si_no_modo').change((e) => {
        let valor = $(e.currentTarget).val();
        console.log(valor);
        if (valor == 'No') {
            $('.input_queja[name=modo]').parent().parent().show(300)
        } else {
            $('.input_queja[name=modo]').val('').parent().parent().hide(300)
        }
    })

    //Si desean agregar tiempo mostrar input
    $('.si_no_lugar').change((e) => {
        let valor = $(e.currentTarget).val();
        console.log(valor);
        if (valor == 'No') {
            $('.input_queja[name=lugar]').parent().parent().show(300)
        } else {
            $('.input_queja[name=lugar]').val('').parent().parent().hide(300)
        }
    })

    //Si desean agregar solucion agil mostrar input
    $('.solucion_agil').change((e) => {
        let valor = $(e.currentTarget).val();
        console.log(valor);
        $('.input_queja[name=sentido_conciliacion]').parent().parent().show(300)
        //if (valor == 'Sí') {
        //$('.input_queja[name=sentido_conciliacion]').val('').parent().parent().hide(300)
    });

    $('.personas').change(async (e) => {

        let id_persona = $(e.currentTarget).val();

        if (!id_persona) {
            return;
        }

        if (tipo_servicio == 'Orientación' || tipo_servicio == 'Constancias' || tipo_servicio == 'Gestión') {
            let persona = {
                'id': $(e.currentTarget).val(),
                'nombre': $(e.currentTarget).children('option:selected').text(),
                'tipo': '',
                'ratificacion': 0
            }

            let input = $('.input_persona[name="personas"]');
            let json = JSON.parse(input.val() ? input.val() : '[]');
            json.push(persona);
            json = JSON.stringify(json);
            input.val(json).trigger("change");
            return;
        }

        let nombre_persona = $(e.currentTarget).children('option:selected').text();

        const formHtml = `
            <div class="form-group w-75 mx-auto mt-2">
                <label for="tipoPersona">Tipo de persona</label>
                <select id="tipoPersona" class="form-control form-select">
                    <option selected disabled>Selecciona un tipo</option>
                    <option value="quejoso">Quejoso</option>
                    <option value="agraviado">Agraviado</option>
                    <option value="ambas">Ambas</option>
                </select>
            </div>
            <div class="form-group w-75 mx-auto">
                <label for="ratificacion">¿Requiere ratificación?</label>
                <select id="ratificacion" class="form-control form-select">
                    <option selected disabled>Selecciona una opción</option>
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                </select>
            </div>
        `;

        const result = await Swal.fire({
            title: nombre_persona,
            html: formHtml,
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Agregar a la queja <i class="fas fa-arrow-right ms-2"></i>',
            cancelButtonText: 'Regresar',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn bg-gradient-info btn-md mx-2 move-icon-left',
                cancelButton: 'btn btn-gradient-danger btn-md mx-2 move-icon-left',
                loader: 'custom-loader'
            },
            preConfirm: () => {
                let tipo = document.getElementById('tipoPersona').value;
                let ratificacion = document.getElementById('ratificacion').value;

                if (!tipo || !ratificacion) {
                    Swal.showValidationMessage('Por favor llena correctamente los campos');
                    return false;
                }

                return [tipo, ratificacion];
            }
        });

        if (result.dismiss) {
            $('.personas').val('').trigger('change');
            return;
        } else {
            let persona = {
                'id': $(e.currentTarget).val(),
                'nombre': $(e.currentTarget).children('option:selected').text(),
                'tipo': result.value[0],
                'ratificacion': result.value[1]
            }

            let input = $('.input_persona[name="personas"]');
            let json = JSON.parse(input.val() ? input.val() : '[]');
            json.push(persona);
            json = JSON.stringify(json);
            input.val(json).trigger("change");
        }

    });

    $('.input_persona[name="personas"]').change((e) => {
        let valores = JSON.parse($(e.currentTarget).val() ? $(e.currentTarget).val() : '[]');

        $('.personas_list').empty();  // Usamos un contenedor único para todas las personas

        if (valores.length == 0) {
            $('.personas_list').append(`
            <span class="drop_zone_text">Haz click para agregar personas</span>
            `);
        }

        valores.forEach((persona, i) => {
            let additionalFields = '';

            // Comprobamos el tipo de persona y agregamos los campos apropiados
            if (persona.tipo === 'quejoso') {
                additionalFields = `
                    <div class="col-lg-5 col-sm-8 d-flex align-items-end">
                        <div class="form-group mb-2 text-center">
                            <label class="form-label">¿Representa a un grupo o colectivo?</label>
                            <select required class="form-control representa_grupo select2_tags text-sm">
                                <option value="">Selecciona</option>
                                <option>Sí</option>
                                <option>No</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-5 col-sm-8 d-flex align-items-end">
                        <div class="form-group mb-2 mt-3 text-center">
                            <label class="form-label">Relación con el agraviado</label>
                            <select required class="form-control relacion_agraviado select2_tags text-sm">
                                <option value="">Selecciona</option>
                                <option>Padre-Madre</option>
                                <option>Tutor</option>
                                <option>Conyugue</option>
                                <option>Hija o Hijo</option>
                                <option>Concubina o Concubino</option>
                                <option>Otro Familiar (especificar)</option>
                                <option>Amiga o Amigo</option>
                                <option>Otro (especificar)</option>
                            </select>
                        </div>
                    </div>
                `;
            } else if (persona.tipo === 'agraviado') {
                additionalFields = `
                    <div class="col-lg-6 col-sm-8">
                        <div class="form-group mb-2 text-center">
                            <label class="form-label">Tipo de victima</label>
                            <select required class="form-control tipo_victima text-sm">
                                <option value="">Selecciona</option>
                                <option>Directa</option>
                                <option>Indirecta</option>
                                <option>Potencial</option>
                            </select>
                        </div>
                    </div>
                `;
            } else if (persona.tipo === 'ambas') {
                additionalFields = `
                    <div class="col-lg-5 col-sm-6 d-flex align-items-end">
                        <div class="form-group mb-2 text-center">
                            <label class="form-label">¿Representa a un grupo o colectivo?</label>
                            <select required class="form-control representa_grupo select2_tags text-sm">
                                <option value="">Selecciona</option>
                                <option>Sí</option>
                                <option>No</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-5 col-sm-6">
                        <div class="form-group mb-2 text-center">
                            <label class="form-label">Tipo de victima</label>
                            <select required class="form-control tipo_victima text-sm">
                                <option value="">Selecciona</option>
                                <option>Directa</option>
                                <option>Indirecta</option>
                                <option>Potencial</option>
                            </select>
                        </div>
                    </div>
                `;

                persona.tipo = 'agraviado_quejoso';
            } // También puedes agregar condiciones para otros tipos de personas si es necesario.

            $('.personas_list').append(`
                <li class="list-group-item d-flex justify-content-between w-100 align-items-center persona_item persona_posicion_${i}" tipo="${persona.tipo}" id_persona="${persona.id}" nombre_persona="${persona.nombre}" requiere_ratificacion="${persona.ratificacion}" indice="${i}">
                    <div class="row d-flex align-items-center w-100 my-2">
                        <div class="col-lg-4 text-sm">
                            <i class="fas fa-user me-2"></i> ${persona.nombre}
                        </div>
                        <div class="col-lg-7">
                            <div class="row d-flex justify-content-end">
                                ${additionalFields}
                                <div class="col-lg-2 col-sm-4 d-flex align-items-center">
                                    <div class="btn bg-gradient-warning mb-0 py-2 px-3 text-xs editar_persona" id_persona="${persona.id ?? persona.id_persona}">
                                        <i class="fas fa-edit"></i>
                                    </div>
                                    <div class="btn ms-2 bg-gradient-danger mb-0 py-2 px-3 text-xs eliminar_persona" posicion="${i}" name_input="personas">
                                        <i class="fas fa-trash"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            `);

            callback_add_personas()

        });
    });

    $('.select2').select2({
        placeholder: "Selecciona una opción",
        language: {
            noResults: function () {
                return "Sin resultados";
            }
        },
    });

    $('.crear_queja').click(() => {
        guardar_formulario();
    })


})

function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}

window.addEventListener('load', () => {
    setTimeout(() => {
        $(".personas").select2({
            ajax: {
                url: "/panel/quejas/personas/get_by_ajax",
                dataType: "json",
                delay: 250,
                type: "post",
                data: function (params) {
                    return {
                        busqueda_persona: params.term
                    };
                },
                processResults: function (data) {
                    console.log(data);
                    let personas_formateadas = data.map(persona => {
                        return {
                            id: persona.id_persona,
                            text: `${persona.persona_nombre} ${persona.persona_apellido_1} ${persona.persona_apellido_2}`
                        };
                    });
                    return {
                        results: personas_formateadas
                    };
                },
                cache: true
            },
            placeholder: "Buscar persona",
            minimumInputLength: 3,
            language: {
                inputTooShort: function (args) {
                    return "Por favor ingresa " + args.minimum + " o más caracteres";
                },
                searching: function () {
                    return "Buscando...";
                }
            },
            templateResult: function (data) {
                if (data.loading) {
                    return data.text;
                }
                console.log(data);
                return $('<span>' + data.text + '</span>');
            },
            templateSelection: function (data) {
                console.log(data);

                if (!data.id) {
                    return data.text;
                }
                return $('<span>' + data.text + '</span>');
            }
        });
    }, 2000);

})