import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useLiveMarket } from "./LiveMarketContext";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [funds, setFunds] = useState({ availableMargin: 3740 });
  const [username, setUsername] = useState("Trader");
  const { stocks, isLive } = useLiveMarket();

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
    <div className="fade-in-up">
      <div className="username">
        <h6 className="gradient-text" style={{ display: "inline-block" }}>
          Hi, {username}!
        </h6>
        <hr className="divider" />
      </div>

      <div className="section scroll-reveal">
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

      <div className="section scroll-reveal scroll-reveal-delay-1">
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
        <div className="section scroll-reveal scroll-reveal-delay-2">
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

      <div className="section scroll-reveal scroll-reveal-delay-3">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <span style={{ margin: 0, gap: "10px" }}>
            <p style={{ margin: 0 }}>Live Market Movers</p>
            <span className="live-badge">
              <span className={`live-dot ${isLive ? "" : "paused"}`} />
              {isLive ? "LIVE" : "PAUSED"}
            </span>
          </span>
          <Link
            to="/live"
            className="btn btn-apex"
            style={{ padding: "6px 14px", fontSize: "0.78rem" }}
          >
            View All Live Stocks →
          </Link>
        </div>
        <div className="indices-grid">
          {stocks.slice(0, 4).map((s) => (
            <Link
              to="/live"
              key={s.name}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className={`glass-card index-card ${
                  s.tickDir === "up"
                    ? "tick-flash-up"
                    : s.tickDir === "down"
                    ? "tick-flash-down"
                    : ""
                }`}
              >
                <div className="index-card-top">
                  <span className="index-card-name">{s.name}</span>
                  <span className={`stock-change-pill ${s.isDown ? "down" : "up"}`}>
                    {s.percent}
                  </span>
                </div>
                <div className="index-card-price">₹{s.price.toFixed(2)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Summary;