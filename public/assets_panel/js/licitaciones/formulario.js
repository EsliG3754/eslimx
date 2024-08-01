const guardar_formulario = () => {
  let validar; //Definir validar como global para su uso en el bucle de inputs
  let guardar = 1; //Flag de guardado, si es erronea la validación de algun campo se detiene el guardado
  let datos = new FormData(); // Inicializar form data
  let url;

  datos.append("nombre_campo_archivos", JSON.stringify(uploadedFiles));

  if (id_licitacion) {
    datos.append("id_licitacion", id_licitacion);
  }

  $(".input_licitacion").each(function () {
    try {
      $(this).attr("required", true);
      console.log(this);
      validar = $(this).parsley().validate();
      if (validar != true) {
        throw "Por favor llena el campo: " + $(this).siblings("label").text();
      } else {
        if (typeof $(this).attr("readonly") == "undefined") {
          if ($(this).attr("type") == "file") {
            datos.append(
              $(this).attr("name"),
              $(this).val() != null ? $(this)[0].files[0] : 0
            );
          } else {
            datos.append(
              $(this).attr("name"),
              $(this).val() != null ? $(this).val() : 0
            );
          }
        }
      }
    } catch (excepcion) {
      Swal.fire({
        title: "Error",
        html: excepcion,
        icon: "error",
        footer: `<center><i class="fas fa-info-circle" aria-hidden="true"></i>&nbsp;Si presentas algún iconveniente, no dudes en contactarnos: 33 3669 1101 ext. 171</center>`,
      });

      guardar = 0;
      return;
    }
  });

  if (guardar == 1) {
    Swal.fire({
      title: "¿Deseas guardar el formulario?",
      html: "",
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
      buttonsStyling: false,
      confirmButtonText: `Guardar <i class="fas fa-arrow-right ms-2"></i>`,
      cancelButtonText: "No, cancelar",
      customClass: {
        confirmButton: "btn bg-gradient-info btn-md mx-2 move-icon-left",
        cancelButton: "btn btn-gradient-danger btn-md mx-2 move-icon-left",
        loader: "custom-loader",
      },
    }).then(function (respuesta) {
      if (respuesta.value) {
        $.ajax({
          url: "/panel/licitaciones/post_licitacion",
          data: datos,
          cache: false,
          contentType: false,
          processData: false,
          type: "POST",
          success: function (respuesta) {
            if (respuesta) {
              Swal.fire({
                title: "Guardado con éxito",
                html: `Tu licitación se guardó con éxito`,
                footer: `
									<center><i class="fas fa-info-circle" aria-hidden="true"></i>&nbsp;Si presentas algún iconveniente, no dudes en contactarnos <br> 33 3669 1101 ext. 171</center>
									`,
                icon: "success",
                buttonsStyling: false,
                reverseButtons: true,
                confirmButtonText: `Ver licitaciones <i class="fas fa-arrow-right ms-2"></i>`,
                customClass: {
                  confirmButton:
                    "btn bg-gradient-info btn-md mx-2 move-icon-left",
                  cancelButton:
                    "btn btn-gradient-danger btn-md mx-2 move-icon-left",
                  loader: "custom-loader",
                },
              }).then(() => {
                window.location.href = "/panel/licitaciones/listado";
              });
            } else {
              error_ajax(respuesta);
            }
          },
          error: (err, texto) => {
            error_ajax(JSON.parse(err.responseText)["message"]);
          },
        });
      } // Fin if value
    }); // Fin Then SweetAlert
  }
};

$(document).ready(async () => {
  $(".crear_licitacion").click(() => {
    guardar_formulario();
  });
});
