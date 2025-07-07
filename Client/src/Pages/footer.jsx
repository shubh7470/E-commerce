import React from "react";
import { FaFacebookF, FaPinterestP, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-light py-5 border-top">
      <div className="container">
        <div className="row gy-4">

          {/* Contact Us */}
          <div className="col-lg-3 col-md-6">
            <h5>Contact us</h5>
            <p>Belgachia <br />Howrah-Kolkata</p>
            <p>sales@shubhMart.com</p>
            <p className="text-primary fw-bold">(+91) 7470449162</p>
            <p className="text-muted">💬 Online Chat<br />Get Expert Help</p>
            <div className="d-flex gap-3 mt-2">
              <FaFacebookF className="text-dark" />
              <FaPinterestP className="text-dark" />
              <FaInstagram className="text-dark" />
            </div>
          </div>

          {/* Products */}
          <div className="col-lg-2 col-md-6">
            <h5>Products</h5>
            <ul className="list-unstyled">
            <Link to='/track' style={{textDecoration:'none',color:'black'}}><li>Your Orders</li></Link>  
              <li>New products</li>
              <li>Best sales</li>
              <li>Contact us</li>
              <li>Sitemap</li>
              <li>Stores</li>
            </ul>
          </div>

          {/* Our Company */}
          <div className="col-lg-3 col-md-6">
            <h5>Our company</h5>
            <ul className="list-unstyled">
              <li>Delivery</li>
              <li>Legal Notice</li>
              <li>Terms and conditions of use</li>
              <li>About us</li>
              <li>Secure payment</li>
              <li>Login</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h5>Subscribe to newsletter</h5>
            <p>Subscribe to our latest newsletter to get news about special discounts.</p>
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Your Email Address"
            />
            <button className="btn btn-primary w-100 mb-2">SUBSCRIBE</button>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="termsCheck" />
              <label className="form-check-label small" htmlFor="termsCheck">
                I agree to the terms and conditions and the privacy policy
              </label>
            </div>
          </div>

        </div>

        <hr className="my-4" />
        <div className="text-center small text-muted">
          © 2025 - shubhMart
        </div>
      </div>
    </footer>
  );
};

export default Footer;
