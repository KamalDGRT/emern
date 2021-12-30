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
  console.log(req.params);
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product Not Found",
    });
  }

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
