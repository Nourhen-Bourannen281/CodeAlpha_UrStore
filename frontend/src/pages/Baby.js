import React from 'react';
import { FaBaby } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import '../styles/product.css';

function Baby({ addToCart }) {
  const babyProducts = products.filter(p => p.category === 'baby');

  return (
    <div className="products-container">
      <div className="category-header">
        <h1 className="category-title">
          <FaBaby className="category-icon" /> Bébé
        </h1>
      </div>
      
      <div className="products-grid">
        {babyProducts.length > 0 ? (
          babyProducts.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))
        ) : (
          <p className="no-products">Aucun produit disponible dans cette catégorie</p>
        )}
      </div>
    </div>
  );
}

export default Baby;