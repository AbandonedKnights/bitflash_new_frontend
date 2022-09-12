import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import NotificationBanner from "../components/BannerData";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import { round } from "../redux/helpers/Math";


export default function Header(props) {
  const { webData } = useSelector((state) => state.websiteDBReducer);
  const { coins } = useSelector((state) => state.coinDBReducer);
  let coins1 = Object.values(coins);

  const banner_child = coins1 && coins1.map((item, index)=>{
    let usdtprize = coins1 && coins1.find((item)=> item.symbol == 'USDT');
    return (
      <>
      {item.symbol == 'BTC' || item.symbol == 'BNB' || item.symbol == 'ETH' || item.symbol == 'TRX' || item.symbol == 'BTEX'?

      <div className="px-5  mx-2  d-flex no-wrap"><b> {item.symbol}/USD </b>:${round(item.raw_current_price_inr/usdtprize.raw_current_price_inr)}<b className={item.direction_inr === 'up'?'text-success':'text-danger'}> {item.direction_inr === 'up'?'+':'-'}{item.price_change_percentage_1h_inr}% </b> </div>
          :''}
    </>
    )
  })
  return (
    <>
      <div className="container-fluid text-dark bg-white " style={{ overflow: "hidden", fontSize: "15px", }}>
        <div className="motion d-flex no-wrap" style={{ width: "500vw", overflow: "hidden" }} >
          {banner_child}
        </div>


      </div>
      <NotificationBanner />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bolder" to="/">
            {webData.website_short_name}
          </Link>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <GiHamburgerMenu />
            {/* <span className="navbar-toggler-icon"></span> */}
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 me-auto">
              <li className="nav-item">
                <Link className="nav-link text-secondary" to="/nftmarketplace">
                  NFT Marketplace
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-secondary" to="/btextlaunched">
                  BTEX Launchpad
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-secondary" to="/btextcryptobank">
                  BTEX Crypto Banking
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-secondary" to="/btextexplorer">
                  BTEX Explorer
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-secondary" to="/btexstaking">
                  BTEX Staking
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
