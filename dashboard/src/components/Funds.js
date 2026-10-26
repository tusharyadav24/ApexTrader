import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const Funds = () => {
  const [funds, setFunds] = useState({
    availableMargin: 4043.1,
    usedMargin: 3757.3,
    availableCash: 4043.1,
    openingBalance: 4043.1,
    collateralMargin: 3736.4,
    payin: 4064.0,
    span: 0.0,
    deliveryMargin: 0.0,
    exposure: 0.0,
    optionsPremium: 0.0,
    totalCollateral: 0.0,
  });

  useEffect(() => {
    api
      .get("/funds")
      .then((res) => {
        if (res.data && typeof res.data === "object") {
          setFunds((prev) => ({ ...prev, ...res.data }));
        }
      })
      .catch(() => {
        api
          .get("/allFunds")
          .then((res) => {
            if (res.data && typeof res.data === "object") {
              setFunds((prev) => ({ ...prev, ...res.data }));
            }
          })
          .catch(() => {});
      });
  }, []);

  const handleAddFunds = async () => {
    try {
      const res = await api.post("/funds", { amount: 1000, action: "add" });
      if (res.data) {
        setFunds((prev) => ({ ...prev, ...res.data }));
      }
    } catch {
      alert("Fund transfer via UPI — feature coming soon.");
    }
  };

  const handleWithdraw = async () => {
    try {
      const res = await api.post("/funds", { amount: 500, action: "withdraw" });
      if (res.data) {
        setFunds((prev) => ({ ...prev, ...res.data }));
      }
    } catch {
      alert("Withdrawal request — feature coming soon.");
    }
  };

  const formatNumber = (num) => {
    const n = Number(num) || 0;
    return n.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI </p>
        <button className="btn btn-green" onClick={handleAddFunds}>
          Add funds
        </button>
        <button className="btn btn-blue" onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">{formatNumber(funds.availableMargin)}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">{formatNumber(funds.usedMargin)}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">{formatNumber(funds.availableCash)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>{formatNumber(funds.openingBalance)}</p>
            </div>
            <div className="data">
              <p>Collateral margin</p>
              <p>{formatNumber(funds.collateralMargin)}</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>{formatNumber(funds.payin)}</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>{formatNumber(funds.span)}</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>{formatNumber(funds.deliveryMargin)}</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>{formatNumber(funds.exposure)}</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>{formatNumber(funds.optionsPremium)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>{formatNumber(funds.totalCollateral)}</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link to="/signup" className="btn btn-blue">
              Open Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;