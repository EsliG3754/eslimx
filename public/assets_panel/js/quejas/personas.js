let datos_formulario = {};
const form_persona = {
    paso1: `
    <form class="w-100 m-auto row p-2 text-start form_persona" data-validate="parsley">
        <input type="hidden" class="input_persona form-control" name="id_persona">
        <input type="hidden" class="input_persona form-control" name="id_persona_datos_queja">

            <div class="col-lg-6">
                <h6 class="mb-0 border-start border-4 ps-2 border-info">Datos principales</h6>
            </div>
            
            <div class="col-lg-6 d-flex justify-content-end">
                <div class="form-group">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="persona_colectiva">
                        <label class="form-check-label" for="persona_colectiva">Colectiva</label>
                    </div>
                </div>
                <div class="form-group ms-3">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="persona_colectiva">
                        <label class="form-check-label" for="persona_colectiva">Persona finada</label>
                    </div>
                </div>
                <div class="form-group ms-3">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="persona_colectiva">
                        <label class="form-check-label" for="persona_colectiva">Persona desaparecida</label>
                    </div>
                </div>
            </div>

            <hr class="horizontal dark mt-2 mb-3">
        
            <div class="col-lg-3">
                <div class="form-group">
                    <label class="form-control-label"><i class="fas fa-user"></i> CURP:</label>
                    <input data-parsley-curp-valida style="text-transform: uppercase;" class="input_persona form-control" data-parsley-curp="" maxlength="18" minlength="18" name="curp" placeholder="Escribe la CURP..." data-parsley-pattern="[\A-Z]{4}[0-9]{6}[HM]{1}[A-Z]{2}[BCDFGHJKLMNPQRSTVWXYZ]{3}([A-Z]{2})?([A-Z0-9])?([A-Z0-9])?" data-parsley-pattern-message="El formato de tu CURP no es válido">
                </div>
            </div>  

            <div class="col-lg-3">
                <div class="form-group">
                    <label class="form-control-label"><i class="fas fa-user"></i> Nombre de la persona: *</label>
                    <input required class="input_persona form-control" name="persona_nombre" placeholder="Escribe el nombre...">
                </div>
            </div>
        
            <div class="col-lg-3">
                <div class="form-group">
                    <label class="form-control-label"><i class="fas fa-user"></i> Primer apellido: *</label>
                    <input required class="input_persona form-control" name="persona_apellido_1" placeholder="Escribe el primer apellido...">
                </div>
            </div>
            
            <div class="col-lg-3">
                <div class="form-group">
                    <label class="form-control-label"><i class="fas fa-user"></i> Segundo apellido:</label>
                    <input class="input_persona form-control" name="persona_apellido_2" placeholder="Escribe el segundo apellido...">
                </div>
            </div>

            <div class="col-lg-3">
                <div class="form-group">
                    <label class="form-control-label"><i class="fas fa-user"></i> Sexo: *</label>
                    <select required class="input_persona form-control" name="persona_sexo">
                    </select>
                </div>
            </div>
            
            <div class="col-lg-3" id="indicar_genero" style="display: none;">
                <div class="form-group">
                    <label for="indicar_genero" class="form-label form-control-label"><i class="fas fa-user-friends"></i> Indicar Género</label>
                    <input type="text" class="input_persona form-control" id="indicar_genero" name="indicar_genero" placeholder="Especifica el género">
                </div>
            </div>            

            <div class="col-lg-3">
                <div class="form-group">
                    <label class="form-control-label"><i class="fas fa-user"></i> Fecha de nacimiento:</label>
                    <input type="date" name="persona_fecha_nacimiento" class="input_persona form-control input-lg p-2">
                </div>
            </div>

            <div class="col-lg-9 mt-3">
                <h6 class="mb-0 border-start border-4 ps-2 border-info">Datos generales</h6>
            </div>
            <hr class="horizontal dark mt-2 mb-3">


            <div class="col-lg-3">
                <div class="form-group">
                    <label class="form-control-label"><i class="fas fa-flag"></i> Nacionalidad: *</label>
                    <select required class="input_persona form-control" name="persona_nacionalidad">
                        <option value="">Selecciona una opción</option>
                        <option>Mexicana</option>
                        <option>Extranjera</option>
                    </select>
                </div>
            </div>            
            
            <div class="col-lg-3">
                <div class="form-group">
                <label class="form-control-label"><i class="fas fa-graduation-cap"></i> Escolaridad:</label>
                    <select class="input_persona form-control" name="persona_escolaridad">
                        <option value="">Selecciona o ingresa una opción</option>
                        <option>Ninguna</option>
                        <option>Primaria</option>
                        <option>Secundaria</option>
                        <option>Bachillerato</option>
                        <option>Técnico</option>
                        <option>Licenciatura</option>
                        <option>Maestría</option>
                        <option>Doctorado</option>
                        <option>No proporcionó</option>
                    </select>
                </div>
            </div>
            
            <div class="col-lg-3">
                <div class="form-group">
                    <label class="form-control-label"><i class="fas fa-user"></i> Estado civil:</label>
                    <select class="input_persona form-control" name="persona_estado_civil">
                        <option value="">Selecciona una opción</option>
                        <option>No proporcionó</option>
                        <option>Soltero</option>
                        <option>Casado</option>
                        <option>Viudo</option>
                        <option>Union Libre</option>
                        <option>Divorciado</option>
                        <option>Concubino</option>
                        <option>Libre convivenvia</option>
                    </select>

                </div>
            </div>
            
            <div class="col-lg-3">
                <div class="form-group">
                    <label class="form-control-label"><i class="fas fa-briefcase"></i> Ocupación o Profesión:</label>
                    <select class="input_persona form-control" name="persona_ocupacion">
                    </select>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="form-group">
                    <label class="form-control-label"><i class="fas fa-user-friends"></i> Pertenece a un grupo vulnerable</label>
                    <select class="input_persona form-control" name="persona_grupo_vulnerable">
                        
                    </select> 
                </div>
            </div>
       
            <div class="col-lg-3" id="otro_grupo" style="display: none;">
                <div class="form-group">
                    <label for="grupo_vulnerable_especificar" class="form-label form-control-label"><i class="fas fa-user-friends"></i> Especificar grupo</label>
                    <input type="text" class="input_persona form-control" id="grupo_vulnerable_especificar" name="grupo_vulnerable_especificar" placeholder="Especifica el grupo">
                </div>
            </div>

            <div class="col-lg-3" id="indicar_pueblo_originario" style="display: none;">
                <div class="form-group">
                    <label for="pueblo_originario" class="form-label form-control-label"><i class="fas fa-user-friends"></i> Indicar el pueblo</label>
                    <input type="text" class="input_persona form-control" id="pueblo_originario" name="pueblo_originario" placeholder="Especifica el pueblo originario">
                </div>
            </div>
            
            <div class="col-lg-6" id="indicar_lengua" style="display: none;">
                <div class="form-group">
                    <label for="lengua_indigena" class="form-label form-control-label"><i class="fas fa-user-friends"></i> Indicar la lengua</label>
                    <input type="text" class="input_persona form-control" id="lengua_indigena" name="lengua_indigena" placeholder="Especifica la lengua">
                </div>
            </div>
            
    </form>
    `,
    paso2: `
    <form class="w-100 m-auto row p-2 text-start form_persona" data-validate="parsley">
    
        <div class="col-lg-6 row">
            
            <h6 class="mb-0 border-start border-4 ps-2 border-info">Datos del domicilio</h6>
            <hr class="horizontal dark mt-2 mb-3">

            <div class="col-lg-12 col-sm-12">
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-road me-2"></i>Calle *</label>
                    <input required type="text" name="calle" class="form-control input_persona" placeholder="Escribe la calle...">
                </div>
            </div>

            <div class="col-lg-6 col-sm-6">
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-hashtag"></i> Exterior *</label>
                    <input required type="text" name="numero_exterior" class="form-control input_persona" placeholder="Exterior">
                </div>
            </div>

            <div class="col-lg-6 col-sm-6">
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-hashtag"></i> Interior</label>
                    <input type="text" name="numero_interior" class="form-control input_persona" placeholder="Interior">
                </div>
            </div>

        </div>
        
        <div class="col-lg-6 row">
            <h6 class="mb-0 border-start border-4 ps-2 border-info">Referencias del domicilio</h6>
            <hr class="horizontal dark mt-2 mb-3">
        
            <div class="col-lg-6 col-sm-6">
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-map-signs"></i> Entre calle</label>
                    <input type="text" name="entre_calles_1" class="form-control input_persona" placeholder="Escribe la calle...">
                </div>
            </div>
            <div class="col-lg-6 col-sm-6">
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-map-signs"></i> Y la calle</label>
                    <input type="text" name="entre_calles_2" class="form-control input_persona" placeholder="Escribe la calle...">
                </div>
            </div>
            <div class="col-lg-6 col-sm-6">
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-map-signs"></i> Referencia</label>
                    <textarea class="form-control input_persona" name="domicilio_referencia" placeholder="Describe la referencia...">

                    </textarea>
                </div>
            </div>
        </div>
    
        <div class="row">
            <h6 class="mb-0 border-start border-4 ps-2 border-info">Datos postales del domicilio</h6>
            <hr class="horizontal dark mt-2 mB-3">

            <div class="col-lg-3 col-sm-6">
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-mail-bulk"></i> Codigo postal:</label>
                    <input type="number" min="1" max="99999" name="codigo_postal" class="form-control input_persona">
                </div>
            </div>
            <div class="col-lg-3 col-sm-6">
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-house-user"></i> Colonia:</label>
                    <select class="form-control input_persona" name="colonia">
                        <option value="">Selecciona una opción</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-3 col-sm-6">
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-map-marked-alt"></i> Estado:</label>
                    <select readonly class="pe-none form-control input_persona" name="estado">
                        <option value="">Selecciona una opción</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-3 col-sm-6">
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-map-marked-alt"></i> Municipio:</label>
                    <select readonly class="pe-none form-control input_persona" name="municipio">
                        <option value="">Selecciona una opción</option>
                    </select>
                </div>
            </div>
    </div>
        
    </form>
    `,
    paso3: `
    <form class="w-100 m-auto row p-2 text-start form_persona" data-validate="parsley">  

        <h6 class="mb-0 border-start border-4 ps-2 border-info">Datos de contacto</h6>
        <hr class="horizontal dark my-3">

        <div class="row inputs_contacto">
            <div class="col-lg-4 col-sm-6">
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-phone-alt"></i> Teléfono de casa</label>
                    <input type="number" class="form-control input_persona" maxlength="10" minlength="10" max="9999999999" min="0" name="telefono_casa" placeholder="33333333333">
                </div>
            </div>
            <div class="col-lg-4 col-sm-6">
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-phone-alt"></i> Teléfono celular</label>
                    <input type="number" class="form-control input_persona" maxlength="10" minlength="10" max="9999999999" min="0" name="telefono_celular" placeholder="33333333333">
                </div>
            </div>
            <div class="col-lg-4 col-sm-6">
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-phone-alt"></i> Contacto para mensajes</label>
                    <input type="number" class="form-control input_persona" maxlength="10" minlength="10" max="9999999999" min="0" name="telefono_mensajes" placeholder="33333333333">
                </div>
            </div>
            <div class="col-lg-4 col-sm-6">
                <div class="form-group">
                    <label class="form-label"><i class="far fa-envelope"></i> Correo electrónico</label>
                    <input type="email" class="form-control input_persona" name="correo" placeholder="correo@ejemplo.com">
                </div>
            </div>
            <div class="col-lg-4 col-sm-6">
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-address-book"></i> Otro medio de contacto</label>
                    <input type="text" class="form-control input_persona" name="otro_medio_contacto" placeholder="---">
                </div>
            </div>
        </div>

    </form>
    `,
};


