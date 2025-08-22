import React from 'react';
import { FaLaptop } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import '../styles/product.css';

function Sales({ addToCart }) {
  const salesProducts = products.filter(p => p.category === 'sales');

  return (
    <div className="products-container">
      <div className="category-header">
        <h1 className="category-title">
          <FaLaptop className="category-icon" /> Sales
        </h1>
      </div>
      
      <div className="products-grid">
        {salesProducts.length > 0 ? (
          salesProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart} 
            />
          ))
        ) : (
          <p className="no-products">Aucun produit disponible dans cette catégorie</p>
        )}
      </div>
    </div>
  );
}

export default Sales;