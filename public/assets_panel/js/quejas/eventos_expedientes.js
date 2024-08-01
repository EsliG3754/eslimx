const evento_btn_subir_anexos = () => {
	$(".subir_anexos").off("click");
	$(".subir_anexos").click((e) => {
		Swal.fire({
			icon: "question",
			title: "Selecciona un archivo",
			showCancelButton: true,
			confirmButtonText: 'Siguiente <i class="fas fa-arrow-right ms-2"></i> ',
			cancelButtonText: "Cancelar",
			buttonsStyling: false,
			reverseButtons: true,
			customClass: {
				confirmButton: "btn bg-gradient-info ms-3",
				cancelButton: "btn bg-gradient-secondary",
			}, input: "file",
			inputValidator: value => {
				if (!value) {
					return 'El campo es obligatorio'
				}
			},
		}).then((result) => {
			if (result.isConfirmed) {
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
								var file = result.value;

								console.log($(e.currentTarget));

								formData.append("ruta_anexo", file);
								formData.append(
									"id_expediente",
									$(e.currentTarget).attr("id_expediente")
								);
								formData.append("nombre_anexo", result2.value);
								formData.append("observaciones", observaciones);

								return new Promise(function (resolve, reject) {
									$.ajax({
										method: "post",
										url: "/panel/quejas/subir_anexo",
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
											get_seguimiento();
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
			}
		})
	});
};

const evento_btn_subir_generales = () => {
	$(".subir_generales").off("click");
	$(".subir_generales").click((e) => {
		Swal.fire({
			title: "Selecciona un archivo",
			showCancelButton: true,
			confirmButtonText: '<i class="fas fa-file-upload me-2"></i> Subir generales',
			cancelButtonText: "Cancelar",
			input: "file",
			inputAttributes: {
				required: 'required'
			},
			buttonsStyling: false,
			reverseButtons: true,
			customClass: {
				confirmButton: "btn bg-gradient-info ms-3",
				cancelButton: "btn bg-gradient-secondary",
			},
			onBeforeOpen: () => {
				$(".swal2-file").change(function () {
					var reader = new FileReader();
					reader.readAsDataURL(this.files[0]);
				});
			},
		}).then((file) => {
			if (file.value) {
				var formData = new FormData();
				var file = $(".swal2-file")[0].files[0];
				formData.append("pdf", file);
				formData.append("id_queja", $(e.currentTarget).attr("id_queja"));
				formData.append("generales", 1);
				$.ajax({
					method: "post",
					url: "/panel/quejas/subir_pdf",
					data: formData,
					processData: false,
					contentType: false,
					success: function (resp) {
						Swal.fire(
							"PDF subido con éxito",
							"El documento se ha cargado en el sistema correctamente",
							"success"
						).then(() => {
							botonnn = e.currentTarget;
							$(e.currentTarget).hide(300).remove();
							$(`.contenedor_nombre_persona_${$(e.currentTarget).attr("id_persona")}`)
								.addClass("text-success")
								.children("i")
								.removeClass("fa-user")
								.addClass("fa-check");
						});
					},
					error: function () {
						Swal.fire({
							type: "error",
							title: "Oops...",
							text: "Algo ha salido mal!",
						});
					},
				});
			}
		});
	});
};

const evento_btn_subir_ratificacion = () => {
	$(".subir_ratificacion").off("click");
	$(".subir_ratificacion").click((e) => {
		let id_queja = $(e.currentTarget).attr("id_queja");

		Swal.fire({
			title: "Selecciona un archivo",
			showCancelButton: true,
			confirmButtonText: '<i class="fas fa-file-upload"></i> Subir',
			cancelButtonText: "Cancelar",
			input: "file",
			buttonsStyling: false,
			reverseButtons: true,
			customClass: {
				confirmButton: "btn bg-gradient-info ms-3",
				cancelButton: "btn bg-gradient-secondary",
			},
			onBeforeOpen: () => {
				$(".swal2-file").change(function () {
					var reader = new FileReader();
					reader.readAsDataURL(this.files[0]);
				});
			},
		}).then((file) => {
			if (file.value) {
				var formData = new FormData();
				var file = $(".swal2-file")[0].files[0];
				formData.append("pdf", file);
				formData.append("id_queja", id_queja);
				formData.append("id_persona", $(e.currentTarget).attr("id_persona"));
				formData.append("requerido", $(e.currentTarget).attr("requerido"));
				//formData.append("ratificacion", 1);
				$.ajax({
					method: "post",
					url: "/panel/quejas/update_ratificado",
					data: formData,
					processData: false,
					contentType: false,
					success: function (resp) {
						Swal.fire(
							"PDF subido con éxito",
							"El documento se ha cargado en el sistema correctamente",
							"success"
						).then(() => {
							botonnn = e.currentTarget;
							$(e.currentTarget).hide(300).remove();
							$(`.contenedor_nombre_persona_${$(e.currentTarget).attr("id_persona")}`)
								.addClass("text-success")
								.children("i")
								.removeClass("fa-user")
								.addClass("fa-check");
							card_queja(id_queja);
							get_seguimiento();
						});
					},
					error: function () {
						Swal.fire({
							type: "error",
							title: "Oops...",
							text: "Algo ha salido mal!",
						});
					},
				});
			}
		});
	});
};

const evento_btn_subir_queja = () => {
	$(".subir_queja_firmada").off("click");
	$(".subir_queja_firmada").click(async (e) => {
		const result = await Swal.fire({
			title: "Queja firmada",
			text: "Selecciona un archivo",
			footer: "El formato de la queja debe ser PDF *",
			confirmButtonText: '<i class="fas fa-file-upload me-2"></i> Subir',
			cancelButtonText: "Cancelar",
			showCancelButton: true,
			input: "file",
			customClass: {
				confirmButton: "btn btn-info btn-md mx-2 move-icon-left",
				cancelButton: "btn btn-md mx-2 move-icon-left",
				input: "form-control my-3 py-3 text-lg"
			},
			reverseButtons: true,
			buttonsStyling: false,
			inputValidator: (value) => {
				if (!value) {
					return 'El campo es obligatorio';
				}
			},
		});

		if (result.isConfirmed) {
			const file = result.value;
			if (file.type !== 'application/pdf') {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'El archivo debe ser un PDF',
				});
			} else {
				console.log(file);

				var formData = new FormData();
				formData.append("ruta_queja", file);
				formData.append("id_queja", $(e.currentTarget).attr("id_queja"));

				$.ajax({
					method: "post",
					url: "/panel/quejas/subir_queja",
					data: formData,
					processData: false,
					contentType: false,
					success: function (resp) {
						Swal.fire(
							"Queja subida con éxito",
							"El documento se ha cargado en el sistema correctamente",
							"success"
						).then(() => {
							location.reload();
						});
					},
					error: function () {
						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "Algo ha salido mal!",
						});
					},
				});

				get_seguimiento();
			}
		}
	});
};

