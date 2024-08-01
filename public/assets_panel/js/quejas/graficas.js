var fecha = new Date();
var mesAnterior = fecha.getMonth();
var mesActual = fecha.getMonth() + 1;

$.ajax({
    url: '/panel/quejas/get_servicios_atendidos',
    dataType: 'JSON',
    type: 'POST',
    success: function (respuesta, text, xhr) {
        console.log(respuesta);

        respuesta.forEach(servicio => {
            if (servicio.tipo_servicio == "Queja" && servicio.mes == mesActual) {
                var totalServiciosDecimal = parseFloat(servicio.total_servicios);
                var porcentajeCrecimientoDecimal = parseFloat(servicio.porcentaje_crecimiento);
                $('.queja_atendido').text(totalServiciosDecimal);
                $('.queja_atendido_texto').html(`
                    <span class="text-success text-sm font-weight-bolder">${porcentajeCrecimientoDecimal.toFixed(2)}%</span> desde el mes pasado
                `);
            } else if (servicio.tipo_servicio == "Conciliación" && servicio.mes == mesActual) {
                var totalServiciosDecimal = parseFloat(servicio.total_servicios);
                var porcentajeCrecimientoDecimal = parseFloat(servicio.porcentaje_crecimiento);
                $('.conciliacion_atendido').text(totalServiciosDecimal);
                $('.conciliacion_atendido_texto').html(`
                    <span class="text-success text-sm font-weight-bolder">${porcentajeCrecimientoDecimal.toFixed(2)}%</span> desde el mes pasado
                `);
            }
        });
    }
}); // Fin ajax

$.ajax({
    url: '/panel/quejas/get_nuevas_personas',
    dataType: 'JSON',
    type: 'POST',
    success: function (respuesta, text, xhr) {
        console.log(respuesta);
        var mesActualDecimal = parseFloat(respuesta.mes_actual);
        var incrementoDecimal = parseFloat(respuesta.incremento);
        $('.personas_nuevas').text(mesActualDecimal);
        $('.personas_nuevas_texto').html(`
            <span class="text-success text-sm font-weight-bolder">${incrementoDecimal.toFixed(2)}%</span> desde el mes pasado
        `);
    }
}); // Fin ajax

$.ajax({
    url: '/panel/quejas/get_nuevas_quejas',
    dataType: 'JSON',
    type: 'POST',
    success: function (respuesta, text, xhr) {
        console.log(respuesta);
        var mesActualDecimal = parseFloat(respuesta.mes_actual);
        var incrementoDecimal = parseFloat(respuesta.incremento);
        $('.quejas_nuevas').text(mesActualDecimal);
        $('.quejas_nuevas_texto').html(`
            <span class="text-success text-sm font-weight-bolder">${incrementoDecimal.toFixed(2)}%</span> desde el mes pasado
        `);
    }
}); // Fin ajax

$.ajax({
    url: '/panel/quejas/get_ratificadas_hoy',
    dataType: 'JSON',
    type: 'POST',
    success: function (respuesta, text, xhr) {
        console.log(respuesta);
    }
}); // Fin ajax
