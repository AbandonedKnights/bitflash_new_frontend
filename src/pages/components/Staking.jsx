import React, { useEffect } from "react";
import BtexStaking from "../BtexStaking";
import Header from "./Header";

export default function Staking(props) {
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // }, []);
  return (
    <>
      <Header {...props} />

      <div className="page content">
        <div className="staking-view background-mode">
          <div className="container">
            <div className="banner-stake">
              <div className="banner-stake--container">
                <div className="banner-stake__title">
                  <div className="bg-shadow">
                    <h3>BITFLASH Pools</h3>
                    <div className="banner-stake__desc">Stake to earn more</div>
                  </div>
                </div>
                <div className="banner-stake__right">
                  <div className="banner-stake__total-lock">
                    <div className="label">Total Value Locked</div>
                    <div className="value">
                      <span>$</span>
                    </div>
                  </div>
                  <div className="banner-stake__price-wana">
                    <div className="label">Price BTEX</div>
                    <div className="value">
                      <span>$ </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="list-staking">
              <div
                className="row ant-row-center"
                style={{
                  rowGap: "30px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <BtexStaking {...props} option="3" />
                <BtexStaking {...props} option="6" />
                <BtexStaking {...props} option="9" />
                <BtexStaking {...props} option="12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
