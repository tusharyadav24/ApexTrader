import React from "react";
import { Link } from "react-router-dom";

function CreateTicket() {
  const categories = [
    {
      icon: "fa fa-plus-circle",
      title: "Account Opening",
      links: [
        "Online Account Opening",
        "Offline Account Opening",
        "Company, Partnership and HUF Account",
        "NRI Account Opening",
        "Charges at ApexTrader",
        "ApexTrader IDFC FIRST Bank 3-in-1 Account",
        "Getting Started",
      ],
    },
    {
      icon: "fa-solid fa-user",
      title: "Your ApexTrader Account",
      links: [
        "Profile & Settings",
        "Bank Account Update",
        "Nominee Update",
        "Segment Activation",
        "Account Closure",
        "Demat Account",
        "KYC Update",
      ],
    },
    {
      icon: "fa-solid fa-chart-simple",
      title: "Trading & Markets",
      links: [
        "Order Issues",
        "Margin & Leverage",
        "Intraday Trades",
        "F&O Trading",
        "Currency Trading",
        "Commodity Trading",
        "Platform Issues",
      ],
    },
    {
      icon: "fa-solid fa-wallet",
      title: "Funds",
      links: [
        "Add Funds",
        "Withdraw Funds",
        "Fund Transfer Issues",
        "UPI Issues",
        "Margin Against Securities",
        "Payin & Payout",
        "Collateral",
      ],
    },
    {
      icon: "fa-solid fa-terminal",
      title: "Console",
      links: [
        "Tax P&L",
        "Contract Notes",
        "Ledger",
        "Holdings Report",
        "Order History",
        "Tradebook",
        "Annual Reports",
      ],
    },
    {
      icon: "fa-solid fa-coins",
      title: "Coin (Mutual Funds)",
      links: [
        "Buy MF",
        "Redeem MF",
        "SIP Setup",
        "Switch Funds",
        "MF Holdings",
        "ELSS / Tax Saving",
        "MF Statements",
      ],
    },
  ];

  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-2">To create a ticket, select a relevant topic</h1>
        {categories.map((cat, idx) => (
          <div key={idx} className="col-md-4 p-5 mt-2 mb-2">
            <h4>
              <i className={cat.icon} aria-hidden="true"></i> {cat.title}
            </h4>
            {cat.links.map((link, li) => (
              <span key={li}>
                <Link
                  to="/support"
                  style={{ textDecoration: "none", lineHeight: "2.5", display: "block" }}
                >
                  {link}
                </Link>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateTicket;
