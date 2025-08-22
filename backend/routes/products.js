import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// الحصول على كل المنتجات
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// إضافة منتج جديد (للتجربة فقط، ممكن حماية لاحقاً)
router.post('/', async (req, res) => {
  const { name, image, price, description } = req.body;
  try {
    const product = new Product({ name, image, price, description });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// الحصول على تفاصيل منتج معين
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
