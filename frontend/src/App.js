import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

// Composants
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Clothing from './pages/Clothes';
import Pharmacy from './pages/Phar';
import Technology from './pages/Tech';
import Decor from './pages/Decor';
import Care from './pages/Care';
import Baby from './pages/Baby';
import Accessories from './pages/Accessories';
import Sales from './pages/Sales'; // ✅ Ajout de la page Sales

import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './components/Cart';
import PaymentPage from './pages/PaymentPage';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import PrivacyPolicyPage from './pages/PrivacyPolicy';

function AppContent() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    category: 'all',
    priceRange: [0, 1000],
    sortBy: 'featured',
    searchQuery: ''
  });
  const [darkMode, setDarkMode] = useState(false);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedCart = localStorage.getItem(`cart_${storedUser ? JSON.parse(storedUser)._id : 'guest'}`);
    const storedTheme = localStorage.getItem('darkMode');
    
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedCart) setCartItems(JSON.parse(storedCart));
    if (storedTheme) setDarkMode(JSON.parse(storedTheme));
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    localStorage.setItem(`cart_${user?._id || 'guest'}`, JSON.stringify(cartItems));
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [user, cartItems, darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === product.id && item.size === product.size
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prevItems, { 
        ...product, 
        quantity: product.quantity || 1,
        addedAt: new Date().toISOString() 
      }];
    });
  };

  const updateCartItem = (id, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (id, size) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.id === id && item.size === size))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateFilters = (newFilters) => {
    setFilterOptions(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilterOptions({
      category: 'all',
      priceRange: [0, 1000],
      sortBy: 'featured',
      searchQuery: ''
    });
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      {!isAuthPage && (
        <Navbar 
          user={user} 
          setUser={setUser} 
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          filterOptions={filterOptions}
          onFilterChange={updateFilters}
          onResetFilters={resetFilters}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}

      <main className="main-content">
        <Routes>
          <Route path="/" element={user ? <Home addToCart={addToCart} filterOptions={filterOptions} /> : <Navigate to="/login" />} />
          <Route path="/clothing" element={<Clothing addToCart={addToCart} filterOptions={filterOptions} />} />
          <Route path="/pharmacy" element={<Pharmacy addToCart={addToCart} filterOptions={filterOptions} />} />
          <Route path="/technology" element={<Technology addToCart={addToCart} filterOptions={filterOptions} />} />
          <Route path="/decor" element={<Decor addToCart={addToCart} filterOptions={filterOptions} />} />
          <Route path="/care" element={<Care addToCart={addToCart} filterOptions={filterOptions} />} />
          <Route path="/baby" element={<Baby addToCart={addToCart} filterOptions={filterOptions} />} />
          <Route path="/accessories" element={<Accessories addToCart={addToCart} filterOptions={filterOptions} />} />
          <Route path="/sales" element={<Sales addToCart={addToCart} filterOptions={filterOptions} />} /> {/* ✅ Nouvelle route */}

          <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />

          <Route path="/cart" element={
            <CartPage 
              user={user} 
              cartItems={cartItems} 
              updateCartItem={updateCartItem}
              removeFromCart={removeFromCart} 
            />
          } />

          <Route path="/payment" element={
            user ? <PaymentPage user={user} cartItems={cartItems} clearCart={clearCart} /> 
                 : <Navigate to="/login" />
          } />

          <Route path="/login" element={
            user ? <Navigate to="/" /> : <LoginPage setUser={setUser} />
          } />

          <Route path="/register" element={
            user ? <Navigate to="/" /> : <RegisterPage setUser={setUser} />
          } />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer darkMode={darkMode} />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
