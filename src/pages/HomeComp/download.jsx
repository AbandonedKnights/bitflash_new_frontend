import React from "react";
import Header from "./Header";
import Footer from "../HomeComp/Footer";


export default function Download() {

    return (
        <>
            <Header/>
            <div className="container-fluid text-dark bg-white " style={{ paddingBlock: "100px", fontFamily: " times", fontWeight: "600" }}>
                <div className="container">
                    <div className="row ">
                        <div className="col-sm-6">
                            <h1 className="h1 py-3">Trade Anywhere</h1>
                            <span className="h4">All the power of Bitflash's cryptocurrency exchange, in the palm of your hand. Download the Bitflash mobile crypto trading app today.</span>
                            <div className="">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <a href=""> <div className="my-2 px-5   py-3 text-white  bg-dark" >  Download From Appstore</div></a>
                                        <a href="https://play.google.com/store/apps/details?id=com.bitflash.exchange"><div className="my-2 p-3  text-white  bg-dark"> <b className="ml-5 text-white"> Download for Android </b></div></a>
                                       
                                        <a href=" https://play.google.com/store/apps/details?id=com.bitflash.exchange">  <div className="my-2 px-5     py-3 text-white  bg-dark"> Download From Googleplay</div></a>
                                    </div>
                                    <div className="col-sm-6">
                                        <img src="./img/bitt.png" className="h-75" alt="" srcset="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <img src="./image/download-img-1-1.png" alt="" />
                        </div>
                    </div>
                </div>


                <div className="container">
                    <div className="row ">
                        <div className="col-sm-6  px-5    ">
                            <img src="./image/download-img-2.png" className="" alt="" />
                        </div>
                        <div className="col-sm-6 px-5">
                            <h1 className="h1 py-3">Desktop</h1>
                            <span className="h4" >Powerful crypto trading platform for those who mean business. The Bitflash crypto trading experience, tailor-made for your Windows or MacOS device.</span>
                            <div className="">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <a href="">    <div className="my-2 p-3  text-white  bg-dark">Download For Mac</div></a>
                                        <a href="">  <div className="my-2 p-3  text-white  bg-dark"> Download for Windows</div></a>
                                        <a href="">   <div className="my-2 p-3  text-white  bg-dark"> Download for Linux</div></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container my-5 py-5">
                    <div className="row ">

                        <div className="col-sm-6 px-5">
                            <h1 className="h1 py-3">Integration with ease</h1>
                            <span className="h4">The Bitflash API is designed to provide an easy and efficient way to integrate your trading application into our platform.</span>
                            <div>
                                <a href=""> Official Bitflash API Documentation</a>
                            </div>

                        </div>
                        <div className="col-sm-6  px-5 ">
                            <img src="./image/download-img-2.png" className="" alt="" />
                        </div>
                    </div>
                </div>


                <div className="container">
                    <div className="row ">
                        <div className="col-sm-6  px-5    ">
                            <img src="./image/mob-2.png" className="" alt="" />
                        </div>
                        <div className="col-sm-6  px-5">
                            <img src="./image/auth.png" alt="" /> <h1 className="h1 pb-3">Bitflash Authenticator</h1>
                            <span className="h4">Bitflash authenticator generates 2-Step verification codes. Increase your account safety by downloading the Bitflash authenticator for a second step of verification.</span>
                            <div className="">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <a href=""><div className="my-2 p-3  text-white  bg-dark">Download For Iphone</div></a>
                                        <a href="https://play.google.com/store/apps/details?id=com.bitflash.exchange"><div className="my-2 p-3  text-white  bg-dark"> Download for Android</div></a>

                                    </div>
                                    <div className="col-sm-6">
                                        <img src="./image/qr.png" className="h-75" alt="" srcset="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}