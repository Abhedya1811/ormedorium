import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductsPage.css';
import logo from '../assets/logo.jpeg';

// Import product images
import product1 from '../assets/photo1.jpeg';
import product2 from '../assets/photo2.jpeg';
import product3 from '../assets/photo3.jpeg';
import product4 from '../assets/photo4.jpeg';
import product5 from '../assets/photo5.jpeg';
import product6 from '../assets/photo6.jpeg';

const Logo = ({ className = "h-10" }) => (
  <img src={logo} alt="Ormedorium" className={`${className} object-contain`} />
);

const ProductsPage = () => {
  const [cart, setCart] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const navigate = useNavigate();

  const products = [
    { 
      id: 1,
      name: 'ARABIAN MIRAGE', 
      category: 'MEN', 
      volume: '50ml/1.69oz', 
      type: 'Eau De Parfum', 
      price: '$89.00',
      image: product1,
      description: 'A captivating blend of exotic spices and warm amber, inspired by the mystique of the Arabian desert.',
      gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(180, 83, 9, 0.02))'
    },
    { 
      id: 2,
      name: 'DOMINION', 
      category: 'MEN', 
      volume: '50ml/1.69oz', 
      type: 'Eau De Parfum', 
      price: '$95.00',
      image: product2,
      description: 'Command attention with this powerful fusion of oud, leather, and rare spices.',
      gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.06), rgba(139, 92, 246, 0.02))'
    },
    { 
      id: 3,
      name: 'VERIO', 
      category: 'UNISEX', 
      volume: '50ml/1.69oz', 
      type: 'Eau De Parfum', 
      price: '$78.00',
      image: product3,
      description: 'A balanced harmony of fresh citrus and woody notes, perfect for any occasion.',
      gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(236, 72, 153, 0.02))'
    },
    { 
      id: 4,
      name: 'AURELINE', 
      category: 'WOMEN', 
      volume: '50ml/1.69oz', 
      type: 'Eau De Parfum', 
      price: '$92.00',
      image: product4,
      description: 'An elegant bouquet of floral notes with a hint of musk, designed for the modern woman.',
      gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(244, 63, 94, 0.02))'
    },
    { 
      id: 5,
      name: 'VELORA', 
      category: 'WOMEN', 
      volume: '50ml/1.69oz', 
      type: 'Eau De Parfum', 
      price: '$88.00',
      image: product5,
      description: 'A sophisticated blend of velvety florals and warm amber, leaving a trail of elegance.',
      gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.07), rgba(168, 85, 247, 0.02))'
    },
    { 
      id: 6,
      name: 'AETHER PULSE', 
      category: 'UNISEX', 
      volume: '50ml/1.69oz', 
      type: 'Eau De Parfum', 
      price: '$82.00',
      image: product6,
      description: 'An ethereal fusion of fresh aquatic notes and subtle spices, capturing the essence of the heavens.',
      gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.09), rgba(6, 182, 212, 0.02))'
    },
  ];

  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  // Simple add to cart function - FIXED
  const addToCart = (product) => {
    console.log('Adding to cart:', product.name);
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')) * (item.quantity || 1), 0);

  const filters = ['All', 'MEN', 'WOMEN', 'UNISEX'];

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout', { state: { cart, totalPrice } });
  };

  return (
    <div className="products-page">
      {/* Notification */}
      {showNotification && (
        <div className="notification">
          ✦ Added to cart!
        </div>
      )}

      {/* Header */}
      <header className="products-header">
        <div className="products-header-content">
          <Link to="/" className="products-logo-link">
            <Logo className="h-10" />
          </Link>
          <div className="products-header-right">
            <Link to="/" className="back-home">← Back to Home</Link>
            <div className="cart-icon-wrapper" onClick={() => setShowCartDropdown(!showCartDropdown)}>
              <span className="cart-icon">🛒</span>
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
              
              {/* Cart Dropdown */}
              {showCartDropdown && (
                <div className="cart-dropdown">
                  <div className="cart-dropdown-header">
                    <span>Shopping Cart</span>
                    <span className="cart-dropdown-close" onClick={(e) => {
                      e.stopPropagation();
                      setShowCartDropdown(false);
                    }}>✕</span>
                  </div>
                  {cart.length === 0 ? (
                    <div className="cart-empty">
                      <span>🛒</span>
                      <p>Your cart is empty</p>
                    </div>
                  ) : (
                    <>
                      <div className="cart-dropdown-items">
                        {cart.map((item) => (
                          <div key={item.id} className="cart-dropdown-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                              <p className="cart-item-name">{item.name}</p>
                              <p className="cart-item-price">{item.price}</p>
                              <div className="cart-item-quantity">
                                <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}>−</button>
                                <span>{item.quantity || 1}</span>
                                <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}>+</button>
                              </div>
                            </div>
                            <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                          </div>
                        ))}
                      </div>
                      <div className="cart-dropdown-footer">
                        <div className="cart-dropdown-total">
                          <span>Total:</span>
                          <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <button className="cart-checkout-btn" onClick={handleCheckout}>
                          Checkout →
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Cart Summary Bar */}
      {totalItems > 0 && (
        <div className="cart-summary">
          <div className="cart-summary-content">
            <span className="cart-items">{totalItems} item{totalItems > 1 ? 's' : ''} in cart</span>
            <span className="cart-total">Total: ${totalPrice.toFixed(2)}</span>
            <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout →</button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="products-container">
        <div className="products-header-section">
          <div className="products-badge">
            <span className="products-badge-line"></span>
            <span className="products-badge-text">LUXURY COLLECTION</span>
            <span className="products-badge-line"></span>
          </div>
          <h1 className="products-title">OUR COLLECTION</h1>
          <p className="products-subtitle">Discover our exclusive range of luxury fragrances</p>
          <div className="products-filter-bar">
            {filters.map((filter) => (
              <button 
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card" style={{ background: product.gradient }}>
              <div className="product-card-glow"></div>
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-card-image" />
                <div className="product-overlay">
                  <span className="product-type-badge">{product.type}</span>
                </div>
              </div>
              <div className="product-details">
                <div className="product-header-info">
                  <h3 className="product-card-name">{product.name}</h3>
                  <span className="product-card-category">{product.category}</span>
                </div>
                <p className="product-description">{product.description}</p>
                <div className="product-meta">
                  <span className="product-volume">{product.volume}</span>
                  <span className="product-price">{product.price}</span>
                </div>
                <div className="product-actions">
  {!cart.some(item => item.id === product.id) ? (
    <button 
      className="add-to-cart-btn"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
      }}
      type="button"
    >
      ADD
    </button>
  ) : (
    <div className="food-style-counter">
      <button 
        className="counter-btn minus"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const item = cart.find(item => item.id === product.id);
          if (item && item.quantity <= 1) {
            removeFromCart(product.id);
          } else {
            updateQuantity(product.id, (item?.quantity || 1) - 1);
          }
        }}
        type="button"
      >
        <span>−</span>
      </button>
      <span className="counter-value">
        {cart.find(item => item.id === product.id)?.quantity || 1}
      </span>
      <button 
        className="counter-btn plus"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const item = cart.find(item => item.id === product.id);
          updateQuantity(product.id, (item?.quantity || 1) + 1);
        }}
        type="button"
      >
        <span>+</span>
      </button>
    </div>
  )}
</div>
              </div>
              <div className="product-shimmer"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="products-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-logo-wrapper">
              <Logo className="footer-logo-large" />
              <span className="footer-brand-text">CARRY YOUR AURA</span>
            </div>
            <div className="footer-locations">
              <div className="footer-location-item">
                <span className="footer-location-icon">📍</span>
                <span>Pune, India</span>
              </div>
              <div className="footer-location-item">
                <span className="footer-location-icon">📍</span>
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>
          
          <div className="footer-grid">
            <div>
              <h4 className="footer-heading">SHOP</h4>
              <ul className="footer-list">
                <li>All Perfumes</li>
                <li>Best Sellers</li>
                <li>New Arrivals</li>
                <li>Gift Sets</li>
              </ul>
            </div>
            <div>
              <h4 className="footer-heading">BRAND</h4>
              <ul className="footer-list">
                <li>Our Story</li>
                <li>Ingredients</li>
                <li>Sustainability</li>
                <li>Craftsmanship</li>
              </ul>
            </div>
            <div>
              <h4 className="footer-heading">HELP</h4>
              <ul className="footer-list">
                <li>FAQs</li>
                <li>Shipping & Delivery</li>
                <li>Returns & Refunds</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h4 className="footer-heading">PAYMENT</h4>
              <div className="footer-payments">
                <span className="payment-method">VISA</span>
                <span className="payment-method">PayPal</span>
                <span className="payment-method">GPay</span>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <span>© 2025 Ormedorium. All rights reserved. <br></br>  Designed & Developed by Abhedya</span>
           
            <div className="footer-legal">
              <span>Privacy Policy</span>
              <span>Terms & Conditions</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductsPage;