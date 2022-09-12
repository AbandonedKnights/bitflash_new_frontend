import React from "react";
import { useSelector } from "react-redux";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { round } from "../redux/helpers/Math";

export default function MarketTrend() {
  const { coins } = useSelector((state) => state.coinDBReducer);
  let coins1 = Object.values(coins);
  const market_child =
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
            <tr>
              <td>
                <img
                  src={`${item.icon}`}
                  className="img-fluid mx-3"
                  style={{ height: "25px", width: "25px" }}
                />
                <span className="text-secondary mx-3">{item.name}</span>
              </td>
              <td>
                $
                {round(
                  item.raw_current_price_inr / usdtprize.raw_current_price_inr
                )}
              </td>
              <td>
                <span
                  className={
                    item.direction_inr == "up" ? "text-success" : "text-danger"
                  }
                >
                  {item.price_change_percentage_1h_inr}%
                </span>
              </td>
              <td style={{ width: "200px" }}>
                <Sparklines data={[0, item.price_change_percentage_1h_inr]}>
                  <SparklinesLine color="blue" />
                </Sparklines>
              </td>
              {/* <td>
                <button className="btn btn-success px-3">
                  <a href={`/exchange/${item.symbol}-USDT`}>
                    {" "}
                    <b className="text-white"> Buy </b>{" "}
                  </a>
                </button>
              </td> */}
            </tr>
          ) : (
            ""
          )}
        </>
      );
    });
  return (
    <>
      <div className="container-fluid">
        <div className="container py-5 text-dark">
          <h2 className="">Market Trend</h2>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <table
                className="table table-borderless text-dark"
                style={{ width: "100%" }}
              >
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>Last Price</th>
                    <th>24h Change</th>
                    <th>Graph</th>
                    {/* <th>Buy</th> */}
                  </tr>
                  {market_child}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
