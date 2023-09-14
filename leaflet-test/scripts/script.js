var map = L.map('map').fitWorld();

map.locate({ setView: true, maxZoom: 16 });

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// function onLocationFound(e) {
//     var radius = e.accuracy;

//     L.marker(e.latlng).addTo(map)
//         .bindPopup("You are within " + radius + " meters from this point").openPopup();

//     L.circle(e.latlng, radius).addTo(map);
// }

// map.on('locationfound', onLocationFound);

let userLocationPin = {
    Marker: null,
    Circle: null
};

const userLocation = navigator.geolocation.watchPosition(
    s => {
        const latlng = [s.coords.latitude, s.coords.longitude];
        const accuracy = s.coords.accuracy;

        console.log(latlng);

        if (userLocationPin.Marker !== null) {
            userLocationPin.Marker.setLatLng(latlng);
            userLocationPin.Marker.bindPopup("You are within " + accuracy + " meters from this point").openPopup();

            userLocationPin.Circle.setLatLng(latlng);
            userLocationPin.Circle.setRadius(accuracy);
        } else {
            userLocationPin.Marker = L.marker(latlng).addTo(map).bindPopup("You are within " + accuracy + " meters from this point").openPopup();
            userLocationPin.Circle = L.circle(latlng, accuracy).addTo(map);
        }

    },
    e => {
        console.log(e);
    },
    {

    }
);
