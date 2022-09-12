import React, { useEffect } from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import { N_getUserProfile } from "./redux/helpers/api_functions_new";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import Header from "./ftx_design/Header";
export default function UserProfile(props) {
  const { user } = useSelector((state) => state.AuthReducer);
  const [loading, setLoading] = React.useState(true);
  const [profile, setProfile] = React.useState({});
  useEffect(() => {
    N_getUserProfile(user?.params ? user.params.user_id : user.user_id)
      .then((d) => {
        // console.log("userProfile",d?.params.profile_info);
        if (d.status === 200) {
          setProfile(d?.params.profile_info);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <Header {...props} />
      <div className="row p-1 " style={{ margin: 0, marginTop: "5em" }}>
        <div className="col-12 col-md-3 col-lg-3 p-0">
          <ProfileSidebar {...props} />
        </div>
        <div
          className="col-12 col-md-8 col-lg-8 p-0"
          style={{
            marginTop: "12px",
            fontFamily: "Open Sans, Lato, sans-serif",
          }}
        >
          <div className="p-1 theme-color my-sidebox-shadow">
            <div className="p-1 theme-color">
              <div className="main-profile-pro d-flex align-items-center bb-1 h-25">
                <i className="fa fa-user ml-2 mr-2 mt-2" />
                <h4 className="px-1 pt-3">Profile</h4>
              </div>
            </div>
            <article>
              {loading ? <Loader /> : null}
              {!loading && profile?.name != "" ? (
                <div className="my-1 d-flex align-items-center">
                  {/* <div className="px-2">
                    <i
                      className="fa theme-color-text fa-user"
                      style={{ fontSize: "17px" }}
                    ></i>
                  </div> */}
                  <div className="px-2">
                    <div className="w65 float-left">Name :</div>
                    <div className="float-left ml-1"> {profile.name}</div>
                  </div>
                </div>
              ) : null}
              {!loading && profile?.email != "" ? (
                <div className="my-1 d-flex align-items-center">
                  {/* <div className="px-1">
                    <i
                      className="fa theme-color-text fa-envelope"
                      style={{ fontSize: "17px" }}
                    ></i>
                  </div> */}
                  <div className="px-2">
                    <div className=" w65 float-left">Email :</div>
                    <div className="float-left ml-1"> {profile.email}</div>
                  </div>
                </div>
              ) : null}
              {!loading && profile?.mobile_number != "" ? (
                <div className="my-1 d-flex align-items-center">
                  <div className="px-1">
                    <i
                      className="fa theme-color-text fa-phone fa-rotate-3"
                      style={{ fontSize: "17px" }}
                    ></i>
                  </div>
                  <div className="px-1">
                    <div className=" w65 bold float-left">Mobile :</div>
                    <div className="float-left ml-1">
                      {" "}
                      {profile.mobile_number > 1
                        ? "+91 " + profile.mobile_number
                        : "Not Saved"}
                    </div>
                  </div>
                </div>
              ) : null}
              {!loading && profile?.mobile_number == "" ? (
                <div className="px-2 py-4">
                  <button
                    className="btn btn-secondary"
                    onClick={() => props.history.push("/mobile-verify")}
                  >
                    Verify Your Mobile
                  </button>
                </div>
              ) : null}
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
