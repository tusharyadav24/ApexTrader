import React from "react";
import { Link } from "react-router-dom";

function ProductPage() {
  return (
    <>
      <div className="container border-bottom mb-5">
        <div className="text-center mt-5 p-3">
          <h1>Technology</h1>
          <h3 className="text-muted mt-3 fs-4">
            Sleek, modern and intuitive trading platforms
          </h3>
          <p className="mt-3 mb-5">
            Check out our{" "}
            <Link to="/pricing" style={{ textDecoration: "none" }}>
              investment offerings{" "}
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </Link>
          </p>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="assets/kite.png" alt="ApexTrader Kite" className="img-fluid" />
          </div>
          <div className="col-md-6 p-5 mt-5">
            <h1>Kite</h1>
            <p>
              Our ultra-fast flagship trading platform with streaming market
              data, advanced charts, an elegant UI, and more. Enjoy the Kite
              experience seamlessly on your Android and iOS devices.
            </p>
            <div>
              <a href="http://localhost:3001" target="_blank" rel="noreferrer">
                Try Demo
              </a>
              <Link to="/products" style={{ marginLeft: "50px" }}>
                Learn More
              </Link>
            </div>
            <div className="mt-3">
              <a href="/signup">
                <img src="assets/googlePlayBadge.svg" alt="Google Play" />
              </a>
              <a href="/signup">
                <img
                  src="assets/appstoreBadge.svg"
                  alt="App Store"
                  style={{ marginLeft: "50px" }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6 p-5 mt-5">
            <h1>Console</h1>
            <p>
              The central dashboard for your ApexTrader account. Gain insights
              into your trades and investments with in-depth reports and
              visualisations.
            </p>
            <div>
              <a href="http://localhost:3001" target="_blank" rel="noreferrer">
                Learn More
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <img src="assets/console.png" alt="Console" className="img-fluid" />
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="assets/coin.png" alt="Coin" className="img-fluid" />
          </div>
          <div className="col-md-6 p-5 mt-5">
            <h1>Coin</h1>
            <p>
              Buy direct mutual funds online, commission-free, delivered
              directly to your Demat account. Enjoy the investment experience
              on your Android and iOS devices.
            </p>
            <div>
              <a href="/signup">Try Demo</a>
              <Link to="/products" style={{ marginLeft: "50px" }}>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6 p-5 mt-5">
            <h1>Kite Connect API</h1>
            <p>
              Build powerful trading platforms and experiences with our super
              simple HTTP/JSON APIs. If you are a startup, build your
              investment app and showcase it to our clientbase.
            </p>
            <div>
              <Link to="/products">Learn More</Link>
            </div>
          </div>
          <div className="col-md-6">
            <img
              src="assets/kiteconnect.png"
              alt="Kite Connect"
              className="img-fluid"
            />
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="assets/varsity.png" alt="Varsity" className="img-fluid" />
          </div>
          <div className="col-md-6 p-5 mt-5">
            <h1>Varsity mobile</h1>
            <p>
              An easy to grasp, collection of stock market lessons with
              in-depth coverage and illustrations. Content is broken down into
              bite-size cards to help you learn on the go.
            </p>
            <div>
              <a href="/signup">Try Demo</a>
              <Link to="/products" style={{ marginLeft: "50px" }}>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center mt-5 mb-5">
        Want to know more about our technology stack? Check out the
        ApexTrader.tech blog.
      </p>

      <div className="container mt-5">
        <div className="row text-center">
          <h1>The ApexTrader Universe</h1>
          <p>
            Extend your trading and investment experience even further with our
            partner platforms
          </p>
          <div className="container pt-5">
            <div className="row justify-content-center">
              {[
                { src: "/assets/smallcaseLogo.png", label: "Thematic investment platform" },
                { src: "/assets/streakLogo.png", label: "Algo & strategy platform" },
                { src: "/assets/sensibullLogo.svg", label: "Options trading platform" },
                { src: "/assets/ApexTraderFundHouse.png", label: "Asset management" },
                { src: "/assets/goldenpiLogo.png", label: "Bonds trading platform" },
                { src: "/assets/dittoLogo.png", label: "Insurance advisory" },
              ].map((item, i) => (
                <div key={i} className="col-md-4 col-6 p-3 mt-4">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="img-fluid"
                    style={{ maxHeight: "40px", objectFit: "contain" }}
                  />
                  <p className="text-muted mt-2" style={{ fontSize: "0.85rem" }}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 mb-5">
            <Link to="/signup" className="btn btn-primary fs-5 px-4 py-2">
              Signup Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