const Queue = Swal.mixin({
    progressSteps: ['1', '2', '3'],
    confirmButtonText: 'Siguiente',
    showClass: { backdrop: 'swal2-noanimation' },
    hideClass: { backdrop: 'swal2-noanimation' },
    buttonsStyling: false,
    customClass: {
        confirmButton: "btn bg-gradient-info",
        cancelButton: "btn bg-gradient-secondary",
        denyButton: "btn text-danger mx-3",
        popup: "col-xl-9 col-lg-10 col-sm-12"
    }
});


const validar_curp = async (curp) => {
    try {
        let respuesta = await $.ajax({
            url: '/panel/personas/validar_curp',
            data: { curp, id_persona: obtener_valor_input_persona("id_persona") },
            type: 'POST'
        });

        if (Number(respuesta) > 0) {
            mostrar_error_curp();
            return false;
        }
        return true;
    } catch (error) {
        // Manejar el error según sea necesario
    }
};

const mostrar_error_curp = () => {
    $('[name=curp]').parsley().addError('curp_existe', { message: 'Esta CURP ya está registrada' });
    Swal.showValidationMessage(`Por favor llena correctamente la CURP`);
    Swal.hideLoading();
};

const validar_datos_contacto = async () => {
    let guardar = 0;
    Swal.getPopup().querySelectorAll('.inputs_contacto input').forEach(input => {
        if (input.value) {
            console.log(input.value, typeof input.value);
            guardar = 1;
            $(input).prop('required', false).parsley().reset();
        }
    });

    if (guardar == 0 && !datos_formulario['persona_colectiva']) {
        $(Swal.getPopup().querySelectorAll('.inputs_contacto input')[0]).prop('required', true).parsley().validate();
        return false;
    }
    return true;
};

