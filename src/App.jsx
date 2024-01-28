import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoinHome from "./pages/CoinHome";
import CoinDetail from "./pages/CoinDetail";
import Navbar from "./components/Navbar";
import Trending from "./components/Trending";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Wishlist from "./components/Wishlist";
import Contact from "./components/Contact";


function App() {
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<CoinHome />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <div style={{ marginBottom: '150px' }}></div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
