import React from 'react';
import { FaTshirt } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import '../styles/product.css';

function Clothes({ addToCart }) {
  // Correction ici : utiliser 'clothes' au lieu de 'clothing'
  const clothesProducts = products.filter(p => p.category === 'clothes');

  return (
    <div className="products-container">
      <div className="category-header">
        <h1 className="category-title">
          <FaTshirt className="category-icon" /> Vêtements
        </h1>
      </div>
      
      <div className="products-grid">
        {clothesProducts.length > 0 ? (
          clothesProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart} 
            />
          ))
        ) : (
          <div className="no-products-message">
            <p>Aucun produit disponible dans cette catégorie</p>
            <p>Catégorie recherchée: clothes</p>
            <p>Nombre de produits trouvés: {clothesProducts.length}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Clothes;