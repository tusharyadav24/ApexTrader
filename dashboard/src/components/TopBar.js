import React from "react";
import Menu from "./Menu";
import { useLiveMarket } from "./LiveMarketContext";

const TopBar = ({ user, onLogout }) => {
  const { indices } = useLiveMarket();
  const nifty = indices.find((i) => i.id === "NIFTY") || {
    price: 22519.4,
    percent: "+0.68%",
    isDown: false,
    tickDir: "flat",
  };
  const sensex = indices.find((i) => i.id === "SENSEX") || {
    price: 73961.3,
    percent: "+0.59%",
    isDown: false,
    tickDir: "flat",
  };

  return (
    <div className="topbar-container fade-in-down">
      <div className="indices-container">
        <div
          className={`nifty ${
            nifty.tickDir === "up"
              ? "tick-flash-up"
              : nifty.tickDir === "down"
              ? "tick-flash-down"
              : ""
          }`}
        >
          <p className="index">NIFTY 50</p>
          <p className={`index-points ${nifty.isDown ? "down" : ""}`}>
            {nifty.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
          <p className="percent">{nifty.percent}</p>
        </div>
        <div
          className={`sensex ${
            sensex.tickDir === "up"
              ? "tick-flash-up"
              : sensex.tickDir === "down"
              ? "tick-flash-down"
              : ""
          }`}
        >
          <p className="index">SENSEX</p>
          <p className={`index-points ${sensex.isDown ? "down" : ""}`}>
            {sensex.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
          <p className="percent">{sensex.percent}</p>
        </div>
      </div>
      <Menu user={user} onLogout={onLogout} />
    </div>
  );
};

export default TopBar;
