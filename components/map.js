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
        const [userPos, setUserPos] = useState([]);

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
                .then((data) => setUserPos(data));

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

        return position === null || userPos.address === undefined ? null : (
            <Marker position={position} pos={userPos}>
                <Popup>
                    <h1>現在地</h1>
                    <span>{
                        (userPos.address.province != undefined ? userPos.address.province : "") +
                        (userPos.address.city != undefined ? userPos.address.city : "") +
                        (userPos.address.suburb != undefined ? userPos.address.suburb : "") +
                        (userPos.address.neighbourhood != undefined ? userPos.address.neighbourhood : "") +
                        (userPos.address.road != undefined ? userPos.address.road : "") +
                        (userPos.address.amenity != undefined ? userPos.address.amenity : "")
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
