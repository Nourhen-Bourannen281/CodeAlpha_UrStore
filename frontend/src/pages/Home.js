import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCarousel from '../components/CategoryCarousel';
import ProductAlert from '../components/ProductAlert';
import products from '../data/products';
import '../styles/app.css';

const categories = [
  { name: 'Sales', value: 'sales' },
  { name: 'Clothing', value: 'clothes' },
  { name: 'Pharmacy', value: 'phar' },
  { name: 'Technology', value: 'tech' },
  { name: 'Home Decor', value: 'decor' },
  { name: 'Personal Care', value: 'care' },
  { name: 'Accessories', value: 'accessories' },
  { name: 'Baby', value: 'baby' },
  

];

function Home() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  // Chargement initial du panier
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
          console.log('Panier chargé:', parsedCart);
        }
      } catch (error) {
        console.error('Erreur de parsing du panier:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Sauvegarde du panier
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
    console.log('Panier mis à jour:', cart);
  }, [cart]);

  const handleProductClick = (id) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setSelectedProduct(product);
    } else {
      console.error('Produit non trouvé avec ID:', id);
    }
  };

  const handleAddToCart = (product) => {
    if (!product?.id) {
      console.error('Produit invalide:', product);
      return;
    }

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id);
      const newCart = [...prevCart];

      if (existingIndex >= 0) {
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + 1
        };
      } else {
        newCart.push({ ...product, quantity: 1 });
      }

      return newCart;
    });
  };

  const handleAddToWishlist = (product) => {
    console.log('Produit ajouté aux favoris:', product);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">🌟 Our Products 🌟</h1>

      {categories.map(cat => {
        const catProducts = products.filter(p => p.category === cat.value);
        return (
          <div key={cat.value} className="category-section">
            <h2 className="category-title">{cat.name}</h2>
            <CategoryCarousel
              products={catProducts}
              onClickCategory={handleProductClick}
              onSeeMoreClick={(id) => navigate(`/product/${id}`)}
            />
          </div>
        );
      })}

      <ProductAlert
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />

      {/* Debug Panel (à retirer en production) */}
      <div style={{ display: 'none' }}>
        <h3>Debug Panier ({cart.length} articles)</h3>
        <pre>{JSON.stringify(cart, null, 2)}</pre>
        <button onClick={() => console.log('Current cart:', cart)}>
          Log Panier
        </button>
        <button onClick={() => {
          localStorage.removeItem('cart');
          setCart([]);
        }}>
          Reset Panier
        </button>
      </div>
    </div>
  );
}

export default Home;