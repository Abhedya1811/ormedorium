import React, { useState, useEffect, useRef } from 'react';
import './Ormedorium.css';
import logo from '../assets/logo.jpeg';
import { useNavigate } from 'react-router-dom';

// Import your product images
import hero1 from '../assets/hero4.jpeg';
import hero2 from '../assets/hero4.jpeg';
import hero3 from '../assets/hero4.jpeg';
import hero4 from '../assets/hero4.jpeg';
import product1 from '../assets/photo1.jpeg';
import product2 from '../assets/photo2.jpeg';
import product3 from '../assets/photo3.jpeg';

// ---- LOGO Component ----
const Logo = ({ className = "h-10" }) => (
  <img src={logo} alt="Ormedorium" className={`${className} object-contain`} />
);

// ---- Theme Helper (6am-6pm white, else dark) ----
function getInitialTheme() {
  const h = new Date().getHours();
  return (h >= 6 && h < 18) ? 'light' : 'dark';
}

// ---- MAIN COMPONENT ----
const Ormedorium = () => {
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // Refs for sections
  const collectionRef = useRef(null);
  const storyRef = useRef(null);
  const productsRef = useRef(null);

  // Handle scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Day/night cycle
  useEffect(() => {
    const interval = setInterval(() => {
      const h = new Date().getHours();
      const newTheme = (h >= 6 && h < 18) ? 'light' : 'dark';
      if (newTheme !== theme) setTheme(newTheme);
    }, 30000);
    return () => clearInterval(interval);
  }, [theme]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Slider images
  const slides = [
    { id: 1, src: hero1, alt: 'Ormedorium Collection' },
    { id: 2, src: hero2, alt: 'Luxury Perfume' },
    { id: 3, src: hero3, alt: 'Elegant Scent' },
    { id: 4, src: hero4, alt: 'Ormedorium Essence' },
  ];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.clientWidth * activeSlide,
        behavior: 'smooth',
      });
    }
  }, [activeSlide]);

  const isDark = theme === 'dark';

  // Smooth scroll function
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  // Product data - Only 3 Best Sellers
  const products = [
    { 
      name: 'ARABIAN MIRAGE', 
      category: 'MEN', 
      volume: '50ml/1.69oz', 
      type: 'Eau De Parfum', 
      image: product1,
      gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(180, 83, 9, 0.05))'
    },
    { 
      name: 'DOMINION', 
      category: 'MEN', 
      volume: '50ml/1.69oz', 
      type: 'Eau De Parfum', 
      image: product2,
      gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.12), rgba(139, 92, 246, 0.05))'
    },
    { 
      name: 'VERIO', 
      category: 'UNISEX', 
      volume: '50ml/1.69oz', 
      type: 'Eau De Parfum', 
      image: product3,
      gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.18), rgba(236, 72, 153, 0.05))'
    },
  ];

  // Collection highlights
  const collection = [
    { name: 'LUMIERE NOIRE', notes: 'Floral · Musk · Amber' },
    { name: 'OUD ROYALE', notes: 'Oud · Spice · Leather' },
    { name: 'VELVET SANTAL', notes: 'Sandalwood · Vanilla · Amber' },
  ];

  // Navbar links with scroll targets
  const navLinks = [
    { name: 'HOME', ref: null },
    { name: 'COLLECTION', ref: collectionRef },
    { name: 'BEST SELLERS', ref: productsRef },
    { name: 'ABOUT US', ref: storyRef },
    { name: 'INGREDIENTS', ref: null },
    { name: 'JOURNAL', ref: null },
    { name: 'CONTACT', ref: null },
  ];

  return (
    <div className={`${isDark ? 'dark' : ''} ormedorium-container`}>
      
      {/* Animated Background - Simplified for mobile */}
      <div className="ormedorium-bg">
        <div className="ormedorium-bg-gradient"></div>
        
        {/* Floating Orbs */}
        <div className="absolute inset-0">
          <div className="ormedorium-bg-orb orb-1"></div>
          <div className="ormedorium-bg-orb orb-2"></div>
          <div className="ormedorium-bg-orb orb-3"></div>
          <div className="ormedorium-bg-orb orb-4"></div>
          <div className="ormedorium-bg-orb orb-5"></div>
          <div className="ormedorium-bg-orb orb-6"></div>
        </div>

        {/* Sparkles - Reduced for performance */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="ormedorium-sparkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
              }}
            />
          ))}
        </div>

        {/* Floating Particles - Desktop only */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${15 + Math.random() * 20}s`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
            }}
          />
        ))}

        {/* Shimmer Overlay - Desktop only */}
        <div className="shimmer-overlay"></div>
        
        {/* Glowing Lines - Desktop only */}
        <div className="glow-line glow-line-1"></div>
        <div className="glow-line glow-line-2"></div>
        <div className="glow-line glow-line-3"></div>
      </div>

      {/* TOP BAR */}
      <div className={`ormedorium-header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="header-content">
          <div className="header-nav">
            <div className="header-logo">
              <Logo className="h-8 md:h-10" />
            </div>
            
            {/* Desktop Navigation */}
            <div className="header-links-wrapper">
              <div className="header-links-scroll">
                {navLinks.map((link, index) => (
                  <span 
                    key={index} 
                    className={`header-link ${link.name === 'HOME' ? 'header-link-active' : 'header-link-inactive'}`}
                    onClick={() => {
                      if (link.ref) {
                        scrollToSection(link.ref);
                      } else if (link.name === 'HOME') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                  >
                    {link.name}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
            
            <div className="header-right">
              <span className="q8-badge">Q8</span>
              <span className="search-icon">🔍</span>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link, index) => (
            <button
              key={index}
              className={`mobile-menu-link ${link.name === 'HOME' ? 'active' : ''}`}
              onClick={() => {
                if (link.ref) {
                  scrollToSection(link.ref);
                } else if (link.name === 'HOME') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }
              }}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>

      {/* FULL WIDTH SLIDER */}
      <div className="ormedorium-slider">
        <div className="slider-wrapper">
          <div ref={sliderRef} className="slider-track">
            {slides.map((s) => (
              <div key={s.id} className="slider-slide">
                <img 
                  src={s.src} 
                  alt={s.alt} 
                  className="slider-image" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover'
                  }} 
                />
                <div className="slider-overlay"></div>
              </div>
            ))}
          </div>
          <div className="slider-dots">
            {slides.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveSlide(idx)} 
                className={`slider-dot ${activeSlide === idx ? 'slider-dot-active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* HERO CONTENT */}
      <div className="hero-content">
        
        {/* PERFUME SPRAY - Desktop Only */}
        <div className="hero-spray-container">
          <div className="bottle-glow" />
          
          <div className="perfume-bottle">
            <svg viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bottleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0.15" />
                </linearGradient>
                <linearGradient id="liquidGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0.9" />
                </linearGradient>
                <filter id="bottleGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              <path d="M35 180 Q35 150 30 130 L25 80 L75 80 L70 130 Q65 150 65 180 Z" 
                    fill="url(#bottleGrad)" 
                    stroke="rgba(251,191,36,0.6)" 
                    strokeWidth="1.5"
                    filter="url(#bottleGlow)"/>
              
              <path d="M37 175 Q37 155 33 140 L30 115 L70 115 L67 140 Q63 155 63 175 Z" 
                    fill="url(#liquidGrad)" 
                    opacity="0.7"/>
              
              <path d="M35 120 Q40 115 50 120 Q60 125 65 120 L65 125 Q60 130 50 125 Q40 120 35 125 Z" 
                    fill="rgba(251,191,36,0.4)">
                <animate attributeName="d" 
                  dur="3s" 
                  repeatCount="indefinite" 
                  values="M35 120 Q40 115 50 120 Q60 125 65 120 L65 125 Q60 130 50 125 Q40 120 35 125 Z;
                          M35 120 Q42 118 50 122 Q58 126 65 120 L65 125 Q58 128 50 124 Q42 120 35 125 Z;
                          M35 120 Q40 115 50 120 Q60 125 65 120 L65 125 Q60 130 50 125 Q40 120 35 125 Z" />
              </path>
              
              <rect x="42" y="65" width="16" height="20" rx="2" 
                    fill="rgba(251,191,36,0.25)" 
                    stroke="rgba(251,191,36,0.5)" 
                    strokeWidth="1.5"/>
              
              <rect x="38" y="55" width="24" height="10" rx="4" 
                    fill="rgba(251,191,36,0.35)" 
                    stroke="rgba(251,191,36,0.6)" 
                    strokeWidth="1.5"/>
              
              <rect x="44" y="47" width="12" height="8" rx="3" 
                    fill="rgba(251,191,36,0.5)" 
                    stroke="rgba(251,191,36,0.7)" 
                    strokeWidth="1.5">
                <animate attributeName="fill-opacity" 
                  dur="1s" 
                  repeatCount="indefinite" 
                  values="0.5;0.8;0.5" />
              </rect>
              
              <line x1="50" y1="55" x2="50" y2="170" 
                    stroke="rgba(251,191,36,0.2)" 
                    strokeWidth="1"/>
              
              <path d="M42 48 L46 38 L54 38 L58 48 Z" 
                    fill="rgba(251,191,36,0.35)" 
                    stroke="rgba(251,191,36,0.5)" 
                    strokeWidth="1.5"/>
              
              <line x1="40" y1="150" x2="60" y2="150" stroke="rgba(251,191,36,0.2)" strokeWidth="0.5"/>
              <line x1="42" y1="160" x2="58" y2="160" stroke="rgba(251,191,36,0.15)" strokeWidth="0.5"/>
              
              <rect x="38" y="135" width="24" height="22" rx="2" 
                    fill="rgba(255,255,255,0.06)" 
                    stroke="rgba(251,191,36,0.3)" 
                    strokeWidth="0.5"/>
              <text x="50" y="147" textAnchor="middle" fill="rgba(251,191,36,0.8)" fontSize="7" fontWeight="bold" fontFamily="serif">O</text>
              <text x="50" y="154" textAnchor="middle" fill="rgba(251,191,36,0.4)" fontSize="4" fontWeight="300" fontFamily="serif" letterSpacing="1">R M</text>
            </svg>
          </div>
          
          <div className="spray-burst"></div>
          
          {[...Array(30)].map((_, i) => {
            const tx = 60 + Math.random() * 280;
            const ty = (Math.random() - 0.5) * 80;
            const size = 2 + Math.random() * 5;
            const delay = Math.random() * 2;
            const duration = 1.5 + Math.random() * 2;
            return (
              <div
                key={`spray-${i}`}
                className="spray-particle"
                style={{
                  '--tx': `${tx}px`,
                  '--ty': `${ty}px`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                }}
              />
            );
          })}
          
          {[...Array(15)].map((_, i) => {
            const dx = 80 + Math.random() * 200;
            const dy = (Math.random() - 0.5) * 70;
            const size = 4 + Math.random() * 8;
            const delay = Math.random() * 2.5;
            return (
              <div
                key={`droplet-${i}`}
                className="droplet"
                style={{
                  '--dx': `${dx}px`,
                  '--dy': `${dy}px`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
          
          {[...Array(6)].map((_, i) => {
            const size = 60 + Math.random() * 120;
            const delay = Math.random() * 3;
            return (
              <div
                key={`mist-${i}`}
                className="spray-mist"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
          
          {[...Array(15)].map((_, i) => {
            const sx = 40 + Math.random() * 180;
            const sy = (Math.random() - 0.5) * 60;
            const delay = Math.random() * 2;
            return (
              <div
                key={`sparkle-${i}`}
                className="sparkle-burst"
                style={{
                  '--sx': `${sx}px`,
                  '--sy': `${sy}px`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
          
          {['BERGAMOT', 'JASMINE', 'OUD', 'AMBER', 'MUSK', 'ROSE'].map((note, i) => {
            const delay = i * 0.8 + Math.random() * 0.5;
            return (
              <div
                key={`note-${i}`}
                className="scent-note"
                style={{
                  animationDelay: `${delay}s`,
                }}
              >
                {note}
              </div>
            );
          })}
        </div>
        
        {/* TEXT CONTENT - Centered */}
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="hero-badge-line"></span> 
            <span className="hero-badge-text">CARRY YOUR AURA</span>
            <span className="hero-badge-line"></span>
          </div>
          
          <h1 className="hero-title">
            WHERE ESSENCE
            <br />
            <span className="hero-title-highlight">BECOMES IDENTITY</span>
          </h1>
          
          <p className="hero-description">
            Ormedorium creates more than just scents — we craft emotions, memories, and a signature that stays with you.
          </p>
          
          <div className="hero-buttons">
            <button 
              className="btn-primary" 
              onClick={() => navigate('/products')}
            >
              EXPLORE COLLECTION
            </button>
            <button 
              className="btn-outline"
              onClick={() => scrollToSection(collectionRef)}
            >
              EAU DE PARFUM
            </button>
          </div>
          
          <div className="hero-bottom-badge">
            <span className="hero-bottom-badge-text">NEW LOOK · PREMIUM QUALITY</span>
            <span className="hero-bottom-badge-sub">SAME SIGNATURE</span>
          </div>
        </div>
      </div>

      {/* SAME SIGNATURE - NOW EVEN BETTER */}
      <div className="signature-section">
        <div className="signature-inner">
          <div className="signature-content">
            <div className="signature-badge">
              <span className="signature-badge-line"></span>
              <span className="signature-badge-text">NEW LOOK • PREMIUM QUALITY</span>
              <span className="signature-badge-line"></span>
            </div>
            
            <h2 className="signature-title">SAME SIGNATURE. <br /><span className="signature-title-highlight">NOW, EVEN BETTER.</span></h2>
            <p className="signature-description">
              Your favorite Eau De Parfum is back with a New Look & Even Higher Quality.
            </p>
            
            <div className="signature-grid">
              <div className="signature-card">
                <div className="signature-icon">✦</div>
                <h4 className="signature-card-title">MORE PREMIUM INGREDIENTS</h4>
                <p className="signature-card-desc">Finest quality, specially selected.</p>
              </div>
              <div className="signature-card">
                <div className="signature-icon">✦</div>
                <h4 className="signature-card-title">LONGER LASTING</h4>
                <p className="signature-card-desc">Enhanced formulation for all-day confidence.</p>
              </div>
              <div className="signature-card">
                <div className="signature-icon">✦</div>
                <h4 className="signature-card-title">RICHER SCENT</h4>
                <p className="signature-card-desc">Decadent, more refined and unforgettable.</p>
              </div>
              <div className="signature-card">
                <div className="signature-icon">✦</div>
                <h4 className="signature-card-title">EXCEPTIONAL QUALITY</h4>
                <p className="signature-card-desc">Made with the highest quality ingredients.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Strip - Desktop Only */}
     

      {/* OUR COLLECTION */}
      <div ref={collectionRef} className="collection-section">
        <div className="collection-inner">
          <div className="section-header">
            <h2 className="section-title">OUR COLLECTION</h2>
            <p className="section-subtitle">Scents that speak elegance.</p>
          </div>
          
          <div className="collection-grid">
            {collection.map((item) => (
              <div key={item.name} className="collection-card">
                <div className="collection-card-glow"></div>
                <h3 className="collection-name">{item.name}</h3>
                <p className="collection-notes">{item.notes}</p>
                <button className="shop-link">SHOP NOW →</button>
              </div>
            ))}
          </div>
          
          <div className="view-all">
            <button className="view-all-btn" onClick={() => navigate('/products')}>VIEW ALL COLLECTIONS</button>
          </div>
        </div>
      </div>

      {/* THE ORMEDORIUM STORY */}
      <div ref={storyRef} className="story-section">
        <div className="story-inner">
          <div className="story-grid">
            <div>
              <h2 className="story-title">THE ORMEDORIUM STORY</h2>
              <div className="story-divider"></div>
              <p className="story-text">
                Crafted for those who leave a mark. Born from passion and precision,
                Ormedorium blends the finest ingredients from around the world to create
                timeless fragrances. This is not just perfume. This is your aura, bottled.
              </p>
              
              <div className="story-stats">
                <div>
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Premium Ingredients</div>
                </div>
                <div>
                  <div className="stat-number">24+</div>
                  <div className="stat-label">Unique Scents</div>
                </div>
                <div>
                  <div className="stat-number">Made</div>
                  <div className="stat-label">for You</div>
                </div>
              </div>
              
              <button className="btn-primary">DISCOVER OUR JOURNEY</button>
            </div>
            
            <div className="story-card">
              <div className="story-icon">✨</div>
              <h3 className="story-card-title">Crafted for those who leave a mark.</h3>
              <p className="story-card-text">Each fragrance tells a story of elegance and distinction.</p>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT GRID - BEST SELLERS */}
      <div ref={productsRef} className="product-grid-section">
        <div className="products-inner">
          <div className="section-header">
            <h2 className="section-title">BEST SELLERS</h2>
            <p className="section-subtitle">Our most loved fragrances.</p>
          </div>
          
          <div className="products-grid-three">
            {products.map((p, i) => (
              <div key={i} className="product-card-three" style={{ background: p.gradient }}>
                <div className="product-card-glow-three"></div>
                <div className="product-image-wrapper-three">
                  <img src={p.image} alt={p.name} className="product-image-three" />
                </div>
                <p className="product-name-three">{p.name}</p>
                <p className="product-category-three">{p.category}</p>
                <p className="product-volume-three">{p.volume}</p>
                <p className="product-type-three">{p.type}</p>
                <div className="product-shimmer-three"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STAY ENCHANTED - Newsletter */}
      <div className="newsletter-section">
        <div className="newsletter-inner">
          <h2 className="newsletter-title">STAY ENCHANTED</h2>
          <p className="newsletter-desc">Join our inner circle for exclusive releases and offers.</p>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="newsletter-input" 
            />
            <button className="newsletter-submit">SUBSCRIBE</button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="ormedorium-footer">
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
          </div>
          
          <div className="footer-bottom">
            <span>© 2025 Ormedorium. All rights reserved.</span>
            <div className="footer-legal">
              <span>Privacy Policy</span>
              <span>Terms & Conditions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ormedorium;