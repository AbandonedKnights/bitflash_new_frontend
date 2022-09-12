import React, { useEffect, useState } from "react";
import Header from "./ftx_design/Header";
import { isOtp } from "./redux/helpers/form-validator.functions";
import { useDispatch, useSelector } from "react-redux";
import { opt_verify } from "./redux/actions/authActions";
import { NotificationManager } from "react-notifications";
import { N_resendOTP } from "./redux/helpers/api_functions_new";

const OTP = (props) => {
  const { otp_send, user } = useSelector((state) => state.AuthReducer);
  const [ctime, setctime] = useState("00:00");
  const [timer, settimer] = useState(true);
  const dispatch = useDispatch();
  if (!otp_send) props.history.push("/create");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState();

  const handleProceedSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      opt_verify(
        otp,
        user?.params ? user.params.user_id : user.user_id,
        () => {
          setLoading(false);
          props.history.replace("/security");
        },
        () => setLoading(false)
      )
    );
  };

  const resendEmail = (user_id) => {
    N_resendOTP(user_id).then((data) => {
      if (data.status === 200) {
        NotificationManager.success(data.message);
      } else if (data.status == 1) {
        NotificationManager.error(data.message);
      }
    });
  };

  const otpCountdown = () => {
    let duration = 60 * 2;
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
        settimer(false);
      }
    }, 1000);
  };

  useEffect(() => {
    otpCountdown();
  }, []);

  return (
    <>
      <Header {...props} />
      <div className="signupContainer mdfthemetxt  "  style={{backgroundColor:"white"}} >
        <div className="security_header shead-bg "   >
          <div className="security_head" >
            <div  className="sec_circle bg_circle  shead-circle" >
              <i  className="fas fa-dot-circle "></i>
              <span color="#ffffff" className="email_span">
                Email
              </span>
            </div>
            <div className="sec_circle bg_dot_circle shead-circle">
              <i className="fas fa-dot-circle "></i>
              <span color="#ffffff" className="email_span">
                Security
              </span>
            </div>
            <div className="sec_circle bg_dot_circle shead-circle" >
              <i className="fas fa-dot-circle"></i>
              <span color="#ffffff" className="email_span">
                Welcome
              </span>
            </div>
          </div>
        </div>
        <div class="container-fluid">
  <div class="row">
    <div class="col">
    <div className="container-fluid shead-bg"  >
          <div  style={{backgroundColor:"transparent"}} className="row m-0 ">
            <div className="col col-md-12 col-sm-12 ">
              <form
                className="signupform mdfthemetxt"
                onSubmit={handleProceedSubmit}
                id="otp_form"
              >
                <div className="" >
                  <h3>Check your inbox for verification mail</h3>
                </div>
                <div className="signupform-control">
                  <small id="msg" style={{ fontSize: "15px" }}>
                    Error message
                  </small>
                </div>
                <div className="signupform-control">
                  <div>
                    An OTP has sent your email
                    <br />
                    <strong>{user.email}</strong>. Don't see it? check your{" "}
                    <b>spam</b> folder.
                    <br />
                    If the email adress is wrong then click
                    <strong>back</strong> button.
                    <br /> <br />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="user_otp"
                      className="signupform-control"
                      value={otp}
                      id="user_otp"
                      maxLength={6}
                      onChange={(e) => {
                        setOtp(e.target.value);
                        isOtp(e.target.value);
                      }}
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
                    {timer ? (
                      <div className="resend_btn text-info" id="timer">
                        {ctime}
                      </div>
                    ) : (
                      <div
                        className="resend_btn text-success"
                        onClick={(e) => {
                          resendEmail(
                            user?.params ? user.params.user_id : user.user_id
                          );
                          settimer(true);
                          otpCountdown();
                        }}
                      >
                        Resend
                      </div>
                    )}
                  </div>
                </div>
                <div className="signupform-control" id="btns">
                  <button
                    type="button"
                    onClick={(e) => props.history.push("/create")}
                    className="backbtn"
                  >
                    BACK
                  </button>
                  <button type="submit" id="proceed_btn" className="sendbtn bg-success">
                    Verify
                  </button>
                </div>
                {loading ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
    </div>
    <div class="col-sm p-0">
    <div className="col-sm" style={{backgroundImage:"url(./image/BG_5.png)",height:"100vh" , backgroundSize:"cover"}} >
     
    </div>
    </div>
  </div>
  </div>
      </div>
    </>
  );
};

export default OTP;
