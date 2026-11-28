import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center scroll-reveal">
        <h1 className="mt-5 gradient-text">Open an ApexTrader account</h1>
        <p className="fs-5 text-muted">
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&amp;O trades.
        </p>
        <div className="mt-3">
          <Link
            to="/signup"
            className="btn sign-up-btn fs-5 mb-5 mx-auto"
            style={{ width: "fit-content", padding: "14px 36px" }}
          >
            Sign up Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;