// Función para el evento de calificar
const evento_btn_calificar = () => {
	$(".calificar").off("click");
	$(".calificar").click(async (e) => {
		let id_queja = $(e.currentTarget).attr("id_queja");
		let opciones_derechos = '';
		const respuesta = await new Promise((resolve, reject) => {
			$.ajax({
				url: '/panel/quejas/get_presuntos_derechos_agraviados',
				dataType: 'JSON',
				type: 'POST',
				success: function (data, xhr) {
					resolve({ data, xhr });
				},
				error: function (error) {
					reject(error);
				}
			});
		});

		if (respuesta.xhr == "success") {
			opciones_derechos = respuesta.data.map(opcion =>
				`<option value="${opcion.numero_derecho}">${opcion.numero_derecho} - ${opcion.descripcion}</option>`
			).join('');
			opciones_derechos = `<option value="">Selecciona una opción</option>` + opciones_derechos;
			console.log(opciones_derechos);
		}

		console.log(opciones_derechos);

		const formulario_calificar = `
            <div class="mb-3">
                <label for="derechos" class="form-label">Presuntos derechos agraviados</label>
                <select id="derechos" class="form-select" multiple required>
                    ${opciones_derechos}
                </select>
            </div>
            <div class="mb-3">
                <label for="observaciones" class="form-label">Observaciones</label>
                <textarea id="observaciones" class="form-control" placeholder="Escribe aquí las observaciones"></textarea>
            </div>
        `;

		Swal.fire({
			title: 'Calificar',
			html: formulario_calificar,
			focusConfirm: false,
			showCancelButton: true,
			showConfirmButton: true,
			confirmButtonText: 'Calificar <i class="fas fa-check ms-2"></i> ',
			cancelButtonText: "Cancelar",
			buttonsStyling: false,
			reverseButtons: true,
			customClass: {
				confirmButton: "btn bg-gradient-info ms-3",
				cancelButton: "btn bg-gradient-secondary",
			},
			didOpen: () => {
				$("#derechos").select2({
					width: "100%",
					placeholder: "Selecciona una opción",
					multiple: true,
				})

				$("#visitaduria").select2({
					width: "100%",
					placeholder: "Selecciona una opción",
				})
			},
			preConfirm: async () => {

				const datos_calificar = {
					derechos: Array.from(document.getElementById('derechos').selectedOptions).map(opcion => opcion.value),
					observaciones_calificacion: document.getElementById('observaciones').value,
					id_queja: $(e.currentTarget).attr("id_queja"),
					id_expediente: $(e.currentTarget).attr("id_expediente"),
					tipo_peticion: 'calificar'
				};

				try {
					await $.ajax({
						type: "POST",
						url: "/panel/quejas/update_calificado",
						data: datos_calificar
					});

					Swal.fire("Éxito", "La calificación se realizó correctamente.", "success").then(async () => {
						await card_queja(id_queja);
						validar_calificacion(id_queja);

					});


				} catch (error) {
					Swal.fire("Error", "No se pudo realizar la calificación.", "error");
				}
			}
		});
	});
};

