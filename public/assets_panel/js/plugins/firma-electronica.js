let clave_privada_buffer = new ArrayBuffer(0);
let certificado_buffer = new ArrayBuffer(0);

// Resultados de firmas (opcional si necesitas distinguir entre diferentes roles)
let resultados_firma = [];

//Variables tabla
let tabla_excel;
let registro_cambios = [];
let filas_nuevas = [];

const quitar_acentos = (texto = '') => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const convertir_datos_a_json = async () => {
    const datos = tabla_excel.getData();
    const encabezados = tabla_excel.getColHeader();

    console.log(encabezados);

    const datos_json = datos.map(fila => {
        let objeto_fila = {};
        fila.forEach((valor, indice) => {
            objeto_fila[encabezados[indice]] = valor;
        });
        return objeto_fila;
    });

    return JSON.stringify(datos_json);
};

const mostrar_barra_progreso = (porcentaje, titulo = "", mensaje = "") => {
    $("#card_titulo").addClass("d-none");
    $("#card_barra_progreso").removeClass("d-none");

    $("#titulo_barra_progreso").text(titulo);
    $("#texto_barra_progreso").html(mensaje + '<span class="puntos_animados">...</span>');
    $("#barra_progreso").css("width", porcentaje + "%").attr("aria-valuenow", porcentaje);
};

const ocultar_barra_progreso = () => {
    $("#card_barra_progreso").addClass("d-none");
    $("#card_titulo").removeClass("d-none");
    $("#barra_progreso").css("width", "0%").attr("aria-valuenow", 0);
};

// Función para cargar archivos
const cargar_archivo = ({ currentTarget }) => {
    const reader = new FileReader();
    reader.onload = ({ target: { result } }) => {
        // Verifica si es clave privada o certificado y asigna el resultado
        if (currentTarget.id.includes('privkey')) {
            clave_privada_buffer = result;
        } else if (currentTarget.id.includes('cert')) {
            certificado_buffer = result;
        }
    };
    reader.readAsArrayBuffer(currentTarget.files[0]);
};

// Función para firmar datos
const firmar_datos = async (data_to_sign, password) => {
    if (!isWCAPISupported()) return;

    const hash_algorithm = {
        "alg_SHA1": "SHA-1",
        "alg_SHA256": "SHA-256",
        "alg_SHA384": "SHA-384",
        "alg_SHA512": "SHA-512"
    }[document.getElementById("hashAlg").value] || '';

    const clave_privada_string = arrayBufferToString(clave_privada_buffer).replace(/(-----(BEGIN|END) PRIVATE KEY-----|\r\n)/g, '');
    const certificado_string = arrayBufferToString(certificado_buffer).replace(/(-----(BEGIN|END) CERTIFICATE-----|\r\n)/g, '');

    const ciphered_key = clave_privada_string.charAt(0) === "M" ? window.atob(clave_privada_string) : clave_privada_string;
    const cert_key = certificado_string.charAt(0) === "M" ? window.atob(certificado_string) : certificado_string;

    try {
        if (window.Promise) {
            const pkcs7 = await pkcs7FromContent(password, ciphered_key, cert_key, hash_algorithm, data_to_sign, false);
            return window.btoa(arrayBufferToString(pkcs7, false, true));
        } else {
            alert("Tu navegador no soporta Promises.");
            return null;
        }
    } catch (err) {
        alert(`Error en SgDataCrypto:\n ${err.message}\n${err.stack}`);
        return null;
    }
};


function convertir_primera_en_mayuscula(cadena) {
    if (cadena && typeof cadena === 'string') {
        return cadena.charAt(0).toUpperCase() + cadena.slice(1);
    }
    return cadena;
}

// Función para procesar cada fila del Excel y generar PKCS7
const procesar_fila = async (fila, tipo_firma) => {
    const valores = Object.values(fila);

    let valor_gobjal = {};

    if (clave_documento == "DD-CEDHJ-0001") {
        valor_gobjal = {
            'Nombre del participante' : quitar_acentos(valores[1]),
            'Modalidad' : valores[19] ? convertir_primera_en_mayuscula(quitar_acentos(valores[19] ?? 'Virtual')) : 'Virtual',
            'Fecha del curso' : quitar_acentos(valores[17]),
            'Tema' : quitar_acentos(valores[13]),
            'Duracion' : quitar_acentos(valores[16]),
            'Instructor' : quitar_acentos(valores[14]),
        };
    } else if (clave_documento == "DD-CEDHJ-0002") {
        valor_gobjal = {
            'Nombre del participante' : quitar_acentos(valores[1]),
            'Modalidad' : valores[19] ? convertir_primera_en_mayuscula(quitar_acentos(valores[12] ?? 'Virtual')) : 'Virtual',
            'Fecha del curso' : quitar_acentos(valores[2]),
            'Tema' : quitar_acentos(valores[4]),
            'Duracion' : quitar_acentos(valores[3]),
            'Instructor' : quitar_acentos(valores[13] ?? 'Centro de estudios'),
        };
    }

    const data_to_sign = JSON.stringify(valor_gobjal);
    const password = document.getElementById(tipo_firma + "_password").value;

    // Comprobamos si las buffers de clave privada y certificado están vacíos antes de firmar
    if (clave_privada_buffer.byteLength === 0 || certificado_buffer.byteLength === 0) {
        alert("Certificado o clave privada no seleccionados.");
        return;
    }

    // Llama a la función de firma de datos
    return await firmar_datos(quitar_acentos(data_to_sign), password);
};

