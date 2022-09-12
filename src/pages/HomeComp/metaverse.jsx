import React from "react";
import Header from "./Header";
import Footer from "../HomeComp/Footer";

export default function Metaverse() {
    return (
        <>
            <Header/>



            <div className="Container-fluid">
                <img src="./image/Vr banner.png" alt="" />
                <main className="text-dark text-center h1" >
                   <b> Metaverse </b>
                </main>
            </div>
            
            
            <Footer />
        </>



    )
}