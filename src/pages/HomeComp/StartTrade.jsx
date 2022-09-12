import React from "react";
import { Link } from "react-router-dom";

export default function StartTrade() {
  return (
    <>
      <div className="container-fluid text-dark bg-light">
        <div className="row text-center py-5">
          <div className="col-12">
            <h4>Start Trading now</h4>
            <div className="my-4">
              <Link className="btn btn-warning mx-4 px-4" to="/login">Register Now</Link>
              <Link
                className="btn btn-light px-4 mx-4"
                style={{ background: "rgb(220 220 220)" }}
                to="/exchange/btc-inr"
              >
                Trade Now
              </Link>
            </div>
          </div>
        </div>
      </div>



     

    </>
  );
}