// Función para manejar el archivo Excel y procesar las filas
const generar_pkcs7 = async (tipo_firma) => {
    try {
        let datos_excel = await convertir_datos_a_json();
        datos_excel = JSON.parse(datos_excel);
        resultados_firma = []; // Lista única para resultados
        let fila_actual = 0;

        for (const fila of datos_excel) {
            const pkcs7 = await procesar_fila(fila, tipo_firma);
            resultados_firma.push({ fila, pkcs7 });

            fila_actual++;
            mostrar_barra_progreso(Math.round((fila_actual / datos_excel.length) * 50), "Preparanto información...", "Estamos generando claves para firmado");
        }
    } catch (error) {
        console.error("Error al procesar Excel:", error);
    }
};

const enviar_datos = async (firma) => {
    mostrar_barra_progreso(0, "Iniciando", "Generando claves de firmado");
    await generar_pkcs7(firma);
    let numero_firmas = resultados_firma.length;

    const tiempo_por_firma = 500;
    const tiempo_total = numero_firmas * tiempo_por_firma;
    const intervalo_actualizacion = tiempo_por_firma;
    const incremento = (50 / numero_firmas);

    let contador = 50;
    let interval = setInterval(() => {
        contador += incremento;
        mostrar_barra_progreso(contador, "Firmado en curso...", "Estamos firmando tus documentos en Gobierno de Jalisco");
        if (contador >= 100) {
            clearInterval(interval);
        }
    }, intervalo_actualizacion);

    // Función para realizar la petición AJAX
    const realizar_peticion_ajax = async (intentos_restantes) => {
        await $.ajax({
            url: '/panel/instituto/constancias/guardar_pkcs7',
            type: 'POST',
            contentType: 'JSON',
            dataType: 'JSON',
            data: JSON.stringify({
                resultados_firma,
                id_constancia_listado,
                clave_documento,
                tipo_firma: firma
            }),
            success: function (response) {
                mostrar_barra_progreso(100);
                setTimeout(() => {
                    ocultar_barra_progreso();
                    Swal.fire({
                        title: "¡Éxito!",
                        text: "Tus documentos han sido firmados exitosamente.",
                        icon: "success",
                        button: "Aceptar",
                    }).then((value) => {
                        window.location.href = "/panel/instituto/constancias/";
                    });
                }, 1000);
                clearInterval(interval);
            },
            error: function (error, ee, eee) {
                console.log(error, ee, eee);
                if (error.responseJSON) {
                    Swal.fire({
                        title: "Error!",
                        html: error.responseJSON.message,
                        icon: "error",
                        button: "Aceptar",
                    });
                } else if (intentos_restantes > 0) {
                    // Reintenta la petición con un intento menos
                    realizar_peticion_ajax(intentos_restantes - 1);
                }
            }
        });
    };

    // Iniciar la petición AJAX con un número definido de intentos
    await realizar_peticion_ajax(5);

    ocultar_barra_progreso();
    clearInterval(interval);
};


const enviar_cambios = async () => {
    let datos_a_guardar = await convertir_datos_a_json();
    datos_a_guardar = JSON.parse(datos_a_guardar);
    let resumen_a_guardar = {};
    let total_filas = 0;

    datos_a_guardar.forEach(fila => {
        total_filas++;
        const tema = fila.Tema || 'Indefinido';
        resumen_a_guardar[tema] = (resumen_a_guardar[tema] || 0) + 1;
    });

    $.ajax({
        url: '/panel/instituto/constancias/cambios/post_cambio',
        type: 'POST',
        data: {
            json_constancias: JSON.stringify(datos_a_guardar),
            resumen_a_guardar: JSON.stringify(resumen_a_guardar),
            registro_cambios: JSON.stringify(registro_cambios),
            total_filas,
            id_constancia_listado
        },
        success: function (response) {
            console.log('Respuesta del servidor:', response);
            // Aquí puedes manejar la respuesta del servidor
            registro_cambios = [];
        },
        error: function (error) {
            console.error('Error al enviar datos:', error);
        }
    });
};

