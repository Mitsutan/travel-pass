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
            map.locate({ watch: true }).on("locationfound", function (e) {
                setPosition(e.latlng);
                map.flyTo(e.latlng, map.getZoom());
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
                    You are here. <br />
                    Map bbox: <br />
                    <b>Southwest lng</b>: {bbox[0]} <br />
                    <b>Southwest lat</b>: {bbox[1]} <br />
                    <b>Northeast lng</b>: {bbox[2]} <br />
                    <b>Northeast lat</b>: {bbox[3]}
                </Popup>
            </Marker>
        );
    }

    return (
        <MapContainer
            center={[35.689487, 139.691706]}
            zoom={13}
            scrollWheelZoom
            style={{ height: "100vh" }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
        </MapContainer>
    );
}
