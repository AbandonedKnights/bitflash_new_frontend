import React, { useState, useEffect } from "react";
import Header from "./ftx_design/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { isEmail, isPass } from "./redux/helpers/form-validator.functions";
import { checkEmail, checkPassword } from "./redux/helpers/helper_functions";
import { user_Login, user_authentication } from "./redux/actions/authActions";
import {
  N_getGoogleAuth,
  N_sendOTPMobileEmail,
} from "./redux/helpers/api_functions_new";
import $ from "jquery";

export default function Login(props) {
  const { isLoggedIn } = useSelector((state) => state.AuthReducer);
  if (isLoggedIn) props.history.replace("/exchange/btc-inr");
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState();
  const { webData } = useSelector((state) => state.websiteDBReducer);
  const [eye, seteye] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const hsPassword = (_id) => {
    var _idv = document.querySelector("#" + _id);
    if (_idv.getAttribute("type") == "text") {
      _idv.setAttribute("type", "password");
      seteye(false);
    } else {
      _idv.setAttribute("type", "text");
      seteye(true);
    }
  };

  /* const submit = (e) => {
    e.preventDefault();
    if (isEmail(email) && isPass(password)) {
      N_getGoogleAuth(email, password).then((data) => {
        if (data.status === 200 && data.params.authenticator_status === 0) {
          setLoading(true);
          dispatch(
            user_Login(
              email,
              password,
              () => {
                setLoading(false);
                props.history.replace("/otp");
              },
              () => setLoading(false)
            )
          );
        } else {
          if (data.status === 200 && data.params.authenticator_status === 1) {
            N_sendOTPMobileEmail(email, data.params.mobile_no);
            dispatch(
              user_authentication(
                email,
                password,
                data.params.authenticator_status,
                data.params.mobile_no,
                () => {
                  setLoading(false);
                  props.history.replace("/authenticator");
                }
              )
            );
          } else if (
            data.status === 200 &&
            data.params.authenticator_status === 2
          ) {
            dispatch(
              user_authentication(
                email,
                password,
                data.params.authenticator_status,
                data.params.authenticator_key,
                () => {
                  setLoading(false);
                  props.history.replace("/authenticator");
                }
              )
            );
          }
        }
      });
    }
  }; */

  function clearBackdrop() {
    $(".modal-backdrop").hide();
    $("body").removeClass("modal-open").css({overflow: "auto", paddingRight: "0px"});
    $("body").removeAttr("data-bs-overflow");
    $("body").removeAttr("data-bs-padding-right");
  }

  const submit = (e) => {
    e.preventDefault();
    if (!checkEmail(email)) {
      setEmailError("Not a valid email OR email should be in small letters");
    }
    if (!checkPassword(password)) {
      setPassError("Not a valid password");
    }
    if (!emailError && !passError) {
      N_getGoogleAuth(email, password).then((data) => {
        if (data.status === 200 && data.params.authenticator_status === 0) {
          setLoading(true);
          dispatch(
            user_Login(
              email,
              password,
              () => {
                setLoading(false);
                clearBackdrop();
                props.history.replace("/otp");
              },
              () => setLoading(false)
            )
          );
        } else {
          if (data.status === 200 && data.params.authenticator_status === 1) {
            N_sendOTPMobileEmail(email, data.params.mobile_no);
            dispatch(
              user_authentication(
                email,
                password,
                data.params.authenticator_status,
                data.params.mobile_no,
                () => {
                  setLoading(false);
                  clearBackdrop();
                  props.history.replace("/authenticator");
                }
              )
            );
          } else if (
            data.status === 200 &&
            data.params.authenticator_status === 2
          ) {
            dispatch(
              user_authentication(
                email,
                password,
                data.params.authenticator_status,
                data.params.authenticator_key,
                () => {
                  setLoading(false);
                  clearBackdrop();
                  props.history.replace("/authenticator");
                }
              )
            );
          }
        }
      });
    }
  };

  return (
    <>
      <Header {...props} />

      <div
        className="container-fluid vh-100"
        style={{
          backgroundImage:
            "url(/newimages/bitcoin-safety-and-security-Ment-Tech.jpeg)",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <div className="container vh-100">
          <div className="row align-items-center vh-100">
            <div className="col-lg-5 offset-lg-7 py-5">
              <div
                className="card card-body px-5"
                style={{ background: "rgba(0,0,0,0.7)" }}
              >
                <h1 className="">Register</h1>
                <form className="my-form" onSubmit={submit}>
                  <div className="text-center my-3">
                    <div className="mb-1">
                      Confirm you are using the official site
                    </div>
                    <div>
                      <span className="fas fa-lock"></span>{" "}
                      https://bitflash.finance
                    </div>
                    <div>
                      <img
                        src="/newimages/bitflash_logo.png"
                        style={{ height: "30px" }}
                      />
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <div class="form-floating bg-dark">
                      <input
                        id="user_email"
                        name="user_email"
                        type="email"
                        class="form-control bg-dark text-light"
                        placeholder="name@example.com"
                        autoFocus
                        required
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                      />
                      <label for="email">
                        <span className="fas fa-envelope"></span> Email address
                      </label>
                    </div>
                    {emailError && (
                      <div className="text-danger">{emailError}</div>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <div class="form-floating bg-dark">
                      <input
                        id="pass"
                        name="user_password"
                        type={showPassword ? "text" : "password"}
                        class="form-control bg-dark text-light"
                        placeholder="Password"
                        required
                        defaultValue={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label for="password">
                        <span className="fas fa-unlock-alt"></span> Password
                      </label>
                      <div
                        class="position-absolute top-50 end-0 translate-middle-y mx-3"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          setShowPassword(!showPassword);
                        }}
                      >
                        <span
                          className={
                            showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                          }
                        ></span>
                      </div>
                    </div>
                    {passError && (
                      <div className="text-danger">{passError}</div>
                    )}
                  </div>

                  <div className="form-group d-flex justify-content-end mb-3">
                    <div>
                      <a href="/forget">Forgot Password?</a>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-block btn-primary w-100 mb-3 d-flex align-items-center justify-content-center"
                    disabled={loading ? true : false}
                  >
                    {loading && (
                      <span
                        class="spinner-border spinner-border-sm mx-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    Sign In
                  </button>

                  <div className="text-center">
                    No account? <a href="/create">Register</a>
                  </div>
                </form>
              </div>
            </div>

            {/* <div class="col-md">
              <div
                className="col img_hider"
                style={{
                  backgroundImage: "url(./image/BG_5.png)",
                  height: "100vh",
                  backgroundSize: "cover",
                }}
              ></div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
