import React, { useState, useEffect } from "react";
import Header from "./ftx_design/Header";
import "./staking.css";
import "./stak.css";
import "./index.css";
import NewsLater from "./components/NewsLater";
import { useSelector } from "react-redux";
import {div, round} from "./redux/helpers/Math"
import {
  N_getHarvest,
  N_getStake,
  N_setStake,
} from "./redux/helpers/api_functions_new";
import NotificationManager from "react-notifications/lib/NotificationManager";
export default function BtexStaking(props) {
  const [data, setData] = useState();
  const [oneusdtValue, setoneUsdtValue] = useState();
  const [onebtexValue, setoneBtexValue] = useState(0);
  const [secondusdtValue, setsecondUsdtValue] = useState();
  const [secondbtexValue, setsecondBtexValue] = useState(0);
  const [thirdusdtValue, setthirdUsdtValue] = useState();
  const [thirdbtexValue, setthirdBtexValue] = useState(0);
  const [fourthusdtValue, setfourthUsdtValue] = useState();
  const [fourthbtexValue, setfourthBtexValue] = useState(0);
  const [oneinrValue, setoneInrValue] = useState();
  const [fifthbtexValue, setfifthBtexValue] = useState(0);
  const [secondinrValue, setsecondInrValue] = useState();
  const [sixbtexValue, setsixBtexValue] = useState(0);
  const [thirdinrValue, setthirdInrValue] = useState();
  const [sevenbtexValue, setsevenBtexValue] = useState(0);
  const [fourthinrValue, setfourthInrValue] = useState();
  const [eightbtexValue, seteightBtexValue] = useState(0);
  const invest_type1 = 'USDT';
  const invest_type2 = 'INR'; 
  const { user, isLoggedIn } = useSelector((state) => state.AuthReducer);
  let { coins } = useSelector((state) => state.coinDBReducer);
  let { webData } = useSelector((state) => state.websiteDBReducer);
  let coins_data = Object.values(coins);
  const usdtprice =
    coins_data && coins_data.find((coin) => coin.symbol == "USDT");
  const usdtinrprice = round(
    usdtprice && usdtprice.raw_current_price_inr
      ? usdtprice.raw_current_price_inr
      : 0
  );
  const btexprice =
    coins_data && coins_data.find((coin) => coin.symbol == "BTEX");
  // const btexusdtprice = round(
  //   btexprice && btexprice.current_price_usdt
  //     ? btexprice.current_price_usdt
  //     : 0
  // );
  const btexinrprice = round(
    btexprice && btexprice.raw_current_price_inr
      ? btexprice.current_price_inr
      : 0
  );
  const btexusdtprice = div(btexinrprice,usdtinrprice);
  useEffect(() => {
    // function startStaking() {
    //     stak()
    // }

    if(user?.params ? user.params.user_id : user.user_id)
     startStaking();
  }, []);

  
  function startStaking() {
    // setTimeout(function () {
      N_getStake(user?.params ? user.params.user_id : user.user_id)
        .then((d) => {
          if (d.status === 200 || d.status === 300) {
            setData(d.result);
            // stak()
          }
        })
        .catch((e) => console.log(e));
    // }, 5000);
  }

  return (
    <>
      <Header {...props} />
      <NewsLater />

      <div className="page content">
        <div className="staking-view background-mode" >
          <div className="stak-container">
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
                      <span>{data?.total ? round(data.total) : 0}</span>
                    </div>
                  </div>
                  <div className="banner-stake__price-wana">
                    <div className="label">Price BTEX</div>
                    <div className="value">
                      <span>{round(btexusdtprice)} $</span>
                    </div>
                  </div>
                  <div className="banner-stake__price-wana">
                    <div className="label">Price BTEX</div>
                    <div className="value">
                      <span>{round(btexinrprice)} ₹</span>
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
                 <div className="col col-md-12 col-sm-12 banner-stake" style={
                   {    height: "100px",background: "#60a7ab"}}>
                  <div className="banner-stake--container">
                    <div className="">
                      <div className="bg-shadow">
                        <h3>USDT Pools Minimum Stake 100 $</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="item-staking">
                    <div className="header-item">
                      <div className="logo-token">
                        <img src="/theme/img/favicon.png" alt="logo-token" />
                      </div>
                      <div className="info-pool textmode">
                        <h2 className="textmode"> BITFLASH FARM</h2>(
                        {webData?.stake?webData.stake[0].days : 0} days locked
                        reward)
                      </div>
                    </div>
                    <div className="content-item">
                      <div className="show-apr textmode">
                        <div className="title-apr">Reward</div>
                        <div className="apr">
                          <span>
                            {webData?.stake?webData.stake[0].percent
                              : 0}
                            % of Stake Tokens
                          </span>
                        </div>
                      </div>
                      <div className="show-earn textmode">
                        <div className="title-earn">Earn: </div>
                        <div className="token-earn">
                          <h3 className="textmode">BTEX</h3>
                        </div>
                      </div>
                      <div className="wrap-amount-stake wrap-earn textmode">
                        <div className="title-amount-stake textmode">
                          BTEX
                          <span className="badge"> EARNED</span>
                        </div>
                        <div className="token-earn">
                          <h3 className="textmode">
                            {data?.one_daily_ry
                              ? round(data.one_daily_ry)
                              : 0}
                          </h3>
                        </div>
                      </div>
                      <div className="wrap-detail-and-harvest textmode">
                        <div className="btn-show-detail">Claim Reward</div>
                        {/* <div className="harvest">
                          <button
                            disabled={data?.one_daily_ry > 0 ? "" : "disabled"}
                            type="button"
                            className="ant-btn"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              e.preventDefault();
                              if (data.one_daily_ry > 0) {
                                N_getHarvest(
                                  user?.params
                                    ? user.params.user_id
                                    : user.user_id,
                                  webData.stake[0].days,
                                  round(data.one_daily_ry),
                                  invest_type1,
                                  1
                                ).then((d) => {
                                  if (d.status === 200) {
                                    N_getStake(
                                      user?.params
                                        ? user.params.user_id
                                        : user.user_id
                                    ).then((d) => {
                                      if (d.status === 200) {
                                        setData(d.result);
                                      }
                                    });
                                    NotificationManager.success(d.message);
                                  } else {
                                    NotificationManager.error(d.message);
                                  }
                                });
                              } else {
                                NotificationManager.info("You Have not Earn");
                              }
                            }}
                          >
                            <span>Harvest</span>
                          </button>
                        </div> */}
                      </div>
                      <div className="symbol-staked textmode">
                        {invest_type1}{" "}
                        <span className="blur-text textmode">
                          AVAILABLE - BTEX STAKED{" "}
                        </span>
                      </div>
                      <div class="wrap-amount-stake textmode">
                        <div class="input-stake-withdraw">
                          <div class="balance-lp-and-staked">
                            <div class="balance-lp">
                              <span class="blur-text textmode">
                                Available {invest_type1}:{" "}
                              </span>
                              <span
                                class="textmode balance-lp-amount"
                                style={{ cursor: "pointer" }}
                              >
                                {data?.balance ? round(data.balance) : 0}
                              </span>
                            </div>
                            <div class="staked-lp">
                              <span class="blur-text textmode">Staked: </span>
                              <span
                                class="textmode staked-lp-amount"
                                style={{ cursor: "pointer" }}
                              >
                                {data?.one_total_stak
                                  ? round(data.one_total_stak)
                                  : 0}
                              </span>
                            </div>
                          </div>
                          <div class="input-amount">
                            <div class="input-amount-stake">
                              <div class="ant-input-number ant-input-number-lg ant-input-number-borderless">
                                <div class="ant-input-number-input-wrap">
                                  <input
                                    autoComplete="off"
                                    role="spinbutton"
                                    ariaValuemin="0.0001"
                                    step="1"
                                    placeholder="Enter USD"
                                    value={oneusdtValue}
                                    class="ant-input-number-input"
                                    onChange={(e) => {
                                      setoneUsdtValue(
                                        e.target.value
                                          .replace(/[^0-9.]/g, "")
                                          .replace(/(\..*?)\..*/g, "$1")
                                      );
                                      setoneBtexValue(
                                        e.target.value
                                          .replace(/[^0-9.]/g, "")
                                          .replace(/(\..*?)\..*/g, "$1") /
                                          (btexusdtprice)
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                              <div class="btn-max">{invest_type1}</div>
                            </div>
                            <div class="input-amount-unstakek">
                              <div class="btn-max">
                                {round(onebtexValue)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {!isLoggedIn ? (
                        <button
                          type="button"
                          style={{ cursor: "pointer" }}
                          className="ant-btn ant-btn-primary ant-btn-lg btn-stake"
                          onClick={() => {
                            props.history.replace("/login");
                          }}
                        >
                          <span>Login</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          style={{ cursor: "pointer" }}
                          id="first_stake"
                          className="ant-btn ant-btn-primary ant-btn-lg btn-stake"
                          onClick={(e) => {
                            e.preventDefault();
                            if (data.balance >= oneusdtValue) {
                              N_setStake(
                                user?.params
                                  ? user.params.user_id
                                  : user.user_id,
                                round(oneusdtValue),
                                round(onebtexValue),
                                webData.stake[0].days,
                                webData.stake[0].percent,
                                usdtinrprice,
                                btexusdtprice,
                                invest_type1,
                                1
                              ).then((d) => {
                                if (d.status === 200) {
                                  N_getStake(
                                    user?.params
                                      ? user.params.user_id
                                      : user.user_id
                                  ).then((d) => {
                                    if (d.status === 200) {
                                      setData(d.result);
                                    }
                                  });
                                  NotificationManager.success(d.message);
                                } else {
                                  NotificationManager.error(d.message)
                                }
                              });
                            } else {
                              NotificationManager.info("Your Amount too Low");
                            }
                          }}
                        >
                          <span>Stake</span>
                        </button>
                      )
                      }
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="item-staking">
                    <div className="header-item">
                      <div className="logo-token">
                        <img src="/theme/img/favicon.png" alt="logo-token" />
                      </div>
                      <div className="info-pool textmode">
                        <h2 className="textmode"> BITFLASH FARM</h2>(
                        {webData?.stake?webData.stake[1].days : 0} days locked
                        reward)
                      </div>
                    </div>
                    <div className="content-item">
                      <div className="show-apr textmode">
                        <div className="title-apr">Reward</div>
                        <div className="apr">
                          <span>
                            {webData?.stake?webData.stake[1].percent
                              : 0}
                            % of Stake Tokens
                          </span>
                        </div>
                      </div>
                      <div className="show-earn textmode">
                        <div className="title-earn">Earn: </div>
                        <div className="token-earn">
                          <h3 className="textmode">BTEX</h3>
                        </div>
                      </div>
                      <div className="wrap-amount-stake wrap-earn textmode">
                        <div className="title-amount-stake textmode">
                          BTEX
                          <span className="badge"> EARNED</span>
                        </div>
                        <div className="token-earn">
                          <h3 className="textmode">
                            {data?.second_daily_ry
                              ? round(data?.second_daily_ry)
                              : 0}
                          </h3>
                        </div>
                      </div>
                      <div className="wrap-detail-and-harvest textmode">
                        <div className="btn-show-detail">Claim Reward</div>
                        {/* <div className="harvest">
                          <button
                            disabled={
                              data?.second_daily_ry > 0 ? "" : "disabled"
                            }
                            type="button"
                            className="ant-btn"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              e.preventDefault();
                              if (data.second_daily_ry > 0) {
                                N_getHarvest(
                                  user?.params
                                    ? user.params.user_id
                                    : user.user_id,
                                  webData.stake[1].days,
                                  round(data.second_daily_ry),
                                  invest_type1,
                                  2
                                ).then((d) => {
                                  if (d.status === 200) {
                                    N_getStake(
                                      user?.params
                                        ? user.params.user_id
                                        : user.user_id
                                    ).then((d) => {
                                      if (d.status === 200) {
                                        setData(d.result);
                                      }
                                    });
                                    NotificationManager.success(d.message);
                                  } else {
                                    NotificationManager.error(d.message);
                                  }
                                });
                              } else {
                                NotificationManager.info("You Have not Earn");
                              }
                            }}
                          >
                            <span>Harvest</span>
                          </button>
                        </div> */}
                      </div>
                      <div className="symbol-staked textmode">
                        USDT{" "}
                        <span className="blur-text textmode">
                          AVAILABLE - BTEX STAKED{" "}
                        </span>
                      </div>
                      <div class="wrap-amount-stake textmode">
                        <div class="input-stake-withdraw">
                          <div class="balance-lp-and-staked">
                            <div class="balance-lp">
                              <span class="blur-text textmode">
                                Available USDT:{" "}
                              </span>
                              <span
                                class="textmode balance-lp-amount"
                                style={{ cursor: "pointer" }}
                              >
                                {data?.balance ? round(data.balance) : 0}
                              </span>
                            </div>
                            <div class="staked-lp">
                              <span class="blur-text textmode">Staked: </span>
                              <span
                                class="textmode staked-lp-amount"
                                style={{ cursor: "pointer" }}
                              >
                                {data?.second_total_stak
                                  ? round(data.second_total_stak)
                                  : 0}
                              </span>
                            </div>
                          </div>
                          <div class="input-amount">
                            <div class="input-amount-stake">
                              <div class="ant-input-number ant-input-number-lg ant-input-number-borderless">
                                <div class="ant-input-number-input-wrap">
                                  <input
                                    autoComplete="off"
                                    role="spinbutton"
                                    ariaValuemin="0.0001"
                                    step="1"
                                    placeholder="Enter USD"
                                    value={secondusdtValue}
                                    class="ant-input-number-input"
                                    onChange={(e) => {
                                      setsecondUsdtValue(
                                        e.target.value
                                          .replace(/[^0-9.]/g, "")
                                          .replace(/(\..*?)\..*/g, "$1")
                                      );
                                      setsecondBtexValue(
                                        e.target.value
                                          .replace(/[^0-9.]/g, "")
                                          .replace(/(\..*?)\..*/g, "$1") /
                                          (btexusdtprice)
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                              <div class="btn-max">USDT</div>
                            </div>
                            <div class="input-amount-unstakek">
                              <div class="btn-max">
                                {round(secondbtexValue)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {!isLoggedIn ? (
                        <button
                          type="button"
                          style={{ cursor: "pointer" }}
                          className="ant-btn ant-btn-primary ant-btn-lg btn-stake"
                          onClick={() => {
                            props.history.replace("/login");
                          }}
                        >
                          <span>Login</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          id="second_stake"
                          style={{ cursor: "pointer" }}
                          className={`ant-btn ant-btn-primary ant-btn-lg btn-stake`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (data.balance >= secondusdtValue) {
                              N_setStake(
                                user?.params
                                  ? user.params.user_id
                                  : user.user_id,
                                round(secondusdtValue),
                                round(secondbtexValue),
                                webData.stake[1].days,
                                webData.stake[1].percent,
                                usdtinrprice,
                                btexusdtprice,
                                invest_type1,
                                2
                              ).then((d) => {
                                if (d.status === 200) {
                                  N_getStake(
                                    user?.params
                                      ? user.params.user_id
                                      : user.user_id
                                  ).then((d) => {
                                    if (d.status === 200) {
                                      setData(d.result);
                                    }
                                  });
                                  NotificationManager.success(d.message);
                                } else {
                                  NotificationManager.error(d.message)
                                }
                              });
                            } else {
                              NotificationManager.info("Your Amount too Low");
                            }
                          }}
                        >
                          <span>Stake</span>
                        </button>
                        )
                        }
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="item-staking">
                    <div className="header-item">
                      <div className="logo-token">
                        <img src="/theme/img/favicon.png" alt="logo-token" />
                      </div>
                      <div className="info-pool textmode">
                        <h2 className="textmode"> BITFLASH FARM</h2>(
                        {webData?.stake?webData.stake[2].days : 0} days locked
                        reward)
                      </div>
                    </div>
                    <div className="content-item">
                      <div className="show-apr textmode">
                        <div className="title-apr">Reward</div>
                        <div className="apr">
                          <span>
                            {webData?.stake?webData.stake[2].percent
                              : 0}
                            % of Stake Tokens
                          </span>
                        </div>
                      </div>
                      <div className="show-earn textmode">
                        <div className="title-earn">Earn: </div>
                        <div className="token-earn">
                          <h3 className="textmode">BTEX</h3>
                        </div>
                      </div>
                      <div className="wrap-amount-stake wrap-earn textmode">
                        <div className="title-amount-stake textmode">
                          BTEX
                          <span className="badge"> EARNED</span>
                        </div>
                        <div className="token-earn">
                          <h3 className="textmode">
                            {data?.third_daily_ry
                              ? round(data?.third_daily_ry)
                              : 0}
                          </h3>
                        </div>
                      </div>
                      <div className="wrap-detail-and-harvest textmode">
                        <div className="btn-show-detail">Claim Reward</div>
                        {/* <div className="harvest">
                          <button
                            disabled={
                              data?.third_daily_ry > 0 ? "" : "disabled"
                            }
                            type="button"
                            style={{ cursor: "pointer" }}
                            className="ant-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              if (data.third_daily_ry > 0) {
                                N_getHarvest(
                                  user?.params
                                    ? user.params.user_id
                                    : user.user_id,
                                  webData.stake[2].days,
                                  round(data.third_daily_ry),
                                  invest_type1,
                                  3
                                ).then((d) => {
                                  if (d.status === 200) {
                                    N_getStake(
                                      user?.params
                                        ? user.params.user_id
                                        : user.user_id
                                    ).then((d) => {
                                      if (d.status === 200) {
                                        setData(d.result);
                                      }
                                    });
                                    NotificationManager.success(d.message);
                                  } else {
                                    NotificationManager.error(d.message);
                                  }
                                });
                              } else {
                                NotificationManager.info("You Have not Earn");
                              }
                            }}
                          >
                            <span>Harvest</span>
                          </button>
                        </div> */}
                      </div>
                      <div className="symbol-staked textmode">
                        USDT{" "}
                        <span className="blur-text textmode">
                          AVAILABLE - BTEX STAKED{" "}
                        </span>
                      </div>
                      <div class="wrap-amount-stake textmode">
                        <div class="input-stake-withdraw">
                          <div class="balance-lp-and-staked">
                            <div class="balance-lp">
                              <span class="blur-text textmode">
                                Available USDT:{" "}
                              </span>
                              <span
                                class="textmode balance-lp-amount"
                                style={{ cursor: "pointer" }}
                              >
                                {data?.balance ? round(data.balance) : 0}
                              </span>
                            </div>
                            <div class="staked-lp">
                              <span class="blur-text textmode">Staked: </span>
                              <span
                                class="textmode staked-lp-amount"
                                style={{ cursor: "pointer" }}
                              >
                                {data?.third_total_stak
                                  ? round(data.third_total_stak)
                                  : 0}
                              </span>
                            </div>
                          </div>
                          <div class="input-amount">
                            <div class="input-amount-stake">
                              <div class="ant-input-number ant-input-number-lg ant-input-number-borderless">
                                <div class="ant-input-number-input-wrap">
                                  <input
                                    autoComplete="off"
                                    role="spinbutton"
                                    ariaValuemin="0.0001"
                                    step="1"
                                    placeholder="Enter USD"
                                    value={thirdusdtValue}
                                    class="ant-input-number-input"
                                    onChange={(e) => {
                                      setthirdUsdtValue(
                                        e.target.value
                                          .replace(/[^0-9.]/g, "")
                                          .replace(/(\..*?)\..*/g, "$1")
                                      );
                                      setthirdBtexValue(
                                        e.target.value
                                          .replace(/[^0-9.]/g, "")
                                          .replace(/(\..*?)\..*/g, "$1") /
                                          (btexusdtprice)
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                              <div class="btn-max">USDT</div>
                            </div>
                            <div class="input-amount-unstakek">
                              <div class="btn-max">
                                {round(thirdbtexValue)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {!isLoggedIn ? (
                        <button
                          type="button"
                          style={{ cursor: "pointer" }}
                          className="ant-btn ant-btn-primary ant-btn-lg btn-stake"
                          onClick={() => {
                            props.history.replace("/login");
                          }}
                        >
                          <span>Login</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          id="third_stake"
                          style={{ cursor: "pointer" }}
                          className="ant-btn ant-btn-primary ant-btn-lg btn-stake"
                          onClick={(e) => {
                            e.preventDefault();
                            if (data.balance >= thirdusdtValue) {
                              N_setStake(
                                user?.params
                                  ? user.params.user_id
                                  : user.user_id,
                                round(thirdusdtValue),
                                round(thirdbtexValue),
                                webData.stake[2].days,
                                webData.stake[2].percent,
                                usdtinrprice,
                                btexusdtprice,
                                invest_type1,
                                3
                              ).then((d) => {
                                if (d.status === 200) {
                                  N_getStake(
                                    user?.params
                                      ? user.params.user_id
                                      : user.user_id
                                  ).then((d) => {
                                    if (d.status === 200) {
                                      setData(d.result);
                                    }
                                  });
                                  NotificationManager.success(d.message);
                                } else {
                                  NotificationManager.error(d.message)
                                }
                              });
                            } else {
                              NotificationManager.info("Your Amount too Low");
                            }
                          }}
                        >
                          <span>Stake</span>
                        </button>
                      )
                      }
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="item-staking">
                    <div className="header-item">
                      <div className="logo-token">
                        <img src="/theme/img/favicon.png" alt="logo-token" />
                      </div>
                      <div className="info-pool textmode">
                        <h2 className="textmode"> BITFLASH FARM</h2>(
                        {webData?.stake?webData.stake[3].days : 0} days locked
                        reward)
                      </div>
                    </div>
                    <div className="content-item">
                      <div className="show-apr textmode">
                        <div className="title-apr">Reward</div>
                        <div className="apr">
                          <span>
                            {webData?.stake?webData.stake[3].percent
                              : 0}
                            % of Stake Tokens
                          </span>
                        </div>
                      </div>
                      <div className="show-earn textmode">
                        <div className="title-earn">Earn: </div>
                        <div className="token-earn">
                          <h3 className="textmode">BTEX</h3>
                        </div>
                      </div>
                      <div className="wrap-amount-stake wrap-earn textmode">
                        <div className="title-amount-stake textmode">
                          BTEX
                          <span className="badge"> EARNED</span>
                        </div>
                        <div className="token-earn">
                          <h3 className="textmode">
                            {data?.fourth_daily_ry
                              ? round(data?.fourth_daily_ry)
                              : 0}
                          </h3>
                        </div>
                      </div>
                      <div className="wrap-detail-and-harvest textmode">
                        <div className="btn-show-detail">Claim Reward</div>
                        {/* <div className="harvest">
                          <button
                            disabled={
                              data?.fourth_daily_ry > 0 ? "" : "disabled"
                            }
                            type="button"
                            className="ant-btn"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              e.preventDefault();
                              if (data.fourth_daily_ry > 0) {
                                N_getHarvest(
                                  user?.params
                                    ? user.params.user_id
                                    : user.user_id,
                                  webData.stake[3].days,
                                  round(data.fourth_daily_ry),
                                  invest_type1,
                                  4
                                ).then((d) => {
                                  if (d.status === 200) {
                                    N_getStake(
                                      user?.params
                                        ? user.params.user_id
                                        : user.user_id
                                    ).then((d) => {
                                      if (d.status === 200) {
                                        setData(d.result);
                                      }
                                    });
                                    NotificationManager.success(d.message);
                                  } else {
                                    NotificationManager.error(d.message);
                                  }
                                });
                              } else {
                                NotificationManager.info("You Have not Earn");
                              }
                            }}
                          >
                            <span>Harvest</span>
                          </button>
                        </div> */}
                      </div>
                      <div className="symbol-staked textmode">
                        USDT{" "}
                        <span className="blur-text textmode">
                          AVAILABLE - BTEX STAKED{" "}
                        </span>
                      </div>
                      <div class="wrap-amount-stake textmode">
                        <div class="input-stake-withdraw">
                          <div class="balance-lp-and-staked">
                            <div class="balance-lp">
                              <span class="blur-text textmode">
                                Available USDT:{" "}
                              </span>
                              <span
                                class="textmode balance-lp-amount"
                                style={{ cursor: "pointer" }}
                              >
                                {data?.balance ? round(data.balance) : 0}
                              </span>
                            </div>
                            <div class="staked-lp">
                              <span class="blur-text textmode">Staked: </span>
                              <span class="textmode staked-lp-amount">
                                {data?.fourth_total_stak
                                  ? round(data.fourth_total_stak)
                                  : 0}
                              </span>
                            </div>
                          </div>
                          <div class="input-amount">
                            <div class="input-amount-stake">
                              <div class="ant-input-number ant-input-number-lg ant-input-number-borderless">
                                <div class="ant-input-number-input-wrap">
                                  <input
                                    autoComplete="off"
                                    role="spinbutton"
                                    ariaValuemin="0.0001"
                                    step="1"
                                    placeholder="Enter USD"
                                    value={fourthusdtValue}
                                    class="ant-input-number-input"
                                    onChange={(e) => {
                                      setfourthUsdtValue(
                                        e.target.value
                                          .replace(/[^0-9.]/g, "")
                                          .replace(/(\..*?)\..*/g, "$1")
                                      );
                                      setfourthBtexValue(
                                        e.target.value
                                          .replace(/[^0-9.]/g, "")
                                          .replace(/(\..*?)\..*/g, "$1") /
                                          (btexusdtprice)
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                              <div class="btn-max">USDT</div>
                            </div>
                            <div class="input-amount-unstakek">
                              <div class="btn-max">
                                {round(fourthbtexValue)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {!isLoggedIn ? (
                        <button
                          type="button"
                          style={{ cursor: "pointer" }}
                          className="ant-btn ant-btn-primary ant-btn-lg btn-stake"
                          onClick={() => {
                            props.history.replace("/login");
                          }}
                        >
                          <span>Login</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          id="fourth_stake"
                          style={{ cursor: "pointer" }}
                          className="ant-btn ant-btn-primary ant-btn-lg btn-stake"
                          onClick={(e) => {
                            e.preventDefault();
                            if (data.balance >= fourthusdtValue) {
                              N_setStake(
                                user?.params
                                  ? user.params.user_id
                                  : user.user_id,
                                  round(fourthusdtValue),
                                  round(fourthbtexValue),
                                webData.stake[3].days,
                                webData.stake[3].percent,
                                usdtinrprice,
                                btexusdtprice,
                                invest_type1,
                                4
                              ).then((d) => {
                                if (d.status === 200) {
                                  N_getStake(
                                    user?.params
                                      ? user.params.user_id
                                      : user.user_id
                                  ).then((d) => {
                                    if (d.status === 200) {
                                      setData(d.result);
                                    }
                                  });
                                  NotificationManager.success(d.message);
                                } else {
                                  NotificationManager.error(d.message)
                                }
                              });
                            } else {
                              NotificationManager.info("Your Amount too Low");
                            }
                          }}
                        >
                          <span>Stake</span>
                        </button>
                      )
                      }
                    </div>
                  </div>
                </div>
                <div className="col col-md-12 col-sm-12 banner-stake" style={
                   {    height: "100px",background: "#60a7ab"}}>
                  <div className="banner-stake--container">
                    <div className="">
                      <div className="bg-shadow">
                        <h3>INR Pools Minimum Stake 1000 ₹</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="item-staking">
                    <div className="header-item">
                      <div className="logo-token">
                        <img src="/theme/img/favicon.png" alt="logo-token" />
                      </div>
                      <div className="info-pool textmode">
                        <h2 className="textmode"> BITFLASH FARM</h2>(
                        {webData?.stake?webData.stake[0].days : 0} days locked
                        reward)
                      </div>
                    </div>
                    <div className="content-item">
                      <div className="show-apr textmode">
                        <div className="title-apr">Reward</div>
                        <div className="apr">
                          <span>
                            {webData?.stake?webData.stake[0].percent
                              : 0}
                            % of Stake Tokens
                          </span>
                        </div>
                      </div>
                      <div className="show-earn textmode">
                        <div className="title-earn">Earn: </div>
                        <div className="token-earn">
                          <h3 className="textmode">BTEX</h3>
                        </div>
                      </div>
                      <div className="wrap-amount-stake wrap-earn textmode">
                        <div className="title-amount-stake textmode">
                          BTEX
                          <span className="badge"> EARNED</span>
                        </div>
                        <div className="token-earn">
                          <h3 className="textmode">
                            {data?.fifth_daily_ry
                              ? round(data?.fifth_daily_ry)
                              : 0}
                          </h3>
                        </div>
                      </div>
                      <div className="wrap-detail-and-harvest textmode">
                        <div className="btn-show-detail">Claim Reward</div>
                        {/* <div className="harvest">
                          <button
                            disabled={
                              data?.fifth_daily_ry > 0 ? "" : "disabled"
                            }
                            type="button"
                            className="ant-btn"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              e.preventDefault();
                              if (data.fifth_daily_ry > 0) {
                                N_getHarvest(
                                  user?.params
                                    ? user.params.user_id
                                    : user.user_id,
                                  webData.stake[0].days,
                                  round(data.fifth_daily_ry),
                                  invest_type2,
                                  1
                                ).then((d) => {
                                  if (d.status === 200) {
                                    N_getStake(
                                      user?.params
                                        ? user.params.user_id
                                        : user.user_id
                                    ).then((d) => {
                                      if (d.status === 200) {
                                        setData(d.result);
                                      }
                                    });
                                    NotificationManager.success(d.message);
                                  } else {
                                    NotificationManager.error(d.message);
                                  }
                                });
                              } else {
                                NotificationManager.info("You Have not Earn");
                              }
                            }}
                          >
                            <span>Harvest</span>
                          </button>
                        </div> */}
                      </div>
                      <div className="symbol-staked textmode">
                        {invest_type2}{" "}
                        <span className="blur-text textmode">
                          AVAILABLE - BTEX STAKED{" "}
                        </span>
                      </div>
                      <div class="wrap-amount-stake textmode">
                        <div class="input-stake-withdraw">
                          <div class="balance-lp-and-staked">
                            <div class="balance-lp">
                              <span class="blur-text textmode">
                                Available {invest_type2}:{" "}
                              </span>
                              <span
                                class="textmode balance-lp-amount"
                                style={{ cursor: "pointer" }}
                              >
                                {data?.inrbalance ? round(data.inrbalance) : 0}
                              </span>
                            </div>
                            <div class="staked-lp">
                              <span class="blur-text textmode">Staked: </span>
                              <span class="textmode staked-lp-amount">
                                {data?.fifth_total_stak
                                  ? round(data.fifth_total_stak)
                                  : 0}
                              </span>
                            </div>
                          </div>
                          <div class="input-amount">
                            <div class="input-amount-stake">
                              <div class="ant-input-number ant-input-number-lg ant-input-number-borderless">
                                <div class="ant-input-number-input-wrap">
                                  <input
                                    autoComplete="off"
                                    role="spinbutton"
                                    ariaValuemin="0.0001"
                                    step="1"
                                    placeholder="Enter INR"
                                    value={oneinrValue}
                                    class="ant-input-number-input"
                                    onChange={(e) => {
                                      setoneInrValue(
                                        e.target.value
                                          .replace(/[^0-9.]/g, "")
                                          .replace(/(\..*?)\..*/g, "$1")
                                      );
                                      setfifthBtexValue(
                                        e.target.value
                                          .replace(/[^0-9.]/g, "")
                                          .replace(/(\..*?)\..*/g, "$1") /
                                          (btexinrprice)
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                              <div class="btn-max">{invest_type2}</div>
                            </div>
                            <div class="input-amount-unstakek">
                              <div class="btn-max">
                                {round(fifthbtexValue)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {!isLoggedIn ? (
                        <button
                          type="button"
                          style={{ cursor: "pointer" }}
                          className="ant-btn ant-btn-primary ant-btn-lg btn-stake"
                          onClick={() => {
                            props.history.replace("/login");
                          }}
                        >
                          <span>Login</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          id="fifth_stake"
                          style={{ cursor: "pointer" }}
                          className="ant-btn ant-btn-primary ant-btn-lg btn-stake"
                          onClick={(e) => {
                            e.preventDefault();
                            if (data.inrbalance >= oneinrValue) {
                              N_setStake(
                                user?.params
                                  ? user.params.user_id
                                  : user.user_id,
                                  round(oneinrValue),
                                  round(fifthbtexValue),
                                webData.stake[0].days,
                                webData.stake[0].percent,
                                usdtinrprice,
                                btexinrprice,
                                invest_type2,
                                1
                              ).then((d) => {
                                if (d.status === 200) {
                                  N_getStake(
                                    user?.params
                                      ? user.params.user_id
                                      : user.user_id
                                  ).then((d) => {
                                    if (d.status === 200) {
                                      setData(d.result);
                                    }
                                  });
                                  NotificationManager.success(d.message);
                                } else {
                                  NotificationManager.error(d.message)
                                }
                              });
                            } else {
                              NotificationManager.info("Your Amount too Low");
                            }
                          }}
                        >
                          <span>Stake</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="item-staking">
                    <div className="header-item">
                      <div className="logo-token">
                        <img src="/theme/img/favicon.png" alt="logo-token" />
                      </div>
                      <div className="info-pool textmode">
                        <h2 className="textmode"> BITFLASH FARM</h2>(
                        {webData?.stake?webData.stake[1].days : 0} days locked
                        reward)
                      </div>
                    </div>
                    <div className="content-item">
                      <div className="show-apr textmode">
                        <div className="title-apr">Reward</div>
                        <div className="apr">
                          <span>
                            {webData?.stake?webData.stake[1].percent
                              : 0}
                            % of Stake Tokens
                          </span>
                        </div>
                      </div>
                      <div className="show-earn textmode">
                        <div className="title-earn">Earn: </div>
                        <div className="token-earn">
                          <h3 className="textmode">BTEX</h3>
                        </div>
                      </div>
                      <div className="wrap-amount-stake wrap-earn textmode">
                        <div className="title-amount-stake textmode">
                          BTEX
                          <span className="badge"> EARNED</span>
                        </div>
                        <div className="token-earn">
                          <h3 className="textmode">
                            {data?.six_daily_ry
                              ? round(data?.six_daily_ry)
                              : 0}
                          </h3>
                        </div>
                      </div>
                      <div className="wrap-detail-and-harvest textmode">
                        <div className="btn-show-detail">Claim Reward</div>
                        {/* <div className="harvest">
                          <button
                            disabled={
                              data?.six_daily_ry > 0 ? "" : "disabled"
                            }
                            type="button"
                            className="ant-btn"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              e.preventDefault();
                              if (data.six_daily_ry > 0) {
                                N_getHarvest(
                                  user?.params
                                    ? user.params.user_id
                                    : user.user_id,
                                  webData.stake[1].days,
                                  round(data.six_daily_ry),
                                  invest_type2,
                                  2
                                ).then((d) => {
                                  if (d.status === 200) {
                                    N_getStake(
                                      user?.params
                                        ? user.params.user_id
                                        : user.user_id
                                    ).then((d) => {
                                      if (d.status === 200) {
                                        setData(d.result);
                                      }
                                    });
                                    NotificationManager.success(d.message);
                                  } else {
                                    NotificationManager.error(d.message);
                                  }
                                });
                              } else {
                                NotificationManager.info("You Have not Earn");
                              }
                            }}
                          >
                            <span>Harvest</span>
                          </button>
                        </div> */}
                      </div>
                      <div className="symbol-staked textmode">
                        {invest_type2}{" "}
                        <span className="blur-text textmode">
                          AVAILABLE - BTEX STAKED{" "}
                        </span>
                      </div>
                      <div class="wrap-amount-stake textmode">
                        <div class="input-stake-withdraw">
                          <div class="balance-lp-and-staked">
                            <div class="balance-lp">
                              <span class="blur-text textmode">
                                Available {invest_type2}:{" "}
                              </span>
                              <span
                                class="textmode balance-lp-amount"
                                style={{ cursor: "pointer" }}
                              >
                                {data?.inrbalance ? round(data.inrbalance) : 0}
                              </span>
                            </div>
                            <div class="staked-lp">
                              <span class="blur-text textmode">Staked: </span>
                              <span class="textmode staked-lp-amount">
                                {data?.six_total_stak
                                  ? round(data.six_total_stak)
                                  : 0}
                              </span>
                            </div>
                          </div>
                          <div class="input-amount">
                            <div class="input-amount-stake">
                              <div class="ant-input-number ant-input-number-lg ant-input-number-borderless">
                                <div class="ant-input-number-input-wrap">
                                  <input
                                    autoComplete="off"
                                    role="spinbutton"
                                    ariaValuemin="0.0001"
                                    step="1"
                                    placeholder="Enter INR"
                                    value={secondinrValue}
                                    class="ant-input-number-input"
                                    onChange={(e) => {
                                      setsecondInrValue(
                                        e.target.value
                                          .replace(/[^0-9.]/g, "")
                                          .replace(/(\..*?)\..*/g, "$1")
                                      );
                                      setsixBtexValue(
                                        e.target.value
                                          .replace(/[^0-9.]/g, "")
                                          .replace(/(\..*?)\..*/g, "$1") /
                                          (btexinrprice)
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                              <div class="btn-max">{invest_type2}</div>
                            </div>
                            <div class="input-amount-unstakek">
                              <div class="btn-max">
                                {round(sixbtexValue)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {!isLoggedIn ? (
                        <button
                          type="button"
                          style={{ cursor: "pointer" }}
                          className="ant-btn ant-btn-primary ant-btn-lg btn-stake"
                          onClick={() => {
                            props.history.replace("/login");
                          }}
                        >
                          <span>Login</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          id="six_stake"
                          style={{ cursor: "pointer" }}
                          className="ant-btn ant-btn-primary ant-btn-lg btn-stake"
                          onClick={(e) => {
                            e.preventDefault();
                            if (data.inrbalance >= secondinrValue) {
                              N_setStake(
                                user?.params
                                  ? user.params.user_id
                                  : user.user_id,
                                  round(secondinrValue),
                                  round(sixbtexValue),
                                webData.stake[1].days,
                                webData.stake[1].percent,
                                usdtinrprice,
                                btexinrprice,
                                invest_type2,
                                2
                              ).then((d) => {
                                if (d.status === 200) {
                                  N_getStake(
                                    user?.params
                                      ? user.params.user_id
                                      : user.user_id
                                  ).then((d) => {
                                    if (d.status === 200) {
                                      setData(d.result);
                                    }
                                  });
                                  NotificationManager.success(d.message);
                                } else {
                                  NotificationManager.error(d.message)
                                }
                              });
                            } else {
                              NotificationManager.info("Your Amount too Low");
                            }
                          }}
                        >
                          <span>Stake</span>
                        </button>
                      )
                      }
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="item-staking">
                    <div className="header-item">
                      <div className="logo-token">
                        <img src="/theme/img/favicon.png" alt="logo-token" />
                      </div>
                      <div className="info-pool textmode">
                        <h2 className="textmode"> BITFLASH FARM</h2>(
                        {webData?.stake?webData.stake[2].days : 0} days locked
                        reward)
                      </div>
                    </div>
                    <div className="content-item">
                      <div className="show-apr textmode">
                        <div className="title-apr">Reward</div>
                        <div className="apr">
                          <span>
                            {webData?.stake?webData.stake[2].percent
                              : 0}
                            % of Stake Tokens
                          </span>
                        </div>
                      </div>
                      <div className="show-earn textmode">
                        <div className="title-earn">Earn: </div>
                        <div className="token-earn">
                          <h3 className="textmode">BTEX</h3>
                        </div>
                      </div>
                      <div className="wrap-amount-stake wrap-earn textmode">
                        <div className="title-amount-stake textmode">
                          BTEX
                          <span className="badge"> EARNED</span>
                        </div>
                        <div className="token-earn">
                          <h3 className="textmode">
                            {data?.seven_daily_ry
                              ? round(data?.seven_daily_ry)
                              : 0}
                          </h3>
                        </div>
                      </div>
                      <div className="wrap-detail-and-harvest textmode">
                        <div className="btn-show-detail">Claim Reward</div>
                        {/* <div className="harvest">
                          <button
                            disabled={
                              data?.seven_daily_ry > 0 ? "" : "disabled"
                            }
                            type="button"
                            className="ant-btn"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              e.preventDefault();
                              if (data.seven_daily_ry > 0) {
                                N_getHarvest(
                                  user?.params
                                    ? user.params.user_id
                                    : user.user_id,
                                  webData.stake[2].days,
                                  round(data.seven_daily_ry),
                                  invest_type2,
                                  3
                                ).then((d) => {
                                  if (d.status === 200) {
                                    N_getStake(
                                      user?.params
                                        ? user.params.user_id
                                        : user.user_id
                                    ).then((d) => {
                                      if (d.status === 200) {
                                        setData(d.result);
                                      }
                                    });
                                    NotificationManager.success(d.message);
                                  } else {
                                    NotificationManager.error(d.message);
                                  }
                                });
                              } else {
                                NotificationManager.info("You Have not Earn");
                              }
                            }}
                          >
                            <span>Harvest</span>
                          </button>
                        </div> */}
                      </div>
                      <div className="symbol-staked textmode">
                        {invest_type2}{" "}
                        <span className="blur-text textmode">
                          AVAILABLE - BTEX STAKED{" "}
                        </span>
                      </div>
                      <div class="wrap-amount-stake textmode">
                        <div class="input-stake-withdraw">
                          <div class="balance-lp-and-staked">
                            <div class="balance-lp">
                              <span class="blur-text textmode">
                                Available {invest_type2}:{" "}
                              </span>
                              <span
                                class="textmode balance-lp-amount"
                                style={{ cursor: "pointer" }}
                              >
                                {data?.inrbalance ? round(data.inrbalance) : 0}
                              </span>
                            </div>
                            <div class="staked-lp">
                              <span class="blur-text textmode">Staked: </span>
                              <span class="textmode staked-lp-amount">
                                {data?.seven_total_stak
                                  ? round(data.seven_total_stak)
                                  : 0}
                              </span>
                            </div>
                          </div>
                          <div class="input-amount">
                            <div class="input-amount-stake">
                              <div class="ant-input-number ant-input-number-lg ant-input-number-borderless">
                                <div class="ant-input-number-input-wrap">
                                  <input
                                    autoComplete="off"
                                    role="spinbutton"
                                    ariaValuemin="0.0001"
                                    step="1"
                                    placeholder="Enter INR"
                                    value={thirdinrValue}
                                    class="ant-input-number-input"
                                    onChange={(e) => {
                                      setthirdInrValue(
                                        e.target.value
                                          .replace(/[^0-9.]/g, "")
                                          .replace(/(\..*?)\..*/g, "$1")
                                      );
                                      setsevenBtexValue(
                                        e.target.value
                                          .replace(/[^0-9.]/g, "")
                                          .replace(/(\..*?)\..*/g, "$1") /
                                          (btexinrprice)
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                              <div class="btn-max">{invest_type2}</div>
                            </div>
                            <div class="input-amount-unstakek">
                              <div class="btn-max">
                                {sevenbtexValue.toFixed(4)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {!isLoggedIn ? (
                        <button
                          type="button"
                          style={{ cursor: "pointer" }}
                          className="ant-btn ant-btn-primary ant-btn-lg btn-stake"
                          onClick={() => {
                            props.history.replace("/login");
                          }}
                        >
                          <span>Login</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          id="seven_stake"
                          style={{ cursor: "pointer" }}
                          className="ant-btn ant-btn-primary ant-btn-lg btn-stake"
                          onClick={(e) => {
                            e.preventDefault();
                            if (data.inrbalance >= thirdinrValue) {
                              N_setStake(
                                user?.params
                                  ? user.params.user_id
                                  : user.user_id,
                                  round(thirdinrValue),
                                  round(sevenbtexValue),
                                webData.stake[2].days,
                                webData.stake[2].percent,
                                usdtinrprice,
                                btexinrprice,
                                invest_type2,
                                3
                              ).then((d) => {
                                if (d.status === 200) {
                                  N_getStake(
                                    user?.params
                                      ? user.params.user_id
                                      : user.user_id
                                  ).then((d) => {
                                    if (d.status === 200) {
                                      setData(d.result);
                                    }
                                  });
                                  NotificationManager.success(d.message);
                                } else {
                                  NotificationManager.error(d.message)
                                }
                              });
                            } else {
                              NotificationManager.info("Your Amount too Low");
                            }
                          }}
                        >
                          <span>Stake</span>
                        </button>
                      )
                      }
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="item-staking">
                    <div className="header-item">
                      <div className="logo-token">
                        <img src="/theme/img/favicon.png" alt="logo-token" />
                      </div>
                      <div className="info-pool textmode">
                        <h2 className="textmode"> BITFLASH FARM</h2>(
                        {webData?.stake?webData.stake[3].days : 0} days locked
                        reward)
                      </div>
                    </div>
                    <div className="content-item">
                      <div className="show-apr textmode">
                        <div className="title-apr">Reward</div>
                        <div className="apr">
                          <span>
                            {webData?.stake?webData.stake[3].percent
                              : 0}
                            % of Stake Tokens
                          </span>
                        </div>
                      </div>
                      <div className="show-earn textmode">
                        <div className="title-earn">Earn: </div>
                        <div className="token-earn">
                          <h3 className="textmode">BTEX</h3>
                        </div>
                      </div>
                      <div className="wrap-amount-stake wrap-earn textmode">
                        <div className="title-amount-stake textmode">
                          BTEX
                          <span className="badge"> EARNED</span>
                        </div>
                        <div className="token-earn">
                          <h3 className="textmode">
                            {data?.eight_daily_ry
                              ? round(data?.eight_daily_ry)
                              : 0}
                          </h3>
                        </div>
                      </div>
                      <div className="wrap-detail-and-harvest textmode">
                        <div className="btn-show-detail">Claim Reward</div>
                        {/* <div className="harvest">
                          <button
                            disabled={
                              data?.eight_daily_ry > 0 ? "" : "disabled"
                            }
                            type="button"
                            className="ant-btn"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              e.preventDefault();
                              if (data.eight_daily_ry > 0) {
                                N_getHarvest(
                                  user?.params
                                    ? user.params.user_id
                                    : user.user_id,
                                  webData.stake[3].days,
                                  round(data.eight_daily_ry),
                                  invest_type2,
                                  4
                                ).then((d) => {
                                  if (d.status === 200) {
                                    N_getStake(
                                      user?.params
                                        ? user.params.user_id
                                        : user.user_id
                                    ).then((d) => {
                                      if (d.status === 200) {
                                        setData(d.result);
                                      }
                                    });
                                    NotificationManager.success(d.message);
                                  } else {
                                    NotificationManager.error(d.message);
                                  }
                                });
                              } else {
                                NotificationManager.info("You Have not Earn");
                              }
                            }}
                          >
                            <span>Harvest</span>
                          </button>
                        </div> */}
                      </div>
                      <div className="symbol-staked textmode">
                        {invest_type2}{" "}
                        <span className="blur-text textmode">
                          AVAILABLE - BTEX STAKED{" "}
                        </span>
                      </div>
                      <div class="wrap-amount-stake textmode">
                        <div class="input-stake-withdraw">
                          <div class="balance-lp-and-staked">
                            <div class="balance-lp">
                              <span class="blur-text textmode">
                                Available {invest_type2}:{" "}
                              </span>
                              <span
                                class="textmode balance-lp-amount"
                                style={{ cursor: "pointer" }}
                              >
                                {data?.inrbalance ? round(data.inrbalance) : 0}
                              </span>
                            </div>
                            <div class="staked-lp">
                              <span class="blur-text textmode">Staked: </span>
                              <span class="textmode staked-lp-amount">
                                {data?.eight_total_stak
                                  ? round(data.eight_total_stak)
                                  : 0}
                              </span>
                            </div>
                          </div>
                          <div class="input-amount">
                            <div class="input-amount-stake">
                              <div class="ant-input-number ant-input-number-lg ant-input-number-borderless">
                                <div class="ant-input-number-input-wrap">
                                  <input
                                    autoComplete="off"
                                    role="spinbutton"
                                    ariaValuemin="0.0001"
                                    step="1"
                                    placeholder="Enter INR"
                                    value={fourthinrValue}
                                    class="ant-input-number-input"
                                    onChange={(e) => {
                                      setfourthInrValue(
                                        e.target.value
                                          .replace(/[^0-9.]/g, "")
                                          .replace(/(\..*?)\..*/g, "$1")
                                      );
                                      seteightBtexValue(
                                        e.target.value
                                          .replace(/[^0-9.]/g, "")
                                          .replace(/(\..*?)\..*/g, "$1") /
                                          (btexinrprice)
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                              <div class="btn-max">{invest_type2}</div>
                            </div>
                            <div class="input-amount-unstakek">
                              <div class="btn-max">
                                {round(eightbtexValue)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {!isLoggedIn ? (
                        <button
                          type="button"
                          style={{ cursor: "pointer" }}
                          className="ant-btn ant-btn-primary ant-btn-lg btn-stake"
                          onClick={() => {
                            props.history.replace("/login");
                          }}
                        >
                          <span>Login</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          id="eight_stake"
                          style={{ cursor: "pointer" }}
                          className="ant-btn ant-btn-primary ant-btn-lg btn-stake"
                          onClick={(e) => {
                            e.preventDefault();
                            if (data.inrbalance >= fourthinrValue) {
                              N_setStake(
                                user?.params
                                  ? user.params.user_id
                                  : user.user_id,
                                  round(fourthinrValue),
                                  round(eightbtexValue),
                                webData.stake[3].days,
                                webData.stake[3].percent,
                                usdtinrprice,
                                btexinrprice,
                                invest_type2,
                                4
                              ).then((d) => {
                                if (d.status === 200) {
                                  N_getStake(
                                    user?.params
                                      ? user.params.user_id
                                      : user.user_id
                                  ).then((d) => {
                                    if (d.status === 200) {
                                      setData(d.result);
                                    }
                                  });
                                  NotificationManager.success(d.message);
                                } else {
                                  NotificationManager.error(d.message)
                                }
                              });
                            } else {
                              NotificationManager.info("Your Amount too Low");
                            }
                          }}
                        >
                          <span>Stake</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
