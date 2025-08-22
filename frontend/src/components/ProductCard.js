import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/product.css';

function ProductCard({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('M');

  const handleAddToCart = () => {
    let htmlContent = `
      <p><strong>Produit :</strong> ${product.name}</p>
      <p><strong>Prix :</strong> ${product.new_price || product.price} TND</p>
      <p><label>Quantité :</label>
        <input id="swal-quantity" type="number" min="1" value="${quantity}" style="width:60px;" />
      </p>
      ${
        product.category === 'clothes'
          ? `<p><label>Taille :</label>
              <select id="swal-size">
                <option value="S" ${size === 'S' ? 'selected' : ''}>S</option>
                <option value="M" ${size === 'M' ? 'selected' : ''}>M</option>
                <option value="L" ${size === 'L' ? 'selected' : ''}>L</option>
              </select>
            </p>`
          : ''
      }
    `;

    Swal.fire({
      title: 'Ajouter au panier ?',
      html: htmlContent,
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      focusConfirm: false,
      preConfirm: () => {
        const qty = parseInt(document.getElementById('swal-quantity').value);
        const sz = product.category === 'clothes'
          ? document.getElementById('swal-size').value
          : null;

        if (!qty || qty < 1) {
          Swal.showValidationMessage('Veuillez entrer une quantité valide.');
          return false;
        }

        return { quantity: qty, size: sz };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        addToCart({ 
          ...product, 
          price: product.new_price || product.price,
          quantity: result.value.quantity, 
          size: result.value.size 
        });
        Swal.fire('Ajouté !', `${product.name} a été ajouté au panier.`, 'success');
      }
    });
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.old_price && (
          <div className="discount-badge">
            -{Math.round(((product.old_price - product.new_price) / product.old_price) * 100)}%
          </div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        
        <div className="price-section">
          {product.old_price ? (
            <>
              <span className="old-price">{product.old_price.toFixed(2)} TND</span>
              <span className="sale-price">{product.new_price.toFixed(2)} TND</span>
            </>
          ) : (
            <p className="product-price">{product.price.toFixed(2)} TND</p>
          )}
        </div>

        {product.category === 'clothes' && (
          <select value={size} onChange={e => setSize(e.target.value)}>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
        )}

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={e => setQuantity(parseInt(e.target.value) || 1)}
          style={{ width: '60px', marginTop: '10px' }}
        />

        <button className="add-to-cart" onClick={handleAddToCart}>
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
