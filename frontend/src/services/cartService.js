// src/services/cartService.js
import axios from 'axios';

// Tu peux aussi configurer axios globalement, mais ici on l'utilise directement
const API = 'http://localhost:5000/api/cart'; // modifie l'URL selon ton backend

export const fetchCart = async () => {
  const { data } = await axios.get(API, { withCredentials: true });
  return data.items;
};

export const addToCart = async (productId, quantity, size) => {
  const { data } = await axios.post(
    `${API}/add`,
    { productId, quantity, size },
    { withCredentials: true }
  );
  return data.items;
};

export const removeFromCart = async (productId, size) => {
  const { data } = await axios.delete(`${API}/${productId}/${size}`, {
    withCredentials: true,
  });
  return data.items;
};
