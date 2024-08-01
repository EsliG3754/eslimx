$(document).ready(() => {
    $('.btn_cerrar_session').click(async function () {
        localStorage.setItem('logout', true)
        sessionStorage.removeItem('logged_in');
        localStorage.removeItem('logged_in');
        localStorage.removeItem('logout');
        window.location.href = '/panel/cerrar_sesion';
    });
});

const error_ajax = (respuesta) => {
    Swal.fire('Ha ocurrido un problema :(', '<pre style="white-space: pre-line;">' + respuesta + '</pre>', 'error')
}

window.addEventListener("DOMContentLoaded", (event) => {
    const dropdown = document.getElementById('pagina_webDropdown');
    if (dropdown) { // verifica si dropdown es nulo
        console.log(dropdown);

        const dropdownLink = dropdown.previousElementSibling;
        const navItems = dropdown.getElementsByTagName('a');
        let href_actual = window.location.pathname.split('/')[1] + "/" + window.location.pathname.split('/')[2];

        for (let i = 0; i < navItems.length; i++) {
            let href_a = navItems[i].href.split('/')[3] + "/" + navItems[i].href.split('/')[4];
            if (href_a === href_actual) {
                // Agrega la clase 'active' al enlace, al enlace principal del menú desplegable y al contenedor li
                navItems[i].classList.add('active');
                dropdownLink.classList.add('active');
                dropdown.classList.add('show');
                break;
            }
        }
    }

});

