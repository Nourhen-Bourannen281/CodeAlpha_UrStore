import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Order from '../models/Order.js';

const router = express.Router();

// 🔐 Ajouter une nouvelle commande (POST /api/orders)
router.post('/', protect, async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Aucun article dans la commande' });
    }

    const newOrder = new Order({
      user: req.user._id,
      items,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Erreur POST /orders:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la commande' });
  }
});

// 🔐 Récupérer les commandes de l'utilisateur connecté (GET /api/orders)
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    console.error('Erreur GET /orders:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
  }
});

export default router;
