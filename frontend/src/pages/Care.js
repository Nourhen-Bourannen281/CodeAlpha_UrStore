import React from 'react';
import { MdSpa } from 'react-icons/md';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import '../styles/product.css';

function Care({ addToCart }) {
  const careProducts = products.filter(p => p.category === 'care');

  return (
    <div className="products-container">
      <div className="category-header">
        <h1 className="category-title">
          <MdSpa className="category-icon" /> Soins
        </h1>
      </div>
      
      <div className="products-grid">
        {careProducts.length > 0 ? (
          careProducts.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))
        ) : (
          <p className="no-products">Aucun produit disponible dans cette catégorie</p>
        )}
      </div>
    </div>
  );
}

export default Care;