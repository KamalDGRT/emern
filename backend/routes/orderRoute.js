const express = require("express");
const { newOrder, getSingleOrder } = require("../controllers/orderController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/info/:id").get(isAuthenticatedUser, getSingleOrder);

module.exports = router;
