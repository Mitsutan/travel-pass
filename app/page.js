'use client'

import dynamic from "next/dynamic";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";


function MapPage() {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("../components/map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <main>
      {/* <div className="container-fluid"> */}
        <header>
          <h1>Map</h1>
          <p>test</p>
        </header>
        <Map />
        <footer className="p-2">
          <ul id="footer-ul">
            <li><FontAwesomeIcon icon={faHouse} className="fs-1" /></li>
            <li>B</li>
            <li>C</li>
            <li>D</li>
          </ul>
        </footer>
      {/* </div> */}
    </main>
  );
}

export default MapPage;