// Función para el evento de calificar
const evento_btn_calificar_visitaduria = () => {
	$("body .calificar_visitador").off("click");
	$("body .calificar_visitador").click(async (e) => {
		let opciones_derechos = '';
		const respuesta = await new Promise((resolve, reject) => {
			$.ajax({
				url: '/panel/quejas/get_presuntos_derechos_agraviados',
				dataType: 'JSON',
				type: 'POST',
				success: function (data, xhr) {
					console.log('listo');
					resolve({ data, xhr });
				},
				error: function (error) {
					reject(error);
				}
			});
		});

		if (respuesta.xhr == "success") {
			opciones_derechos = respuesta.data.map(opcion =>
				`<option value="${opcion.numero_derecho}">${opcion.numero_derecho} - ${opcion.descripcion}</option>`
			).join('');
			opciones_derechos = `<option value="">Selecciona una opción</option>` + opciones_derechos;
			console.log(opciones_derechos);
		}

		console.log(opciones_derechos);

		const formulario_calificar = `
            <div class="mb-3">
                <label for="derechos" class="form-label">Presuntos derechos agraviados</label>
                <select id="derechos" class="form-select" multiple required>
                    ${opciones_derechos}
                </select>
            </div>
            <div class="mb-3">
                <label for="observaciones" class="form-label">Observaciones</label>
                <textarea id="observaciones" class="form-control" placeholder="Escribe aquí las observaciones"></textarea>
            </div>
        `;

		Swal.fire({
			title: 'Calificar',
			html: formulario_calificar,
			focusConfirm: false,
			showCancelButton: true,
			showConfirmButton: true,
			confirmButtonText: 'Calificar <i class="fas fa-check ms-2"></i> ',
			cancelButtonText: "Cancelar",
			buttonsStyling: false,
			reverseButtons: true,
			customClass: {
				confirmButton: "btn bg-gradient-info ms-3",
				cancelButton: "btn bg-gradient-secondary",
			},
			didOpen: () => {
				$("#derechos").select2({
					width: "100%",
					placeholder: "Selecciona una opción",
					multiple: true,
				})

				$("#visitaduria").select2({
					width: "100%",
					placeholder: "Selecciona una opción",
				})
			},
			preConfirm: async () => {
				const datos_calificar = {
					derechos: Array.from(document.getElementById('derechos').selectedOptions).map(opcion => opcion.value),
					observaciones_calificacion_visitaduria: document.getElementById('observaciones').value,
					id_queja: $(e.currentTarget).attr("id_queja"),
					id_expediente: $(e.currentTarget).attr("id_expediente"),
					tipo_peticion: 'calificar'
				};

				try {
					await $.ajax({
						type: "POST",
						url: "/panel/quejas/update_calificado",
						data: datos_calificar
					});

					Swal.fire("Éxito", "La calificación se realizó correctamente.", "success");
					setTimeout(() => {
						window.location.reload();
					}, 2000);

				} catch (error) {
					Swal.fire("Error", "No se pudo realizar la calificación.", "error");
				}
			}
		});
	});
};

