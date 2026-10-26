import React, { useState, useEffect } from "react";
import api from "../api";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import Login from "./Login";

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
      <div className="loading-screen">
        <p>Loading ApexTrader...</p>
      </div>
    );
  }

  if (!user) {
    return <Login onLoginSuccess={(u) => setUser(u)} />;
  }

  return (
    <>
      <TopBar user={user} onLogout={() => setUser(null)} />
      <Dashboard />
    </>
  );
};

export default Home;