import React from "react";
import { useSelector } from "react-redux";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { round } from "../redux/helpers/Math";

export default function MarketTrendNew() {
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
            <tr className="bg-transparent border border-0">
              <td className="border-0">
                <img
                  src={`${item.icon}`}
                  className="img-fluid mx-3"
                  style={{ height: "25px", width: "25px" }}
                />
                <span className="text-secondary mx-3">{item.name}</span>
              </td>
              <td className="border-0">
                $
                {round(
                  item.raw_current_price_inr / usdtprize.raw_current_price_inr
                )}
              </td>
              <td className="border-0">
                <span
                  className={
                    item.direction_inr == "up" ? "text-success" : "text-danger"
                  }
                >
                  {item.price_change_percentage_1h_inr}%
                </span>
              </td>
              <td className="border-0" style={{ width: "200px" }}>
                <Sparklines data={[0, item.price_change_percentage_1h_inr]}>
                  <SparklinesLine color="blue" />
                </Sparklines>
              </td>
              <td className="border-0 text-right">
                <a className="btn btn-success" href={`/exchange/${item.symbol}-USDT`}>
                  Buy
                </a>
              </td>
            </tr>
          ) : (
            ""
          )}
        </>
      );
    });
  return (
    <>
      <div className="container-fluid  text-dark starts">
        <h2 className="">Market Trend</h2>
        <div className="row justify-content-between">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <table className="table text-dark">
              <thead>
                <tr className="border-0">
                  <td className="border-0">Name</td>
                  <td className="border-0">Last Price</td>
                  <td className="border-0">24h Change</td>
                  <td className="border-0">Graph</td>
                  <td className="border-0 text-right">Buy</td>
                </tr>
              </thead>
              <tbody>{market_child}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