// Función para el evento de turnar
const evento_btn_turnar = () => {
	$(".turnar").off("click");
	$(".turnar").click((e) => {
		let id_queja = $(e.currentTarget).attr("id_queja");

		const formulario_turnar = `
            <div class="mb-3">
                <label for="visitaduria" class="form-label">Visitaduría a la que se turna</label>
                <select id="visitaduria" class="form-select text-start" required>
                    <option value="1">Visitaduría I</option>
                    <option value="2">Visitaduría II</option>
                    <option value="3">Visitaduría III</option>
                    <option value="4">Visitaduría IV</option>
                    <option value="5">Visitaduría V</option>
                    <option value="6">Visitaduría VI</option>
                </select>
            </div>
        `;

		Swal.fire({
			title: 'Turnar',
			html: formulario_turnar,
			focusConfirm: false,
			showCancelButton: true,
			showConfirmButton: true,
			confirmButtonText: 'Turnar <i class="fas fa-directions ms-2"></i> ',
			cancelButtonText: "Cancelar",
			buttonsStyling: false,
			reverseButtons: true,
			customClass: {
				confirmButton: "btn bg-gradient-info ms-3",
				cancelButton: "btn bg-gradient-secondary",
			},
			didOpen: () => {
				$("#derechos").select2({
					width: "100%",
					placeholder: "Selecciona una opción",
					multiple: true,
				})

				$("#visitaduria").select2({
					width: "100%",
					placeholder: "Selecciona una opción",
				})
			},
			preConfirm: async () => {
				const visitaduria_seleccionada = document.getElementById('visitaduria');
				const texto_option = visitaduria_seleccionada.options[visitaduria_seleccionada.selectedIndex].text;

				const datos_turnar = {
					visitaduria: document.getElementById('visitaduria').value,
					id_queja: $(e.currentTarget).attr("id_queja"),
					id_expediente: $(e.currentTarget).attr("id_expediente"),
					observaciones_turnado: `Se turnó a la ${texto_option}`,
					tipo_peticion: `turnar`
				};

				try {
					await $.ajax({
						type: "POST",
						url: "/panel/quejas/update_calificado",
						data: datos_turnar
					});

					Swal.fire("Éxito", "El turno se realizó correctamente.", "success").then(async ()=>{
						await card_queja(id_queja);

						validar_calificacion(id_queja);
					});

				} catch (error) {
					Swal.fire("Error", "No se pudo realizar el turno.", "error");
				}
			}
		});
	});
};

