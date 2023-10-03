import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});


export default function map() {
    function LocationMarker() {
        const [position, setPosition] = useState(null);
        const [bbox, setBbox] = useState([]);

        const map = useMap();
        let circle = null;

        useEffect(() => {
            map.locate({ watch: true }).on("locationfound", async function (e) {
                setPosition(e.latlng);
                map.flyTo(e.latlng, map.getZoom());

                localStorage.setItem("userPosLat", e.latlng.lat);
                localStorage.setItem("userPosLng", e.latlng.lng);

                await fetch("https://nominatim.openstreetmap.org/reverse?format=json&lat=" + e.latlng.lat + "&lon=" + e.latlng.lng + "&zoom=18&addressdetails=1&accept-language=ja")
                .then((res) => res.json())
                .then((data) => {
                    localStorage.setItem("userPosName", data.display_name)
                    localStorage.setItem("userPosCountry", data.address.country)
                    localStorage.setItem("userPosProvince", data.address.province)
                    localStorage.setItem("userPosCity", data.address.city)
                    localStorage.setItem("userPosSuburb", data.address.suburb)
                    localStorage.setItem("userPosNeighbourhood", data.address.neighbourhood)
                    localStorage.setItem("userPosRoad", data.address.road)
                    localStorage.setItem("userPosAmenity", data.address.amenity)
                });

                const radius = e.accuracy;
                if (circle === null) {
                    circle = L.circle(e.latlng, radius);
                    circle.addTo(map);
                } else {
                    circle.setLatLng(e.latlng);
                    circle.setRadius(radius);
                    circle.addTo(map);
                }
                setBbox(e.bounds.toBBoxString().split(","));

                console.log("位置情報更新");
            }).on("locationerror", function (e) {
                // console.log(e);
                alert(e.message);
                console.log("位置情報取得失敗");
            });
        }, [map]);

        return position === null ? null : (
            <Marker position={position}>
                <Popup>
                    {/* You are here. <br />
                    Map bbox: <br />
                    <b>Southwest lng</b>: {bbox[0]} <br />
                    <b>Southwest lat</b>: {bbox[1]} <br />
                    <b>Northeast lng</b>: {bbox[2]} <br />
                    <b>Northeast lat</b>: {bbox[3]} */}
                    <h1>現在地</h1>
                    <span>{
                        (localStorage.getItem("userPosProvince") != "undefined" ? localStorage.getItem("userPosProvince") : "") +
                        (localStorage.getItem("userPosCity") != "undefined" ? localStorage.getItem("userPosCity") : "") +
                        (localStorage.getItem("userPosSuburb") != "undefined" ? localStorage.getItem("userPosSuburb") : "") +
                        (localStorage.getItem("userPosNeighbourhood") != "undefined" ? localStorage.getItem("userPosNeighbourhood") : "") +
                        (localStorage.getItem("userPosRoad") != "undefined" ? localStorage.getItem("userPosRoad") : "") +
                        (localStorage.getItem("userPosAmenity") != "undefined" ? localStorage.getItem("userPosAmenity") : "")
                        }</span>
                </Popup>
            </Marker>
        );
    }

    return (
        <MapContainer
            center={localStorage.getItem("userPosLat") ? [localStorage.getItem("userPosLat"), localStorage.getItem("userPosLng")] : [35.681236, 139.767125]}
            zoom={13}
            scrollWheelZoom
            style={{ minHeight: "80vh" }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                // subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                // attribution="Google Maps"
                // url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            />
            <LocationMarker />
        </MapContainer>
    );
}
