import React, { useState, useEffect } from "react";
import { isNum, isOtp } from "./redux/helpers/form-validator.functions";
import QRCode from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector } from "react-redux";
import FullLoader from "./components/FullLoader";
import { NotificationManager } from "react-notifications";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import $ from "jquery";
import {
  N_get_wallet,
  N_crypto_withdraw,
  N_crypto_withdraw_Otp,
  N_DepositUpdate,
  N_inr_withdraw,
  N_transectionHistory,
  N_crypto_withdraw_Otp_Email,
  N_setStaking,
  N_BTXXSellHistory,
} from "./redux/helpers/api_functions_new";
import { style } from "@mui/system";
import Header from "./ftx_design/Header";
import axios from "axios";

export default function Wallet() {
  const [copied, setCopied] = useState();
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [volume, setVolume] = useState();
  const [to_address, setToAddress] = useState();
  const [remark, setRemark] = useState();
  const [req_no, setReqno] = useState();
  // const [withdral_fee, setWthdrawalFee] = useState();
  const [famount, setFinalAmount] = useState(45);
  const [wallet_details, setWalletDetails] = useState([]);
  const [allData, setAllData] = useState([]);
  const [history, setHistory] = useState("");
  const [btxxHistory, setBtxxHistory] = useState([]);
  // const [collapseClass, setcollapseClass] = useState(false);
  const [activeTab, setActivetab] = useState(0);
  const [total_inr, setTotalInr] = useState(0);
  const [loading, setLoading] = useState(true);
  const [withLoading, setWithLoading] = useState(false);
  const [onlyBalance, setOnlyBalance] = useState(false);
  // const [onlyChange, setChange] = useState(ev);
  const [price, setPrice] = useState("");
  // const [suser, setUser] = useState();
  const [status, setStatus] = useState(false);
  const [popup, showpopup] = useState(false);
  const [ctime, setctime] = useState("02:00");
  const [wallettype, setwallettype] = useState("");
  const [transection_id, setTransectionId] = useState("");
  const [otp, setOtp] = useState("");
  const [wotp, setwOtp] = useState("");
  const [otpv, setotpv] = useState(false);
  const [filedata, setFileData] = useState();
  const [l1, setl1] = useState();
  const [l2, setl2] = useState();
  const [stakepopup, setStakepopup] = useState(false);
  const [type, setType] = useState("");
  const [poolstype, setPoolsType] = useState("");
  const [amount, setAmount] = useState("");
  const [percent, setPercent] = useState("");
  const [btexp, setBtexP] = useState("");
  const [usdtp, setUSDTP] = useState("");

  const { webData } = useSelector((state) => state.websiteDBReducer);
  const { coins } = useSelector((state) => state.coinDBReducer);
  const { user_fav_currency, currency_prefix, paired_curency_price } =
    useSelector((state) => state.coinDBReducer);
  const { user } = useSelector((state) => state.AuthReducer);

  // function setchange(ev){
  //   console.log("hello");
  //   a=document.getElementById("fil").value;
  //   console.log("hello",a,wallet_details,"checked one");
  //   for(var i=0;i<=wallet_details.length-1;i++){
  //     if(wallet_details[i].symbol.charAt(0)==a.toUpperCase().charAt(0)){

  //       console.log(wallet_details[i].symbol,"hello");

  //     }
  //   }

  // }

  function getCoinRate(coin) {
    let coins1 = Object.values(coins);
    let btexprice = coins1 && coins1.find((d) => d.symbol === "BTEX");
    setBtexP(btexprice?.current_price_inr);
    let usdtprice = coins1 && coins1.find((d) => d.symbol === "USDT");
    setUSDTP(usdtprice?.current_price_inr);
    let res = coins1.find((d) => d.symbol === coin);
    console.log("inr price: ", res, coin);
    if (coin === "INR") {
      return 1;
    } else {
      return res?.current_price_inr ? res.current_price_inr : 0;
    }
  }

  function getDepositWithdrawStatus(is_deposite, is_withdrawal) {
    if (is_deposite && is_withdrawal) {
      return 3;
    } else if (is_deposite) {
      return 1;
    } else if (is_withdrawal) {
      return 2;
    } else {
      return 0;
    }
  }

  const uploadIMG = (input) => {
    if (input.target.files && input.target.files[0]) {
      console.log("fileset****");
      setFileData(input.target.files[0]);
    }
  };

  function getWallets() {
    N_get_wallet(user?.params ? user.params.user_id : user.user_id)
      .then((d) => {
        if (d.status === 200) {
          let total = 0;
          let final_data =
            d.params.wallets &&
            d.params.wallets.map((res, i) => {
              let rate = getCoinRate(res?.symbol, "INR");
              let st = getDepositWithdrawStatus(
                res?.is_deposite,
                res?.is_withdrawal
              );
              let inr_val = Math.round(rate * res?.balance * 1000) / 1000;
              total = total + parseFloat(inr_val);
              // console.log("inrvaljust: ", inr_val, Math.round(rate * d.params.wallets[res]?.balance * 1000) / 1000, rate);
              return {
                id: res?.id,
                deposit_limit: res?.deposit_limit ? res.deposit_limit : 0,
                icon: res?.icon,
                symbol: res?.symbol,
                name: res?.name,
                status: st,
                withdral_fee: res?.withdrawal_fee,
                locked:
                  Math.round(res?.locked * 10000) / 10000 != 0
                    ? Math.round(
                        Math.abs(res?.locked ? res?.locked : 0) * 10000
                      ) / 10000
                    : Math.round(res?.locked * 100000000) / 100000000,
                address: res?.wallet_address,
                balance:
                  Math.round(res?.balance * 10000) / 10000 != 0
                    ? Math.round(res?.balance * 10000) / 10000
                    : Math.round(res?.balance * 100000000) / 100000000,
                avl_balance:
                  Math.round(res?.available * 10000) / 10000 != 0
                    ? Math.round((res?.balance - res?.locked) * 10000) / 10000
                    : Math.round((res?.balance - res?.locked) * 100000000) /
                      100000000,
                inr_balance: inr_val,
              };
            });
          setWalletDetails(final_data);
          setAllData(final_data);
          //console.log(setWalletDetails(final_data), "worked");

          setTotalInr(total);
          setTimeout(() => setLoading(false), 800);
        } else {
          console.log(d);
        }
      })
      .catch((e) => {
        console.log("er", e);
      });
  }

  useEffect(() => {
    if (total_inr <= 0) {
      getWallets();
      console.log(total_inr, " effect checking ");
    }
  }, [coins]);

  // useEffect(() => {
  //   getWallets();
  // }, []);

  const getTansectionH = () => {
    setActivetab(1);
    N_transectionHistory(user?.params ? user.params.user_id : user.user_id)
      .then((dt) => {
        // if (status !== -5) setHistory(dt);
        if (dt.status === 200) {
          setHistory(dt.params.withdraw);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getBTXXSellH = () => {
    setActivetab(2);
    N_BTXXSellHistory(user?.params ? user.params.user_id : user.user_id)
      .then((dt) => {
        // if (status !== -5) setHistory(dt);
        console.log(dt);
        setBtxxHistory([...dt]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    N_DepositUpdate(user?.params ? user.params.user_id : user.user_id);
  }, []);

  function changeCollapse(event, txt) {
    setCopied(false);
    $(".deposit_c").removeClass("show").addClass("collapse");
    $(".withdraw_c").removeClass("show").addClass("collapse");
  }

  const otpCountdown = () => {
    let duration = 60 * 5;
    // const display = document.getElementById("#timer");
    let timer = duration,
      minutes,
      seconds;
    const tint = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      setctime(minutes + ":" + seconds);

      if (--timer < 0) {
        // timer = duration;
        clearInterval(tint);
      }
    }, 1000);
  };

  useEffect(() => {
    axios.get("https://withdrawal.bitflash.finance/api/khaatabahi");
  }, []);

  return (
    <>
      {/* <Popup /> */}

      {popup ? (
        <>
          <div
            style={{
              position: "fixed",
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              zIndex: 200,
              backgroundColor: "rgb(185 185 185 / 30%)",
              top: "0px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "20%",
                zIndex: 1000,
                boxShadow: "2px 2px 20px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                alignSelf: "center",
              }}
            >
              {stakepopup ? (
                <div
                  className="security_header"
                  style={{ backgroundColor: "#3bc59c" }}
                >
                  <div className="close">Staking</div>
                </div>
              ) : null}
              <div className="container  shead-bg">
                <div className="row">
                  <div className="col-12 col-md-12 col-sm-12">
                    {stakepopup ? (
                      <form className="signupform mdfthemetxt" id="stake_form">
                        <div className="signupform-control">
                          <small id="msg" style={{ fontSize: "15px" }}>
                            Error message
                          </small>
                        </div>
                        <div className="signupform-control">
                          <select
                            className="form-select form-select-sm my-3"
                            aria-label=".form-select-sm example"
                            style={{ width: "100%", padding: "8px" }}
                            onChange={(e) => {
                              const d = e.target.value.split(" ");
                              setType(d[0]);
                              setPercent(d[1]);
                              setPoolsType(d[2]);
                            }}
                          >
                            <option selected defaultValue="0 0">
                              Select Your Period
                            </option>
                            {webData
                              ? webData.stake?.map((item) => {
                                  return (
                                    <option
                                      value={
                                        item.days +
                                        " " +
                                        item.percent +
                                        " " +
                                        item.id
                                      }
                                    >
                                      {item.days + " Days"}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                          <div>
                            <input
                              type="text"
                              name="stake_amount"
                              className="signupform-control"
                              id="stake_amount"
                              placeholder="Enter Your Amount"
                              onChange={(e) => {
                                setAmount(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          id="proceed_stake_btn"
                          className="my-2 btn-block p-2 text-light"
                          style={{
                            background: "#3bc59c",
                            border: "none",
                            outline: "none",
                            borderRadius: "20px",
                            fontSize: "14px",
                          }}
                          onClick={() => {
                            if (amount > 0) {
                              if (type > 0) {
                                let totalbtexinr = amount * btexp;
                                let totalusdt = totalbtexinr / usdtp;
                                N_setStaking(
                                  user?.params
                                    ? user.params.user_id
                                    : user.user_id,
                                  type,
                                  amount,
                                  percent,
                                  btexp,
                                  usdtp,
                                  totalusdt,
                                  poolstype
                                )
                                  .then((e) => {
                                    if (e.status == 200) {
                                      NotificationManager.success(e.message);
                                      document.location.reload();
                                    } else {
                                      NotificationManager.error(e.message);
                                      showpopup(false);
                                      setStakepopup(false);
                                    }
                                  })
                                  .catch((e) => {
                                    console.log(e);
                                    showpopup(false);
                                    setStakepopup(false);
                                  });
                              } else {
                                NotificationManager.error(
                                  "Please choose your type"
                                );
                              }
                            } else {
                              NotificationManager.error(
                                "Please enter your amount"
                              );
                            }
                          }}
                        >
                          Stake
                        </button>
                      </form>
                    ) : otpv ? (
                      <>
                        <form className="signupform mdfthemetxt" id="otp_form">
                          <div>
                            <h3>Email OTP verification </h3>
                          </div>
                          <div className="signupform-control">
                            <small id="msg" style={{ fontSize: "15px" }}>
                              Error message
                            </small>
                          </div>
                          <div className="signupform-control">
                            <div>
                              <input
                                type="text"
                                name="user_otp"
                                className="signupform-control"
                                id="user_otp"
                                maxLength={6}
                                onChange={(e) => {
                                  setwOtp(e.target.value);
                                  isOtp(e.target.value);
                                }}
                                value={wotp}
                                placeholder="Enter Your OTP"
                              />
                              <i
                                className="fas fa-check-circle"
                                style={{ top: "16px" }}
                              ></i>
                              <i
                                className="fas fa-exclamation-circle"
                                style={{ top: "16px" }}
                              ></i>
                              <small>Error message</small>
                              <div className="resend_btn text-info" id="timer">
                                {ctime}
                              </div>
                            </div>
                          </div>
                          <div className="signupform-control" id="btns">
                            <button
                              type="button"
                              id="withdrawal_btn"
                              className="sendbtn"
                              onClick={(e) => {
                                e.preventDefault();
                                setl1("spinner-border spinner-border-sm");
                                document.getElementById(
                                  "withdrawal_btn"
                                ).disabled = true;
                                N_crypto_withdraw_Otp_Email(
                                  user?.params
                                    ? user.params.user_id
                                    : user.user_id,
                                  wotp,
                                  transection_id,
                                  wallettype
                                )
                                  .then((res) => {
                                    setl1("");
                                    showpopup(false);
                                    if (res.status === 200) {
                                      NotificationManager.success(res.message);

                                      document.location.reload();
                                    } else {
                                      NotificationManager.error(res.message);

                                      document.location.reload();
                                    }
                                  })
                                  .catch((err) => {
                                    NotificationManager.error(
                                      "Somthing Went Wrong!"
                                    );
                                    setVolume("");
                                    setRemark("");
                                    setPrice("");
                                    console.log(err);
                                  });
                              }}
                            >
                              <span className={`${l1} mx-1 `}></span>
                              Withdraw
                            </button>
                          </div>
                          {loading ? (
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : null}
                        </form>
                      </>
                    ) : (
                      <form className="signupform mdfthemetxt" id="otp_form">
                        <div>
                          <h3>Mobile OTP verification </h3>
                        </div>
                        <div className="signupform-control">
                          <small id="msg" style={{ fontSize: "15px" }}>
                            Error message
                          </small>
                        </div>
                        <div className="signupform-control">
                          <div>
                            <input
                              type="text"
                              name="user_otp"
                              className="signupform-control"
                              id="user_otp"
                              maxLength={6}
                              onChange={(e) => {
                                setOtp(e.target.value);
                                isOtp(e.target.value);
                              }}
                              value={otp}
                              placeholder="Enter Your OTP"
                            />
                            <i
                              className="fas fa-check-circle"
                              style={{ top: "16px" }}
                            ></i>
                            <i
                              className="fas fa-exclamation-circle"
                              style={{ top: "16px" }}
                            ></i>
                            <small>Error message</small>
                            <div className="resend_btn text-info" id="timer">
                              {ctime}
                            </div>
                          </div>
                        </div>
                        <div className="signupform-control" id="btns">
                          <button
                            type="button"
                            id="proceed_btn"
                            className="sendbtn"
                            onClick={(e) => {
                              e.preventDefault();
                              setl2("spinner-border spinner-border-sm");
                              N_crypto_withdraw_Otp(
                                user?.params
                                  ? user.params.user_id
                                  : user.user_id,
                                otp,
                                transection_id,
                                wallettype
                              )
                                .then((res) => {
                                  setl2("");
                                  if (res.status === 200) {
                                    NotificationManager.success(
                                      "OTP Send. Please Check Your Email"
                                    );
                                    setotpv(true);
                                  } else {
                                    NotificationManager.error(res.message);
                                    showpopup(false);
                                    document.location.reload();
                                  }
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                          >
                            <span className={`${l2} mx-1 `}></span>
                            Verify
                          </button>
                        </div>
                        {loading ? (
                          <div
                            className="spinner-border text-primary"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : null}
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <Header />

      <div
        className="container-fluid "
        style={{
          backgroundColor: "#e9e9e9",

          width: "80%",
          marginTop: "50px",
          marginBottom: "30px",

          backgroundColor: webData.bg_color_code,
        }}
      >
        <div className=" text-start text-dark  ">
          <h2 className="box-title styler theme-color-text ">
            <b style={{ fontSize: "20px" }}> FUNDS AND TRANSFERS</b>
          </h2>
        </div>

        <div className="d-flex align-items-center  justify-content-between px-15 color_setter  ">
          <div className="btn-group custom-grp color-btn lineBreaker">
            <span
              style={{
                cursor: "pointer",
                // fontSize:"15px",
                marginRight: "10px",
              }}
              className={` mobile_font_setter    btn-sm ${
                activeTab == 0 ? "link_toogler" : ""
              }`}
              onClick={() => setActivetab(0)}
            >
              FUNDS
            </span>
            <span
              style={{
                cursor: "pointer",
                //  fontSize:"15px"marginRight:"10px",
              }}
              className={`mobile_font_setter btn-sm ${
                activeTab == 1 ? "link_toogler" : ""
              }`}
              onClick={() => getTansectionH()}
            >
              TRANSFER HISTORY
            </span>
            {/* <span
              style={{
                cursor: "pointer",
                //  fontSize:"15px"marginRight:"10px",
              }}
              className={`mobile_font_setter btn-sm ${activeTab == 2 ? "link_toogler" : ""
                }`}
              onClick={() => getBTXXSellH()}
            >
              BTXX SELL HISTORY
            </span> */}
          </div>

          <ul className="box-controls pull-right text-dark mr-4 mobile_font_setter">
            <li className="mx-5">
              <div className="">
                {" "}
                <span className=" mx-3  ">Estimated Portfolio</span>
                {currency_prefix[user_fav_currency]}{" "}
                <span className=" ">
                  {user_fav_currency === "INR"
                    ? total_inr.toFixed(5)
                    : (
                        total_inr / paired_curency_price[user_fav_currency]
                      ).toFixed(8)}
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div
          className="text-dark mb-3"
          style={{
            width: "100%",
            border: "1px solid #929292",
            height: "2px",
            zIndex: "-1",
            opacity: "0.3",
          }}
        >
          {/*  working as horixontal line */}
        </div>

        <div className="text-dark">
          <div class=" text_locater lineBreaker ">
            <input
              type="text"
              style={{ opacity: "0.5" }}
              onChange={(e) => {
                var inUpper = e.target.value.toUpperCase();
                const filteredData = allData.filter((item) =>
                  item.symbol.includes(inUpper)
                );
                // console.log(filteredData);
                setWalletDetails([...filteredData]);
              }}
              placeholder="Search Currency"
              className="input_locater    text-center"
              id="fil"
            />

            <FormGroup>
              <FormControlLabel
                onClick={(event) => {
                  setOnlyBalance(!onlyBalance);
                  handleChange(event);
                }}
                control={<Switch preventDefault />}
                label="Hide Zero Balances"
                style={{ opacity: "0.6" }}
              />
            </FormGroup>
          </div>
        </div>

        <div
          className={"bg-white container-fluid  "}
          style={{
            // width: "80%",
            marginTop: "00px",
            marginBottom: "30px",
            // boxShadow:"0px 0px 20px #1c1e1a",
            backgroundColor: webData.bg_color_code,
          }}
        >
          {/*  fund and transfer */}

          {/*  */}

          {/* px-15 pt-0   */}
          <div className="box-body ">
            <div className="table-responsive  h6  table-hover ">
              {activeTab == 0 ? (
                <table
                  className="mdfthemetxt table table-border  no-margin"
                  style={{
                    overflow: "hidden",
                  }}
                >
                  <thead className="">
                    <tr className="bg-pale-dark " style={{ fontSize: "12px" }}>
                      <th className="" style={{ fontWeight: "normal" }}>
                        ASSETS
                      </th>
                      <th style={{ textAlign: "right", fontWeight: "normal" }}>
                        AVAILABLE BALANCE
                      </th>
                      <th
                        style={{ fontWeight: "normal" }}
                        className="text-right "
                      >
                        LOCKED
                      </th>
                      <th
                        style={{ fontWeight: "normal" }}
                        className="text-right "
                      >
                        TOTAL
                      </th>
                      <th
                        style={{ fontWeight: "normal" }}
                        className="text-right "
                      >
                        {user_fav_currency} VALUE
                      </th>
                      <th
                        style={{ fontWeight: "normal" }}
                        className="text-right "
                      >
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={8}>
                          <FullLoader />
                        </td>
                      </tr>
                    ) : wallet_details ? (
                      wallet_details.map((item, index) => (
                        <>
                          {index === 0
                            ? wallet_details.map((item, index) => (
                                <>
                                  {(item.symbol === "INR" &&
                                    onlyBalance &&
                                    item.inr_balance > 0) ||
                                  (item.symbol === "INR" && !onlyBalance) ? (
                                    <>
                                      <tr
                                        style={{
                                          fontWeight: "400",
                                          fontSize: "13px",
                                        }}
                                        key={index * 6}
                                      >
                                        <td>
                                          {item.icon ? (
                                            <img
                                              className=" mx-3"
                                              src={item.icon}
                                              alt={item.symbol}
                                              width="20"
                                              height="20"
                                            />
                                          ) : (
                                            " "
                                          )}{" "}
                                          {item.name} ( {item.symbol})
                                        </td>
                                        <td style={{ textAlign: "right" }}>
                                          {item.avl_balance}
                                        </td>
                                        <td className="text-right">
                                          {item.locked}
                                        </td>
                                        <td className="text-right">
                                          {item.balance.toFixed(4)}
                                        </td>
                                        <td className="text-right">
                                          {currency_prefix[user_fav_currency]}{" "}
                                          {item.inr_balance}
                                        </td>
                                        <td className="text-right">
                                          {parseInt(item.status) === 1 ||
                                          (parseInt(item.status) === 3 &&
                                            item.symbol == "INR") ? (
                                            <>
                                              {/* <button
                                              className="btn btn-theme-color mr-2"
                                              id="deposit"
                                              data-toggle="collapse"
                                              data-target={
                                                "#inr_" + item.symbol
                                              }
                                              aria-expanded="false"
                                              onClick={(e) =>
                                                changeCollapse(
                                                  e,
                                                  "#inr_" + item.symbol
                                                )
                                              }
                                            >
                                              Deposit
                                            </button> */}
                                              <a
                                                className="btn bg-success mr-2"
                                                style={{
                                                  backgroundColor: "#efefef",
                                                }}
                                                href="https://login.btexpay.com"
                                                target="_blank"
                                              >
                                                <span className=" text-white">
                                                  {" "}
                                                  Deposit{" "}
                                                </span>
                                              </a>
                                            </>
                                          ) : null}
                                          {parseInt(item.status) === 2 ||
                                          (parseInt(item.status) === 3 &&
                                            item.symbol === "INR") ? (
                                            <>
                                              <button
                                                className="btn bg-danger text-white"
                                                id="withdraw"
                                                data-toggle="collapse"
                                                data-target={
                                                  "#inrw_" + item.symbol
                                                }
                                                aria-expanded="false"
                                                onClick={(e) =>
                                                  changeCollapse(
                                                    e,
                                                    "#inrw_" + item.symbol
                                                  )
                                                }
                                              >
                                                Withdraw
                                              </button>
                                            </>
                                          ) : null}
                                        </td>
                                      </tr>
                                      {/* <tr
                                    className="collapse deposit_c"
                                    id={"inr_" + item.symbol}
                                  >
                                    <td colSpan="6">
                                      <div className="row">
                                        <div
                                          className="col-md-6"
                                          style={{ margin: "0 auto" }}
                                        >
                                          <div className="card light-theme-color">
                                            <div className="card-header">
                                              Deposit
                                            </div>
                                            <div className="card-body">
                                              <div className="signupform-control">
                                                <a
                                                  className="btn btn-theme-color"
                                                  style={{
                                                    border: "1px solid",
                                                    background: "#c2efc9",
                                                  }}
                                                  href="https://login.btexpay.com"
                                                  target="_blank"
                                                >
                                                  Click here for Deposit
                                                </a>
                                              </div>
                                              <div className="signupform-control">
                                                  <div
                                                    className="p-3"
                                                    style={{
                                                      width: "fit-content",
                                                      backgroundColor: "#fff",
                                                    }}
                                                  >
                                                    <img src="/img/bitflashqrpay.jpeg" />
                                                  </div>
                                                </div>
                                                <lebal for="screenshot">
                                                  Upload Screenshot File:{" "}
                                                </lebal>
                                                <input
                                                  type="file"
                                                  onChange={(e) => {
                                                    uploadIMG(e);
                                                  }}
                                                />
                                                <h5 className="card-title mt-2">
                                                  Price
                                                </h5>
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  required
                                                  id="price"
                                                  value={price}
                                                  onChange={(e) => {
                                                    setPrice(e.target.value);
                                                  }}
                                                />
                                                <br />
                                                <PayPalButton
                                                  options={{
                                                    clientId: "ATboReAfMjjlq3tAFczs5FMttpyeK7ogGoTUMoFE6drhRnwrpYXtEsDQDPgT-UXdD7bGwxmkM9EUL06d",
                                                    currency: "USD",
                                                  }}
                                                  amount={price}
                                                  onSuccess={(details, data) => {

                                                    N_PaypalPayment(user?.params
                                                      ? user.params.user_id
                                                      : user.user_id, price, usdtp, details, data).then((d)=>{
                                                        NotificationManager.success(d.message)
                                                      })
                                                  }}
                                                />
                                                <a
                                                  className="btn btn-theme-color"
                                                  onClick={(e) => {
                                                    N_ScreenShot(
                                                      e,
                                                      filedata,
                                                      price,
                                                      user?.params
                                                        ? user.params.user_id
                                                        : user.user_id
                                                    );
                                                  }}
                                                >
                                                  UpLoad
                                                </a>
                                                <div
                                                  className="spinner-border text-primary"
                                                  style={{ display: "none" }}
                                                  role="status"
                                                >
                                                  <span className="sr-only">
                                                    Loading...
                                                  </span>
                                                </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr> */}
                                      <tr
                                        className="collapse withdraw_c"
                                        id={"inrw_" + item.symbol}
                                      >
                                        <td colSpan="6">
                                          <div className="row">
                                            <div
                                              className="col-md-6"
                                              style={{ margin: "0 auto" }}
                                            >
                                              <div className="card">
                                                <div className="card-header">
                                                  Withdraw
                                                </div>
                                                <div className="card-body">
                                                  <strong>
                                                    &#8377;{" "}
                                                    {Number(item.withdral_fee)}{" "}
                                                    per Transection
                                                  </strong>
                                                  <h5 className="card-title">
                                                    Amount
                                                  </h5>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    required
                                                    id="price"
                                                    value={price}
                                                    onChange={(e) => {
                                                      setPrice(e.target.value);
                                                    }}
                                                  />
                                                  <h5 className="card-title">
                                                    Withdrawal Fee
                                                  </h5>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="withdraw_fee"
                                                    value={item.withdral_fee}
                                                  />
                                                  <h5 className="card-title">
                                                    Remark
                                                  </h5>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    required
                                                    id="remark"
                                                    value={remark}
                                                    onChange={(e) => {
                                                      setRemark(e.target.value);
                                                    }}
                                                  />
                                                  <br />
                                                  <a
                                                    className="btn bg-danger text-white"
                                                    onClick={() => {
                                                      setWithLoading(true);
                                                      N_inr_withdraw(
                                                        user.user_id,
                                                        price,
                                                        item.symbol,
                                                        remark
                                                      ).then((d) => {
                                                        setWithLoading(false);
                                                        if (d.status == 200) {
                                                          showpopup(true);
                                                          otpCountdown();
                                                          setwallettype(
                                                            d.params.symbol
                                                          );
                                                          setTransectionId(
                                                            d.params
                                                              .transection_id
                                                          );
                                                          NotificationManager.success(
                                                            d.message
                                                          );
                                                          setStatus(!status);
                                                        } else {
                                                          NotificationManager.error(
                                                            d.message
                                                          );
                                                          setStatus(!status);
                                                        }
                                                      });
                                                    }}
                                                  >
                                                    {withLoading ? (
                                                      <span className="loading-icon fas fa-spinner fa-spin mr-2"></span>
                                                    ) : (
                                                      "Withdraw"
                                                    )}
                                                  </a>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </>
                                  ) : null}
                                </>
                              ))
                            : null}
                          {(item.symbol !== "INR" &&
                            onlyBalance &&
                            item.inr_balance > 0) ||
                          (item.symbol !== "INR" && !onlyBalance) ? (
                            <>
                              <tr
                                style={{ fontWeight: "400", fontSize: "13px" }}
                                key={index * 3}
                              >
                                <td>
                                  {item.icon ? (
                                    <img
                                      className="mx-3"
                                      src={item.icon}
                                      alt={item.symbol}
                                      width="20"
                                      height="20"
                                    />
                                  ) : (
                                    " "
                                  )}{" "}
                                  {item.name}
                                  {item.symbol === "USDT"
                                    ? "(" + item.symbol + ")" + " (BEP20)"
                                    : item.symbol === "BUSD"
                                    ? "(" + item.symbol + ")" + " (BEP20)"
                                    : "(" + item.symbol + ")"}
                                </td>
                                <td style={{ textAlign: "right" }}>
                                  {item.balance > 0
                                    ? item.avl_balance.toFixed(4)
                                    : item.balance}
                                </td>
                                <td className="text-right">
                                  {item.locked > 0
                                    ? item.locked.toFixed(4)
                                    : item.locked}
                                </td>
                                <td className="text-right">
                                  {item.avl_balance > 0
                                    ? (
                                        Number(item.avl_balance) +
                                        Number(item.locked)
                                      ).toFixed(4)
                                    : item.avl_balance}
                                </td>
                                <td className="text-right">
                                  {currency_prefix[user_fav_currency] + " "}
                                  {user_fav_currency === "INR"
                                    ? item.inr_balance
                                    : item.inr_balance > 0
                                    ? (
                                        item.inr_balance /
                                        Number(
                                          paired_curency_price[
                                            user_fav_currency
                                          ]
                                        )
                                      ).toFixed(8)
                                    : 0}
                                </td>
                                <td className="text-right">
                                  {(item.address &&
                                    parseInt(item.status) === 1) ||
                                  parseInt(item.status) === 3 ? (
                                    <button
                                      type="button"
                                      className="btn bg-success mr-2"
                                      id="deposit"
                                      data-toggle="collapse"
                                      // data-target={"#inrw_" + item.symbol}
                                      // aria-expanded="false"
                                      // onClick={(e) =>
                                      //   changeCollapse(e, "#inrw_" + item.symbol)
                                      // }
                                      data-target={"#deposit_" + item.symbol}
                                      aria-expanded="false"
                                      onClick={(e) =>
                                        changeCollapse(
                                          e,
                                          "#deposit_" + item.symbol
                                        )
                                      }
                                    >
                                      <span className="text-white">
                                        {" "}
                                        Deposit{" "}
                                      </span>
                                    </button>
                                  ) : null}
                                  {(item.address &&
                                    parseInt(item.status) === 2) ||
                                  parseInt(item.status) === 3 ? (
                                    <button
                                      type="button"
                                      className="btn bg-danger text-white"
                                      id="withdraw"
                                      data-toggle="collapse"
                                      data-target={"#withdraw_" + item.symbol}
                                      aria-expanded="false"
                                      onClick={(e) =>
                                        changeCollapse(
                                          e,
                                          "#withdraw_" + item.symbol
                                        )
                                      }
                                    >
                                      Withdraw
                                    </button>
                                  ) : null}

                                  {item.symbol === "BTEX" ? (
                                    <button
                                      type="button"
                                      className="btn btn-theme-color mx-2 text-light"
                                      id="stake"
                                      style={{
                                        backgroundColor: "#3bc59c",
                                        letterSpacing: "2px",
                                      }}
                                      onClick={() => {
                                        showpopup(true);
                                        setStakepopup(true);
                                      }}
                                    >
                                      Stake
                                    </button>
                                  ) : null}

                                  {/* {item.symbol === "BUSD" ? (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn-theme-color mr-2"
                                      id="deposit"
                                      data-toggle="collapse"
                                      // data-target={"#inrw_" + item.symbol}
                                      // aria-expanded="false"
                                      // onClick={(e) =>
                                      //   changeCollapse(e, "#inrw_" + item.symbol)
                                      // }
                                      data-target={"#deposit_" + item.symbol}
                                      aria-expanded="false"
                                      onClick={(e) =>
                                        changeCollapse(
                                          e,
                                          "#deposit_" + item.symbol
                                        )
                                      }
                                    >
                                      Deposit
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-theme-color"
                                      id="withdraw"
                                      data-toggle="collapse"
                                      data-target={"#withdraw_" + item.symbol}
                                      aria-expanded="false"
                                      onClick={(e) =>
                                        changeCollapse(
                                          e,
                                          "#withdraw_" + item.symbol
                                        )
                                      }
                                    >
                                      Withdraw
                                    </button>
                                  </>
                                ) : null} */}
                                </td>
                              </tr>
                              <tr
                                className="collapse deposit_c"
                                id={"deposit_" + item.symbol}
                              >
                                <td colSpan="6">
                                  <form>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="signupform-control">
                                          <div>
                                            Send to your Secure {item.name}{" "}
                                            Address
                                          </div>
                                          <hr className="h_r" />
                                        </div>
                                        <div className="signupform-control">
                                          <label htmlFor="coin_address">
                                            Destination Address
                                          </label>
                                          <CopyToClipboard
                                            text={item.address}
                                            onCopy={() =>
                                              setCopied({ copied: true })
                                            }
                                          >
                                            {copied ? (
                                              <span className="cop_btn text-success">
                                                Copied
                                              </span>
                                            ) : (
                                              <span className="cop_btn theme-color-text">
                                                <i
                                                  className="fas fa-copy"
                                                  aria-hidden="true"
                                                ></i>
                                                Copy
                                              </span>
                                            )}
                                          </CopyToClipboard>
                                          <input
                                            type="text"
                                            className="input_button"
                                            value={item.address}
                                          />
                                        </div>
                                        <div className="signupform-control">
                                          <div>
                                            <i
                                              className="fas fa-warning"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            Disclaimer
                                          </div>
                                          <hr className="h_r" />
                                          <label htmlFor="disclaimer">
                                            Please Deposit minimum{" "}
                                            {" " +
                                              item?.deposit_limit +
                                              " " +
                                              item.symbol +
                                              "  "}
                                            to this address. If you Deposit any
                                            other coins, It will be lost
                                            forever.
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="signupform-control">
                                          <div>Or Scan This QR Code</div>
                                          <hr className="h_r" />
                                        </div>
                                        <div className="signupform-control">
                                          <div
                                            className="p-3"
                                            style={{
                                              width: "fit-content",
                                              backgroundColor: "#fff",
                                            }}
                                          >
                                            <QRCode
                                              value={item.address}
                                              size={200}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </td>
                              </tr>
                              <tr
                                className="collapse withdraw_c"
                                id={"withdraw_" + item.symbol}
                              >
                                <td colSpan="6">
                                  <form>
                                    <div className="row">
                                      <div
                                        className="col-md-8"
                                        style={{ margin: "0 auto" }}
                                      >
                                        <div className="signupform-control">
                                          <div>
                                            Transfer {item.name} from your{" "}
                                            {webData.website_short_name}
                                            Wallet to Another
                                          </div>
                                          <hr className="h_r" />
                                        </div>
                                        <div className="signupform-control">
                                          <label htmlFor="coin_address">
                                            Volume
                                          </label>
                                          <label
                                            htmlFor="coin_val"
                                            style={{
                                              float: "right",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            Available {item.symbol}:{" "}
                                            {item.balance}
                                          </label>
                                          <input
                                            type="text"
                                            className="input_button"
                                            value={item.volume}
                                            maxLength={15}
                                            onChange={(e) => {
                                              setVolume(
                                                e.target.value
                                                  .replace(/[^0-9.]/g, "")
                                                  .replace(/(\..*?)\..*/g, "$1")
                                              );
                                              setFinalAmount(
                                                e.target.value
                                                  .replace(/[^0-9.]/g, "")
                                                  .replace(
                                                    /(\..*?)\..*/g,
                                                    "$1"
                                                  ) - item.withdral_fee
                                              );
                                            }}
                                          />
                                        </div>
                                        <div className="signupform-control">
                                          <label htmlFor="coin_address">
                                            Destination Address
                                          </label>
                                          <input
                                            type="text"
                                            className="input_button"
                                            maxLength={60}
                                            onChange={(e) =>
                                              setToAddress(e.target.value)
                                            }
                                          />
                                        </div>
                                        <div className="signupform-control">
                                          <label htmlFor="coin_address">
                                            Withdrawal Fee
                                          </label>
                                          <input
                                            type="text"
                                            className="input_button"
                                            value={item.withdral_fee}
                                            readOnly
                                          />
                                        </div>
                                        {/* <div className="signupform-control">
                                        <label htmlFor="coin_address">
                                          Final Valume
                                        </label>
                                        <input
                                          type="text"
                                          className="input_button"
                                          value={famount >= 0 ? famount : "0"}
                                          maxLength={15}
                                        />
                                      </div> */}
                                        <div className="signupform-control">
                                          <label htmlFor="coin_address">
                                            Remark
                                          </label>
                                          <input
                                            type="text"
                                            className="input_button"
                                            value={remark}
                                            maxLength={60}
                                            onChange={(e) =>
                                              setRemark(e.target.value)
                                            }
                                          />
                                        </div>
                                        <div className="signupform-control">
                                          <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => {
                                              setWithLoading(true);
                                              N_crypto_withdraw(
                                                user?.params
                                                  ? user.params.user_id
                                                  : user.user_id,
                                                item.symbol,
                                                item.address,
                                                to_address,
                                                volume,
                                                remark
                                              ).then((d) => {
                                                setWithLoading(false);
                                                if (d.status == 200) {
                                                  showpopup(true);
                                                  otpCountdown();
                                                  setTransectionId(
                                                    d.params.transection_id
                                                  );
                                                  console.log("wr2: ", d);
                                                  setStatus(!status);
                                                  NotificationManager.success(
                                                    d.message
                                                  );
                                                } else {
                                                  NotificationManager.error(
                                                    d.message
                                                  );
                                                }
                                              });
                                            }}
                                          >
                                            {withLoading ? (
                                              <span className="loading-icon fas fa-spinner fa-spin mr-2"></span>
                                            ) : (
                                              "PROCEED WITH WITHDRAWAL"
                                            )}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </td>
                              </tr>
                            </>
                          ) : null}
                        </>
                      ))
                    ) : (
                      ""
                    )}
                  </tbody>
                </table>
              ) : activeTab == 1 ? (
                <table className="table table-border no-margin mdfthemetxt ">
                  <thead>
                    <tr className="bg-pale-dark">
                      <th>ASSET</th>
                      <th>TYPE</th>
                      <th>Transfered To</th>
                      <th>Transaction Hash</th>
                      <th>VOLUME</th>
                      <th>STATUS</th>
                      <th>TIME</th>
                    </tr>
                  </thead>
                  {history ? (
                    <tbody>
                      {loading ? (
                        <tr className="my-5">
                          <td colSpan={8}>
                            <FullLoader />
                          </td>
                        </tr>
                      ) : history ? (
                        history.map((d, index) => (
                          <tr key={index * 5}>
                            <td>{d.symbol}</td>
                            <td>{d.type}</td>
                            <td>{d.to_address}</td>
                            <td><a href={`https://bscscan.com/tx/${d.tx_id}`} target="_blank" className="text-truncate">{d.tx_id}</a></td>
                            <td>{d ? Number(d.amount).toFixed(4) : 0}</td>
                            <td>
                              {d.status == 1
                                ? "Success"
                                : d.status == -2
                                ? "Cancel"
                                : "Pending"}
                            </td>
                            <td>{new Date(d.createdAt).toLocaleString()}</td>
                          </tr>
                        ))
                      ) : null}
                    </tbody>
                  ) : null}
                </table>
              ) : (
                <table className="table table-border no-margin mdfthemetxt ">
                  <thead>
                    <tr className="bg-pale-dark">
                      <th>ASSET</th>
                      <th>TYPE</th>
                      <th>VOLUME</th>
                      <th>TDS (1%)</th>
                      <th>USDT (1% TDS)</th>
                      <th>Total USDT</th>
                      <th>TIME</th>
                    </tr>
                  </thead>
                  {btxxHistory ? (
                    <tbody>
                      {loading ? (
                        <tr className="my-5">
                          <td colSpan={8}>
                            <FullLoader />
                          </td>
                        </tr>
                      ) : btxxHistory ? (
                        btxxHistory.map((d, index) => (
                          <tr key={index * 5}>
                            <td>{d.currency_type}</td>
                            <td>Sell</td>
                            <td>{d ? Number(d.volume).toFixed(4) : 0}</td>
                            {/* <td>
                              {d.status == 1
                                ? "Success"
                                : d.status == -2
                                  ? "Cancel"
                                  : "Pending"}
                            </td> */}
                            <td>{d.tds}</td>
                            <td>{d.after_tds}</td>
                            <td>{d.usdt_return}</td>
                            <td>{new Date(d.createdAt).toLocaleString()}</td>
                          </tr>
                        ))
                      ) : null}
                    </tbody>
                  ) : null}
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
