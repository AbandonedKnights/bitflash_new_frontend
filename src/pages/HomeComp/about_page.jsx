import React from "react";
import Header from "./Header";
import Footer from "../HomeComp/Footer";
import "../../css/ecosystem.scss";


export default function About_page(){

    return(
        <>
        <Header/>
        <div className=" container-fluid p-0 text-dark ">
            <div className="bg-success  text-center" style={{ backgroundImage:"url(./image/bg-bub.png)" ,backgroundRepeat:"no-repeat",backgroundPosition:"center" }}>
                <div className="text-white" style={{fontSize:"90px", fontFamily:"Arial", fontWeight:"600", paddingTop:"270px" }}>About</div>
            </div>
        </div>

  
        </>
    )
}