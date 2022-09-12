import React from "react";
import Header from "./Header";
import Footer from "../HomeComp/Footer";



export default function Refer() {

    return (
        <>
        <Header/>
            <div className="container-fluid  bg-success">
                <div className="row px-5 ">
                    <div className="col-sm " style={{ marginTop:"100px", marginLeft:"50px" }}  >
                     <div style={{fontSize:"62PX", fontWeight:"500" }}>  Refer Friends </div>
                     <div style={{fontSize:"55PX", fontWeight:"500" }}>  Earn Crypto Together</div>
                    <div className="text-dark w-75 h4 my-5">  Earn up to 40% commission on every trade across Bitflash Spot, Futures, and Pool.</div>
                     <div>
                    <a href="#"  ><span className="text-white h5"><u> View referral rules</u> </span></a>
                    </div>
                    </div>
                  
                    <div className="col-sm">
                       <img src="./image/reffer friends.png" className="h-100 pt-5" alt="" />
                    </div>
                  
                </div>
            </div>



<div className="container-fluid bg-white text-dark p-5">
            <div className="container my-5">
    <h1 className="my-5 py-5" >How Referral Works  </h1> 

  <div className="row">
    <div className="col-sm">
      <img src="./image/tutorial.png" alt="" />
      <div className="h3 fw-bold my-5">Share Commission</div>
      <div>Set how much referral commission you want to share with your friends.</div>
    </div>
    <div className="col-sm">
    <img src="./image/tutorial1.png" alt="" />
    <div className="h3 fw-bold my-5">Refer Friends</div>
      <div>Share your referral link or QR code with your friends and social media.</div>
    </div>
    <div className="col-sm  ">
    <img src="./image/tutoria3.png" alt="" />
    <div className="h3 fw-bold my-5">Earn Crypto!</div>
      <div>Earn up to 40% commission when your friends start trading.</div>
    </div>
  </div>
</div>
        <div className="container text-center">
            <h1>Start Earning Now</h1>
                <input type="button" className="btn btn-warning" style={{width:"100px"}} value=" Log In " />
        </div>

</div>

<Footer/>

        </>

    )
}