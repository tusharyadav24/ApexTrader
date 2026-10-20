import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route} from "react-router-dom";
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
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/about' element={<AboutPage/>}></Route>
        <Route path='/products' element={<ProductPage/>}></Route>
        <Route path='/pricing' element={<PricingPage/>}></Route>
        <Route path='/support' element={<SupportPage/>}></Route>
        <Route path='*' element={<Notfound/>}></Route>
      </Routes>
      <Footer/>
   </BrowserRouter>
);
