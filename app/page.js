'use client'

import dynamic from "next/dynamic";
import React, { use, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "@/components/header";
import Footer from "@/components/footer";
import AuthGuard from "@/components/auth-guard";


function MapPage() {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("../components/map"), {
        loading: () => <>
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </>,
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
