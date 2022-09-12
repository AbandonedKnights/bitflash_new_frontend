import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import TradeAnyWhere from "../HomeComp/TradeAnyWhere";
import { round } from "../redux/helpers/Math";
import GetInTouchNew from "./GetInTouchNew";
import MarketTrendNew from "./MarketTrendNew";
import TradeAnyWhereNew from "./TradeAnyWhereNew";
export default function BannerNew(props) {
  const { coins } = useSelector((state) => state.coinDBReducer);
  let coins1 = Object.values(coins);
  const cardImages = [
    "launchpad.png",
    "CRYPTOBANKING.png",
    "NFT_MARKETPLACE.png",
    "blockchain_explorer.png",
  ];

  const banner_child =
    coins1 &&
    coins1.map((item, index) => {
      let usdtprize = coins1 && coins1.find((item) => item.symbol == "USDT");
      return (
        <>
          {item.symbol == "BTC" ||
          item.symbol == "BNB" ||
          item.symbol == "ETH" ||
          item.symbol == "TRX" ||
          item.symbol == "BTEX" ? (
            <div className="col-lg-2 col-md-4 col-sm-12  " key={index}>
              <div className="card border-0   hoverCustom ">
                <div className="card-body ">
                  <p>
                    {item.symbol}/USDT&nbsp;&nbsp;
                    <span
                      className={
                        item.direction_inr == "up"
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {item.price_change_percentage_1h_inr}%
                    </span>
                  </p>
                  <h5>
                    $
                    {round(
                      item.raw_current_price_inr /
                        usdtprize.raw_current_price_inr
                    )}
                  </h5>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      );
    });
  return (
    <>
      <div
        className="container-fluid text-dark bg-transparent"
        style={{
          backgroundImage: "url(/newimages/9adcfaf.jpeg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          paddingTop: "120px",
          paddingBottom: "120px",
        }}
      >
        <div className="container">
          <div className="row banner-row">
            <div className="col-lg-6 col-md-12">
              <h1 className="main-title">Begin your crypto journey.</h1>
              <h1 className="main-title">Buy &amp; Sell Crypto</h1>
              <p className="main-para">
                Create your account and earn exciting welcome rewards
              </p>
              <div>
                <a className="btn btn-lg btn-warning ml-2" href="/login">
                  Register Now
                </a>
                <a
                  className="btn btn-lg btn-light ml-2"
                  href="/exchange/btc-inr"
                >
                  Exchange
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* <div
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
        </div> */}
      </div>
      <div
        className="container-fluid py-5"
        style={{
          /* backgroundColor: "lightgrey", */
          backgroundImage: "url(/newimages/f29c81a.webp)",
          backgroundPosition: "bottom",
          //backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="row">
            {cardImages.map((cardImg) => (
              <div className="col col-12 col-md-6 col-lg-3">
                <div className="card">
                  <img
                    src={`/newimages/${cardImg}`}
                    className="card-img-top card-img-bottom"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-lg-12 text-center">
              <p className="mb-1" style={{ fontWeight: "500" }}>
                BITFLASH initiate in market with exchange and its own token
                BTEX. Future planning of BITFLASH is gathering of trading
                community in BITFLASH Exchange
              </p>
              <p className="mb-1" style={{ fontWeight: "500" }}>
                BITFLASH preparing own blockchain explorer that will launch mid
                feb 2022, with testnet and crypto wallet.
              </p>
              <p className="mb-1" style={{ fontWeight: "500" }}>
                BTEX NFT Market Place for art tokenization will coming soon.
              </p>
            </div>
          </div>

          <MarketTrendNew />
          <TradeAnyWhereNew />
          <GetInTouchNew />

          <div className="container-fluid startj">
            <h1 className="text-center text-dark main-title mb-3">
              Begin your crypto journey
            </h1>
            <div className="text-center">
              <a href="" className="btn btn-primary btn-lg mr-2">
                Sing Up
              </a>
              <a href="" className="btn btn-outline-primary btn-lg">
                Log In
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="row-sm-12  py-5 " style={{ background: "white" }}>
        <div className="col-12 text-center">
          <img src="./img/bitflash-banner-animation.gif" className="gifimg" />
        </div>
      </div> */}

      {/* <div
        className="container-fluid text-dark"
        style={{ background: "white" }}
      >
        <div className="row py-5 text-center d-flex justify-content-center shadow  bg-light hoverCustom ">
          {banner_child}
        </div>
      </div> */}
    </>
  );
}
