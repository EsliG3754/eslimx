let map;

class Map {

    //Inicializa el mapa 
    init(lat, lng, animation = false, zoom = 11) {
        map = L.map('map', {
            zoomControl: false
        }).setView([lat, lng], zoom);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 22,
            tileSize: 512,
            zoomOffset: -1,
            id: 'mapbox/streets-v11',
        }).addTo(map);

        if (animation) {
            setTimeout(() => {
                map.flyTo([lat, lng], 14, {
                    animate: true,
                    duration: 3
                });

                console.log('hola');

            }, 2000);
        }


    }

    /**
     * 
     * Agrega los marcadores en el mapa
     */

    marker({
        lat,
        lng,
        icon
    }) {

        L.marker([lat, lng], {
            icon: this.icon(icon)
        }).addTo(map);
    }

    /**
     * 
     * Agrega los marcadores en el mapa con icono custom
     */

    marker_custom(
        lat,
        lng,
        icon
    ) {
        console.log(lat, lng);
        L.marker([lat, lng], {
            icon: icon
        }).addTo(map);
    }

    /**
     * 
     * Agrega los reportes en el mapa
     */

    reporte({
        lat,
        lng,
        icon,
        imagen,
        id_reporte,
        subcategoria,
        descripcion,
        ubicacion,
        estatus
    }) {

        let pop = `        
        <div class="pop">
            <div class="container__imagen"> 
                <img src="${imagen}" alt="">
            </div>                       
            <h6 class="font mt-3 mb-0">${id_reporte}</h6>
            <h6 class="font mt-0 f-11 text-black-50">${subcategoria}</h6>
            <small>📋 ${descripcion}</small> <br>
            <small>📍  ${ubicacion}</small> <br>
            <small>🔔 ${estatus}</small> <br><br>
            <small>👀 <a href="#!">Ver detalle</a> </small> <br>          
        </div>        
        `;

        L.marker([lat, lng], {
            icon: this.icon(icon)
        }).addTo(map).bindPopup(pop);
    }

    //Agrega poligonos en el mapa
    polygon(geojson) {

        var myStyle = {
            "color": "#ff696d",
            "weight": 3,
            "opacity": 0.65
        };

        L.geoJSON(geojson, {
            style: myStyle
        }).addTo(map);
    }


    /**
     * Iconos de marcadores
     */

    icon(icon) {
        return L.icon({
            iconUrl: icon,
            iconSize: [30, 30],
        });
    }
}

$(document).ready(() => {

    //Map
    const m = new Map(); //Instancia de la clase
    console.log('hola2');

    m.init(20.7279862, -103.3742081, true); //Inicializa el mapa

    setTimeout(() => {
        fetch("markers.json")
            .then(response => response.json())
            .then(json => {

                json.forEach(element => {
                    m.marker({
                        lat: element.lat,
                        lng: element.lng,
                        icon: `media/markers/${element.icon}`
                    })
                });

            });
    }, 2000);

    fetch(
            "secciones.geojson"
        )
        .then(response => response.json())
        .then(json => {
            m.polygon(json);
        });

})