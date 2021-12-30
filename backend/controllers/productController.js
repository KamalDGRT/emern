const Product = require("../models/productModel");

// Create product - only for Admin route
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  // Response
  res.status(201).json({
    success: true,
    product,
  });
};

// Get all products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();

  // Response object
  res.status(200).json({
    success: true,
    products,
  });
};
