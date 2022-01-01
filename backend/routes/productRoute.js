const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.route("/admin/product/info/:id").get(getProductDetails);

router
  .route("/admin/product/update/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

router
  .route("/product/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router
  .route("/product/review/add")
  .put(isAuthenticatedUser, createProductReview);

router.route("/product/reviews").get(getProductReviews);

router
  .route("/product/review/delete")
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
