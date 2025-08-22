import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function CategoryCarousel({ products, onClickCategory, onSeeMoreClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + products.length) % products.length
    );
  };

  const next = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % products.length
    );
  };

  const getVisibleProducts = () => {
    const visible = [];
    for (let i = 0; i < Math.min(4, products.length); i++) {
      const index = (currentIndex + i) % products.length;
      visible.push(products[index]);
    }
    return visible;
  };

  return (
    <div className="jumia-carousel">
      {products.length > 4 && (
        <button 
          className="carousel-arrow" 
          onClick={prev}
          aria-label="Précédent"
        >
          <FaArrowLeft />
        </button>
      )}

      <div className="carousel-track">
        {getVisibleProducts().map((prod) => (
          <div 
            key={`${prod.id}-${currentIndex}`} 
            className="carousel-card"
            onClick={() => onClickCategory(prod.id)}
          >
            <img 
              src={prod.image} 
              alt={prod.name} 
              className="carousel-card-img"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = '/assets/images/placeholder.jpg';
              }}
            />
            <h4 className="carousel-card-title">{prod.name}</h4>
            {prod.new_price && prod.old_price ? (
  <p className="carousel-card-price">
    <span className="old-price">{prod.old_price.toFixed(2)} DT</span>
    <span className="sale-price">{prod.new_price.toFixed(2)} DT</span>
  </p>
) : (
  <p className="carousel-card-price">{prod.price?.toFixed(2)} DT</p>
)}

            <button 
              className="carousel-card-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSeeMoreClick(prod.id);
              }}
              aria-label={`Voir ${prod.name}`}
            >
              Voir plus
            </button>
          </div>
        ))}
      </div>

      {products.length > 4 && (
        <button 
          className="carousel-arrow" 
          onClick={next}
          aria-label="Suivant"
        >
          <FaArrowRight />
        </button>
      )}
    </div>
  );
}

export default CategoryCarousel;