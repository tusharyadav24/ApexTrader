import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";

// ─── Scroll-reveal observer (fires once per element) ───
const initScrollReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
  );

  document.querySelectorAll(".scroll-reveal:not(.revealed)").forEach((el) => {
    observer.observe(el);
  });
};

// Re-run after every route change or dynamic render
const initMutationWatcher = () => {
  const rootEl = document.getElementById("root");
  if (!rootEl) return;
  const mo = new MutationObserver(() => {
    initScrollReveal();
  });
  mo.observe(rootEl, {
    childList: true,
    subtree: true,
  });
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

setTimeout(() => {
  initScrollReveal();
  initMutationWatcher();
}, 100);
