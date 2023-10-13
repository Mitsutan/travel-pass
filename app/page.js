'use client'

import dynamic from "next/dynamic";
import React, { use, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "@/components/header";
import Footer from "@/components/footer";
import AuthGuard from "@/components/auth-guard";
import Loading from "@/components/loading";


function MapPage() {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("../components/map"), {
        loading: () => <Loading />,
        ssr: false,
      }),
    []
  );
  return (
    <main>
      <Header />
      <AuthGuard>
        <Map />
        <Footer />
      </AuthGuard>
    </main>
  );
}

export default MapPage;
