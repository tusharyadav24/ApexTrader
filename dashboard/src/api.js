import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1")
    ? "http://localhost:3002"
    : "https://apextrader-backend.onrender.com");

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default api;
export { API_BASE_URL };