import React, { useState } from "react";
import axios from "axios";

const DASHBOARD_URL =
  process.env.REACT_APP_DASHBOARD_URL ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1")
    ? "http://localhost:3001"
    : "https://apextrader-dashboard-1.onrender.com");

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const API_BASE_URL =
    process.env.REACT_APP_API_URL ||
    (typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")
      ? "http://localhost:3002"
      : "https://apextrader-backend.onrender.com");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters.");
    }

    setLoading(true);
    try {
      await axios.post(
        `${API_BASE_URL}/register`,
        {
          username: form.username,
          email: form.email,
          password: form.password,
        },
        {
          withCredentials: true,
        }
      );
      // Show success state then redirect to dashboard
      setRedirecting(true);
      setTimeout(() => {
        window.location.href = DASHBOARD_URL;
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  if (redirecting) {
    return (
      <div className="container py-5" style={{ minHeight: "60vh" }}>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 text-center fade-in-up">
            <div
              className="card shadow-lg border-0 p-5"
              style={{ borderRadius: "16px" }}
            >
              <div className="mb-4">
                <div
                  className="mx-auto pulse-glow"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #00c853, #69f0ae)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: 40, color: "#fff" }}>✓</span>
                </div>
              </div>
              <h3 className="fw-bold mb-2" style={{ color: "#1a1a2e" }}>
                Account Created!
              </h3>
              <p className="text-muted mb-3">
                Redirecting you to your dashboard...
              </p>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ minHeight: "60vh" }}>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5 fade-in-up">
          <div
            className="card glass-card shadow-lg border-0 p-4"
            style={{ borderRadius: "16px" }}
          >
            <div className="text-center mb-4">
              <h2 className="fw-bold gradient-text">ApexTrader</h2>
              <p className="text-muted">Create your trading account</p>
            </div>

            {error && (
              <div
                className="alert alert-danger py-2 px-3 fade-in-up"
                role="alert"
                style={{ borderRadius: "8px" }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-semibold">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control input-glow"
                  placeholder="Choose a username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control input-glow"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control input-glow"
                  placeholder="Min 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="form-label fw-semibold"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control input-glow"
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-apex w-100 py-2 fw-semibold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                    Creating Account...
                  </>
                ) : (
                  "Open Free Account"
                )}
              </button>
            </form>

            <p
              className="text-center text-muted mt-4"
              style={{ fontSize: "0.85rem" }}
            >
              Already have an account?{" "}
              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noreferrer"
                className="link-apex"
              >
                Go to Dashboard
              </a>
            </p>
          </div>
          <p
            className="text-center text-muted mt-3"
            style={{ fontSize: "0.75rem" }}
          >
            By signing up, you agree to our Terms & Conditions and Privacy
            Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
