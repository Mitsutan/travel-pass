'use client'

import dynamic from "next/dynamic";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "@/components/header";
import Footer from "@/components/footer";


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
        <Header />
        <Map />
        <Footer />
    </main>
  );
}

export default MapPage;
