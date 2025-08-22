import React, { useState } from 'react';
import { FaTimes, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/productalert.css';

const ProductAlert = ({ product, onClose, onAddToCart }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();

  if (!product) return null;

  // Formatage des prix - VERSION CORRIGÉE pour old_price/new_price
  const getPriceDetails = () => {
    // Pour les produits en promotion, utiliser old_price et new_price
    const hasSale = product.old_price !== undefined && product.new_price !== undefined;
    
    if (hasSale) {
      const rawOldPrice = parseFloat(product.old_price);
      const rawNewPrice = parseFloat(product.new_price);
      
      if (!isNaN(rawOldPrice) && !isNaN(rawNewPrice)) {
        return {
          hasSale: true,
          price: rawOldPrice.toFixed(2),
          salePrice: rawNewPrice.toFixed(2)
        };
      }
    }
    
    // Pour les produits normaux, utiliser price
    if (product.price === undefined || product.price === null) {
      console.error("Prix non disponible pour le produit:", product);
      return {
        hasSale: false,
        price: 'Prix non disponible',
        salePrice: null
      };
    }

    const rawPrice = parseFloat(product.price);
    
    if (isNaN(rawPrice)) {
      console.error("Prix invalide:", product.price);
      return {
        hasSale: false,
        price: 'Prix invalide',
        salePrice: null
      };
    }

    return {
      hasSale: false,
      price: rawPrice.toFixed(2),
      salePrice: null
    };
  };

  const { hasSale, price, salePrice } = getPriceDetails();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      onClose();
    }, 1500);
  };

  const handleViewCategory = () => {
    onClose();
    const routes = {
      sales: '/sales',
      clothes: '/clothing',
      phar: '/pharmacy',
      tech: '/technology',
      decor: '/decor',
      care: '/care',
      accessories: '/accessories',
      baby: '/baby'
    };
    navigate(routes[product.category] || '/');
  };

  const getCategoryName = () => {
    const categories = {
      sales: 'Promotions',
      clothes: 'Vêtements',
      phar: 'Pharmacie',
      tech: 'Technologie',
      decor: 'Décoration',
      care: 'Soins personnels',
      accessories: 'Accessoires',
      baby: 'Bébé'
    };
    return categories[product.category] || product.category;
  };

  return (
    <div className={`product-alert-overlay ${product ? 'active' : ''}`}>
      <div className="product-alert-container">
        <div className="product-alert-header">
          <h3 className="product-alert-title">Détails du produit</h3>
          <button 
            className="product-alert-close" 
            onClick={onClose}
            aria-label="Fermer"
          >
            <FaTimes />
          </button>
        </div>

        <div className="product-alert-content">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-alert-image" 
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = '/assets/images/placeholder.jpg';
            }}
          />
          <div className="product-alert-details">
            <h4 className="product-alert-name">{product.name}</h4>

            {/* Affichage des prix */}
            {hasSale ? (
              <p className="product-alert-price">
                <span className="old-price">{price} DT</span>{' '}
                <span className="new-price">{salePrice} DT</span>
              </p>
            ) : (
              <p className="product-alert-price">{price} DT</p>
            )}

            <p className="product-category">Catégorie: {getCategoryName()}</p>
          </div>
        </div>

        <div className="product-alert-actions">
          <button
            className="product-alert-btn product-alert-btn-secondary"
            onClick={handleViewCategory}
            aria-label="Voir plus dans cette catégorie"
          >
            <FaArrowRight /> Voir la catégorie
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductAlert;