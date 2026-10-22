import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [username, setUsername] = useState("User");

  useEffect(() => {
    axios
      .get("https://apextrader-backend.onrender.com/me", { withCredentials: true })
      .then((res) => setUsername(res.data.user?.username || "User"))
      .catch(() => {});

    axios
      .get("https://apextrader-backend.onrender.com/allHoldings", { withCredentials: true })
      .then((res) => setHoldings(res.data))
      .catch(() => {});

    axios
      .get("https://apextrader-backend.onrender.com/allPositions", { withCredentials: true })
      .then((res) => setPositions(res.data))
      .catch(() => {});
  }, []);

  const totalInvestment = holdings.reduce((s, h) => s + h.avg * h.qty, 0);
  const totalCurrent = holdings.reduce((s, h) => s + h.price * h.qty, 0);
  const totalPnL = totalCurrent - totalInvestment;
  const pnlPercent =
    totalInvestment > 0
      ? ((totalPnL / totalInvestment) * 100).toFixed(2)
      : "0.00";

  const formatCurrency = (val) => {
    const abs = Math.abs(val);
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
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
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