const validar_calificacion = async (id_queja) => {
    let calificado = ($('.calificar').length == 0);
    let turnado = ($('.turnar').length == 0);

    if(calificado && turnado){
        const queja_ajax = await $.ajax({
            url: "/panel/quejas/get_by_ajax",
            data: { id_queja },
            dataType: "JSON",
            type: "POST"
        });

		const queja = queja_ajax[0];

        // Generar HTML para Calificación
        let derechos = JSON.parse(queja.derechos ?? '[]');
        let html_derechos = derechos.map(obj => 
            `<span class="badge bg-primary mb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="${obj.descripcion}">${obj.derecho}</span> `
        ).join('');

        // Generar HTML para Turnado
        let html_turnado = `Visitaduría ${queja.visitaduria}`;
        let observaciones_turnado = queja.observaciones_turnado;

		const template_resumen = `
			<div class="row my-4 gx-4 px-4">
				<!-- Calificación -->
				<div class="col-lg-6">
					<div class="card">
						<div class="card-body">
							<h5>Derechos de la Calificación</h5>
							<div>${html_derechos}</div>
							<h5>Observaciones de la calificación:</h5>
							<p>${queja.observaciones_calificacion == '' ? 'No ingresaste observaciones' : queja.observaciones_calificacion}</p>
						</div>
					</div>
				</div>

				<!-- Turnado -->
				<div class="col-lg-6">
					<div class="card">
						<div class="card-body">
							<h5>Turnado a:</h5>
							<p>${html_turnado}</p>
							<h5>Observaciones del turnado:</h5>
							<p>${observaciones_turnado}</p>
						</div>
					</div>
				</div>
			</div>
		`;

        Swal.fire({
			title: 'Resumen de la calificación',
			html: template_resumen,
			icon: 'info',
			showCancelButton: true,
			showConfirmButton: true,
			showDenyButton: true, // Agrega el tercer botón
			confirmButtonText: 'Calificar de nuevo<i class="fas fa-check ms-2"></i>',
			denyButtonText: 'Turnar de nuevo <i class="fas fa-directions ms-2"></i>', // Texto del tercer botón
			cancelButtonText: 'Salir  <i class="fas fa-times ms-2"></i>',
			buttonsStyling: false,
			reverseButtons: false,
			customClass: {
				confirmButton: "btn bg-gradient-info calificar",
				denyButton: "btn bg-gradient-warning turnar ms-3", // Estilos para el tercer botón
				cancelButton: "btn bg-gradient-secondary ms-3",
				popup: 'col-xxl-7 col-xl-8 col-lg-9'
			},
			didOpen: () => {
				evento_btn_calificar();
				evento_btn_turnar();
			}
		});
    } else if(!calificado){
        $('button.calificar').click();
    } else if(!turnado){
        $('button.turnar').click();
    }
};

// Función para el evento de turnar
const evento_btn_abogado = () => {
	$(".abogado").off("click");
	$(".abogado").click(async (e) => {
		let opciones_abogados = '';

		await $.ajax({
			url: '/panel/quejas/get_abogados',
			type: 'POST',
			dataType: 'json',
			success: function (respuesta) {
				if (respuesta.length > 0) {
					respuesta.forEach(function (abogado) {
						opciones_abogados += `<option value="${abogado.id_usuario}">${abogado.nombres} ${abogado.ape_paterno} ${abogado.ape_materno}</option>`;
					});
				} else {
					opciones_abogados += `<option value="" disabled>No se encontraron abogados</option>`;
				}
			}
		});

		const formulario_turnar = `
            <div class="mb-3">
                <label for="visitaduria" class="form-label">Visitador al que se turna</label>
                <select id="visitaduria" class="form-select text-start" required>
                    ${opciones_abogados}
                </select>
            </div> 
        `;

		Swal.fire({
			title: 'Turnar',
			html: formulario_turnar,
			focusConfirm: false,
			showCancelButton: true,
			showConfirmButton: true,
			confirmButtonText: 'Turnar <i class="fas fa-directions ms-2"></i> ',
			cancelButtonText: "Cancelar",
			buttonsStyling: false,
			reverseButtons: true,
			customClass: {
				confirmButton: "btn bg-gradient-info ms-3",
				cancelButton: "btn bg-gradient-secondary",
			},
			didOpen: () => {
				$("#derechos").select2({
					width: "100%",
					placeholder: "Selecciona una opción",
					multiple: true,
				})

				$("#visitaduria").select2({
					width: "100%",
					placeholder: "Selecciona una opción",
				})
			},
			preConfirm: async () => {
				const visitaduria_seleccionada = document.getElementById('visitaduria');
				const texto_option = visitaduria_seleccionada.options[visitaduria_seleccionada.selectedIndex].text;

				const datos_turnar = {
					id_visitador: document.getElementById('visitaduria').value,
					id_queja: $(e.currentTarget).attr("id_queja"),
					id_expediente: $(e.currentTarget).attr("id_expediente"),
					observaciones_turnado: `Se asignó a ${texto_option}`,
					tipo_peticion: `turnar`
				};

				try {
					await $.ajax({
						type: "POST",
						url: "/panel/quejas/update_abogado",
						data: datos_turnar
					});

					Swal.fire("Éxito", "El turno se realizó correctamente.", "success");
					setTimeout(() => {
						window.location.reload();
					}, 2000);

				} catch (error) {
					Swal.fire("Error", "No se pudo realizar el turno.", "error");
				}
			}
		});
	});
};

