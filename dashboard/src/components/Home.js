import React, { useState, useEffect } from "react";
import api from "../api";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import Login from "./Login";
import { LiveMarketProvider } from "./LiveMarketContext";

const Home = () => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    api
      .get("/me")
      .then((res) => {
        setUser(res.data?.user || { username: "Trader", email: "trader@apextrader.com" });
        setChecking(false);
      })
      .catch(() => {
        setUser({ username: "Trader", email: "trader@apextrader.com" });
        setChecking(false);
      });
  }, []);

  if (checking) {
    return (
      <div className="loading-screen fade-in-up">
        <span className="brand-text" style={{ fontSize: "1.6rem" }}>
          ApexTrader
        </span>
        <p style={{ margin: 0, fontSize: "0.95rem" }}>Loading trading workspace...</p>
      </div>
    );
  }

  if (!user) {
    return <Login onLoginSuccess={(u) => setUser(u)} />;
  }

  return (
    <LiveMarketProvider>
      <TopBar user={user} onLogout={() => setUser(null)} />
      <Dashboard />
    </LiveMarketProvider>
  );
};

export default Home;
