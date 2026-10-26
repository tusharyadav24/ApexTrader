import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // FIX #1: import useLocation
import axios from "axios";

const Menu = ({ user, onLogout }) => {
  // FIX #1: Removed useState(0) for selectedMenu — replaced with URL-based
  // active state detection via useLocation(). This prevents the sidebar
  // active tab from resetting to "Dashboard" on every page refresh.
  const location = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", to: "/", exact: true },
    { label: "Orders",    to: "/orders" },
    { label: "Holdings",  to: "/holdings" },
    { label: "Positions", to: "/positions" },
    { label: "Funds",     to: "/funds" },
  ];

  // Returns true if the current URL matches this menu item's route
  const isActive = (item) =>
    item.exact
      ? location.pathname === item.to
      : location.pathname.startsWith(item.to);

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
          {menuItems.map((item) => (
            <li key={item.to}>
              <Link style={{ textDecoration: "none" }} to={item.to}>
                <p className={isActive(item) ? "menu selected" : "menu"}>
                  {item.label}
                </p>
              </Link>
            </li>
          ))}
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
