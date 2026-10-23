import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <img src="/assets/homeHero2.png" alt="ApexTrader Platform" className="mb-5 img-fluid" />
        <h1 className="mt-5">Invest in everything</h1>
        <p>Online platform to invest in stocks, mutual funds, and more</p>
        <Link to="/signup" className="btn btn-dark sign-up-btn mb-5 mx-auto" style={{ width: "fit-content", padding: "12px 32px" }}>
          <b>Signup Now</b>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
