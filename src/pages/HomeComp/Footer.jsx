import React from "react";
import { BsFacebook, BsTelegram } from "react-icons/bs";
import {FiPhoneCall } from "react-icons/fi";
import { AiFillTwitterCircle } from "react-icons/ai";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <>
      <div className="container-fluid img_hider  py-5" style={{backgroundColor:"black"}}>
        <div className="row my-5 mx-5">
          <div className="col-lg-3 col-md-3 col-sm-12 text-center">
            <h5 className="text-light">About Us</h5>
           

            <p>
              <Link className="text-white" to="/career">
                Career
              </Link>
            </p>
            <p>
              <a className="text-white" target="_blank" href="/wp.pdf">
                WhitePaper 
              </a>
            </p>

            <p>
              <Link className="text-white" to="/download">
                Download
              </Link>
            </p>
            <p>
              <Link className="text-white" to="/businesscontact">
                Business Contacts
              </Link>
            </p>
            <p>
              <Link className="text-white" to="/community">
                Community
              </Link>
            </p>
        
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12 text-center">
            <h5 className="text-light">Links</h5>
            <p>
              <Link className="text-white" to="/about">
                About
              </Link>
            </p>
           
            <p>
              <Link className="text-white" to="/refer">
                Refer
              </Link>
            </p>        
          
            <p>
              <Link className="text-white " to="/privacy-policy">
                    Privacy Policy
              </Link>
            </p>

            <p>
              <Link className="text-white " to="/api">
                    developer Api
              </Link>
            </p>


            <p>
              <Link to="https://docs.google.com/forms/d/e/1FAIpQLSd74p0r2aEpdzbt4hACp_ccmPlocpYIfCdLe18M-aUHZbB6fQ/viewform" className="text-white">
                Request TOKEN
              </Link>
            </p>

            <p>
              <Link className="text-white" to="/terms-condition">
                 Terms &amp; Conditions
              </Link>
            </p>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12 text-center">
            <h5 className="text-light">Service</h5>
            <p className="text-white">INR Trade</p>
            <Link to="/nftmarketplace" className="text-white">
              Markeplace for Non-fungible token
            </Link>
            <p className="text-white">Unique trade</p>
            <p className="text-white">Safe trade</p>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12 mysocial">
            <h5 className="text-light">Social Links</h5>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <a
                className="text-white text-decoration-none"
                href="https://facebook.com/bitflashex"
                target="_blank"
              >
                <BsFacebook style={{ height: "20px", margin: "0px 5px" }} />
                Facebook
              </a>
              <a
                className="text-white text-decoration-none py-2"
                href="https://twitter.com/bitflashex"
              >
                <AiFillTwitterCircle
                  style={{ height: "20px", margin: "0px 5px" }}
                />
                Twitter
              </a>
              <a
                className="text-white text-decoration-none py-2"
                href="https://t.me/+5rCoe7rKXIY4MGQ1"
              >
                <BsTelegram style={{ height: "20px", margin: "0px 5px" }} />
                Telegram
              </a>
              <a
                className="text-white text-decoration-none"
                href="tel:18005728486"
              >
                <FiPhoneCall style={{ height: "20px", margin: "0px 5px" }} />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
