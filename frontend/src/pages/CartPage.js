import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useCart } from './CartContext';
import '../styles/cart.css';

const CartPage = ({ user }) => {
  const navigate = useNavigate();
  const { cart: cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleConfirmOrder = () => {
    if (cartItems.length > 0) {
      navigate('/payment');
    }
  };

  if (!user) {
    return (
      <div className="cart-empty">
        <FaShoppingCart className="cart-empty-icon" />
        <h2 className="cart-empty-title">Veuillez vous connecter pour voir votre panier</h2>
        <p>
          <Link to="/login" className="cart-login-link">
            Se connecter <FaArrowLeft style={{ transform: 'rotate(180deg)' }} />
          </Link>
        </p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <FaShoppingCart className="cart-empty-icon" />
        <h2 className="cart-empty-title">Votre panier est vide</h2>
        <p>
          <Link to="/" className="cart-home-link">
            <FaArrowLeft style={{ marginRight: '8px' }} />
            Retour à la boutique
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Mon Panier</h1>
      <div className="cart-items-list">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.size || 'no-size'}`} className="cart-item">
            <div className="cart-item-image-container">
              <img 
                src={item.image} 
                alt={item.name} 
                className="cart-item-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/images/placeholder.jpg';
                }}
              />
            </div>
            <div className="cart-item-details">
              <h3 className="cart-item-title">
                {item.name} {item.size && `- Taille ${item.size}`}
              </h3>
              <p className="cart-item-text">Prix unitaire: {item.price.toFixed(2)} $</p>
              <p className="cart-item-text">Quantité: {item.quantity}</p>
              <p className="cart-item-text">
                Sous-total: {(item.price * item.quantity).toFixed(2)} TND
              </p>
            </div>
            <button
              className="cart-remove-button"
              onClick={() => removeFromCart(item.id)}
              aria-label={`Supprimer ${item.name}`}
            >
              <FaTrash /> Supprimer
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2 className="cart-total">Total: {totalPrice.toFixed(2)} TND</h2>
        <button 
          onClick={handleConfirmOrder} 
          className="cart-checkout-button"
        >
          Passer la commande
        </button>
      </div>
    </div>
  );
};

export default CartPage;