import React from "react";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The ApexTrader Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="container pt-5">
          <div className="row justify-content-center">
            <div className="col-md-4 col-6 p-3 mt-5">
              <img
                src="/assets/smallcaseLogo.png"
                alt="Smallcase"
                className="img-fluid"
                style={{ maxHeight: "40px", objectFit: "contain" }}
              />
              <p className="text-small text-muted mt-2">
                Thematic investment platform
              </p>
            </div>

            <div className="col-md-4 col-6 p-3 mt-5">
              <img
                src="/assets/streakLogo.png"
                alt="Streak"
                className="img-fluid"
                style={{ maxHeight: "40px", objectFit: "contain" }}
              />
              <p className="text-small text-muted mt-2">
                Algo &amp; strategy platform
              </p>
            </div>

            <div className="col-md-4 col-6 p-3 mt-5">
              <img
                src="/assets/sensibullLogo.svg"
                alt="Sensibull"
                className="img-fluid"
                style={{ maxHeight: "40px", objectFit: "contain" }}
              />
              <p className="text-small text-muted mt-2">
                Options trading platform
              </p>
            </div>

            <div className="col-md-4 col-6 p-3 mt-5">
              <img
                src="/assets/ApexTraderFundHouse.png"
                alt="ApexTrader Fund House"
                className="img-fluid"
                style={{ maxHeight: "40px", objectFit: "contain" }}
              />
              <p className="text-small text-muted mt-2">Asset management</p>
            </div>

            <div className="col-md-4 col-6 p-3 mt-5">
              <img
                src="/assets/goldenpiLogo.png"
                alt="GoldenPi"
                className="img-fluid"
                style={{ maxHeight: "40px", objectFit: "contain" }}
              />
              <p className="text-small text-muted mt-2">
                Bonds trading platform
              </p>
            </div>

            <div className="col-md-4 col-6 p-3 mt-5">
              <img
                src="/assets/dittoLogo.png"
                alt="Ditto"
                className="img-fluid"
                style={{ maxHeight: "40px", objectFit: "contain" }}
              />
              <p className="text-small text-muted mt-2">Insurance advisory</p>
            </div>
          </div>
        </div>
        <div className="mt-5 mb-5">
          <a
            href="/signup"
            className="btn btn-primary fs-5 px-4 py-2"
          >
            Signup Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default Universe;