const validar_formulario = () => {
    let formulario = Swal.getPopup().querySelector('.form_persona');
    if (!$(formulario).parsley().isValid()) {
        $(formulario).parsley().validate();
        Swal.showValidationMessage(`Por favor llena correctamente los campos`);
        Swal.hideLoading();
        return false;
    }
    return true;
};

const crear_persona = async (titulo = 'Nueva persona', datos_persona = {}) => {

    (async () => {
        let pasoActual = 0;
        let result;

        while (pasoActual < 3) {

            result = await Queue.fire({
                title: titulo,
                html: form_persona[`paso${pasoActual + 1}`],
                currentProgressStep: pasoActual,
                showCancelButton: pasoActual > 0,
                confirmButtonText: pasoActual === 2 ? 'Guardar' : 'Siguiente',
                cancelButtonText: 'Volver',
                denyButtonText: 'Cancelar',
                showDenyButton: true,
                willOpen: async (e, ee) => {


                    const inputs = document.querySelectorAll('[name="telefono_casa"], [name="telefono_celular"], [name="telefono_mensajes"]');

                    inputs.forEach(input => {
                        const verificarYLimitarEntrada = function () {
                            // Limitar a 10 dígitos
                            if (this.value.length > 10) {
                                this.value = this.value.slice(0, 10);
                            }

                            // Rechazar cualquier cosa que no sea numérica
                            this.value = this.value.replace(/[^0-9]/g, '');
                        };

                        input.addEventListener('input', verificarYLimitarEntrada);
                        input.addEventListener('keyup', verificarYLimitarEntrada);
                    });

                    $('[name="persona_anonimo"]').change(function () {
                        if ($(this).is(':checked') == true) {
                            $('[name="persona_nombre"]').val('Anónimo').prop('readonly', true);
                            $('[name="persona_apellido_1"]').val('Anónimo').prop('readonly', true);
                        } else {
                            $('[name="persona_nombre"]').val('').prop('readonly', false);
                            $('[name="persona_apellido_1"]').val('').prop('readonly', false);
                        }
                    });

                    $('.select2').addClass('w-100');

                    const manejarRespuestaDiscapacidad = (respuesta, textStatus, jqXHR) => {
                        $('[name="persona_grupo_vulnerable"]').append(`<option value="">Selecciona o ingresa una opción</option>`);
                        respuesta.forEach((catalogo) => {
                            $('[name="persona_grupo_vulnerable"]').append(`<option value="${catalogo.id_discapacidad}">${catalogo.discapacidad}</option>`);
                        });
                        $('[name="persona_grupo_vulnerable"]').append(`<option>No proporcionó</option>`);
                    };

                    const manejarRespuestaGenero = (respuesta, textStatus, jqXHR) => {
                        $('[name="persona_sexo"]').append(`<option>No proporcionó</option>`);
                        respuesta.forEach((catalogo) => {
                            $('[name="persona_sexo"]').append(`<option value="${catalogo.id_genero}">${catalogo.genero}</option>`);
                        });
                    };

                    const manejarRespuestaOcupaciones = (respuesta, textStatus, jqXHR) => {
                        $('[name="persona_ocupacion"]').append(`<option value="">Selecciona o ingresa una opción</option>`);
                        respuesta.forEach((catalogo) => {
                            $('[name="persona_ocupacion"]').append(`<option value="${catalogo.id_ocupacion}">${catalogo.ocupacion}</option>`);
                        });
                        $('[name="persona_ocupacion"]').append(`<option>No proporcionó</option>`);
                    };

                    await obtener_catalogo('cat_discapacidad', manejarRespuestaDiscapacidad);
                    await obtener_catalogo('cat_genero', manejarRespuestaGenero);
                    await obtener_catalogo('cat_ocupaciones', manejarRespuestaOcupaciones);
                    /* Fin Traer Catalogos */

                    if (datos_persona) {
                        datos_formulario = datos_persona;
                    }

                    $('.input_persona').each(function () {
                        const nombre_campo = $(this).attr('name');
                        // Comprobar si el campo existe en datos_formulario
                        if (datos_formulario.hasOwnProperty(nombre_campo)) {

                            // Comprobar si el campo actual es un checkbox
                            if ($(this).is(':checkbox')) {
                                // Establecer el estado checked basado en el valor booleano en datos_formulario
                                $(this).prop('checked', datos_formulario[nombre_campo] === 'true' || datos_formulario[nombre_campo] === true);
                            } else {
                                // Para otros tipos de inputs, establecer el valor
                                $(this).val(datos_formulario[nombre_campo]);
                            }
                        }
                    });

                },
                preConfirm: async () => {
                    Swal.showLoading(); // Animación de carga

                    $('.input_persona').each(function () {
                        datos_formulario[$(this).attr('name')] = $(this).is(':checkbox') ? $(this).is(':checked').toString() : $(this).val();
                    });

                    if (pasoActual == 0) {
                        let curp = obtener_valor_input_persona('curp');

                        if (curp) {
                            await validar_curp(curp);
                        }

                    } else if (pasoActual == 2) {
                        await validar_datos_contacto();
                    }

                    validar_formulario();
                }
            });

            console.log(Swal);

            if (result.value) {
                pasoActual++;  // Avanzar al siguiente paso
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                pasoActual--;  // Volver al paso anterior
                if (pasoActual < 0) break; // Salir si ya no hay más pasos atrás
            } else if (result.dismiss === Swal.DismissReason.deny) {
                break; // Salir del bucle y cerrar el diálogo cuando se presiona el botón de denegar.
            } else if (result.dismiss === Swal.DismissReason.backdrop) {
                break; // Si el usuario hace clic fuera, también sal del bucle y cierra el diálogo.
            }

        }

        if (result.value) {
            try {
                await $.ajax({
                    url: '/panel/personas/post_persona',
                    data: datos_formulario,
                    dataType: 'JSON',
                    type: 'POST',
                    success: (respuesta, text, xhr) => {
                        Swal.hideLoading();
                        console.log(respuesta, text, xhr);
                        switch (xhr.status) {
                            case 500:
                                Swal.showValidationMessage(`Error 500 - Internal server error`);
                                break;
                            case 202:
                                Swal.showValidationMessage(`Error ya existe una persona con ese nombre`);
                                break;
                            case 200:
                                Swal.fire({
                                    title: 'Guardado!',
                                    text: 'La persona se guardó con éxito',
                                    icon: 'success',
                                    buttonsStyling: false,
                                    customClass: {
                                        confirmButton: "btn bg-gradient-info me-3",
                                        cancelButton: "btn bg-gradient-secondary"
                                    }
                                }).then(() => {
                                    tabla_personas.ajax.reload();
                                    get_personas();
                                });
                                break;
                            default:
                                // Manejar otros casos
                                break;
                        }
                    },
                    error: () => {
                        Swal.showValidationMessage(`Error 500 - Internal server error`);
                    }
                }
                );


            } catch (error) {
                // Manejar el error según sea necesario
            }

        }
    })();

    return;
};

