import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Ormedorium from './components/Ormedorium';
import './App.css';  
import ProductsPage from './components/ProductsPage';
import CheckoutPage from './components/CheckoutPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Ormedorium />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/collection" element={<ProductsPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}

export default App;