const registrar_cambio = (cambios, origen) => {
    console.log(cambios, origen);
    if (origen !== 'loadData' && cambios) {
        cambios.forEach(([fila, columna, valor_anterior, valor_nuevo]) => {
            registro_cambios.push({ tipo: 'Editado', indice: fila, columna, valor_anterior, valor_nuevo });
            if (valor_anterior !== valor_nuevo) {
                tabla_excel.setCellMeta(fila, columna, 'className', 'celda-editada');
                tabla_excel.render();
            }
        });

        enviar_cambios();
    }
};

const registrar_agregado_fila = (indice, cantidad) => {
    registro_cambios.push({ tipo: 'Nueva fila', indice, cantidad });

    for (let i = 0; i < cantidad; i++) {
        let fila_acutal = indice + i;
        let columnas = tabla_excel.countCols();

        for (let j = 0; j < columnas; j++) {
            tabla_excel.setCellMeta(fila_acutal, j, 'className', 'nueva-fila');
        }
    }
    tabla_excel.render();

    enviar_cambios();
};

const registrar_eliminado_fila = (indice, cantidad) => {
    registro_cambios.push({ tipo: 'Eliminado', indice, cantidad });

    enviar_cambios();
};

const mostrar_historial_cambios = async (id_constancia_listado) => {
    let html_tabla = `Sin cambios`;
    let tamaño = 'col-lg-4';

    await $.ajax({
        url: `/panel/instituto/constancias/cambios/get_historial`,
        type: 'POST',
        data: {
            id_constancia_listado
        },
        dataType: 'JSON',
        success: function (data) {

            if (data) {

                const contenido_historial = data.map(cambio => {
                    return `
                    <tr>
                        <td>${cambio.tipo}</td>
                        <td>${cambio.indice || 'N/A'}</td>
                        <td>${cambio.cantidad || 'N/A'}</td>
                        <td>${cambio.columna || 'N/A'}</td>
                        <td>${cambio.valor_anterior || 'N/A'}</td>
                        <td>${cambio.valor_nuevo || 'N/A'}</td>
                        <td>${cambio.creador}</td>
                        <td>${cambio.created_at}</td>
                    </tr>
                `;
                }).join('');

                html_tabla = `
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Índice</th>
                                    <th>Cantidad</th>
                                    <th>Columna</th>
                                    <th>Valor Anterior</th>
                                    <th>Valor Nuevo</th>
                                    <th>Creado Por</th>
                                    <th>Fecha de Creación</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${contenido_historial}
                            </tbody>
                        </table>
                    </div>
                `;

                tamaño = 'col-lg-10';
            }
        },
        error: function (error) {
            console.error("Error al obtener el historial de cambios:", error);
        }
    });

    Swal.fire({
        title: 'Historial de Cambios',
        html: html_tabla,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Salir',
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn bg-gradient-info me-3",
            popup: tamaño,
        }
    });

};

window.addEventListener('load', () => {
    $('#presidencia_privkey_file').on('change', cargar_archivo);
    $('#director_cde_privkey_file').on('change', cargar_archivo);
    $('#presidencia_cert_file').on('change', cargar_archivo);
    $('#director_cde_cert_file').on('change', cargar_archivo);
    $('#ver_historial').on('click', mostrar_historial_cambios);

    $('.btn_firmar').on('click', (e) => {
        e.preventDefault();
        let firma = $(e.currentTarget).attr('firma')
        console.log($(e.currentTarget));
        console.log(firma);
        enviar_datos(firma);
    });

    const datosParseados = datos;
    const colHeaders = datosParseados.length > 0 ? Object.keys(datosParseados[0]) : [];
    const datosParaTabla = datosParseados.map(item => Object.values(item));

    // Calcular la altura de la tabla
    const alturaFila = 23; // Ajusta este valor según el estilo de tus filas
    const alturaMaxima = 500; // Altura máxima de la tabla
    const alturaCalculada = Math.min(datosParaTabla.length * alturaFila + alturaFila, alturaMaxima) + 20;

    // Configuración de Handsontable
    const configuracion = {
        data: datosParaTabla,
        rowHeaders: true,
        colHeaders: colHeaders,
        filters: true,
        dropdownMenu: true,
        language: 'es-MX',
        contextMenu: true,
        manualRowMove: true,
        manualColumnMove: true,
        stretchH: 'all',
        width: '100%',
        height: alturaCalculada,
        afterChange: registrar_cambio,
        afterCreateRow: registrar_agregado_fila,
        afterRemoveRow: registrar_eliminado_fila,
        licenseKey: 'non-commercial-and-evaluation',
    };

    // Inicializar Handsontable
    const contenedor = document.getElementById('tabla_json');
    tabla_excel = new Handsontable(contenedor, configuracion);
});
