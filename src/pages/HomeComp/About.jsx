import React, { useEffect } from "react";
import Banner from "./Banner";
import Footer from "./Footer";
import Header from "./Header";
import "../../css/ecosystem.scss";


export default function About() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
  return (
    <>
      <Header />
      <Banner image={"about_us.png"} />
      <div className="container-fluid bg-white" style={{overflow:"hidden"}}>
        <div className="container-fluid" >
          <div className="row ">
            <div className="col-sm text-dark my-5 py-5">
              <h1 className="text-center">
                {/* Ecosystem */}


                <div class="centerer">
                  <div class="window ">
                    <div class="flex-cont">
                      {/* <h2 class="title">Activity on <span class="site-name">Showcase</span></h2> */}
                      <div class="columns">

                   
                          
                            
                        <div class="name-column">
                          <div class="name">
                            <ul>
                              <li>Blockchain</li>
                              <li>Swap</li>
                              <li>Crosschain</li>
                              <li>Wallet and Extension</li>
                            </ul>
                          </div>
                      </div>

                       
                        <div class="bar-column">
                          <div class="bar u">
                            <div class="fill fill-u">
                            </div>
                          </div>
                          <div class="c-bar-p">
                            <div class="bar p">
                              <div class="fill fill-p">
                              </div>
                            </div>
                          </div>
                          <div class="c-bar-ns">
                            <div class="bar ns">
                              <div class="fill fill-ns">
                              </div>
                            </div>
                          </div>
                          <div class="c-bar-br">
                            <div class="bar br">
                              <div class="fill fill-br">
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="num-column">
                          <div class="number">
                            <ul>
                              <li>17,387</li>
                              <li>32,581</li>
                              <li>8,132</li>
                              <li>77%</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </h1>
            </div>
            <div className="col-sm " style={{ overflow: "hidden" }} >
              <div className="infographic-wrapper" style={{ paddingRight: "100px", }} id="graph"></div>
            </div>
          </div>
        </div>
        <div className=" container-fluid ">
          <ul className="list-members bg-white text-warning">
            <li className="member">
              <div className="member-image">
                <img src="./image/sanjay sir.jpeg" />
              </div>
              <div className="member-info">
                <h3>Sanjay Kumar</h3>
                <p>Managing Director</p>
                <div className="social-link">
                  <i className="fab fa-facebook-f"></i>
                  <i className="fab fa-twitter"></i>
                  <i className="fab fa-linkedin-in"></i>
                </div>
              </div>
            </li>
            <li className="member">
              <div className="member-image">
                <img src="./image/a.png" />
              </div>
              <div className="member-info">
                <h3>Aman Vaths</h3>
                <p>CEO</p>
                <div className="social-link">
                  <i className="fab fa-facebook-f"></i>
                  <i className="fab fa-twitter"></i>
                  <i className="fab fa-linkedin-in"></i>
                </div>
              </div>
            </li>
            <li className="member">
              <div className="member-image">
                <img src="./image/nn.png" />
              </div>
              <div className="member-info">
                <h3>Neeraj Kumar</h3>
                <p>Marketing Head</p>
                <div className="social-link">
                  <i className="fab fa-facebook-f"></i>
                  <i className="fab fa-twitter"></i>
                  <i className="fab fa-linkedin-in"></i>
                </div>
              </div>
            </li>
            <li className="member">
              <div className="member-image">
              <img src="./image/nn.png" />
              </div>
              <div className="member-info">
                <h3>Shailendra Kumar</h3>
                <p>Affiliate Manager</p>
                <div className="social-link">
                  <i className="fab fa-facebook-f"></i>
                  <i className="fab fa-twitter"></i>
                  <i className="fab fa-linkedin-in"></i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>




      <Footer />
    </>
  );
}