const inicializar_tooltips_bs = () => {
    // Inicializar los tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

//Cerrar sesion en todas las ventanas
window.addEventListener('storage', (event) => {
    if (event.key == 'logout' && event.newValue) {
        sessionStorage.removeItem('logged_in');
        localStorage.removeItem('logged_in');
        localStorage.removeItem('logout');
        setTimeout(() => {
            window.location.reload();
        }, 500);
    } else {
        if (window.location.pathname.toLocaleLowerCase().indexOf("cuenta") > -1) {
            if (localStorage.getItem('logged_in')) {
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        }
    }
});

const online = () => {
    if (navigator.onLine) {
        return true;
    } else {
        return false;
    }
}

const spinner = () => {
    return `
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
        `;
}

const disable_btn = (btn) => {
    $(btn).html(spinner());
    $(btn).prop('disabled', true);
}

const enable_btn = (boton, texto = 'Acceder', color = '') => {
    const $boton = $(boton);
    $boton.prop('disabled', false);

    if (color) {
        const clasesColores = ['bg-gradient-success', 'bg-gradient-info', 'bg-gradient-danger', 'bg-gradient-warning', 'bg-gradient-dark'];
        $boton.removeClass(clasesColores.join(' '));
        $boton.addClass(`bg-gradient-${color}`);
    }

    $boton.find('span').remove();
    $boton.append(`<span class="texto-animado" style="opacity: 0">${texto}</span>`);

    setTimeout(() => {
        $boton.find('span').css('opacity', 1);
    }, 10);
}

const sa_leer_mas = (texto) => {
    Swal.fire({
        text: texto,
        icon: 'info',
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn bg-gradient-info me-3",
            cancelButton: "btn bg-gradient-secondary"
        }
    })
}

const getFileIcon = (extension) => {
    switch (extension.toLowerCase()) {
        case 'pdf':
            return 'far fa-file-pdf text-danger';
        case 'doc':
        case 'docx':
            return 'far fa-file-word text-primary';
        case 'xls':
        case 'xlsx':
            return 'far fa-file-excel text-success';
        case 'ppt':
        case 'pptx':
            return 'far fa-file-ppt text-warning';
        case 'zip':
        case 'rar':
        case '7z':
            return 'far fa-file-earmark-zip text-secondary';
        case 'mp3':
        case 'wav':
            return 'far fa-file-music text-info';
        case 'mp4':
        case 'avi':
        case 'mov':
            return 'far fa-file-play text-danger';
        default:
            return 'far fa-file-earmark text-muted';
    }
}

//Btn
const disableBtn = (btn) => {
    $(btn).html(spinner());
    $(btn).prop('disabled', true);
}

const enableBtn = (btn, text) => {
    $(btn).html(text);
    $(btn).prop('disabled', false);
}

const toast = ({ title, html, icon, footer }) => {
    const iconos = {
        success: 'fa fa-check',
        info: 'fa fa-info-circle',
        warning: 'fa fa-exclamation-triangle',
        error: 'fa fa-times-circle'
    };

    const clases = {
        success: 'text-success',
        info: 'text-info',
        warning: 'text-warning',
        error: 'text-danger'
    };

    const icono = iconos[icon] || iconos.error;
    const clase = clases[icon] || clases.error;

    const plantilla_toast = `
        <div class="toast fade p-2 bg-white hide" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header border-0">
                <i class="${icono} ${clase} me-2"></i>
                <span class="me-auto font-weight-bold ${clase} text-gradient">${title}</span>
                <small class="text-body">Ahora</small>
                <i class="fas fa-times text-md ms-3 cursor-pointer" data-bs-dismiss="toast" aria-label="Close" aria-hidden="true"></i>
            </div>
            <hr class="horizontal dark m-0">
            <div class="toast-body">
                ${html}
            </div>
            <small class="toast-footer text-xs mt-2">
                ${footer || ''}
            </small>
        </div>`;

    const contenedor_toast = document.getElementById('toast-container');
    contenedor_toast.innerHTML = '';
    contenedor_toast.insertAdjacentHTML('beforeend', plantilla_toast);

    const nuevo_toast = contenedor_toast.lastElementChild;
    const toast_instancia = new bootstrap.Toast(nuevo_toast);
    toast_instancia.show();
};

const generar_html_persona = (element, queja, tipo) => {
    let btn_ratificacion = '';
    let color = 'black';
    let icono = 'fa-user';
    let html = '';

    if (typeof queja == 'string') {
        queja = JSON.parse(queja);
    }

    if (!element.id_ratificacion) {
        btn_ratificacion = `
            <a class="dropdown-item me-2 py-2 px-4 text-left text-warning text-xs" href="/panel/quejas/${queja.id_queja}/generar_ratificacion" requerido="${queja.requiere_ratificacion}">
                <i class="fas fa-file-upload me-2" aria-hidden="true"></i>Crear ratificación
            </a>
        `;
    } else if (!element.ruta_ratificacion) {
        btn_ratificacion = `
            <div class="dropdown-item me-2 py-2 px-4 text-left text-warning text-xs subir_ratificacion" id_persona="${element.id_persona}" id_queja="${queja.id_queja}" requerido="${element.requiere_ratificacion}">
                <i class="fas fa-file-upload me-2" aria-hidden="true"></i>Subir ratificación
            </div>
        `;
    } else if (element.ruta_ratificacion) {
        color = 'success';
        icono = 'fa-check';

        btn_ratificacion = `
            <a class="dropdown-item me-2 py-2 px-4 text-left text-info text-xs" target="_blank" href="/${element.ruta_ratificacion}">
                <i class="fas fa-download me-2" aria-hidden="true"></i>Descargar ratificación
            </a>
        `;
    }

    if (element.id_ratificacion || element.requiere_ratificacion == 0) {
        color = 'success';
        icono = 'fa-check';

        btn_ratificacion += `
            <a class="dropdown-item me-2 py-2 px-4 text-left text-info text-xs" target="_blank" href="/panel/quejas/ratificaciones/${element.id_ratificacion}">
                <i class="fas fa-download me-2" aria-hidden="true"></i>Descargar ratificación sin firmar
            </a>
        `;
    }

    console.log(element);

    html += `
        <li class="list-group-item border-0 p-0 my-1">
            <div class="row">
                <div class="col-lg-5 d-flex justify-content-between pe-0">
                    <p class="d-flex text-${color} align-items-center contenedor_nombre_persona_${element.id_persona} mb-0">
                        <i class="fas ${icono} me-2" aria-hidden="true"></i> ${element.nombre_persona}
                    </p>
                </div>
                <div class="col-lg-6 d-flex justify-content-around">
                    <span class="text-center mb-0"><i class="fas fa-file-signature me-2" aria-hidden="true"></i> ${element.requiere_ratificacion == 0 ? 'No requiere' : 'Si requiere'}</span>
                    <span class="text-center mb-0"><i class="fas fa-address-card me-2" aria-hidden="true"></i> ${tipo.charAt(0).toUpperCase() + tipo.slice(1).replace('_', ' y ')}</span>
                </div>
                <div class="col-lg-1">
                    <div class="dropdown d-flex">
                        <div class="cursor-pointer my-auto mx-1 btn btn-xs bg-gradient-info shadow text-center text-white rounded" id="dropdown_expediente_${element.id_persona}" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-ellipsis-h text-white" aria-hidden="true"></i>
                        </div>

                        <ul class="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdown_expediente_${element.id_persona}">
                                
                            <!-- Opciones -->
                            <li>
                                <a href="/panel/quejas/${queja.id_queja}/personas/${element.id_persona}/generar_generales" target="_blank" class="dropdown-item py-2 px-4 text-left text-success text-xs generar_generales">
                                    <i class="fas fa-file-pdf me-2" aria-hidden="true"></i> Descargar generales
                                </a>
                            </li>

                            <li>
                                <button class="dropdown-item py-2 px-4 text-left text-info text-xs subir_generales" id_queja="${queja.id_queja}" id_persona="${element.id_persona}" id_personas_queja="${element.id_personas_queja}">
                                    <i class="fas fa-file-upload me-2" aria-hidden="true"></i> Subir generales
                                </button>
                            </li>
                            
                            <li>
                                ${btn_ratificacion}
                            </li>
                            
                            <li>
                                <div class="dropdown-item rounded py-2 px-4 text-left text-warning text-xs editar_persona" id_persona="${element.id_persona}">
                                    <i class="fas fa-edit" aria-hidden="true"></i> Editar persona
                                </div>
                            </li>
                            
                        </ul>

                    </div>
                </div>

            </div>
        </li>
    `;

    return html;
}

$(document).on("ajaxStart", function () {
    $("button").addClass("btn-cargando");
}).on("ajaxStop", function () {
    $("button").removeClass("btn-cargando");
});

// Función para capitalizar cada palabra en una cadena
function capitalizeWords(str) {
    return str.toLowerCase().replace(/(?:^|\s)\S/g, function (word) {
        return word.toUpperCase();
    });
}


const obtener_catalogo = async (catalogo, callback) => {
    // Construye una clave única para el catálogo en sessionStorage
    const clave_catalogo = 'catalogo_' + catalogo;

    // Verifica si el catálogo ya está en sessionStorage
    const catalogo_cacheado = sessionStorage.getItem(clave_catalogo);

    if (catalogo_cacheado) {
        // Si el catálogo está en sessionStorage, parsea el JSON y pasa los datos a la función de callback
        callback(JSON.parse(catalogo_cacheado));
    } else {
        // Si no, realiza la petición AJAX
        await $.ajax({
            url: "/panel/get_catalogo",
            dataType: "JSON",
            type: "POST",
            data: { catalogo },
            success: (respuesta) => {
                // Guarda la respuesta en sessionStorage
                sessionStorage.setItem(clave_catalogo, JSON.stringify(respuesta));
                // Pasa la respuesta a la función de callback
                callback(respuesta);
            },
        });
    }
};

async function get_json(rutaJson) {
    rutaJson = rutaJson.replace('public/', '/');
    
    if (!rutaJson.startsWith('/')) {
        rutaJson = '/' + rutaJson;
    }

    try {
        const response = await fetch(rutaJson);
        if (!response.ok) {
            throw new Error('No se pudo cargar el JSON');
        }
        const jsonData = await response.json();
        return jsonData;  // Retorna directamente el objeto JSON
    } catch (error) {
        console.error('Error al cargar el JSON:', error);
        throw error;  // Puedes elegir lanzar el error o manejarlo de alguna otra manera
    }
}
