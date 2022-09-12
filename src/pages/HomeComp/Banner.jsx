import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { round } from "../redux/helpers/Math";
export default function Banner(props) {
  const { coins } = useSelector((state) => state.coinDBReducer);
  let coins1 = Object.values(coins);

  const banner_child = coins1 && coins1.map((item, index)=>{
    let usdtprize = coins1 && coins1.find((item)=> item.symbol == 'USDT');
    return (
      <>
      {item.symbol == 'BTC' || item.symbol == 'BNB' || item.symbol == 'ETH' || item.symbol == 'TRX' || item.symbol == 'BTEX'?
      <div className="col-lg-2 col-md-4 col-sm-12  " key={index}>
      <div className="card border-0   hoverCustom ">
        <div className="card-body ">
          <p >
          {item.symbol}/USDT&nbsp;&nbsp;
            <span className={item.direction_inr=='up'?"text-success":"text-danger"} >{item.price_change_percentage_1h_inr}%</span>
          </p>
          <h5>${round(item.raw_current_price_inr/usdtprize.raw_current_price_inr)}</h5>
        </div>
      </div>
    </div>
    :''}
    </>
    )
  })
  return (
    <>
      <div
        className="container-fluid text-dark"
        style={{ background: "#159e49" }}
      >
        <div
          className={`row py-3 ${
            props.image ? "mx-0" : "mx-5"
          } d-flex justify-content-between`}
        >
          {props.image ? (
            <img src={`./img/${props.image}`} className="img-fluid" />
          ) : (
            <>
              <div className="col-lg-6 col-sm-12 py-5">
                <div className="text-start">
                  <h2 className="py-0 bannertxt text-white"  style={{fontFamily:"arial"}}> <b> Buy  &amp;  sell Crypto </b></h2>
                  {/* <p className="fs-1 text"> Start Trading now </p> */}
                  <p class="h1"  style={{fontSize:"45px",fontFamily:"arial"}}> <b> Start Trading now </b> </p>
 
                  <p className="text-white"  style={{fontSize:"24px"}}>
                    The Highly Efficient exchange for stable and secure Trade.
                  </p>
                </div>
                <a
                  className="btn btn-warning mx-2  py-2 my-3"
                  style={{ padding: "0px 10px",}}
                  href="/login"
                >
                  Register Now
                </a>
                <a
                  className="btn btn-light px-3 py-2"
                  
                  href="/exchange/btc-inr"
                >
                  Exchange
                </a>
              </div>

              <div className="col-lg-6 col-sm-12 banner"></div>
            </>
          )}
        </div>
      </div>

      <div className="row-sm-12  py-5 " style={{ background: "white",  }}>
        <div className="col-12 text-center">
          <img src="./img/bitflash-banner-animation.gif" className="gifimg" />
        </div>
      </div>

      <div className="container-fluid text-dark" style={{ background: "white" }}>
        <div className="row py-5 text-center d-flex justify-content-center shadow  bg-light hoverCustom ">
          {banner_child}
        </div>
      </div>
    </>
  );
}
