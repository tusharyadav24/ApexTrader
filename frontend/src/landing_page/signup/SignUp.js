import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters.");
    }

    setLoading(true);
    try {
      await axios.post("https://apextrader-backend.onrender.com/register", {
        username: form.username,
        email: form.email,
        password: form.password,
      },{
        withCredentials:true
      });
      setSuccess(
        "Account created successfully! You can now log in to the dashboard."
      );
      setForm({ username: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div
            className="card shadow-sm border-0 p-4"
            style={{ borderRadius: "8px" }}
          >
            <div className="text-center mb-4">
              <h2 className="fw-bold" style={{ color: "rgb(245,104,52)" }}>
                ApexTrader
              </h2>
              <p className="text-muted">Create your trading account</p>
            </div>

            {error && (
              <div className="alert alert-danger py-2 px-3" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success py-2 px-3" role="alert">
                {success}
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
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </div>
              <button
                type="submit"
                className="btn w-100 py-2 fw-semibold"
                style={{
                  background: "rgb(245,104,52)",
                  color: "#fff",
                  borderRadius: "4px",
                }}
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Open Free Account"}
              </button>
            </form>

            <p
              className="text-center text-muted mt-4"
              style={{ fontSize: "0.85rem" }}
            >
              Already have an account?{" "}
              <a
                href="https://apextrader-dashboard.onrender.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: "rgb(65,132,243)" }}
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
