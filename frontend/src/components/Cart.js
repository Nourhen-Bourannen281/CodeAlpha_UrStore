import React from 'react';
import { FaShoppingCart, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/cart.css';

function CartPage({ user, cartItems, removeFromCart }) {
  if (!user) {
    return (
      <div className="cart-page">
        <div className="login-prompt">
          <h2>Veuillez vous connecter pour voir votre panier</h2>
          <Link to="/login" className="login-btn">
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <FaShoppingCart className="empty-cart-icon" />
          <h2>Votre panier est vide</h2>
          <Link to="/" className="shop-btn">
            <FaArrowLeft style={{ marginRight: '8px' }} />
            Retour à la boutique
          </Link>
        </div>
      </div>
    );
  }

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-page">
      <h1 className="cart-header">Mon Panier</h1>
      
      <div className="cart-items">
        {cartItems.map((item, i) => (
          <div key={i} className="cart-item">
            <div className="item-info">
              <h3>{item.name} {item.size && `- Taille ${item.size}`}</h3>
              <div className="item-meta">
                <span className="item-price">Prix unitaire: {item.price} TND</span>
                <span className="item-quantity">Quantité: {item.quantity}</span>
                <span>Sous-total: {(item.price * item.quantity).toFixed(2)} TND</span>
              </div>
            </div>
            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id, item.size)}
            >
              <FaTrash /> Supprimer
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="total-amount">Total: {total} TND</div>
        <Link to="/payment">
  <button className="checkout-btn">
    Passer la commande
  </button>
</Link>
      </div>
    </div>
  );
}

export default CartPage;