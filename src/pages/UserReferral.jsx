import React, { useEffect, useState } from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import Header from "./ftx_design/Header";
import { useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import Loader from "./components/Loader";
import {
  N_checkKYCStatus,
  N_getRefferalData,
} from "./redux/helpers/api_functions_new";

export default function UserReferral(props) {
var link_set;

  const [loading, setLoading] = React.useState(true);
  const { user } = useSelector((state) => state.AuthReducer);
  const [activeTab, setActiveTab] = React.useState(0);
  const [refferalData, setRefferalData] = React.useState();
  const [total_ref, settotal_ref] = React.useState([]);
  const [kyc_status, setstatus] = React.useState(0);
  const [refcode, setrefcode] = useState("");
  const { webData } = useSelector((state) => state.websiteDBReducer);
  useEffect(() => {
    N_getRefferalData(user?.params ? user.params.user_id : user.user_id)
      .then((d) => {
        if (d.status === 200) {
          setLoading(false);
          console.log("getreferal data: ", d);
          setRefferalData(
            d.params.total_referal_earning ? d.params.total_referal_earning : 0
          );
          settotal_ref(d.params.total_referals ? d.params.total_referals : 0);
          setrefcode(d.params.referral_code ? d.params.referral_code : 0);
        } else {
          setLoading(false);
          console.log("something went wrong  to fetch refferal: ", d);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [kyc_status === 1]);

  useEffect(() => {
    N_checkKYCStatus(user?.params ? user.params.user_id : user.user_id)
      .then((res) => {
        console.log("k st: ", res);
        if (res.status === 200) {
          setstatus(res.params.kyc_status);
        } else {
          console.log("Sorry kyc status not fetched!!! ");
        }
      })
      .catch((err) => {
        console.log("error: ", err);
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
          style={{ marginTop: "12px" }}
        >
          <div
            className={`${webData.bg_color}` + " p-1 my-sidebox-shadow"}
            style={{ backgroundColor: webData.bg_color_code }}
          >
            <div className="main-profile-pro d-flex align-items-center bb-1 h-25">
              <i className="fa fa-tree ml-2 mr-2 mt-2" />
              <h4 className="px-2 font-weight-bold pt-3">Referral</h4>
            </div>
            {loading ? (
              <Loader />
            ) /* : Number(kyc_status) === 1 ? ( */
              : <article className="p-2">
                <div className="row my-1">
                  <div className="col-12 offset-md-6 offset-lg-6 col-md-5 col-lg-5 px-2">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className=" form-control light-theme-color  mdfthemetxt"
                        id="copy"
                        value={webData.site_url + `create/${refcode}`}
                        readOnly
                      />
                      <div className="">
                        <button style={{background:"transparent",
                        border:"none",
                      paddingInline:"8px"}}
                          // className="btn btn-theme-color"
                          type="button"
        
                          onClick={() => {
                            var copyText = document.getElementById("copy");
                            link_set = copyText.value;
                            console.log(link_set, "link setted");
                            copyText.select();
                            copyText.setSelectionRange(0, 99999);
                            document.execCommand("copy");
                            NotificationManager.info("Referral URL Copied!");
                          }}
                        ><i className="fas fa-copy text-success" style={{fontSize:"30px"}}  ></i>


                        </button>

                        {/* url */}
                          
                 
                      
                       
<a class="resp-sharing-button__link " id="link_1"  onClick={function(){

document.getElementById("link_1").href=`https://facebook.com/sharer/sharer.php?u=`+link_set;

}} target="_blank" rel="noopener" aria-label="">

  <div  class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
    </div>
  </div>
</a>

<a class="resp-sharing-button__link" id="link_2" onClick={function(){

document.getElementById("link_2").href=`https://twitter.com/intent/tweet/?text=&amp;url=`+link_set;

}}   target="_blank" rel="noopener" aria-label="">

  <div class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/></svg>
    </div>
  </div>
</a>


<a class="resp-sharing-button__link" id="link_3"   onClick={function(){

document.getElementById("link_3").href=`mailto:?subject=&amp;body=`+link_set;

}} target="_self" rel="noopener" aria-label="">
  <div class="resp-sharing-button resp-sharing-button--email resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.25 14.43l-3.5 2c-.08.05-.17.07-.25.07-.17 0-.34-.1-.43-.25-.14-.24-.06-.55.18-.68l3.5-2c.24-.14.55-.06.68.18.14.24.06.55-.18.68zm4.75.07c-.1 0-.2-.03-.27-.08l-8.5-5.5c-.23-.15-.3-.46-.15-.7.15-.22.46-.3.7-.14L12 13.4l8.23-5.32c.23-.15.54-.08.7.15.14.23.07.54-.16.7l-8.5 5.5c-.08.04-.17.07-.27.07zm8.93 1.75c-.1.16-.26.25-.43.25-.08 0-.17-.02-.25-.07l-3.5-2c-.24-.13-.32-.44-.18-.68s.44-.32.68-.18l3.5 2c.24.13.32.44.18.68z"/></svg>
    </div>
  </div>
</a>


<a class="resp-sharing-button__link"  id="link_4"  onClick={function(){

document.getElementById("link_4").href=`mailto:?subject=&amp;body=whatsapp://send?text=`+link_set;

}} target="_blank" rel="noopener" aria-label="">
  <div class="resp-sharing-button resp-sharing-button--whatsapp resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z"/></svg>
    </div>
  </div>
</a>


<a class="resp-sharing-button__link" id="link_5"  onClick={function(){

document.getElementById("link_5").href=`https://telegram.me/share/url?text=&amp;url=`+link_set;

}} target="_blank" rel="noopener" aria-label="">
  <div class="resp-sharing-button resp-sharing-button--telegram resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M.707 8.475C.275 8.64 0 9.508 0 9.508s.284.867.718 1.03l5.09 1.897 1.986 6.38a1.102 1.102 0 0 0 1.75.527l2.96-2.41a.405.405 0 0 1 .494-.013l5.34 3.87a1.1 1.1 0 0 0 1.046.135 1.1 1.1 0 0 0 .682-.803l3.91-18.795A1.102 1.102 0 0 0 22.5.075L.706 8.475z"/></svg>
    </div>
  </div>
</a>





                        {/* url */}


                      </div>
                    </div>
                  </div>
                </div>
                <div className="row m-1">
                  <div className="col-12 col-md-4 col-lg-4 p-1">
                    <div className="card p-4 light-theme-color">
                      <div className="mb-0 card-body p-1">
                        <h6 className="card-title text-center">
                          TOTAL REFERRED FRIENDS
                        </h6>
                        <div className="card-text d-flex justify-content-center align-items-center">
                          <div className="card-text h2">
                            {total_ref?.length > 0 ? total_ref.length : 0}
                          </div>
                          <i className="fa fa-users fa-2x theme-color-text p-1"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-4   col-lg-4 p-1">
                    <div className="card p-4 light-theme-color">
                      <div className="mb-0 card-body p-1">
                        <h6 className="card-title text-center">
                          TOTAL COMMISSIONS EARNED
                        </h6>
                        <div className="card-text d-flex justify-content-center align-items-center">
                          <div className="card-text h2">
                            {refferalData ? refferalData : 0} (
                            {webData.referral_coin})
                            {/* { parseInt(refferalData?.total_referral_commission) } in INR   */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 col-lg-4 p-1">
                    <div className="card p-4 light-theme-color">
                      <div className="mb-0 card-body p-1">
                        <h6 className="card-title text-center">
                          YOUR COMMISSION RATE
                        </h6>
                        <div className="card-text d-flex justify-content-center align-items-center">
                          <div className="card-text h2">

                            {webData.referral_fee} ({webData.referral_coin})
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" container-fluid table-responsive">
                  <a href="#history" role="tab">
                    <h2>Commission History</h2>
                  </a>
                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className={`tab-pane fade ${activeTab === 0 ? "active show" : null
                        }`}
                      id="nav-home"
                      role="tabpanel"
                    >
                      <table className="table  table-striped   mdfthemetxt">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">NAME</th>
                            <th scope="col">DATES</th>
                            <th scope="col">coin</th>
                            <th scope="col">COMMISSION</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {total_ref?.map((d, index) => (
                            <tr className={(d?.kyc_status == 1 ?
                              "bg-success "
                              : d?.kyc_status == 2
                                ? "bg-danger"
                                : d.kyc_status == -1
                                  ? "bg-warning"
                                  : "bg-warning")} >
                              <td   >{++index}</td>
                              <td>{d?.name}</td>
                              <td>
                                {d?.time
                                  ? new Date(Number(d?.time)).toLocaleString()
                                  : "00:00"}
                              </td>
                              <td >{d?.wallet_type}</td>
                              <td>{d?.valume}</td>
                              <td   >


                                {d?.kyc_status == 1
                                  ? "Verified"
                                  : d?.kyc_status == 2
                                    ? "Rejected"
                                    : d.kyc_status == -1
                                      ? "Pending"
                                      : "Not Filled"}


                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </article>
            /* ) : (
              <div>
                <h5 className="px-5 py-4 text-dark">
                  Pending Kyc (If filled wait for aproval.)
                </h5>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}
