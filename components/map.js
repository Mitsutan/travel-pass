import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
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

export const getAddressFromYahooAPI = async (lat, lng) => {

    return await fetch(`/api/proxy?lat=${lat}&lng=${lng}`)
        .then((res) => res.json());

};

export default function map() {
    function LocationMarker() {
        const [position, setPosition] = useState(null);
        const [radius, setRadius] = useState(null);
        // const [bbox, setBbox] = useState([]);
        const [userAddress, setUserAddress] = useState([]);
        const [userBuilding, setUserBuilding] = useState([]);

        const map = useMap();

        useEffect(() => {
            map.locate({ watch: true, maximumAge: 1000 }).on("locationfound", async function (e) {
                setPosition(e.latlng);
                map.flyTo(e.latlng, map.getZoom());

                localStorage.setItem("userPosLat", e.latlng.lat);
                localStorage.setItem("userPosLng", e.latlng.lng);

                // OpenStreetMap Nominatim APIから取得
                // await fetch("https://nominatim.openstreetmap.org/reverse?format=json&lat=" + e.latlng.lat + "&lon=" + e.latlng.lng + "&zoom=18&addressdetails=1&accept-language=ja")
                // .then((res) => res.json())
                // .then((data) => setUserAddress(data));
                // .then((res) => console.log(res));

                // Yahoo!逆ジオコーダAPIから取得
                await getAddressFromYahooAPI(e.latlng.lat, e.latlng.lng)
                    .then((data) => {
                        setUserAddress(data.Feature[0].Property)
                        
                        if (data.Feature[0].Property.Building !== undefined) {
                            setUserBuilding(data.Feature[0].Property.Building[0].Name);
                        } else {
                            setUserBuilding(undefined);
                        }
                    });
                // .then((data) => console.log(data.Feature[0].Property.AddressElement));

                setRadius(e.accuracy);
                // console.log(e.accuracy);
                // setBbox(e.bounds.toBBoxString().split(","));

                console.log("位置情報更新");
            }).on("locationerror", function (e) {
                // console.log(e);
                alert(e.message);
                console.log("位置情報取得失敗");
            });
        }, [map]);

        // 住所結合
        // const address = userAddress.reduce((acc, cur) => acc + cur.Name, "");

        return position === null || userAddress === undefined ? null : (
            <>
                <Marker position={position}>
                    <Popup>
                        <h1>現在地</h1>
                        <span>{
                            // OpenStreetMap Nominatim APIから取得
                            // (userAddress.address.province != undefined ? userAddress.address.province : "") +
                            // (userAddress.address.city != undefined ? userAddress.address.city : "") +
                            // (userAddress.address.suburb != undefined ? userAddress.address.suburb : "") +
                            // (userAddress.address.neighbourhood != undefined ? userAddress.address.neighbourhood : "") +
                            // (userAddress.address.road != undefined ? userAddress.address.road : "") +
                            // (userAddress.address.amenity != undefined ? userAddress.address.amenity : "")

                            // Yahoo!逆ジオコーダAPIから取得
                            userAddress.Address
                            
                        }</span><br />
                        <span>{
                            // Yahoo!逆ジオコーダAPIから取得
                            (userBuilding != undefined ? userBuilding : "")
                        }</span>
                    </Popup>
                    <Circle center={position} radius={radius} />
                </Marker>
            </>
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
