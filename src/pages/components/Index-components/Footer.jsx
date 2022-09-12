import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Footer(props) {
  const { webData } = useSelector((state) => state.websiteDBReducer);
  return (
    <footer
      className="footer-area bg-img"
      style={{ backgroundImage: "url(img/core-img/pattern.png)" }}
    >
      <div
        className={`${webData.bg_color} footer-content-area `}
        style={{ backgroundColor: webData.bg_color_code }}
      >
        <div className="container">
          <div className="row ">
            <div className="text-center col-12 col-lg-4 col-md-6">
              <div className="footer-copywrite-info">
                {/* <!-- Copywrite --> */}
                <div className="copywrite_text fadeInUp text-center" data-wow-delay="0.2s">
                  <div className="footer-logo ">
                    <div>
                      <img
                        className="oppbacktheme logodesign text-center"
                        src={`${"/theme/img/" + webData.logo_img_name}`}
                        alt="logo"
                        style={{ width: "200px" }}
                      />
                    </div>
                  </div>
                </div>
                {/* <!-- Social Icon --> */}
                <div
                  className="footer-social-info text-center fadeInUp"
                  data-wow-delay="0.4s"
                >
                  <div className="mr-2">
                    <i className="fa fa-facebook ml-3" aria-hidden="true"></i>
                  </div>
                  <div className="mr-2">
                    <i className="fa fa-twitter ml-3" aria-hidden="true"></i>
                  </div>
                  <div className="mr-2">
                    <i
                      className="fa fa-google-plus ml-3"
                      aria-hidden="true"
                    ></i>
                  </div>
                  <div className="mr-2">
                    <i className="fa fa-instagram ml-3" aria-hidden="true"></i>
                  </div>
                  <div className="mr-2">
                    <i className="fa fa-linkedin ml-3" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-3 col-md-6">
              <div className="contact_info_area d-sm-flex justify-content-between">
                {/* <!-- Content Info --> */}
                <div
                  className="contact_info mt-x text-center fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <h5>ICO Checker</h5>

                  <a
                    href="https://forms.gle/T1wda46DDpMGQ2YZ8"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p className="text-center">ICO AIRDROP</p>
                  </a>
                  <p className="text-center">COIN CLARITY</p>
                  <p className="text-center">TOKEN MARKET</p>
                  <p className="text-center">ICO ALERT</p>
                  <p className="text-center">ICO WATCHLIST</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-2 col-md-6 ">
              {/* <!-- Content Info --> */}
              <div className="contact_info_area d-sm-flex justify-content-between">
                <div
                  className="contact_info mt-s text-center fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <h5 className="text-center">TOKEN Checker</h5>
                    <p className="text-center">Poocoin</p>
                    <p className="text-center">Pancake</p>
                    <p className="text-center">Binance Smart Chain</p>
                    <p className="text-center">{webData.website_title} EXCHANGE</p>
                    <p className="text-center">Connect</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-3 col-md-6 ">
              <div className="contact_info_area d-sm-flex justify-content-between">
                {/* <!-- Content Info --> */}
                <div
                  className="contact_info mt-s text-center fadeInUp"
                  data-wow-delay="0.4s"
                >
                  <h5 className="text-center">EXCHANGE </h5>
                  <p className="text-center">Buy BTF</p>
                  <p className="text-center">
                    <Link to="/exchange/btc-inr"> BUY BITCOIN (BTC) </Link>
                  </p >
                  <p className="text-center">
                    <Link to="/exchange/eth-inr"> BUY ETHEREUM (ETH) </Link>
                  </p>
                  <p className="text-center"> 
                    <a href="https://forms.gle/AmQNvPtK782WzqBPA">
                      LIST YOUR TOKEN
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