const evento_btn_retornar = () => {
	$(".retornar").off("click");
	$(".retornar").click((e) => {
		let form = `
			<div class="mb-3">
				<label for="fundamentacion" class="form-label">Fundamentación</label>
				<select id="fundamentacion" class="form-control" required>
					<option value="">Selecciona una opción</option>
					<option>Competencia</option>
					<option>Conflicto de Interés</option>
					<option>Solicitud de Parte</option>
				</select>
			</div>
			
            <div class="mb-3">
                <label for="motivo" class="form-label">Motivo</label>
                <textarea id="motivo" class="form-control" placeholder="Escribe el motivo aquí" required></textarea>
            </div>
        `;

		Swal.fire({
			title: 'Retornar a Dirección de Quejas',
			html: form,
			focusConfirm: false,
			showCancelButton: true,
			showConfirmButton: true,
			confirmButtonText: 'Retornar <i class="fas fa-check ms-2"></i>',
			cancelButtonText: "Cancelar",
			buttonsStyling: false,
			reverseButtons: true,
			customClass: {
				confirmButton: "btn bg-gradient-info ms-3",
				cancelButton: "btn bg-gradient-secondary",
			},
			preConfirm: () => {
				const id_expediente = $(e.currentTarget).attr("id_expediente");
				const fundamentacion = $("#fundamentacion").val();
				const motivo = $("#motivo").val();

				const datos = {
					id_expediente,
					fundamentacion_returno: fundamentacion,
					motivo_returno: motivo
				};

				$.ajax({
					type: "post",
					url: "/panel/quejas/retornar_queja",
					data: datos,
					success: (respuesta) => {
						Swal.fire(
							"¡Exitoso!",
							"La queja ha sido retornada correctamente",
							"success"
						).then(() => {
							window.location.reload();
						});
					},
					error: (error) => {
						Swal.fire(
							"En desarrollo!",
							"Estamos probando esta opción por el momento, intenta mas tarde",
							"info"
						);
					},
				});
			}
		});
	});
};

const evento_btn_palabras_clave = () => {
	$(".palabras_clave").off("click").on("click", async (e) => {
		try {
			let palabras_clave_guardadas;
			const id_queja = $(e.currentTarget).attr('id_queja');
			const id_expediente = $(e.currentTarget).attr('id_expediente');

			await $.ajax({
				url: '/panel/quejas/get_palabras_clave',
				type: 'POST',
				dataType: 'json',
				headers: { 'X-Requested-With': 'XMLHttpRequest' },
				data: {
					id_expediente: id_expediente
				}
			}).done(data => {
				palabras_clave_guardadas = data;
			}).fail((jqXHR, textStatus) => {
				console.error('Error en la petición: ', textStatus);
			});

			// Creamos las opciones para el select con las palabras clave obtenidas
			const opciones_palabras_clave = palabras_clave_guardadas.map(({ palabra_clave }) =>
				`<option value="${palabra_clave}">${palabra_clave}</option>`
			).join('');

			const form = `
                <div class="mb-3">
                    <label for="tags" class="form-label">Escribe las palabras clave:</label>
                    <select id="tags" class="form-select" multiple required>
                        ${opciones_palabras_clave}
                    </select>
                </div>
            `;

			// Abrimos la ventana modal de SweetAlert
			await Swal.fire({
				title: 'Palabras clave',
				html: form,
				focusConfirm: false,
				showCancelButton: true,
				showConfirmButton: true,
				confirmButtonText: 'Guardar <i class="fas fa-check ms-2"></i>',
				cancelButtonText: 'Cancelar',
				buttonsStyling: false,
				reverseButtons: true,
				customClass: {
					confirmButton: 'btn bg-gradient-info ms-3',
					cancelButton: 'btn bg-gradient-secondary',
				},
				didOpen: () => {
					$('#tags').select2({
						width: '100%',
						tags: true,
						tokenSeparators: [','],
						placeholder: 'Escribe aquí...',
						multiple: true
					}).val(null).trigger('change');
				},
				preConfirm: () => {
					const palabras_clave = $('#tags').val();
					const datos = { id_queja, id_expediente, palabras_clave };

					return $.ajax({
						type: 'POST',
						url: '/panel/quejas/update_palabras_clave',
						data: datos,
						success: (respuesta) => {
							Swal.fire(
								'¡Genial!',
								'Palabras clave anexadas correctamente',
								'success'
							).then(() => {
								window.location.reload();
							});
						},
						error: () => {
							Swal.fire(
								'¡Error!',
								'No se pudieron anexar las palabras clave',
								'error'
							);
						}
					});
				}
			});
		} catch (error) {
			// Manejo de errores con SweetAlert
			Swal.fire(
				'¡Error!',
				`No se pudieron obtener las palabras clave: ${error.message}`,
				'error'
			);
		}
	});
};

