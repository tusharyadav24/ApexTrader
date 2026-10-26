import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        "https://apextrader-backend.onrender.com/login",
        { username, password },
        { withCredentials: true }
      );
      onLoginSuccess(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-card">
        <div className="login-logo">
          <span className="login-brand">ApexTrader</span>
        </div>
        <h2 className="login-title">Welcome back</h2>
        <p className="login-subtitle">Sign in to your trading account</p>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              autoComplete="username"
            />
          </div>
          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="login-footer">
          Don't have an account?{" "}
          {/* FIX #9: Was pointing to https://apextrader-backend.onrender.com/signup
              (a backend URL with no such route). Now correctly links to the
              frontend signup page. */}
          <a
            href="https://apextrader-frontend-1.onrender.com/signup"
            target="_blank"
            rel="noreferrer"
          >
            Open account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
