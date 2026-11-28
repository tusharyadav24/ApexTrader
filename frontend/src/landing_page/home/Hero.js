import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <div className="fade-in-down">
          <img
            src="/assets/homeHero2.png"
            alt="ApexTrader Platform"
            className="mb-5 img-fluid"
            style={{
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))",
            }}
          />
        </div>
        <h1 className="mt-5 fade-in-up gradient-text" style={{ fontSize: "2.8rem" }}>
          Invest in everything
        </h1>
        <p className="fade-in-up text-muted fs-5" style={{ animationDelay: "0.2s" }}>
          Online platform to invest in stocks, mutual funds, and more
        </p>
        <div className="fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Link
            to="/signup"
            className="btn sign-up-btn mb-4 mx-auto"
            style={{ width: "fit-content", padding: "14px 36px" }}
          >
            <b>Signup Now</b>
          </Link>
        </div>

        <div className="scroll-indicator fade-in-up" style={{ animationDelay: "0.8s" }}>
          <span>Scroll to explore</span>
        </div>
      </div>
    </div>
  );
}

export default Hero;
