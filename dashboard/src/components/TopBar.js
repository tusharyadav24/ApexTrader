import React from "react";
import Menu from "./Menu";

const TopBar = ({ user, onLogout }) => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">22,519.40</p>
          <p className="percent">+0.68%</p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">73,961.30</p>
          <p className="percent">+0.59%</p>
        </div>
      </div>
      <Menu user={user} onLogout={onLogout} />
    </div>
  );
};

export default TopBar;
