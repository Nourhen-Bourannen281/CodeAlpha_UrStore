import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaTshirt, FaShoppingCart, FaUser, FaHome,
  FaBriefcaseMedical, FaLaptop, FaPagelines,
  FaSpa, FaBaby, FaGem, FaSearch, FaMoon, FaSignOutAlt,
  FaTags
} from 'react-icons/fa';

import '../styles/Navbar.css';
import products from '../data/products';

function Navbar({ user, setUser, onCategorySelect }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true';
    if (saved) {
      document.body.classList.add('dark-mode');
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', newMode);
    setDarkMode(newMode);
  };

  const normalize = (str) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  // Fonction pour formater le prix en toute sécurité
  const formatPrice = (price) => {
    if (price === undefined || price === null) return '0.00';
    const numericPrice = typeof price === 'number' ? price : parseFloat(price);
    return isNaN(numericPrice) ? '0.00' : numericPrice.toFixed(2);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '' && minPrice === '' && maxPrice === '') {
      setSearchResults([]);
      setNoResults(false);
      return;
    }

    const results = products.filter(product => {
      const searchWords = normalize(value).split(/\s+/);
      const nameMatch = searchWords.every(word => normalize(product.name).includes(word));
      
      // Utiliser le bon prix selon le type de produit
      const productPrice = product.old_price !== undefined ? product.new_price : product.price;
      
      const minOk = minPrice === '' || productPrice >= parseFloat(minPrice);
      const maxOk = maxPrice === '' || productPrice <= parseFloat(maxPrice);
      return nameMatch && minOk && maxOk;
    });

    setSearchResults(results);
    setNoResults(results.length === 0);
  };

  const handleResultClick = (id) => {
    setShowSearch(false);
    setSearchTerm('');
    setSearchResults([]);
    navigate(`/product/${id}`);
  };

  const handleCategoryClick = (category, path) => {
    if (onCategorySelect) onCategorySelect(category);
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="logo" onClick={() => handleCategoryClick('all', '/')}>
            UrStore
          </Link>
          
          <div className="categories">
            {[
              { icon: <FaHome />, name: 'Home', path: '/', category: 'all' },
              { icon: <FaTshirt />, name: 'Clothing', path: '/clothing', category: 'clothing' },
              { icon: <FaBriefcaseMedical />, name: 'Pharmacy', path: '/pharmacy', category: 'pharmacy' },
              { icon: <FaLaptop />, name: 'Tech', path: '/technology', category: 'technology' },
              { icon: <FaPagelines />, name: 'Decor', path: '/decor', category: 'decor' },
              { icon: <FaSpa />, name: 'Care', path: '/care', category: 'care' },
              { icon: <FaBaby />, name: 'Baby', path: '/baby', category: 'baby' },
              { icon: <FaGem />, name: 'Accessories', path: '/accessories', category: 'accessories' },
              { icon: <FaTags />, name: 'Sales', path: '/sales', category: 'sales' }
            ].map((item, index) => (
              <span
                key={index}
                className={`cat-link ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                onClick={() => handleCategoryClick(item.category, item.path)}
              >
                {item.icon}
                <span>{item.name}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="navbar-right">
          <button className="icon-button" onClick={() => {
            setShowSearch(!showSearch);
            if (!showSearch) {
              setSearchTerm('');
              setSearchResults([]);
              setNoResults(false);
            }
          }}>
            <FaSearch />
          </button>

          {showSearch && (
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                autoFocus
              />
              <div className="price-filters">
                <input
                  type="number"
                  placeholder="Min price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <ul className="search-results">
                {products.map(product => {
                  const isVisible = searchTerm === '' || searchResults.includes(product);
                  
                  // Utiliser le bon prix selon le type de produit
                  const productPrice = product.old_price !== undefined ? product.new_price : product.price;
                  
                  return (
                    <li
                      key={product.id}
                      onClick={() => isVisible && handleResultClick(product.id)}
                      className={`search-result-item ${!isVisible && searchTerm ? 'hidden-result' : ''}`}
                    >
                      <div className="result-image-container">
                        <img src={product.image} alt={product.name} className="result-image" />
                      </div>
                      <div className="result-details">
                        <span className="result-name">{product.name}</span>
                        <span className="result-price">${formatPrice(productPrice)}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {noResults && (
                <div className="no-results">
                  No results found.{' '}
                  <span onClick={() => {
                    setShowSearch(false);
                    setSearchTerm('');
                    navigate('/');
                  }}>
                    Back to home
                  </span>
                </div>
              )}
            </div>
          )}

          <button className="icon-button" onClick={toggleDarkMode}>
            <FaMoon />
          </button>
          
          <Link to="/cart" className={`icon-button ${location.pathname === '/cart' ? 'active' : ''}`}>
            <FaShoppingCart />
          </Link>

          <div className="user-menu">
            {user ? (
              <button className="icon-button" onClick={handleLogout}>
                <FaSignOutAlt />
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowLoginMenu(!showLoginMenu)}
                  className={`icon-button ${location.pathname === '/login' ? 'active' : ''}`}
                >
                  <FaUser />
                </button>
                {showLoginMenu && (
                  <div className="login-dropdown">
                    <Link to="/login" className="dropdown-item" onClick={() => setShowLoginMenu(false)}>
                      Login
                    </Link>
                    <Link to="/register" className="dropdown-item" onClick={() => setShowLoginMenu(false)}>
                      Register
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;