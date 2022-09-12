import React from "react";
import Header from "./ftx_design/Header";
import { useSelector } from "react-redux";

export default function Security(props) {
  const { isLoggedIn } = useSelector((state) => state.AuthReducer);
  if (!isLoggedIn) props.history.replace("/login");
  const securityChange = (event) => {
    const id = event.target.id;
    if (id === "mobile_sms") {
      props.history.push("/mobile-verify");
    }
    if (id === "none_option") {
      props.history.push("/kyc-verify");
    }
  };

  return (
    <>

      <Header {...props} />
      <div className="signupContainer mdfthemetxt">
        <div className="security_header shead-bg">
          <div className="security_head">
            <div className="sec_circle bg_check_circle shead-circle">
              <i className="fas fa-check-circle"></i>
              <span color="#ffffff" className="email_span">
                Email
              </span>
            </div>
            <div className="sec_circle bg_circle shead-circle">
              <i className="fas fa-dot-circle"></i>
              <span color="#ffffff" className="email_span">
                Security
              </span>
            </div>
            <div className="sec_circle bg_dot_circle shead-circle">
              <i className="fas fa-dot-circle"></i>
              <span color="#ffffff" className="email_span">
                Welcome
              </span>
            </div>
          </div>
        </div>
       
      </div>


      <div class="container-fluid text-center text-dark mt-5 pt-4"  >
  <div class="row mt-3 ">
    <div class="col mt-5   pt-5 ">
    {/* <div className="container    shead-bg"> */}
          <div className="row col">
            <div className="col-12 col-md-12 col-sm-12 my-5 " style={{backgroundColor:"white",  boxShadow:" 10px 10px 20px"}}>
              <form className="signupform" method="post" id="security_form">
                <div>
                  <h3> <b> Security </b></h3>
                </div>
                <div className="signupform-control">
                  <small id="msg" style={{ fontSize: "15px" }}>
                    Error message
                  </small>
                </div>
                <div className="signupform-control " >
                  <div className="custom-control custom-radio">
                    <input
                      name="security_option"
                      id="mobile_sms"
                      onClick={(e) => {
                        securityChange(e);
                      }}
                      type="radio"
                      className="custom-control-input  "
                    />
                    <label className="custom-control-label" for="mobile_sms">
                     <span className=""> Mobile SMS </span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      name="security_option"
                      id="none_option"
                      onClick={(e) => {
                        securityChange(e);
                      }}
                      type="radio"
                      className="custom-control-input"
                    />
                    <label className="custom-control-label " for="none_option">
                      <span style={{paddingRight:"2.1vw"}} className="justify-content-center"> NONE </span>
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        {/* </div> */}
    </div>
    <div  className="col-sm" style={{backgroundImage:"url(./image/BG_5.png)",height:"100vh" , backgroundSize:"cover"}}>
      
    </div>
  </div>
</div>












      {/* <Dialog open={openMobile} onClose={handleMClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Mobile</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter Your Mobile No
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="user_number"
                        label="Mobile Number"
                        type="number"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleMClose} color="primary">
                    Back
                </Button>
                <Button onClick={handleMClose} color="primary">
                    Done
                </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openNone} onClose={handleNClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div style={{padding: '2px 192px'}}>                            
                            <WarningIcon style={{color: 'orange', fontSize: '3rem'}}/>
                        </div>
                        <strong>Are you sure you want to proceed without securing your account?</strong>
                    </DialogContentText>
                    </DialogContent>
                <DialogActions>
                <Button onClick={handleNClose} color="primary">
                    Back 
                </Button>
                <Button onClick={handleNoneOption} color="primary">
                    YES
                </Button>
                </DialogActions>
            </Dialog> */}
    </>
  );
}
