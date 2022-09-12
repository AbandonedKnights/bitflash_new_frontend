import React from "react";
import { AiFillApple } from "react-icons/ai";
import { IoLogoAndroid } from "react-icons/io";
import { FaGooglePlay, FaLinux } from "react-icons/fa";
import { BsCodeSquare, BsWindows } from "react-icons/bs";

export default function TradeAnyWhereNew() {
  return (
    <>
      <div className="container-fluid text-dark starts">
      <h2 className="">Trade. Anywhere.</h2>
        <div className="row justify-content-between">
          <div className="col-lg">
            <p>
              Compatible with multiple devices, start trading with safety and
              convenience.
            </p>
            <img src="./img/2.svg" className="img-fluid" />
          </div>
          <div className="col-lg">
            <div className="">
              <div className="row">
                <div className="col-4 text-center trade_icons">
                  <div>
                    <AiFillApple style={{ height: "25px", width: "25px" }} />
                  </div>
                  <div>app Store</div>
                </div>
                <div className="col-4 text-center trade_icons">
                  <div>
                    <IoLogoAndroid style={{ height: "25px", width: "25px" }} />
                  </div>
                  Android APK
                </div>
                <div className="col-4 text-center trade_icons  p-5">
                  <div>
                    <FaGooglePlay style={{ height: "25px", width: "25px" }} />
                  </div>
                  Google play
                </div>
                <div className="col-4 text-center trade_icons">
                  <div>
                    <BsCodeSquare style={{ height: "25px", width: "25px" }} />
                  </div>
                  API
                </div>
                <div className="col-4 text-center trade_icons">
                  <div>
                    <BsWindows style={{ height: "25px", width: "25px" }} />
                  </div>
                  Windows
                </div>
                <div className="col-4 trade_icons">
                  <div>
                    <FaLinux style={{ height: "25px", width: "25px" }} />
                  </div>
                  Linux
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
