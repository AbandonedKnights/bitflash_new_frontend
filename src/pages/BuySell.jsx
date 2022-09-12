import Header from "./ftx_design/Header";
import Footer from "./HomeComp/Footer";
import "./buySell.css";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getFormData } from "../helpers";
import { NotificationManager } from "react-notifications";

export default function BuySell() {
  const { isLoggedIn, user } = useSelector((state) => state.AuthReducer);
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [selectedWallet, setSelectedWallet] = useState({});
  const [selectedAction, setSelectedAction] = useState("sell");
  const [sellAmount, setSellAmount] = useState(0);
  const [isSelling, setIsSelling] = useState(false);
  const [btxxWallet, setBtxxWallet] = useState({});
  const [usdtWallet, setUsdtWallet] = useState({});
  const [atPrice, setAtPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const coin = [];
  const { webData } = useSelector((state) => state.websiteDBReducer);
  const rupeeToUsd = 0.013;
  const currencies = {
    BTXX: {
      icon: "btxx_sm.png",
    },
  };

  const [wallets, setWallets] = useState([]);

  async function getWallets() {
    axios
      //.post("https://getwallet.btexapi.cloud/api/get-wallets", {
      .post("https://api.bitflash.finance/api/get-wallets", {
        user_id: user.user_id,
      })
      .then((res) => {
        const w = res.data.params.wallets.filter((i) => i.symbol == "BTXX");
        setWallets([...w]);
        setBtxxWallet(w[0]);
        setUsdtWallet({
          ...res.data.params.wallets.filter((i) => i.symbol == "USDT")[0],
        });
        //console.log("Wallet Data :: ", res.data);
      })
      .catch((error) => {
        console.log("BTXX sell :: ", error.message);
      });
  }

  async function sellCurrency(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    //console.log(formData);
    if (isNaN(formData.sell_amount)) {
      NotificationManager.error("Please enter valid amount");
    } else {
      setIsSelling(true);
      axios
        .post("https://btexapi.cloud/api/direct-sell", formData)
        .then((res) => {
          setIsSelling(false);
          const resData = res.data;
          if (resData.status == 200) {
            e.target.reset();
            NotificationManager.success(resData.message);
            getWallets();
          } else {
            NotificationManager.error(resData.message);
          }
        })
        .catch((error) => {
          setIsSelling(false);
          NotificationManager.error("Something went worong");
          console.log("BTXX sell :: ", error.message);
        });
    }
  }

  function buySellToken() {
    if (isNaN(sellAmount)) {
      NotificationManager.error("Please enter valid amount");
    } else {
      let url =
        selectedAction == "sell"
          ? "https://api.bitflash.finance/api/direct-sell"
          : "https://api.bitflash.finance/api/direct-buy";
      const params = {
        user_id: user.user_id,
      };
      if (selectedAction == "sell") {
        params.sell_token = selectedCurrency;
        params.sell_amount = sellAmount;
      } else if (selectedAction == "buy") {
        params.buy_token = selectedCurrency;
        params.buy_amount = sellAmount;
      }
      setIsSelling(true);
      console.log("Params :: ", params);
      axios
        .post(url, params)
        .then((res) => {
          setIsSelling(false);
          const resData = res.data;
          if (resData.status == 200) {
            //e.target.reset();
            window.location.reload();
            NotificationManager.success(resData.message);
            getWallets();
          } else {
            NotificationManager.error(resData.message);
          }
        })
        .catch((error) => {
          setIsSelling(false);
          NotificationManager.error("Something went worong");
          console.log("BTXX sell :: ", error.message);
        });
    }
  }

  useEffect(() => {
    //console.log(webData.direct_btxx_buy, webData.direct_btxx_sell);
    setAtPrice(
      selectedAction == "sell"
        ? webData.direct_btxx_sel * rupeeToUsd
        : webData.direct_btxx_buy * rupeeToUsd
    );
  }, [selectedAction]);

  useEffect(() => {
    getWallets();
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid" style={{ minHeight: "70vh" }}>
        <div className="row">
          <div className="col-12 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
            <form onSubmit={(e) => sellCurrency(e)}>
              <input type="hidden" name="user_id" value={user.user_id} />
              <div className="buy-sell card card-body text-dark text-center mt-4 p-5">
                <h1 className="text-dark h2 mb-3 text-left">Buy / Sell</h1>

                {/* <div className="">
                  <div
                    className="form-radio-check flex-grow-1 border p-2 mx-0"
                    style={{ borderRadius: "10px" }}
                  >
                    <input
                      className="form-radio-check-input"
                      type="radio"
                      id="inlineRadio1"
                      value="buy"
                      name="action"
                      onChange={(e)=>{setSelectedAction(e.target.value)}}
                    />
                    <label
                      className="form-radio-check-label h5"
                      for="inlineRadio1"
                    >
                      Buy
                    </label>
                  </div>
                  <div
                    className="rcontainer form-radio-check flex-grow-1 border p-2 mx-0"
                    style={{ borderRadius: "10px" }}
                  >
                    <input
                      className="form-radio-check-input"
                      checked
                      type="radio"
                      id="inlineRadio2"
                      value="sell"
                      name="action"
                      onChange={(e)=>{setSelectedAction(e.target.value)}}
                    />
                    <label
                      className="form-radio-check-label h5"
                      for="inlineRadio2"
                    >
                      Sell
                    </label>
                  </div>
                 
                </div> */}

                <div class="form-floating mb-3">
                  <select
                    class="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    style={{ borderRadius: "10px" }}
                    onChange={(e) => {
                      setSelectedCurrency(e.target.value);
                      setSelectedWallet(
                        wallets.filter((i) => i.symbol == e.target.value)[0]
                      );
                      setSellAmount(selectedWallet.balance);
                    }}
                    name="sell_token"
                  >
                    <option value="" selected disabled>
                      Select Currency
                    </option>
                    {wallets.map((wallet, index) => (
                      <option
                        key={index}
                        value={wallet.symbol}
                      >{`${wallet.name} (${wallet.symbol})`}</option>
                    ))}
                  </select>
                  <label for="floatingSelect" className="fw-bold">
                    {selectedCurrency && (
                      <img
                        src={
                          currencies?.[selectedCurrency]?.icon
                            ? `/image/${currencies?.[selectedCurrency]?.icon}`
                            : selectedWallet.icon
                        }
                        className="me-2"
                      />
                    )}
                    <span>
                      {selectedWallet?.name
                        ? selectedWallet.name
                        : "Select Currency"}
                    </span>
                  </label>
                </div>
                <div className="mb-3">
                  <div class="form-floating">
                    <input
                      type="number"
                      class="form-control"
                      id="floatingInput"
                      placeholder={`${selectedWallet.symbol} Amount`}
                      value={sellAmount}
                      style={{ borderRadius: "10px" }}
                      onChange={(e) => {
                        setSellAmount(e.target.value);
                      }}
                      name="sell_amount"
                      readOnly={
                        Object.entries(selectedWallet).length == 0 ||
                        selectedWallet.balance <= 0
                      }
                    />
                    <label for="floatingInput" className="fw-bold">
                      {selectedWallet.symbol} Amount
                    </label>
                  </div>
                  {selectedAction == "buy" ? (
                    <div className="text-start">
                      <small className="fw-bold text-success">
                        {isNaN(sellAmount * (rupeeToUsd * webData.direct_btxx_buy)) ? 0 : (sellAmount * (rupeeToUsd * webData.direct_btxx_buy))} {usdtWallet.symbol} Needed
                      </small>
                    </div>
                  ) : null}
                </div>

                {/* Buy Sell dropdown */}
                <div className="">
                  {/* <div
                    className="form-radio-check flex-grow-1 border p-2 mx-0"
                    style={{ borderRadius: "10px" }}
                  >
                    <input
                      className="form-radio-check-input"
                      type="radio"
                      id="inlineRadio1"
                      value="buy"
                      name="action"
                      onChange={(e)=>{setSelectedAction(e.target.value)}}
                    />
                    <label
                      className="form-radio-check-label h5"
                      for="inlineRadio1"
                    >
                      Buy
                    </label>
                  </div>
                  <div
                    className="rcontainer form-radio-check flex-grow-1 border p-2 mx-0"
                    style={{ borderRadius: "10px" }}
                  >
                    <input
                      className="form-radio-check-input"
                      checked
                      type="radio"
                      id="inlineRadio2"
                      value="sell"
                      name="action"
                      onChange={(e)=>{setSelectedAction(e.target.value)}}
                    />
                    <label
                      className="form-radio-check-label h5"
                      for="inlineRadio2"
                    >
                      Sell
                    </label>
                  </div> */}
                  <div class="form-floating mb-3">
                    <select
                      class="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      style={{ borderRadius: "10px" }}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setSelectedAction(e.target.value);
                      }}
                      name="action"
                    >
                      <option value="sell" selected={selectedAction == "sell"}>
                        Sell {selectedWallet.symbol}
                      </option>
                      <option value="buy" selected={selectedAction == "buy"}>
                        Buy {selectedWallet.symbol}
                      </option>
                    </select>
                    <label for="floatingSelect" className="fw-bold">
                      <span>Buy OR Sell</span>
                    </label>
                  </div>
                </div>

                {/* <div class="row">
                <div class="col-12 mb-4">
                  <input
                    type="text"
                    class="form-control"
                    id="currency"
                    placeholder="Enter Quantity (BTXX)"
                  />
                </div>
                <div class="col-12 mb-4">
                  <input
                    type="text"
                    class="form-control"
                    id="inputPassword"
                    placeholder="Enter Amount (USDT)"
                  />
                </div>
              </div> */}

                {/* <div className="buySell-percentage d-flex align-item-center justify-content-around mb-4">
                  <div className="form-radio-check w-25 mr-2">
                    <input
                      className="form-radio-check-input"
                      type="radio"
                      id="inlineRadio-1"
                      name="sell_per"
                      value="25"
                      onChange={() => {
                        console.log("Hello");

                        const am = selectedAction == "sell" ? (selectedWallet.balance * 25) / 100 : ((usdtWallet.balance * 25) / 100) * rupeeToUsd;
                        //console.log(selectedWallet.balance);
                        setSellAmount(am);
                      }}
                      disabled={
                        Object.entries(selectedWallet).length == 0 ||
                        selectedWallet.balance <= 0
                      }
                    />
                    <label
                      className="form-radio-check-label btn btn-block border border-primary"
                      for="inlineRadio-1"
                    >
                      25%
                    </label>
                  </div>
                  <div className="form-radio-check w-25 mr-2">
                    <input
                      className="form-radio-check-input"
                      type="radio"
                      id="inlineRadio-2"
                      name="sell_per"
                      value="50"
                      onChange={() => {
                        const am = selectedAction == "sell" ? (selectedWallet.balance * 50) / 100 : ((usdtWallet.balance * 50) / 100) * rupeeToUsd;
                        //console.log(selectedWallet.balance);
                        setSellAmount(am);
                      }}
                      disabled={
                        Object.entries(selectedWallet).length == 0 ||
                        selectedWallet.balance <= 0
                      }
                    />
                    <label
                      className="form-radio-check-label btn btn-block border border-primary"
                      for="inlineRadio-2"
                    >
                      50%
                    </label>
                  </div>
                  <div className="form-radio-check w-25 mr-2">
                    <input
                      className="form-radio-check-input"
                      type="radio"
                      id="inlineRadio-3"
                      name="sell_per"
                      value="75"
                      onChange={() => {
                        const am = selectedAction == "sell" ? (selectedWallet.balance * 75) / 100 : ((usdtWallet.balance * 75) / 100) * rupeeToUsd;
                        //console.log(selectedWallet.balance);
                        setSellAmount(am);
                      }}
                      disabled={
                        Object.entries(selectedWallet).length == 0 ||
                        selectedWallet.balance <= 0
                      }
                    />
                    <label
                      className="form-radio-check-label btn btn-block border border-primary"
                      for="inlineRadio-3"
                    >
                      75%
                    </label>
                  </div>
                  <div className="form-radio-check w-25">
                    <input
                      className="form-radio-check-input"
                      type="radio"
                      id="inlineRadio-4"
                      name="sell_per"
                      value="100"
                      onChange={() => {
                        const am = selectedAction == "sell" ? (selectedWallet.balance * 100) / 100 : ((usdtWallet.balance * 100) / 100) * rupeeToUsd;
                        //console.log(selectedWallet.balance);
                        setSellAmount(am);
                      }}
                      disabled={
                        Object.entries(selectedWallet).length == 0 ||
                        selectedWallet.balance <= 0
                      }
                    />
                    <label
                      className="form-radio-check-label btn btn-block border border-primary"
                      for="inlineRadio-4"
                    >
                      100%
                    </label>
                  </div>
                </div> */}

                <div className="balance h6 mb-4">
                  Available Balance{" "}
                  {selectedAction == "sell" ? (
                    <span>
                      {" "}
                      {selectedWallet.symbol}
                      <strong className="text-primary mx-2">
                        {selectedWallet.balance <= 0
                          ? "No Balance"
                          : selectedWallet.balance}
                      </strong>
                    </span>
                  ) : (
                    <span>
                      {" "}
                      {usdtWallet.symbol}
                      <strong className="text-primary mx-2">
                        {usdtWallet.balance <= 0
                          ? "No Balance"
                          : usdtWallet.balance}{" "}
                        - {isNaN(sellAmount * (rupeeToUsd * webData.direct_btxx_buy)) ? 0 : (sellAmount * (rupeeToUsd * webData.direct_btxx_buy))} ={" "}
                        {Number(usdtWallet.balance) -
                          (isNaN(sellAmount * (rupeeToUsd * webData.direct_btxx_buy)) ? 0 : (sellAmount * (rupeeToUsd * webData.direct_btxx_buy)))}
                      </strong>
                    </span>
                  )}
                </div>
                {/* <div className="min-trade h6 mb-4">Min Trade : <strong>$ 400</strong></div> */}

                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-success btn-lg fw-bold btn-block py-3"
                    style={{ borderRadius: "10px" }}
                    disabled={
                      Object.entries(selectedWallet).length == 0 ||
                      selectedWallet.balance <= 0
                    }
                    data-bs-toggle="modal"
                    data-bs-target={
                      selectedAction == "sell" ? "#TDSIntro" : "#confirmBuy"
                    }
                  >
                    {isSelling ? (
                      <>
                        <span
                          class="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span className="ms-2">
                          {selectedAction == "sell" ? "Selling" : "Buying"}{" "}
                          {selectedWallet.symbol}...
                        </span>
                      </>
                    ) : (
                      <span>
                        <span className="text-capitalize">
                          {selectedAction}
                        </span>{" "}
                        {selectedWallet.symbol}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />

      {/* ConfirmSell Modal */}
      <div
        class="modal fade"
        id="confirmSell"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="confirmSellLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="confirmSellLabel">
                Confirm Sell
              </h5>
            </div>
            <div class="modal-body">
              <div className="d-flex justify-content-between py-2">
                <div>At Price : </div>
                <div>
                  <strong>{atPrice}</strong>
                </div>
              </div>
              <div className="d-flex justify-content-between py-2">
                <div>Amount : </div>
                <div>
                  <strong>
                    {sellAmount}{" "}
                    <span className="text-uppercase">{selectedCurrency}</span>
                  </strong>
                </div>
              </div>
              <div className="d-flex justify-content-between py-2">
                <div>Total : </div>
                <div>
                  <strong>{sellAmount * atPrice}</strong>
                </div>
              </div>
              <div className="d-flex justify-content-between py-2">
                <div>Total after TDS (1%) : </div>
                <div>
                  <strong>
                    {sellAmount * atPrice - (sellAmount * atPrice) / 100}
                  </strong>
                </div>
              </div>
              <div className="m-0">
                Fee: Maker fee: 0.1% Taker fee: 0.1% TDS: 1%
              </div>
            </div>
            <div class="modal-footer border-0 d-flex justify-content-center">
              <div className="flex-grow-1">
                <button
                  type="button"
                  class="btn btn-danger w-100"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
              <div className="flex-grow-1">
                <button
                  type="button"
                  class="btn btn-success w-100"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    if (isLoggedIn) {
                      buySellToken();
                    } else {
                      NotificationManager.error(
                        "First login then perform buy/sell"
                      );
                    }
                  }}
                >
                  Confirm Sell
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TDS Intro Modal */}
      <div
        class="modal fade"
        id="TDSIntro"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="TDSIntroLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="TDSIntroLabel">
                TDS On Crypto Trades
              </h5>
              {/* <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button> */}
            </div>
            <div class="modal-body">
              <p className="text-light">
                From 1 July 2022, TDS (Tax Deducted at Source) of 1% (5% in
                exceptional cases) of the trade value will be deducted on each
                trade as per the Government's guidelines issued on Virtual
                Digital Asset (VDA) transfers. This TDS can be claimed while
                filing your ITR.
              </p>
              <a href="">Know more..</a>
            </div>
            <div class="modal-footer border-0 d-flex justify-content-center">
              <div className="flex-grow-1">
                <button
                  type="button"
                  class="btn btn-success w-100"
                  data-bs-target="#confirmSell"
                  data-bs-toggle="modal"
                >
                  GOT IT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ConfirmBuy Modal */}
      <div
        class="modal fade"
        id="confirmBuy"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="confirmBuyLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="confirmBuyLabel">
                Confirm Buy
              </h5>
              {/* <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button> */}
            </div>
            <div class="modal-body">
              <div className="d-flex justify-content-between py-2">
                <div>At Price : </div>
                <div>
                  <strong>{atPrice}</strong>
                </div>
              </div>
              <div className="d-flex justify-content-between py-2">
                <div>Amount : </div>
                <div>
                  <strong>
                    {sellAmount}{" "}
                    <span className="text-uppercase">{selectedCurrency}</span>
                  </strong>
                </div>
              </div>
              <div className="d-flex justify-content-between py-2">
                <div>Total : </div>
                <div>
                  <strong>{sellAmount * atPrice}</strong>
                </div>
              </div>
              <div className="m-0">Fee: Maker fee: 0.1% Taker fee: 0.1%</div>
            </div>
            <div class="modal-footer border-0 d-flex justify-content-center">
              <div className="flex-grow-1">
                <button
                  type="button"
                  class="btn btn-danger w-100"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
              <div className="flex-grow-1">
                <button
                  type="button"
                  class="btn btn-success w-100"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    if (isLoggedIn) {
                      buySellToken();
                    } else {
                      NotificationManager.error(
                        "First login then perform buy/sell"
                      );
                    }
                  }}
                >
                  Confirm Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
