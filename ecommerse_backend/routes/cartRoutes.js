const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");
const { verifyToken } = require("../middleware/AuthMiddleware");

router.get("/get-cart-items", verifyToken, cartController.getCart);
router.post("/add-to-cart", verifyToken, cartController.addToCart);
router.patch(
  "/update-cart/:productId",
  verifyToken,
  cartController.updateCartItem
);
router.delete(
  "/remove-cart-item/:productId",
  verifyToken,
  cartController.removeCartItem
);
router.delete("/clear-cart", verifyToken, cartController.clearCart);
router.post("/sync-cart", verifyToken, cartController.syncCart);

module.exports = router;
