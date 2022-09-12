import React, { useEffect } from "react";
import Banner from "./HomeComp/Banner";
import Plan from "./HomeComp/Plan";
import MarketTrend from "./HomeComp/MarketTrend";
import TradeAnyWhere from "./HomeComp/TradeAnyWhere";
import GetInTouch from "./HomeComp/GetInTouch";
import StartTrade from "./HomeComp/StartTrade";
import Footer from "./HomeComp/Footer";
import Newdes from "./HomeComp/Newdes";
import BannerNew from "./NewComponents/BannerNew";
import "./newmain.css";
import Header from "./ftx_design/Header";
import Slider from "./ftx_design/Slider";
import FeatureCards from "./ftx_design/FeatureCards";
import Trade from "./ftx_design/Trade";
import Roadmap from "./ftx_design/Roadmap";
export default function Index(props) {
  console.log(props);
  useEffect(() => {
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/61826b076bb0760a4940ed61/1fjin45kt";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  return (
    <>
      {/* newDesign */}
      <Header {...props} />
      <Slider />
      <FeatureCards />
      <Roadmap />
      <Trade />
      <Footer />
      {/* oldDesign */}
      {/* <div>
      <Header />
      <Banner />
      <Plan />
     
      <TradeAnyWhere />
      <GetInTouch />
      <StartTrade />
      <Newdes />
      <Footer />
    </div> */}

      {/* <MarketTrend /> */}

      {/* wallet app section */}
      {/* <div className="container-fluid">
        <div className="container py-5">
          <div className="d-flex justify-content-between py-5">
            <div>
              <h1 className="fw-bold text-dark">Build your crypto portfolio</h1>
              <p>Start your first trade with these easy steps.</p>
            </div>
          </div>

          <div className="row row-cols-lg-2 text-dark align-items-center">
            <div className="col">
              <div className="mb-5">
                <h4>Fund your account</h4>
                <p>
                  Add funds to your crypto account to start trading crypto. You
                  can add funds with a variety of payment methods.
                </p>
              </div>

              <div className="mb-5">
                <h4>Verify your identity</h4>
                <p>
                  Complete the identity verification process to secure your
                  account and transactions.
                </p>
              </div>

              <div className="mb-5">
                <h4>Start trading</h4>
                <p>
                  You're good to go! Buy/sell crypto, set up recurring buys for
                  your investments, and discover what Binance has to offer.
                </p>
              </div>

              <div>
                <a href="/register" className="btn btn-warning btn-lg px-5">
                  Get Started
                </a>
              </div>
            </div>
            <div className="col text-center">
              <img
                src="/newimages/portfolio-section.png"
                style={{ maxHeight: "400px" }}
              />
            </div>
          </div>
        </div>
      </div> */}

      {/* possibilities section */}
      {/* <div className="container-fluid">
        <div className="container py-5">
          <div className="row row-cols-lg-2 text-dark align-items-center">
            <div className="col">
              <div className="card h-100">
                <img
                  src="/newimages/blockchain_explorer.png"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h3>Dive into the world of NFTs</h3>
                  <p>
                    Open rare Mystery Boxes, explore IGOs, Fan Tokens, and more
                    with Binance NFT.
                  </p>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h3>Dive into the world of NFTs</h3>
                  <p>
                    Open rare Mystery Boxes, explore IGOs, Fan Tokens, and more
                    with Binance NFT.
                  </p>
                </div>
                <img
                  src="/newimages/blockchain_explorer.png"
                  className="card-img-bottom"
                />
              </div>
            </div>

            <div className="col">
              <div className="card h-100">
                <img
                  src="/newimages/blockchain_explorer.png"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h3>Dive into the world of NFTs</h3>
                  <p>
                    Open rare Mystery Boxes, explore IGOs, Fan Tokens, and more
                    with Binance NFT.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* security section */}
      {/* <div className="container-fluid">
        <div className="container py-5">
          <div className="d-flex justify-content-between py-5">
            <div>
              <h1 className="fw-bold text-dark">
                Your trusted crypto exchange
              </h1>
              <p>
                Here at Binance, we are committed to user protection with strict
                protocols and industry-leading technical measures.
              </p>
            </div>
            <div>
              <a href="">Learn more</a>
            </div>
          </div>

          <div className="row row-cols-lg-2 text-dark align-items-center">
            <div className="col">
              <div className="mb-5">
                <h4>Secure Asset Fund for Users (SAFU)</h4>
                <p>
                  Binance stores 10% of all trading fees in a secure asset fund
                  to protect a share of user funds.
                </p>
              </div>

              <div className="mb-5">
                <h4>Personalised Access Control</h4>
                <p>
                  Advanced access control allows you to restrict devices and
                  addresses that can access your account, for greater ease of
                  mind.
                </p>
              </div>

              <div>
                <h4>Advanced Data Encryption</h4>
                <p>
                  Your transaction data is secured via end-to-end encryption,
                  ensuring that only you have access to your personal
                  information.
                </p>
              </div>
            </div>
            <div className="col">
              <img src="/newimages/trusted-section.png" />
            </div>
          </div>
        </div>
      </div> */}

      {/* Need help section */}
      {/* <div className="container-fluid">
        <div className="container py-5">
          <h1 className="fw-bold text-dark py-4">Need help?</h1>
          <div className="row row-cols-3 text-dark">
            <div className="col">
              <h4>24/7 Chat Support</h4>
              <p>
                Get 24/7 chat support with our friendly customer service agents
                at your service.
              </p>
              <a href="">Chat now</a>
            </div>
            <div className="col">
              <h4>FAQs</h4>
              <p>View FAQs for detailed instructions on specific features.</p>
              <a href="">Learn more</a>
            </div>
            <div className="col">
              <h4>Blog</h4>
              <p>Stay up to date with the latest stories and commentary.</p>
              <a href="">Learn more</a>
            </div>
          </div>
        </div>
      </div> */}

      {/* Start Earning Section */}
      {/* <div className="container-fluid text-center py-5">
        <h1 className="text-center text-dark fw-bold py-3">
          Start earning today
        </h1>
        <div>
          <button className="btn btn-warning">Sign Up Now</button>
        </div>
      </div> */}
    </>
  );
}
