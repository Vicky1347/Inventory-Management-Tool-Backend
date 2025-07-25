const Product = require('../models/Product');

// Add a new product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      type,
      sku,
      image_url,
      description,
      quantity,
      price
    } = req.body;

    if (!name || !type || !sku || quantity == null || price == null) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingProduct = await Product.findOne({ sku, user: req.user._id });
    if (existingProduct) {
      return res.status(409).json({ message: 'Product with this SKU already exists for this user' });
    }

    const product = await Product.create({
      name,
      type,
      sku,
      image_url,
      description,
      quantity,
      price,
      user: req.user._id  // 👈 Link product to the current user
    });

    res.status(201).json({
      message: 'Product added successfully',
      product_id: product._id
    });
  } catch (err) {
    console.error('Error adding product:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update product quantity
const updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const productId = req.params.id;

    if (quantity == null) {
      return res.status(400).json({ message: 'Quantity is required' });
    }

    // Optional: Ensure user is owner
    const product = await Product.findOneAndUpdate(
      { _id: productId, user: req.user._id }, // 👈 ensure user is owner
      { quantity },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found or not authorized' });
    }

    res.json({
      message: 'Quantity updated',
      product
    });
  } catch (err) {
    console.error('Error updating quantity:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all products of the logged-in user with pagination
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find({ user: req.user._id })
      .skip(skip)
      .limit(limit);

    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addProduct,
  updateQuantity,
  getProducts
};
