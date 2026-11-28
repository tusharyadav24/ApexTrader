import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Signup from './landing_page/signup/SignUp';
import HomePage from './landing_page/home/HomePage';
import AboutPage from './landing_page/about/AboutPage';
import ProductPage from './landing_page/products/ProductPage';
import PricingPage from './landing_page/pricing/PricingPage';
import SupportPage from './landing_page/support/SupportPage';
import Navbar from './landing_page/Navbar';
import Notfound from './landing_page/Notfound';
import Footer from './landing_page/Footer';

// ─── Scroll-reveal observer (fires once per element) ───
const initScrollReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  // Observe everything with class "scroll-reveal"
  document.querySelectorAll('.scroll-reveal').forEach((el) => {
    observer.observe(el);
  });
};

// Re-run after every route change (MutationObserver)
const initMutationWatcher = () => {
  const mo = new MutationObserver(() => {
    initScrollReveal();
  });
  mo.observe(document.getElementById('root'), {
    childList: true,
    subtree: true,
  });
};

// ─── Navbar scroll shadow ───
const initNavbarShadow = () => {
  const handleScroll = () => {
    const nav = document.querySelector('.navbar');
    if (nav) {
      if (window.scrollY > 10) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
};

// ─── Keep-alive ping to prevent Render sleep ───
const API_BASE =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3002'
    : 'https://apextrader-backend.onrender.com');

const keepAlive = () => {
  setInterval(() => {
    fetch(`${API_BASE}/health`).catch(() => {});
  }, 10 * 60 * 1000); // every 10 minutes
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/pricing' element={<PricingPage />} />
        <Route path='/support' element={<SupportPage />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

// Initialize effects after first paint
setTimeout(() => {
  initScrollReveal();
  initMutationWatcher();
  initNavbarShadow();
  keepAlive();
}, 100);
