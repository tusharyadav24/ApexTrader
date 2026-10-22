import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Menu = ({ user, onLogout }) => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.get("https://apextrader-backend.onrender.com/logout", {
        withCredentials: true,
      });
      onLogout();
    } catch (err) {
      onLogout();
    }
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const getInitials = (username) => {
    if (!username) return "AT";
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <div className="menu-container">
      <div className="brand-logo">
        <span className="brand-text">ApexTrader</span>
      </div>
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">{getInitials(user?.username)}</div>
          <p className="username">{user?.username || "User"}</p>
        </div>
        {isProfileDropdownOpen && (
          <div className="profile-dropdown">
            <p className="dropdown-email">{user?.email || ""}</p>
            <hr className="dropdown-divider" />
            <button className="dropdown-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
