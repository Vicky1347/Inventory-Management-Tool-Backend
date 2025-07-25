const express = require('express');
const {
  addProduct,
  updateQuantity,
  getProducts
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/products - Add new product (requires JWT)
router.post('/', protect, addProduct);

// PUT /api/products/:id/quantity - Update product quantity (requires JWT)
router.put('/:id/quantity', protect, updateQuantity);

// GET /api/products - Get all products with pagination (requires JWT)
router.get('/', protect, getProducts);

module.exports = router;
