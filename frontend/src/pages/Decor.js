import React from 'react';
import { FaCouch } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import '../styles/product.css';

function Decor({ addToCart }) {
  const decorProducts = products.filter(p => p.category === 'decor');

  return (
    <div className="products-container">
      <div className="category-header">
        <h1 className="category-title">
          <FaCouch className="category-icon" /> Décoration
        </h1>
      </div>
      
      <div className="products-grid">
        {decorProducts.length > 0 ? (
          decorProducts.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))
        ) : (
          <p className="no-products">Aucun produit disponible dans cette catégorie</p>
        )}
      </div>
    </div>
  );
}

export default Decor;