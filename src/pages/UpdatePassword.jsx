import React, { useState } from "react";
import Header from "./ftx_design/Header";
import "./login.css";
import { isCpass, isPass, setErrorFor1 } from "./redux/helpers/form-validator.functions";
import { password_update } from "./redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { checkPassword } from "./redux/helpers/helper_functions";
import NotificationManager from "react-notifications/lib/NotificationManager";

export default function Forget(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const [password, setPassword] = useState();
  const [confPassword, setConfPassword] = useState();
  const { otp_send, user } = useSelector((state) => state.AuthReducer);
  if (!otp_send) props.history.push("/login");

  function validatePass() {
    console.log(password, confPassword);
    const obj = document.getElementById("cpass");
    const obj1 = document.getElementById("cpasserr");
    if (password.length == 0 || confPassword.length == 0) {
      setErrorFor1(obj, obj1, "Password cannot be blank");
      return false;
    } else if(!checkPassword(password) || !checkPassword(confPassword)) {
      setErrorFor1(obj, obj1, "Not a valid password");
      return false;
    } else if(password != confPassword) {
      setErrorFor1(obj, obj1, "Passwords does not match");
      return false;
    }
    return true;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (validatePass()) {
      setLoading(true);
      dispatch(
        password_update(
          user?.params ? user.params.user_id : user.user_id,
          password,
          confPassword,
          () => {
            setLoading(false);
            NotificationManager.success("Your password has been updated successfully.");
            props.history.replace("/login");
          },
          () => setLoading(false)
        )
      );
    }
  };
  return (
    <>
      <Header {...props} />
      <div className="signupContainer mdfthemetxt">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12 col-sm-12">
              <form
                className="signupform"
                method="post"
                id="signupform"
                onSubmit={onSubmit}
              >
                <div>
                  <h2>Update Password</h2>
                </div>
                <div className="signupform-control">
                  <small id="msg" style={{ fontSize: "15px" }}>
                    Error message
                  </small>
                </div>
                <div className={`signupform-control`}>
                  <label htmlFor="user_password">PASSWORD</label>
                  <input
                    type="password"
                    name="user_password"
                    required=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="pass"
                    placeholder="password"
                  />
                  <i className="fas fa-check-circle"></i>
                  <i className="fas fa-exclamation-circle"></i>
                  <p>
                    Password must be contain atleast 1 Capital charcter , 1
                    digit , 1 symbol and length should be greater than 8.
                  </p>
                  <small className="text-danger" id="passerr"></small>
                </div>
                <div className={`signupform-control`}>
                  <label htmlFor="user_cpassword">CONFIRM PASSWORD</label>
                  <input
                    type="password"
                    name="user_cpassword"
                    id="cpass"
                    required=""
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder="confirm password"
                  />
                  <i className="fas fa-check-circle"></i>
                  <i className="fas fa-exclamation-circle"></i>
                  <small className="text-danger" id="cpasserr"></small>
                </div>
                <button type="submit" id="btn_submit" className="btn btn-success btn-block">
                  <i className="loading-icon fas fa-spinner fa-spin h"></i>
                  <span id="reg">Change</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
