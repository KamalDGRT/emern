const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create product - only for Admin route
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  // Response
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  // Latest version of mongoose does not support re-executing the same query
  // That is why clone() is used
  let products = await apiFeature.query.clone();
  let filteredProductsCount = products.length;
  apiFeature.pagination(resultPerPage);
  products = await apiFeature.query;

  // Response object
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get a single product detail
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  // Searching for the product
  const product = await Product.findById(req.params.id);

  // Checking for the product's existence
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 400));
  }

  // Response
  res.status(200).json({
    success: true,
    product,
  });
});

// Update product - only for Admin route
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  // we are using let instead of const because we want to change the values
  let product = await Product.findById(req.params.id);

  // Checking for the product's existence
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
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
});

// Delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  // Checking for the product's existence
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  // if product exists, deleting it
  await product.remove();

  // Response
  res.status(200).json({
    success: true,
    message: "Product Deleted Sucessfully",
  });
});
