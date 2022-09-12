import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmail, isPass } from "../redux/helpers/form-validator.functions";
import { user_Login, user_authentication } from "../redux/actions/authActions";
import { user_logout } from "../redux/actions/authActions";
import { switchTheme } from "../redux/actions/coinDBAction";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  N_getGoogleAuth,
  N_sendOTPMobileEmail,
} from "../redux/helpers/api_functions_new";
import { checkEmail, checkPassword } from "../redux/helpers/helper_functions";
import $ from "jquery";

export default function Header(props) {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.AuthReducer);
  console.log("props",props)

  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const { webData } = useSelector((state) => state.websiteDBReducer);

  const navLinks = [
    { title: "Exchange", page: "/exchange/btc-inr" },
    { title: "P2P", page: "/p2p/usdt-inr" },
    { title: "Staking", page: "/btexstaking" },
    { title: "Buy/Sell", page: "/buy-sell" },
  ];

  function clearBackdrop() {
    $(".modal-backdrop").hide();
    $("body").removeClass("modal-open").css({overflow: "auto", paddingRight: "0px"});
    $("body").removeAttr("data-bs-overflow");
    $("body").removeAttr("data-bs-padding-right");
  }

  async function backRouter() {
    dispatch(
      user_logout(() => {
        //props.history.replace("/exchange/btc-inr");
        document.location.reload();
      })
    );
  }
  async function swtchTheme(theme_name) {
    dispatch(switchTheme(theme_name));
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
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">
              <img
                src="/newimages/bitflash_logo.png"
                style={{ height: "30px" }}
              />
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                {navLinks.map((navlink) => (
                  <li class="nav-item mx-2">
                    <a class="nav-link fw-bold text-white py-2" href={navlink.page}>
                      {navlink.title}
                    </a>
                  </li>
                ))}
              </ul>
              {/* <form class="d-flex" role="search">
                <div className="input-group">
                  <span class="input-group-text" id="basic-addon1">
                    <span className="fas fa-serach"></span>
                  </span>
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </div>
              </form> */}
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                {isLoggedIn ? (
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link fw-bold dropdown-toggle text-white py-2"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="fas fa-user"></span>
                    </a>
                    <ul
                      class="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <a class="dropdown-item" href="/wallet">
                          Funds
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/profile">
                          Account
                        </a>
                      </li>
                      {/* <li>
                      <hr class="dropdown-divider" />
                    </li> */}
                      <li>
                        <a class="dropdown-item" href="#">
                          Support
                        </a>
                      </li>
                      <li>
                        <a
                          class="dropdown-item"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            backRouter();
                          }}
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <>
                    <li class="nav-item mx-2">
                      <a
                        class="nav-link fw-bold text-white py-2"
                        aria-current="page"
                        href="/login"
                        /* data-bs-toggle="modal"
                        data-bs-target="#exampleModal" */
                      >
                        Login
                      </a>
                    </li>
                    <li class="nav-item mx-2">
                      <a class="nav-link mbtn fw-bold px-4 text-white py-2" href="/create">
                        Create a free account
                      </a>
                    </li>
                  </>
                )}

                {/* <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled">Disabled</a>
              </li> */}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {/* Login Model */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-body">
              <form className="my-form" onSubmit={submit}>
                <div className="text-center my-3">
                  <div className="mb-1">
                    Confirm you are using the official site
                  </div>
                  <div>
                    <span className="fas fa-lock"></span> https://bitflash.finance
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
                  {passError && <div className="text-danger">{passError}</div>}
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
        </div>
      </div>
    </>
  );
}
