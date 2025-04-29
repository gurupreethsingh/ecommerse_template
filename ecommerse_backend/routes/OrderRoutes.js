const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
const {
  verifyToken,
  verifyTokenOptional,
} = require("../middleware/AuthMiddleware");

// Guests and users both can place order
// Guests and users can place orders, but include verifyToken to get req.user
router.post("/place-order", verifyTokenOptional, orderController.placeOrder);

// Only logged-in users can see their own orders
router.get("/my-orders", verifyToken, orderController.getUserOrders);

module.exports = router;
