import React from "react";
import "./footer.css";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
  return (
    <>
      <section className="footer-continer">
        <div className="footer-warpper">
          <div className="footer-get-started">
            <p className="ready-to-watch">
              Ready to Watch? Enter your email to create or restart your
              membership
            </p>
            <form action="">
              <div className="inputContainer">
                <div className="emailInputWrapper">
                  <input
                    className="emailInputBox"
                    type="email"
                    name="email"
                    id="emailInput"
                    
                    placeholder=" " 
                    required 
                  />
                  <label htmlFor="emailInput" className="emailLabel">
                    Email address
                  </label>
                </div>
                <button className="getStartedButton">Get Started</button>
              </div>
            </form>
          </div>
          <div className="socalMediaLink">
            <FacebookOutlinedIcon className="socalLink" />
            <InstagramIcon className="socalLink"/>
            <XIcon className="socalLink"/>
            <LinkedInIcon className="socalLink"/>
            <WhatsAppIcon className="socalLink"/>
          </div>
          <div className="questions">
            <p className="ask-us footer-links">Questions? Contact us.</p>
            <div className="footer-link">
              <div className="">
                <div className="footer-links">FAQ</div>
                <div className="footer-links">Investor Relations</div>
                <div className="footer-links">Privacy</div>
                <div className="footer-links">Speed Test</div>
              </div>
              <div className="">
                <div className="footer-links">Help Center</div>
                <div className="footer-links">Jobs</div>
                <div className="footer-links">Cookie Preferences</div>
                <div className="footer-links">Legal Notices</div>
              </div>
              <div className="">
                <div className="footer-links">Account</div>
                <div className="footer-links">ways to Watch</div>
                <div className="footer-links">Corporate Information</div>
                <div className="footer-links">Only on Netflix</div>
              </div>
              <div className="">
                <div className="footer-links">Media Center</div>
                <div className="footer-links">Termes of Use</div>
                <div className="footer-links">Contact Us</div>
              </div>
            </div>
          </div>
          <div className="choose-countery">
            <div></div>
            <p className="countery-choose">Netflix Ethiopia</p>
            <p className="countery-choose">This page is protected by Google reCAPTCHA to ensure you`re not a bot. <a href="">Learn more</a></p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