const obtener_valor_input_persona = (nombre) => {
    return Swal.getPopup().querySelector(`.input_persona[name="${nombre}"]`).value.trim();
};

const crear_persona2 = async (titulo = 'Nueva persona', datos_persona = {}) => {

    Swal.fire({ //Crar una persona
        title: `<i class="fas fa-user-plus"></i> ${titulo}`,
        buttonsStyling: false,
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonText: `Guardar persona<i class="fas fa-arrow-right ms-2"></i>`,
        cancelButtonText: `Cancelar`,
        customClass: {
            popup: 'swal-wide border-radius-xl',
            confirmButton: 'btn bg-gradient-info btn-md mx-2 move-icon-left',
            cancelButton: 'btn btn-gradient-danger btn-md mx-2 move-icon-left',
            loader: 'custom-loader'
        },
        html: `
        <form class="w-100 m-auto row p-2 text-start form_persona" data-validate="parsley">
        

            
            <h6 class="mb-0 mt-3">Domicilio</h6>
            <hr class="horizontal dark my-3">

            <div class="row mt-2">
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label class="form-label"><i class="fas fa-road"></i>Calle *</label>
                        <input required type="text" name="calle" class="form-control input_persona" placeholder="Escribe la calle...">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label class="form-label"><i class="fas fa-hashtag"></i> exterior *</label>
                        <input required type="text" name="numero_exterior" class="form-control input_persona" placeholder="Exterior">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label class="form-label"><i class="fas fa-hashtag"></i> interior</label>
                        <input type="text" name="numero_interior" class="form-control input_persona" placeholder="Interior">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-6 col-sm-6">
                    <div class="form-group">
                        <label class="form-label"><i class="fas fa-map-signs"></i> Entre calle</label>
                        <input type="text" name="entre_calles_1" class="form-control input_persona" placeholder="Escribe la calle...">
                    </div>
                </div>
                <div class="col-lg-6 col-sm-6">
                    <div class="form-group">
                        <label class="form-label"><i class="fas fa-map-signs"></i> Y la calle</label>
                        <input type="text" name="entre_calles_2" class="form-control input_persona" placeholder="Escribe la calle...">
                    </div>
                </div>
                <div class="col-lg-6 col-sm-6">
                    <div class="form-group">
                        <label class="form-label"><i class="fas fa-map-signs"></i> Referencia</label>
                        <textarea class="form-control input_persona" name="domicilio_referencia" placeholder="Describe la referencia...">

                        </textarea>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label class="form-label"><i class="fas fa-mail-bulk"></i> Codigo postal *</label>
                        <input type="number" min="9999" max="99999" name="codigo_postal" class="form-control input_persona">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label class="form-label"><i class="fas fa-house-user"></i> Colonia *</label>
                        <select class="form-control input_persona" name="colonia">
                            <option value="">Selecciona una opción</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label class="form-label"><i class="fas fa-map-marked-alt"></i> Estado *</label>
                        <select readonly class="pe-none form-control input_persona" name="estado">
                            <option value="">Selecciona una opción</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label class="form-label"><i class="fas fa-map-marked-alt"></i> Municipio *</label>
                        <select readonly class="pe-none form-control input_persona" name="municipio">
                            <option value="">Selecciona una opción</option>
                        </select>
                    </div>
                </div>
            </div>

            <h6 class="mb-0 mt-3">Datos de contacto</h6>
            <hr class="horizontal dark my-3">

            <div class="row inputs_contacto">
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label class="form-label"><i class="fas fa-phone-alt"></i> Teléfono de casa</label>
                        <input type="tel" class="form-control input_persona" maxlength="10" minlength="0" min="0" name="telefono_casa" placeholder="33-3633-33-333">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label class="form-label"><i class="fas fa-phone-alt"></i> Teléfono celular</label>
                        <input type="tel" class="form-control input_persona" maxlength="10" minlength="0" min="0" name="telefono_celular" placeholder="33-3333-33-333">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label class="form-label"><i class="fas fa-phone-alt"></i> Conctacto para mensajes</label>
                        <input type="tel" class="form-control input_persona" maxlength="10" minlength="0" min="0" name="telefono_mensajes" placeholder="33-3333-33-333">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label class="form-label"><i class="far fa-envelope"></i> Correo electrónico</label>
                        <input type="email" class="form-control input_persona" name="correo" placeholder="correo@ejemplo.com">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label class="form-label"><i class="fas fa-address-book"></i> Otro medio de contacto</label>
                        <input type="text" class="form-control input_persona" name="otro_medio_contacto" placeholder="---">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label class="form-label"><i class="fas fa-address-book"></i> Estrados CEDHJ</label>
                        <select class="form-control input_persona" name="estrados_cedhj">
                            <option value="">Selecciona</option>
                            <option value="No">No</option>
                            <option value="Sí">Sí</option>
                        </select>
                    </div>
                </div>
            </div>


        </form>
        `,
        focusConfirm: false,
        loaderHtml: '<div class="spinner-border text-info text-gradient"></div>',
        willOpen: (e, ee) => {


            $("[name=colonia]").select2({
                ajax: {
                    url: "/get_colonias_by_ajax",
                    dataType: "json",
                    delay: 250,
                    type: 'post',
                    data: function (params) {
                        return {
                            colonia: params.term,
                        };
                    },
                    processResults: function (data) {
                        return {
                            results: data,
                        };
                    },
                    cache: true,
                },
                placeholder: "Buscar colonia",
                minimumInputLength: 3,
                language: {
                    inputTooShort: function (args) {
                        // args.minimum es el número mínimo de caracteres requeridos
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

                    // Agrega atributos personalizados 'data-municipio' y 'data-estado' a cada opción
                    var $result = $(
                        '<span data-municipio="' + data.municipio + '" data-estado="' + data.estado + '">' + data.text + '</span>'
                    );
                    return $result;
                },
                templateSelection: function (data) {
                    if (!data.id) {
                        return data.text;
                    }

                    // Agrega atributos personalizados 'data-municipio' y 'data-estado' a la opción seleccionada
                    var $selection = $(
                        '<span data-municipio="' + data.municipio + '" data-estado="' + data.estado + '">' + data.text + '</span>'
                    );
                    return $selection;
                }
            });

            $('.select2').addClass('w-100')

            $("[name=colonia]").on("select2:select", function (e) {
                var data = e.params.data;
                console.log(data);
                console.log(e.params);
                $(".input_persona[name=codigo_postal]").val(data.codigo_postal);

                $(`.input_persona[name="estado"]`).val(data.estado);
                $(`.input_persona[name="municipio"]`).val(data.municipio);

                //Limpiar opciones
                Swal.getPopup().querySelector(`.input_persona[name="municipio"]`).innerHTML = "";
                Swal.getPopup().querySelector(`.input_persona[name="estado"]`).innerHTML = "";

                //Setear opciones nuevas
                Swal.getPopup().querySelector(`.input_persona[name="municipio"]`).innerHTML += "<option selected estado='" + data.estado + "' value='" + data.municipio + "'>" + data.municipio + "</option>";
                Swal.getPopup().querySelector(`.input_persona[name="estado"]`).innerHTML += "<option selected value='" + data.estado + "'>" + data.estado + "</option>";
            });

            Swal.getPopup().querySelector(`.input_persona[name="colonia"]`).addEventListener("change", (e) => {
                console.log('cambia colonia');
                let municipio = $(e.currentTarget).children('option:selected').attr('municipio')
                Swal.getPopup().querySelector(`.input_persona[name="municipio"]`).value = municipio;
            })

            Swal.getPopup().querySelector(`.input_persona[name="municipio"]`).addEventListener("change", (e) => {
                let estado = $(e.currentTarget).children('option:selected').attr('estado')
                Swal.getPopup().querySelector(`.input_persona[name="estado"]`).value = estado;
            })

            e.querySelector(`#persona_colectiva`).addEventListener('change', async (input) => {
                if (input.currentTarget.checked) {
                    e.querySelector(`.input_persona[name="persona_nombre"]`).required = true;
                    e.querySelector(`.input_persona[name="persona_apellido_1"]`).required = true;
                    e.querySelector(`.input_persona[name="persona_nacionalidad"]`).required = false;
                    e.querySelector(`.input_persona[name="persona_fecha_nacimiento"]`).required = false;
                    e.querySelector(`.input_persona[name="persona_sexo"]`).required = false;
                    e.querySelector(`.input_persona[name="calle"]`).required = false;
                    e.querySelector(`.input_persona[name="numero_exterior"]`).required = false;
                    e.querySelectorAll('.inputs_contacto input')[0].required = false;

                } else {
                    e.querySelector(`.input_persona[name="persona_nombre"]`).required = true;
                    e.querySelector(`.input_persona[name="persona_apellido_1"]`).required = true;
                    e.querySelector(`.input_persona[name="persona_nacionalidad"]`).required = true;
                    e.querySelector(`.input_persona[name="persona_fecha_nacimiento"]`).required = true;
                    e.querySelector(`.input_persona[name="persona_sexo"]`).required = true;
                    e.querySelector(`.input_persona[name="calle"]`).required = true;
                    e.querySelector(`.input_persona[name="numero_exterior"]`).required = true;
                    e.querySelectorAll('.inputs_contacto input')[0].required = true;

                }
            })

            e.querySelector(`.input_persona[name="codigo_postal"]`).addEventListener('change', async (input) => {
                let codigo_postal = input.currentTarget.value;
                console.log(input);
                await $.ajax({
                    url: '/panel/quejas/personas/get_by_cp_ajax',
                    data: {
                        codigo_postal
                    },
                    dataType: 'JSON',
                    type: 'POST',
                    success: function (respuesta, text, xhr) {
                        let opciones_municipio = "";
                        let opciones_estado = "";

                        if (xhr.status === 204 || !respuesta) {
                            opciones_municipio += "<option value='' disabled selected>Sin resultados</option>";
                            opciones_estado += "<option value='' disabled selected>Sin resultados</option>";
                        } else {
                            respuesta.forEach(cp => {
                                opciones_municipio += `<option estado='${cp.estado}' value='${cp.municipio}'>${cp.municipio}</option>`;
                                opciones_estado += `<option value='${cp.estado}'>${cp.estado}</option>`;
                            });
                        }

                        Swal.getPopup().querySelector(`.input_persona[name="municipio"]`).innerHTML = opciones_municipio;
                        Swal.getPopup().querySelector(`.input_persona[name="estado"]`).innerHTML = opciones_estado;

                        $("[name='colonia']").select2("open");
                        setTimeout(function () {
                            $('.select2-search__field').val(codigo_postal).trigger('keyup');
                        }, 100);

                        if (localStorage.getItem('colonia')) {
                            let colonia_ls = localStorage.getItem('colonia');
                            console.log(colonia_ls);
                            $('[name="colonia"]').val(colonia_ls).trigger('change');
                            localStorage.removeItem('colonia');
                        }
                    }
                }); // Fin ajax
            });

            e.querySelector(`.input_persona[name="curp"]`).addEventListener('keyup', async (input) => {
                input = input.target
                input.value = input.value.toUpperCase();
            })

            if (datos_persona) {
                Object.entries(datos_persona).forEach(entry => {
                    const [key, value] = entry;

                    if (
                        key == 'id_persona_2' ||
                        key == 'created_at' ||
                        key == 'created_by' ||
                        key == 'updated_by' ||
                        key == 'updated_at' ||
                        key == 'id_queja' ||
                        key == 'ultima_modificacion' ||
                        key == 'cantidad' ||
                        key == 'nombre'
                    ) {
                        return;
                    }

                    console.log(key, value)


                    if (entry[0].indexOf('colonia') > -1) { //Obtener el id de autoridad para guardarlo temporalmente en localstorage
                        localStorage.setItem('colonia', entry[1]);
                    } else {
                        e.querySelector(`.input_persona[name="${key}"]`).value = value
                        let evento = new Event('change')
                        e.querySelector(`.input_persona[name="${key}"]`).dispatchEvent(evento)
                    }

                });
            }
        },
        preConfirm: async () => {
            Swal.showLoading() //Boton con animación de carga
            let guardar = 0;

            let curp = Swal.getPopup().querySelector('.input_persona[name="curp"]').value.trim()

            if (curp) {
                await $.ajax({
                    url: '/panel/quejas/personas/validar_curp',
                    data: {
                        curp,
                        id_persona: Swal.getPopup().querySelector(`.input_persona[name="id_persona"]`).value
                    },
                    type: 'POST',
                    success: (respuesta) => {
                        if (Number(respuesta) > 0) {
                            $('[name=curp]').parsley().addError('curp_existe', {
                                message: 'Esta CURP ya está registrada'
                            });
                            Swal.showValidationMessage(`Por favor llena correctamente la CURP`)
                            Swal.hideLoading()
                        } else {
                            $('[name=curp]').parsley().removeError('curp_existe');
                        }
                    },
                    error: () => {

                    }
                })
            }
            //Validar que haya al menos un dato de contacto
            Swal.getPopup().querySelectorAll('.inputs_contacto input').forEach((e, i) => {
                if (e.value) {
                    guardar = 1;
                    $(Swal.getPopup().querySelectorAll('.inputs_contacto input')[0]).prop('required', false).parsley().reset();
                }
            })

            //Si la bandera no cambia mostrar error
            console.log(guardar == 0, !Swal.getPopup().querySelector('#persona_colectiva').checked);
            if (guardar == 0 && !Swal.getPopup().querySelector('#persona_colectiva').checked) {
                $(Swal.getPopup().querySelectorAll('.inputs_contacto input')[0]).prop('required', true).parsley().validate();
                guardar = 0;

            }

            let id_persona = Swal.getPopup().querySelector('.input_persona[name="id_persona"]').value.trim()
            let id_persona_datos_queja = Swal.getPopup().querySelector('.input_persona[name="id_persona_datos_queja"]').value.trim()
            let persona_nombre = Swal.getPopup().querySelector('.input_persona[name="persona_nombre"]').value.trim()
            let persona_apellido_1 = Swal.getPopup().querySelector('.input_persona[name="persona_apellido_1"]').value.trim()
            let persona_apellido_2 = Swal.getPopup().querySelector('.input_persona[name="persona_apellido_2"]').value.trim()
            let persona_nacionalidad = Swal.getPopup().querySelector('.input_persona[name="persona_nacionalidad"]').value.trim()
            let persona_fecha_nacimiento = Swal.getPopup().querySelector('.input_persona[name="persona_fecha_nacimiento"]').value.trim()
            let persona_escolaridad = Swal.getPopup().querySelector('.input_persona[name="persona_escolaridad"]').value.trim()
            let persona_sexo = Swal.getPopup().querySelector('.input_persona[name="persona_sexo"]').value.trim()
            let persona_estado_civil = Swal.getPopup().querySelector('.input_persona[name="persona_estado_civil"]').value.trim()
            let persona_ocupacion = Swal.getPopup().querySelector('.input_persona[name="persona_ocupacion"]').value.trim()
            let persona_grupo_vulnerable = Swal.getPopup().querySelector('.input_persona[name="persona_grupo_vulnerable"]').value.trim()
            let grupo_vulnerable_especificar = Swal.getPopup().querySelector('.input_persona[name="grupo_vulnerable_especificar"]').value.trim()
            let calle = Swal.getPopup().querySelector('.input_persona[name="calle"]').value.trim()
            let numero_exterior = Swal.getPopup().querySelector('.input_persona[name="numero_exterior"]').value.trim()
            let numero_interior = Swal.getPopup().querySelector('.input_persona[name="numero_interior"]').value.trim()
            let entre_calles_1 = Swal.getPopup().querySelector('.input_persona[name="entre_calles_1"]').value.trim()
            let entre_calles_2 = Swal.getPopup().querySelector('.input_persona[name="entre_calles_2"]').value.trim()
            let domicilio_referencia = Swal.getPopup().querySelector('.input_persona[name="domicilio_referencia"]').value.trim()
            let codigo_postal = Swal.getPopup().querySelector('.input_persona[name="codigo_postal"]').value.trim()
            let colonia = Swal.getPopup().querySelector('.input_persona[name="colonia"]').value.trim()
            let estado = Swal.getPopup().querySelector('.input_persona[name="estado"]').value.trim()
            let municipio = Swal.getPopup().querySelector('.input_persona[name="municipio"]').value.trim()
            let telefono_casa = Swal.getPopup().querySelector('.input_persona[name="telefono_casa"]').value.trim()
            let telefono_celular = Swal.getPopup().querySelector('.input_persona[name="telefono_celular"]').value.trim()
            let telefono_mensajes = Swal.getPopup().querySelector('.input_persona[name="telefono_mensajes"]').value.trim()
            let correo = Swal.getPopup().querySelector('.input_persona[name="correo"]').value.trim()
            let otro_medio_contacto = Swal.getPopup().querySelector('.input_persona[name="otro_medio_contacto"]').value.trim()
            let estrados_cedhj = Swal.getPopup().querySelector('.input_persona[name="estrados_cedhj"]').value.trim()

            //Validar con parsley el formulario
            if (!$(Swal.getPopup().querySelector('.form_persona')).parsley().isValid()) {
                $(Swal.getPopup().querySelector('.form_persona')).parsley().validate()
                Swal.showValidationMessage(`Por favor llena correctamente los campos`)
                Swal.hideLoading()
            }

            return {
                id_persona,
                id_persona_datos_queja,
                curp,
                persona_nombre,
                persona_apellido_1,
                persona_apellido_2,
                persona_nacionalidad,
                persona_fecha_nacimiento,
                persona_escolaridad,
                persona_sexo,
                persona_estado_civil,
                persona_ocupacion,
                persona_grupo_vulnerable,
                grupo_vulnerable_especificar,
                calle,
                numero_exterior,
                numero_interior,
                entre_calles_1,
                entre_calles_2,
                domicilio_referencia,
                codigo_postal,
                colonia,
                estado,
                municipio,
                telefono_casa,
                telefono_celular,
                telefono_mensajes,
                correo,
                otro_medio_contacto,
                estrados_cedhj,
            }
        }
    }).then(async (result) => {

        if (result.isConfirmed) { //Validar clic en boton de aceptar
            await $.ajax({
                url: '/panel/quejas/personas/post_persona',
                data: {
                    id_persona: result.value.id_persona,
                    id_persona_datos_queja: result.value.id_persona_datos_queja,
                    curp: result.value.curp,
                    persona_nombre: result.value.persona_nombre,
                    persona_apellido_1: result.value.persona_apellido_1,
                    persona_apellido_2: result.value.persona_apellido_2,
                    persona_nacionalidad: result.value.persona_nacionalidad,
                    persona_fecha_nacimiento: result.value.persona_fecha_nacimiento,
                    persona_escolaridad: result.value.persona_escolaridad,
                    persona_sexo: result.value.persona_sexo,
                    persona_estado_civil: result.value.persona_estado_civil,
                    persona_ocupacion: result.value.persona_ocupacion,
                    persona_grupo_vulnerable: result.value.persona_grupo_vulnerable,
                    grupo_vulnerable_especificar: result.value.grupo_vulnerable_especificar,
                    calle: result.value.calle,
                    numero_exterior: result.value.numero_exterior,
                    numero_interior: result.value.numero_interior,
                    entre_calles_1: result.value.entre_calles_1,
                    entre_calles_2: result.value.entre_calles_2,
                    domicilio_referencia: result.value.domicilio_referencia,
                    codigo_postal: result.value.codigo_postal,
                    colonia: result.value.colonia,
                    estado: result.value.estado,
                    municipio: result.value.municipio,
                    telefono_casa: result.value.telefono_casa,
                    telefono_celular: result.value.telefono_celular,
                    telefono_mensajes: result.value.telefono_mensajes,
                    correo: result.value.correo,
                    otro_medio_contacto: result.value.otro_medio_contacto,
                    estrados_cedhj: result.value.estrados_cedhj,
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
                            text: 'Ya hay una persona con ese nombre',
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
                            title: 'Guardado!',
                            text: 'La persona se guardó con éxito',
                            icon: 'success',
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: "btn bg-gradient-info me-3",
                                cancelButton: "btn bg-gradient-secondary"
                            }
                        }).then(() => {
                            tabla_personas.ajax.reload();
                        })

                        //select_autoridad_responsable($('[name=id_autoridad_responsable]'));

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

let tabla_personas;

$(document).ready(async () => {

    
    $(document).on('change', '[name="persona_sexo"]', function () {
        console.log($(this).val());
        if ($(this).val() === '4') {
            $('#indicar_genero').slideDown(300);
        } else {
            $('#indicar_genero').slideUp(300).find('#indicar_genero').val('');
        }
    });

    $(document).on('change', '[name="persona_grupo_vulnerable"]', function () {
        let valor = $(this).children('option:selected').text();
        console.log(valor);

        if (valor === 'Otro' || valor === 'LGBTT' || valor === 'Persona con Discapacidad') {
            $('#otro_grupo').slideDown(300);
        } else {
            $('#otro_grupo').slideUp(300).find('#grupo_vulnerable_especificar').val('');
        }

        if (valor === 'Comunidad Indígena') {
            $('#indicar_lengua').slideDown(300);
        } else {
            $('#indicar_lengua').slideUp(300);
        }

        if (valor === 'Pueblos originarios') {
            $('#indicar_pueblo_originario').slideDown(300);
        } else {
            $('#indicar_pueblo_originario').slideUp(300);
        }
    });


    tabla_personas = await $('.tabla_personas').DataTable({
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
            url: '/panel/quejas/personas/get_by_ajax',
            type: 'POST',
            data: function (data) {
                // Append formdata
                $('.table').addClass('is-loading');
                $('.table td button').text('');
            },
            dataSrc: "data"
        },
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
        initComplete: function () {

            //Modificar select de longitud
            //$('#DataTables_Table_0_length label').html(`Mostrar: <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="form-select form-select-sm"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select>`);

            //Agregar panel de filtros
            $('#DataTables_Table_0_length').after(`
            <div class="contenedor_filtros">
            </div>
            `);

            tabla_personas.buttons().container().appendTo('.contenedor_filtros');
            $('.dt-buttons .dt-button').first().addClass('btn btn-icon btn-3 btn-success bg-gradient-success').html(`<span class="btn-inner--icon"><i class="fas fa-file-excel"></i></span>`)
            $('.dt-buttons .dt-button').last().addClass('btn btn-icon btn-3 btn-danger bg-gradient-danger').html(`<span class="btn-inner--icon"><i class="fas fa-file-pdf"></i></span>`)
        },
        columnDefs: [{
            "width": "40%",
            "targets": 0
        }],
        columns: [{
            "mData": "nombre",
            "mRender": function (data, type, row) {
                return `<div class="d-flex px-2">
                                <div>
                                    <button class="btn btn-link text-gradient p-0 m-0 text-dark">
                                        <i class="fas fa-user text-lg avatar avatar-sm rounded-circle me-2 text-dark"></i>
                                    </button>
                                </div>
                                <div class="my-auto">
                                    <h6 class="mb-0 text-sm text-wrap">${data}</h6>
                                </div>
                            </div>`;
            }
        },
        {
            "mData": "cantidad",
            "mRender": function (data, type, row) {
                return `<td class="align-middle cursor-pointer">
                                <span class="text-xs font-weight-bold ver_solicitudes cursor-pointer" id_persona="${row.id_persona}"><i class="fas fa-folder-open text-md me-2 text-dark"></i> ${data ?? 0} solicitudes</span>
                            </td>`;

            }
        },
        {
            "mData": "ultima_modificacion",
            "mRender": function (data, type, row) {
                return `<div class="align-middle cursor-pointer btn_historial_borrador" id_modificacion="${row.id_borrador}" nombre="${row.nombre_borrador}">
                                <span class="fas fa-history text-xs"></span>
                                <span class="font-weight-bold text-xs">${data ?? '---'}</span>
                            </div>`;
            }
        },
        {
            "mData": "id_persona",
            "mRender": function (data, type, row) {
                html = `
                    <!-- Opciones -->
                        <div class="align-middle">
                            <div class="ms-auto text-center">
                                <div class="btn btn-link text-warning text-gradient px-3 mb-0 editar_persona" id_persona="${data}">
                                    <i class="far fa-edit me-2" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    `;
                return html;
            }
        }
        ],
    });

    tabla_personas.on('preDraw', function () {
        startTime = new Date().getTime();
        $('.btn_get_modificaciones').get()
    })
        .on('draw.dt', function () {
            console.log('La tabla tardó: ' + (new Date().getTime() - startTime) + 'ms en cargar');
            $('.table').removeClass('is-loading');

            //Cambiar color paginacion
            $('#DataTables_Table_0_paginate .pagination').addClass('pagination-warning');

            evento_btn_editar_persona();

            $('.ver_solicitudes').off('click')
            $('.ver_solicitudes').click(async (e) => {
                let id_persona = $(e.currentTarget).attr('id_persona')

                await $.ajax({
                    url: '/panel/quejas/get_by_ajax',
                    data: {
                        id_persona
                    },
                    dataType: 'JSON',
                    type: 'POST',
                    success: function (respuesta, text, xhr) {

                        let li_quejas = '';
                        console.log(xhr);

                        if (xhr.status == 200) {
                            respuesta.forEach(queja => {
                                li_quejas += `
                                    <li class="list-group-item border-0 m-2 p-2">
                                        <div class="row align-items-center">
                                            <div class="col-lg-10 col-8 d-flex flex-wrap">
                                                <div class="d-flex align-items-center me-3">
                                                    <i class="fas fa-file text-danger me-2"></i>
                                                    <span class="font-weight-bold text-nowrap">${queja.tipo_servicio}</span>:
                                                </div>
                                                <div class="d-flex align-items-center me-3">
                                                    <span class="font-weight-light text-nowrap">${queja.folio}</span>  
                                                </div>
                                                <div class="d-flex align-items-center me-3">
                                                    <i class="fas fa-calendar-alt text-secondary me-2"></i>
                                                    <span class="text-muted text-nowrap">${queja.created_at.split(' ')[0]}</span>
                                                </div>
                                                <div class="d-flex align-items-center mt-2 mt-lg-0">
                                                    <i class="fas fa-info-circle text-secondary me-2"></i>
                                                    <span class="text-muted">${queja.estatus}</span>
                                                </div>
                                            </div>
                                            <div class="col-lg-2 col-4 text-end">
                                                <a href="/panel/expedientes/${queja.id_expediente}/detalle" target="_blank" class="btn btn-sm mb-0 bg-gradient-info text-white rounded-pill">
                                                    Ver <i class="fa fa-arrow-right ms-2" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                    `;
                            });
                        } else {
                            li_quejas += `
                                <li class="list-group-item border-0 p-0 my-1 w-100">
                                    <div class="row">
                                        <div class="col-lg-12 d-flex justify-content-between pe-0">
                                            <div class="d-flex text-black align-items-center}">
                                                No hay quejas disponibles en este listado
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            `;
                        }


                        Swal.fire({
                            title: 'Trámites registrados',
                            html: `
                            <div class="card card-body">
                                <ul class="list-group border-0 gy-2">
                                    ${li_quejas}
                                </ul>
                            </div>
                            `,
                            icon: 'info',
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: "btn bg-gradient-info me-3",
                                cancelButton: "btn bg-gradient-secondary",
                                popup: 'swal-wide'
                            }
                        })

                    }
                }); // Fin ajax

            })

        });

    //Inicializar buscador
    $('.busqueda_nav').keyup(function () {
        tabla_personas.search($(this).val()).draw();
        //console.log($(this).val());
    })

    //Vincular evento al boton para añadir autoridad
    $('.crear_persona').click(function (e) {
        crear_persona();
    })

    $('.editar_persona').click(async (e) => {
        console.log(e);

        let datos_persona;
        let id_persona = $(e.currentTarget).attr('id_persona');

        await $.ajax({
            url: '/panel/quejas/personas/get_by_ajax',
            data: {
                id_persona
            },
            dataType: 'JSON',
            type: 'POST',
            success: function (respuesta, text, xhr) {

                datos_persona = respuesta[0];

            }
        }); // Fin ajax

        crear_persona('Editar persona', datos_persona);
    })
    //crear_persona();

});