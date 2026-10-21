import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5">
          <div className="col-md-3 mb-4">
            <p className="fw-bold fs-5" style={{ color: "rgb(245,104,52)" }}>
              ApexTrader
            </p>
            <p className="text-muted" style={{ fontSize: "0.85rem" }}>
              &copy; 2024, ApexTrader Broking Ltd. All rights reserved.
            </p>
          </div>
          <div className="col-md-3 mb-4">
            <p className="fw-semibold">Company</p>
            <Link to="/about" className="d-block text-muted text-decoration-none mb-2">
              About
            </Link>
            <Link to="/products" className="d-block text-muted text-decoration-none mb-2">
              Products
            </Link>
            <Link to="/pricing" className="d-block text-muted text-decoration-none mb-2">
              Pricing
            </Link>
            <Link to="/signup" className="d-block text-muted text-decoration-none mb-2">
              Referral programme
            </Link>
            <Link to="/about" className="d-block text-muted text-decoration-none mb-2">
              Careers
            </Link>
            <Link to="/about" className="d-block text-muted text-decoration-none mb-2">
              ApexTrader.tech
            </Link>
            <Link to="/about" className="d-block text-muted text-decoration-none mb-2">
              Press &amp; media
            </Link>
            <Link to="/about" className="d-block text-muted text-decoration-none mb-2">
              ApexTrader Cares (CSR)
            </Link>
          </div>
          <div className="col-md-3 mb-4">
            <p className="fw-semibold">Support</p>
            <Link to="/support" className="d-block text-muted text-decoration-none mb-2">
              Contact
            </Link>
            <Link to="/support" className="d-block text-muted text-decoration-none mb-2">
              Support portal
            </Link>
            <Link to="/support" className="d-block text-muted text-decoration-none mb-2">
              ApexTrader Blog
            </Link>
            <Link to="/pricing" className="d-block text-muted text-decoration-none mb-2">
              List of charges
            </Link>
            <Link to="/support" className="d-block text-muted text-decoration-none mb-2">
              Downloads &amp; resources
            </Link>
          </div>
          <div className="col-md-3 mb-4">
            <p className="fw-semibold">Account</p>
            <Link to="/signup" className="d-block text-muted text-decoration-none mb-2">
              Open an account
            </Link>
            <Link to="/funds" className="d-block text-muted text-decoration-none mb-2">
              Fund transfer
            </Link>
            <Link to="/support" className="d-block text-muted text-decoration-none mb-2">
              60 day challenge
            </Link>
          </div>
        </div>
        <div className="mt-4 text-muted pb-4" style={{ fontSize: "13px" }}>
          <p>
            ApexTrader Broking Ltd.: Member of NSE &amp; BSE – SEBI Registration no.:
            INZ000031633 CDSL: Depository services through ApexTrader Securities
            Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015 Commodity Trading
            through ApexTrader Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration
            no.: INZ000038238 Registered Address: ApexTrader Broking Ltd.,
            #153/154, 4th Cross, Dollars Colony, J.P Nagar 4th Phase,
            Bengaluru - 560078, Karnataka, India. For complaints pertaining to
            securities broking write to complaints@apextrader.com, for DP related
            to dp@apextrader.com. Please ensure you carefully read the Risk
            Disclosure Document as prescribed by SEBI | ICF
          </p>
          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
            Communication, Speedy redressal of the grievances
          </p>
          <p>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>
          <p>
            "Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers. Receive
            information of your transactions directly from Exchange on your
            mobile/email at the end of the day. Issued in the interest of
            investors. KYC is one time exercise while dealing in securities
            markets — once KYC is done through a SEBI registered intermediary
            (broker, DP, Mutual Fund etc.), you need not undergo the same
            process again when you approach another intermediary." Dear
            Investor, if you are subscribing to an IPO, there is no need to
            issue a cheque. Please write the Bank account number and sign the
            IPO application form to authorize your bank to make payment in case
            of allotment. In case of non allotment the funds will remain in your
            bank account. As a business we don't give stock tips, and have not
            authorized anyone to trade on behalf of others. If you find anyone
            claiming to be part of ApexTrader and offering such services, please
            create a ticket here.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
