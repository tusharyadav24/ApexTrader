import React, { useState, useEffect } from "react";
import api from "../api";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [funds, setFunds] = useState({ availableMargin: 3740 });
  const [username, setUsername] = useState("Trader");

  useEffect(() => {
    api
      .get("/me")
      .then((res) => {
        if (res.data?.user?.username) {
          setUsername(res.data.user.username);
        }
      })
      .catch(() => {});

    api
      .get("/allHoldings")
      .then((res) => setHoldings(Array.isArray(res.data) ? res.data : []))
      .catch(() => {
        api
          .get("/holdings")
          .then((res) => setHoldings(Array.isArray(res.data) ? res.data : []))
          .catch(() => {});
      });

    api
      .get("/allPositions")
      .then((res) => setPositions(Array.isArray(res.data) ? res.data : []))
      .catch(() => {
        api
          .get("/positions")
          .then((res) => setPositions(Array.isArray(res.data) ? res.data : []))
          .catch(() => {});
      });

    api
      .get("/funds")
      .then((res) => {
        if (res.data) setFunds(res.data);
      })
      .catch(() => {
        api
          .get("/allFunds")
          .then((res) => {
            if (res.data) setFunds(res.data);
          })
          .catch(() => {});
      });
  }, []);

  const totalInvestment = holdings.reduce(
    (s, h) => s + (Number(h.avg) || 0) * (Number(h.qty) || 0),
    0
  );
  const totalCurrent = holdings.reduce(
    (s, h) => s + (Number(h.price) || 0) * (Number(h.qty) || 0),
    0
  );
  const totalPnL = totalCurrent - totalInvestment;
  const pnlPercent =
    totalInvestment > 0
      ? ((totalPnL / totalInvestment) * 100).toFixed(2)
      : "0.00";

  const formatCurrency = (val) => {
    const num = Number(val) || 0;
    const abs = Math.abs(num);
    if (abs >= 1e5) return `${(abs / 1e5).toFixed(2)}L`;
    if (abs >= 1e3) return `${(abs / 1e3).toFixed(2)}k`;
    return abs.toFixed(2);
  };

  return (
    <>
      <div className="username">
        <h6>Hi, {username}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{formatCurrency(funds.availableMargin || 3740)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{formatCurrency(funds.usedMargin || 0)}</span>{" "}
            </p>
            <p>
              Opening balance <span>{formatCurrency(funds.openingBalance || 3740)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={totalPnL >= 0 ? "profit" : "loss"}>
              {formatCurrency(totalPnL)}{" "}
              <small className={totalPnL >= 0 ? "" : "loss"}>
                {totalPnL >= 0 ? "+" : ""}
                {pnlPercent}%
              </small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{formatCurrency(totalCurrent)}</span>{" "}
            </p>
            <p>
              Investment <span>{formatCurrency(totalInvestment)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {positions.length > 0 && (
        <div className="section">
          <span>
            <p>Positions ({positions.length})</p>
          </span>
          <div className="data">
            <div className="second">
              <p>Open positions today</p>
            </div>
          </div>
          <hr className="divider" />
        </div>
      )}
    </>
  );
};

export default Summary;