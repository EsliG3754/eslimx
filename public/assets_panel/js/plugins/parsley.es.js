// ParsleyConfig definition if not already set
// Validation errors messages for Parsley
// Load this after Parsley

Parsley.addMessages('es', {
    defaultMessage: "Este valor parece ser invÃ¡lido.",
    type: {
      email:        "Este valor debe ser un correo vÃ¡lido.",
      url:          "Este valor debe ser una URL vÃ¡lida.",
      number:       "Este valor debe ser un nÃºmero vÃ¡lido.",
      integer:      "Este valor debe ser un nÃºmero vÃ¡lido.",
      digits:       "Este valor debe ser un dÃ­gito vÃ¡lido.",
      alphanum:     "Este valor debe ser alfanumÃ©rico."
    },
    notblank:       "Este valor no debe estar en blanco.",
    required:       "Este valor es requerido.",
    pattern:        "Este valor es incorrecto.",
    min:            "Este valor no debe ser menor que %s.",
    max:            "Este valor no debe ser mayor que %s.",
    range:          "Este valor debe estar entre %s y %s.",
    minlength:      "Este valor es muy corto. La longitud mÃ­nima es de %s caracteres.",
    maxlength:      "Este valor es muy largo. La longitud mÃ¡xima es de %s caracteres.",
    length:         "La longitud de este valor debe estar entre %s y %s caracteres.",
    mincheck:       "Debe seleccionar al menos %s opciones.",
    maxcheck:       "Debe seleccionar %s opciones o menos.",
    check:          "Debe seleccionar entre %s y %s opciones.",
    equalto:        "Este valor debe ser idÃ©ntico."
  });
  
  Parsley.setLocale('es');