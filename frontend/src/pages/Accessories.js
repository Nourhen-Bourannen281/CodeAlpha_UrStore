import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import '../styles/product.css';

function Accessories({ addToCart }) {
  const accessoriesProducts = products.filter(p => p.category === 'accessories');

  return (
    <div className="products-container">
      <div className="category-header">
        <h1 className="category-title">
          <FaShoppingBag className="category-icon" /> Accessoires
        </h1>
      </div>
      
      <div className="products-grid">
        {accessoriesProducts.length > 0 ? (
          accessoriesProducts.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))
        ) : (
          <p className="no-products">Aucun produit disponible dans cette catégorie</p>
        )}
      </div>
    </div>
  );
}

export default Accessories;