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

// Update product - only for Admin route
exports.updateProduct = async (req, res, next) => {
  // we are using let instead of const because we want to change the values
  let product = await Product.findById(req.params.id);

  // Checking for the product's existence
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product Not Found",
    });
  }

  // if product exists, updating it
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  // Response
  res.status(200).json({
    success: true,
    product,
  });
};

// Delete product
exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  // Checking for the product's existence
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product Not Found",
    });
  }

  // if product exists, deleting it
  await product.remove();

  // Response
  res.status(200).json({
    success: true,
    message: "Product Deleted Sucessfully",
  });
};
