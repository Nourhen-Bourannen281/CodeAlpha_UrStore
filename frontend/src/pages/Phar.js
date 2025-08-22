import React from 'react';
import { FaPills } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import '../styles/product.css';

function Phar({ addToCart }) {
  const pharProducts = products.filter(p => p.category === 'phar');

  return (
    <div className="products-container">
      <div className="category-header">
        <h1 className="category-title">
          <FaPills className="category-icon" /> Pharmacie
        </h1>
      </div>
      
      <div className="products-grid">
        {pharProducts.length > 0 ? (
          pharProducts.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))
        ) : (
          <p className="no-products">Aucun produit disponible dans cette catégorie</p>
        )}
      </div>
    </div>
  );
}

export default Phar;