const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/info/:id").get(getProductDetails);
router.route("/product/update/:id").put(updateProduct);
router.route("/product/delete/:id").delete(deleteProduct);

module.exports = router;
