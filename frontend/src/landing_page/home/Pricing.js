import React from "react";
import { Link } from "react-router-dom";

function Pricing() {
  return (
    <div className="container">
      <div className="row align-items-center py-5">
        <div className="col-md-4 scroll-reveal">
          <h1 className="mb-3 fs-2">Unbeatable pricing</h1>
          <p>
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <Link to="/pricing" className="link-apex" style={{ textDecoration: "none" }}>
            See Pricing{" "}
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-6 mb-5 scroll-reveal scroll-reveal-delay-2">
          <div className="row text-center">
            <div className="col p-4 border glass-card hover-lift" style={{ margin: "0 8px" }}>
              <h1 className="mb-3 gradient-text">₹0</h1>
              <p>
                Free equity delivery and
                <br />
                direct mutual funds
              </p>
            </div>
            <div className="col p-4 border glass-card hover-lift" style={{ margin: "0 8px" }}>
              <h1 className="mb-3 gradient-text">₹20</h1>
              <p>Intraday and F&amp;O</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