const get_oficinas = async () => {
	await $.ajax({
		url: '/panel/quejas/oficinas/get_regionales_by_ajax',
		type: 'POST',
		dataType: 'json',
		data: {
			id_oficina_regional
		},
		success: async (respuesta) => {
			$('.select_oficinas_regionales').empty();

			if (respuesta && respuesta.length > 1) {
				$('.select_oficinas_regionales').append(`<option value="">Selecciona una opción</option>`);
			}

			if (respuesta && respuesta.length > 0) {
				await respuesta.forEach(elemento => {
					$('.select_oficinas_regionales').append(`<option value="${elemento.id_oficina_regional}">${elemento.oficina_regional}</option>`);
				});
				$('.select_oficinas_regionales').trigger('change');

			} else {
				Swal.fire('Upps', 'No se encontraron oficinas', 'error');
			}
		},
		error: (err, texto) => {
			error_ajax(JSON.parse(err.respuestaText)['message']);
		}
	});
}

const get_regionales_municipios = async (id_oficina_regional) => {

	try {
		const respuesta = await new Promise((resolve, reject) => {
			$.ajax({
				url: '/panel/quejas/oficinas/get_regionales_municipios_by_ajax',
				dataType: 'JSON',
				type: 'POST',
				success: function (data, text, xhr) {
					resolve({
						data,
						xhr
					});
				},
				error: function (error) {
					reject(error);
				}
			});
		});

		console.log(respuesta);

		let opciones = '';
		let inputs = $('.select_oficinas_regionales_municipios');

		if (respuesta.xhr.status == 204) {
			$(inputs).parent().parent().hide(300);
			return false;
		} else if (respuesta.xhr.status == 200) {
			$(inputs).empty();
			$(inputs).append(`<option value="">Selecciona una opción</option>`);

			respuesta.data.forEach(opcion => {
				opciones += `<option value="${opcion.id_oficina_regional_municipio}">${opcion.municipio}</option>`;
			});

			$(inputs).append(opciones).parent().parent().show(300);
		}

	} catch (error) {
		console.error(error);
		// Trata el error según lo requieras
	}
}

const evento_btn_editar_persona = () => {
	$(".editar_persona").off("click");
	$(".editar_persona").click(async (e) => {
		console.log(e);

		let datos_persona;
		let id_persona = $(e.currentTarget).attr("id_persona");

		await $.ajax({
			url: "/panel/quejas/personas/get_by_ajax",
			data: {
				id_persona,
			},
			dataType: "JSON",
			type: "POST",
			success: function (respuesta, text, xhr) {
				datos_persona = respuesta[0];
			},
		}); // Fin ajax

		crear_persona("Editar persona", datos_persona);
	});

	$(".texto_seguimiento").keypress(function (e) {
		if (e.which == 13) {
			$(".enviar_seguimiento").click();
			return false; //<---- Add this line
		}
	});
};
//crear_persona();

$(".personas_list").click(async (e) => {
	if ($(e.target).find(".drop_zone_text").length > 0) {
		$(".personas").select2('open');
	}
});