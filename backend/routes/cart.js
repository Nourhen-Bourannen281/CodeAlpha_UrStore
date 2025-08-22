// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { isAuthenticated } = require('../middleware/auth');

// ✅ Get cart
router.get('/', isAuthenticated, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  res.json(cart || { user: req.user._id, items: [] });
});

// ✅ Add or update item
router.post('/add', isAuthenticated, async (req, res) => {
  const { productId, quantity, size } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const existingItem = cart.items.find(item =>
    item.product.toString() === productId && item.size === size
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity, size });
  }

  await cart.save();
  res.json(cart);
});

// ✅ Remove item
router.delete('/:productId/:size', isAuthenticated, async (req, res) => {
  const { productId, size } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter(item =>
    !(item.product.toString() === productId && item.size === size)
  );

  await cart.save();
  res.json(cart);
});
