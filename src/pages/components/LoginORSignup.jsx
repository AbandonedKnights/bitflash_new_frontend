import React from "react";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
export default function LoginORSignup(props) {
  // const { webData } = useSelector((state) => state.websiteDBReducer);
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "350px" }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center w-50">
        <div className="w-100">
          <Link
            to="/login"
            className="btn btn-success btn-block text-uppercase font-weight-bold w-100"
          >
            <span className="text-white">login</span>
          </Link>
        </div>
        <div className="text-center my-2">OR</div>
        <div className="w-100">
          <Link
            to="/create"
            className="btn btn-outline-success btn-block text-uppercase btn-text-light font-weight-bold w-100"
          >
            <span>create an account</span>
          </Link>
        </div>
      </div>

      {/* <div
        className=""
        style={{
          textAlign: "center",
          height: "350px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link to="/login"> <b className="text-white btn btn-success"> Login </b></Link>

        <div
          style={{
            height: "25px",
            width: "25px",
            background: "rgba(255,255,255,0.3)",
            color: "#fff",
            fontSize: 11,
            borderRadius: "13px",
            padding: "5px",
            margin: "15px",
          }}
        >
          {" "}
         <b className="text-dark"> OR </b>
        </div>
        <Link to="/create" className="btn-theme-color ">
        <b className="text-white btn btn-success">  Create a new Account </b> 
        </Link>
      </div> */}
    </div>
  );
}
