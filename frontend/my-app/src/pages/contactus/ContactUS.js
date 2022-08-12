import React, { useRef } from "react";
import { useEffect } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./ContactUs.css";
import { Link } from "react-router-dom";

function ContactUS() {

  return (
    <div>
      <Header />
      <div id="aboutus-container">
        <h1>GET IN TOUCH </h1>
        <div className="contactus-underline"></div>
        <form
          id="contact_form"
          action="https://formsubmit.co/1e5951526eaccaf3d599cef854fcfc13"
          method="POST"
   
          href="/"
        >
         
          <div className="contactus-name">
            <label for="name"></label>
            <input
              type="text"
              placeholder="Your name"
              name="name"
              id="name_input"
              required
            />
          </div>

          <div className="contactus-telephone">
            <label for="name"></label>
            <input
              type="text"
              placeholder="Your number"
              name="telephone"
              id="telephone_input"
              required
            />
          </div>
          <div className="contactus-email">
            <label for="email"></label>
            <input
              type="email"
              placeholder="Your email"
              name="email"
              id="email_input"
              required
            />
          </div>

          <div className="contactus-message">
            <label for="message"></label>
            <textarea
              name="message"
              placeholder="Your nessage"
              id="message_input"
              cols="30"
              rows="5"
              required
            ></textarea>
          </div>
          <div className="contactus-submit">
            <input
              type="submit"
              value="Send Message"
              id="form_button-contactus"
            />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUS;
