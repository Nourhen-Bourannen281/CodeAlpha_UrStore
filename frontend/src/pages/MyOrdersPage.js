// src/pages/MyOrdersPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      try {
        const { data } = await axios.get('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(data);
      } catch (error) {
        alert('Erreur lors du chargement des commandes');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="my-orders">
      <h2>Mes commandes</h2>
      {orders.length === 0 ? (
        <p>Aucune commande trouvée</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id}>
              Commande #{order._id} - {new Date(order.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyOrdersPage;
