import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './CheckoutPage.css';
import logo from '../assets/logo.jpeg';

const Logo = ({ className = "h-10" }) => (
  <img src={logo} alt="Ormedorium" className={`${className} object-contain`} />
);

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
    orderNotes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [orderNumber, setOrderNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (cart.length === 0) {
    navigate('/products');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby6RLHJ2pCCA_k--Lb2O5sF04fmH0XEPd2N8reSs9-0134YN3vGm4rziRZ2S4Ky9Jx0/exec';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    const orderData = {
      date: new Date().toISOString(),
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        orderNotes: formData.orderNotes
      },
      items: cart.map(item => ({
        name: item.name,
        category: item.category,
        volume: item.volume,
        type: item.type,
        price: item.price,
        quantity: item.quantity || 1,
        total: (parseFloat(item.price.replace('$', '')) * (item.quantity || 1)).toFixed(2)
      })),
      totalPrice: totalPrice.toFixed(2),
      totalItems: cart.reduce((sum, item) => sum + (item.quantity || 1), 0)
    };

    try {
      console.log('Sending order data:', orderData);
      
      // Use no-cors mode to bypass CORS
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      // With no-cors, we can't read the response, so generate a local order number
      const localOrderNumber = `ORD-${Date.now().toString().slice(-6)}`;
      setOrderNumber(localOrderNumber);
      setSubmitStatus('success');
      
    } catch (error) {
      console.error('Error submitting order:', error);
      setErrorMessage(error.message || 'Network error. Please check your connection.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success page
  if (submitStatus === 'success') {
    return (
      <div className="checkout-page">
        <header className="checkout-header">
          <div className="checkout-header-content">
            <Link to="/" className="checkout-logo-link">
              <Logo className="h-10" />
            </Link>
            <div className="checkout-header-right">
              <Link to="/products" className="back-to-shop">← Continue Shopping</Link>
            </div>
          </div>
        </header>

        <div className="checkout-success">
          <div className="checkout-success-content">
            <div className="checkout-success-icon">✓</div>
            <h1 className="checkout-success-title">Order Placed Successfully!</h1>
            <p className="checkout-success-subtitle">Your order request has been received.</p>
            <div className="checkout-success-details">
              <p><strong>Order Number:</strong> #{orderNumber}</p>
              <p><strong>Total Amount:</strong> ${totalPrice.toFixed(2)}</p>
              <p><strong>Items:</strong> {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} items</p>
              <p><strong>Customer:</strong> {formData.fullName}</p>
            </div>
            <div className="checkout-success-message">
              <p>✅ Our team will contact you shortly for payment details.</p>
              <p className="checkout-success-note">You will receive a confirmation email with your order details.</p>
            </div>
            <Link to="/" className="checkout-success-btn">Return to Home</Link>
          </div>
        </div>

        <footer className="checkout-footer">
          <div className="checkout-footer-inner">
            <span>© 2025 Ormedorium. All rights reserved.</span>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <div className="checkout-header-content">
          <Link to="/" className="checkout-logo-link">
            <Logo className="h-10" />
          </Link>
          <div className="checkout-header-right">
            <Link to="/products" className="back-to-shop">← Continue Shopping</Link>
          </div>
        </div>
      </header>

      <div className="checkout-container">
        {/* Disclaimer Banner */}
        <div className="checkout-disclaimer">
          <span className="disclaimer-icon">📋</span>
          <p className="disclaimer-text">
            <strong>Please Note:</strong> This is an order request. Our team will review and approve your order. You will be contacted for payment and confirmation.
          </p>
        </div>

        <div className="checkout-grid">
          <div className="checkout-summary">
            <h2 className="checkout-summary-title">Order Summary</h2>
            <div className="checkout-items">
              {cart.map((item) => (
                <div key={item.id} className="checkout-item">
                  <img src={item.image} alt={item.name} className="checkout-item-image" />
                  <div className="checkout-item-details">
                    <p className="checkout-item-name">{item.name}</p>
                    <p className="checkout-item-meta">{item.volume} • {item.type}</p>
                    <p className="checkout-item-quantity">Qty: {item.quantity || 1}</p>
                  </div>
                  <span className="checkout-item-price">${(parseFloat(item.price.replace('$', '')) * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="checkout-total">
              <div className="checkout-total-row">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="checkout-total-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="checkout-total-row checkout-grand-total">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="checkout-form">
            <h2 className="checkout-form-title">Shipping Information</h2>
            
            {submitStatus === 'error' && (
              <div className="checkout-error">
                <p>⚠️ {errorMessage || 'There was an error submitting your order. Please try again.'}</p>
              </div>
            )}

            <form className="checkout-form-fields" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="John Doe" 
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="john@example.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="+91 98765 43210" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Shipping Address *</label>
                <input 
                  type="text" 
                  name="address"
                  placeholder="123 Main Street" 
                  value={formData.address}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input 
                    type="text" 
                    name="city"
                    placeholder="Mumbai" 
                    value={formData.city}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Postal Code *</label>
                  <input 
                    type="text" 
                    name="postalCode"
                    placeholder="400001" 
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Country</label>
                <select name="country" value={formData.country} onChange={handleInputChange}>
                  <option value="India">India</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Order Notes (Optional)</label>
                <textarea 
                  name="orderNotes"
                  placeholder="Any special instructions..."
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
              
              <button 
                type="submit" 
                className="place-order-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : `Order Request • $${totalPrice.toFixed(2)}`}
              </button>
              
              {/* Disclaimer below button for mobile */}
              <p className="form-disclaimer">
                📋 By placing this order, you are submitting a request. Our team will contact you for confirmation and payment.
              </p>
            </form>
          </div>
        </div>
      </div>

      <footer className="checkout-footer">
        <div className="checkout-footer-inner">
          <span>© 2025 Ormedorium. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPage;