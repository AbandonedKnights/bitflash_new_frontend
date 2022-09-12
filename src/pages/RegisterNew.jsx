import React, { useState } from "react";
import Header from "./ftx_design/Header";
import { Link } from "react-router-dom";
import {
  isCpass,
  isEmail,
  isPass,
} from "./redux/helpers/form-validator.functions";
import { useDispatch, useSelector } from "react-redux";
import { user_Register } from "./redux/actions/authActions";
import $ from "jquery";
import { NotificationManager } from "react-notifications";
import { getElementError } from "@testing-library/react";
import { checkEmail, checkPassword } from "./redux/helpers/helper_functions";

export default function RegisterNew(props) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [cPassError, setCPassError] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.AuthReducer);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confPassword, setConfPassword] = useState();
  const [referral_code, setReferral] = useState(
    props?.match?.params?.id ? props?.match?.params?.id : ""
  );

  const [hasUCaseL, setUCaseL] = useState(false);
  const [hasLCaseL, setLCaseL] = useState(false);
  const [hasDgt, setDgt] = useState(false);
  const [hasSS, setSS] = useState(false);
  const [hasL, setL] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState();
  const { webData } = useSelector((state) => state.websiteDBReducer);
  if (isLoggedIn) props.history.replace("/exchange/btc-inr");
  const hsPassword = (_id) => {
    var _idv = document.querySelector("#" + _id);
    if (_idv.getAttribute("type") == "text") {
      _idv.setAttribute("type", "password");
    } else {
      _idv.setAttribute("type", "text");
    }
  };

  function validatePass(pass) {
    const uCaseL = /^(?=.*?[A-Z])/;
    const lCaseL = /^(?=.*?[a-z])/;
    const dgts = /^(?=.*?[0-9])/;
    const ss = /^(?=.*?[#?!@$%^&*-])/;
    setUCaseL(uCaseL.test(pass));
    setLCaseL(lCaseL.test(pass));
    setDgt(dgts.test(pass));
    setSS(ss.test(pass));
    setL(pass.length >= 8);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!checkEmail(email)) {
      setEmailError("Not a valid email OR email should be in small letters");
    }
    if (!checkPassword(password)) {
      setPassError("Not a valid password");
    }
    if (!checkPassword(confPassword)) {
      setCPassError("Not a valid password");
    }
    if (password != confPassword) {
      console.log("p failed", cPassError, !cPassError);
      setCPassError("Password confirmation failed.");
    }

    if (
      (!emailError && !passError && !cPassError) ||
      password != confPassword
    ) {
      if (agree) {
        console.log("Register");
        //$(".main_terms").removeClass("border-danger");
        setLoading(true);
        dispatch(
          user_Register(
            email,
            password,
            confPassword,
            referral_code,
            () => {
              setLoading(false);
              props.history.replace("/otp");
            },
            () => setLoading(false)
          )
        );
      } else {
        NotificationManager.error("Please Agree with term condition !");
        //$(".main_terms").addClass("border-danger");
      }
    }
  };
  return (
    <>
      <Header {...props} />
      <div
        className="container-fluid mvh-100"
        style={{
          backgroundImage:
            "url(/newimages/bitcoin-safety-and-security-Ment-Tech.jpeg)",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <div className="container mvh-100">
          <div className="row align-items-center mvh-100">
            <div className="col-lg py-5">
              <h1 className="main-title">Create an account,</h1>
              <h3 className="main-title">start your crypto journey with us.</h3>
              <div className="my-3">
                <a
                  href="/exchange/btc-inr"
                  className="btn btn-warning fw-bold px-5 py-3"
                >
                  Let's Start
                </a>
              </div>
            </div>
            <div className="col-lg-4 py-5">
              <div
                className="card card-body"
                style={{ background: "rgba(0,0,0,0.7)" }}
              >
                <h1 className="">Register</h1>
                <form className="my-form" onSubmit={onSubmit}>
                  <div className="form-group mb-3">
                    <div class="form-floating">
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
                    <div class="form-floating">
                      <input
                        id="pass"
                        name="user_password"
                        type={showPassword ? "text" : "password"}
                        class="form-control bg-dark text-light"
                        placeholder="Password"
                        required
                        defaultValue={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          validatePass(e.target.value);
                        }}
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
                    <ul className="list-unstyled my-1 bg-dark rounded p-2">
                      <li className={hasL ? "text-success" : "text-warning"}>
                        <span className="fas fa-check-circle"></span> 8
                        Character long
                      </li>
                      <li
                        className={hasUCaseL ? "text-success" : "text-warning"}
                      >
                        <span className="fas fa-check-circle"></span> One
                        Uppercase letter
                      </li>
                      <li
                        className={hasLCaseL ? "text-success" : "text-warning"}
                      >
                        <span className="fas fa-check-circle"></span> One
                        Lowercase letter
                      </li>
                      <li className={hasDgt ? "text-success" : "text-warning"}>
                        <span className="fas fa-check-circle"></span> One Digit
                      </li>
                      <li className={hasSS ? "text-success" : "text-warning"}>
                        <span className="fas fa-check-circle"></span> One
                        Special symbol
                      </li>
                    </ul>
                    {passError && (
                      <div className="text-danger">{passError}</div>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <div class="form-floating">
                      <input
                        id="cpass"
                        name="user_cpassword"
                        type={showCPassword ? "text" : "password"}
                        class="form-control bg-dark text-light"
                        placeholder="Confirm Password"
                        required
                        defaultValue={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                      />
                      <label for="password">
                        <span className="fas fa-unlock-alt"></span> Confirm
                        Password
                      </label>
                      <div
                        class="position-absolute top-50 end-0 translate-middle-y mx-3"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          setShowCPassword(!showCPassword);
                        }}
                      >
                        <span
                          className={
                            showCPassword ? "fas fa-eye-slash" : "fas fa-eye"
                          }
                        ></span>
                      </div>
                    </div>
                    {cPassError && (
                      <div className="text-danger">{cPassError}</div>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <div class="form-floating">
                      <input
                        id="refercode"
                        name="refercode"
                        type="text"
                        class="form-control bg-dark text-light"
                        placeholder="Referral Code"
                        defaultValue={referral_code}
                        onChange={(e) => setReferral(e.target.value)}
                      />
                      <label for="email">
                        <span className="fas fa-envelope"></span> Referral Code
                      </label>
                    </div>
                    {/* {emailError && (
                      <div className="text-danger">{emailError}</div>
                    )} */}
                  </div>

                  <div className="form-group mb-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="agree_terms"
                        name="agree_terms"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                      />
                      <label
                        class="form-check-label"
                        for="flexCheckIndeterminate"
                      >
                        I agree to Bitflash's{" "}
                        <a href="/terms-condition">Terms of service.</a>
                      </label>
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
                    Register
                  </button>
                </form>
              </div>

              <div
                className="card card-body text-center my-2"
                style={{ background: "rgba(0,0,0,0.7)" }}
              >
                <span>Allready have an account. </span>
                <a
                  className="d-inline-block text-decoration-none"
                  href="/"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Login
                </a>
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

      {/* <div class="container-fluid bg-white p-4">
        <div class="row">
          <div class="col-sm-12 col-md-6  ">
            <div className="row d-flex justify-content-center mdfthemetxt">
              <div
                className={" container"}
                style={{ backgroundColor: " tranparent" }}
              >
                <div className="row d-flex justify-content-center">
                  <div className="col-12 col-md-11 col-sm-12 ">
                    <form
                      className="signupform theme-color-text"
                      method="post"
                      id="signupform"
                      onSubmit={onSubmit}
                    >
                      <div>
                        <h2 className="text-center">
                          Register
                        </h2>
                      </div>
                      <div className="signupform-control">
                        <small id="msg" style={{ fontSize: "15px" }}>
                          Error Message
                        </small>
                      </div>
                      <div className={`signupform-control`}>
                        <label htmlFor="user_email">EMAIL</label>
                        <input
                          type="email"
                          name="user_email"
                          required=""
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="signupform-control"
                          id="user_email"
                          placeholder="example@gmail.com"
                        />
                        <i className="fas fa-check-circle"></i>
                        <i className="fas fa-exclamation-circle"></i>
                        <small></small>
                      </div>
                      <div className={`signupform-control`}>
                        <label htmlFor="user_password">PASSWORD</label>
                        <div className="input-group mb-3">
                          <input
                            type={showPass ? "text" : "password"}
                            className="form-control"
                            name="user_password"
                            required=""
                            value={password}
                            onChange={function (e) {
                              setPassword(e.target.value);
                            }}
                            // onChange={(e) => }
                            //id="pass"
                            placeholder="password"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-outline-success" onClick={(e)=>{setShowPass(!showPass)}}>
                              <span className={showPass ? "fas fa-eye-slash" : "fas fa-eye"}></span>
                            </button>
                            <a
                        href="#view_qr"
                        className="input-group-text"
                        style={{ border: "1px" }}
                        onClick={(e) => {
                          hsPassword("pass");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#28a745"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                      </a>
                          </div>
                        </div>
                        <ul className="text-dark" style={{ fontSize: "13px" }}>
                          <li id="list_1"> 1 Uppercase Character</li>
                          <li id="list_2"> 1 Numeric Value</li>
                          <li id="list_3"> 1 Special Symbol eg:@#</li>
                          <li id="list_4"> length should be greater than 8 </li>
                        </ul>

                        <small
                          id="passerr"
                          className="text-danger"
                          style={{ top: "53%" }}
                        ></small>
                      </div>
                      <div className={`signupform-control`}>
                        <label htmlFor="user_cpassword">CONFIRM PASSWORD</label>
                        <div className="input-group mb-3">
                          <input
                            type={showCPass ? "text" : "password"}
                            className="form-control"
                            name="user_cpassword"
                            id="cpass"
                            required=""
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                            placeholder="confirm password"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-outline-success" onClick={(e)=>{setShowCPass(!showCPass)}}>
                              <span className={showCPass ? "fas fa-eye-slash" : "fas fa-eye"}></span>
                            </button>
                            <a
                        href="#view_qr"
                        className="input-group-text"
                        style={{ border: "1px" }}
                        onClick={(e) => {
                          hsPassword("cpass");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#28a745"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                      </a>
                          </div>
                        </div>
                        <small
                          id="cpasserr"
                          className="text-danger"
                          style={{ top: "70%" }}
                        ></small>
                      </div>
                      <div className={`signupform-control`}>
                        <label htmlFor="refercode">
                          REFERRAL CODE (OPTIONAL)
                        </label>
                        <input
                          type="text"
                          name="refercode"
                          id="refercode"
                          required=""
                          value={referral_code}
                          onChange={(e) => setReferral(e.target.value)}
                          placeholder="Referral code"
                        />
                        <i className="fas fa-check-circle"></i>
                        <i className="fas fa-exclamation-circle"></i>
                        <small></small>
                      </div>
                      <div className="main_terms">
                        <input
                          type="checkbox"
                          id="agree_terms"
                          name="agree_terms"
                          checked={agree}
                          onChange={(e) => setAgree(e.target.checked)}
                        />
                        <span className="terms">
                          I agree to {webData.website_title}'s
                          <Link to="/terms-condition">
                            {" "}
                            <span className="terms_condition">
                              {" "}
                              Terms of Service
                            </span>
                          </Link>
                        </span>
                      </div>
                      <button
                        type="submit"
                        id="btn_submit"
                        className="reg_btn bg-success w-50 "
                        style={{ marginLeft: "10vw" }}
                      >
                        {loading ? (
                          <i className="loading-icon fas fa-spinner fa-spin mr-2 "></i>
                        ) : null}
                        <span id="reg">REGISTER</span>
                      </button>
                      <Link className="signupform-login text-dark" to="/login">
                        <b>Have an Account ? </b>{" "}
                        <b className="text-success"> LOGIN </b>
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm">
            <div
              className="col img_hider"
              style={{
                backgroundImage: "url(./image/BG_5.png)",
                height: "100vh",
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        </div>
      </div> */}
    </>
  );
}
