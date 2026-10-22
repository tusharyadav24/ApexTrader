import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import Login from "./Login";

const Home = () => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    axios
      .get("https://apextrader-backend.onrender.com/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setChecking(false);
      })
      .catch(() => {
        setUser(null);
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
