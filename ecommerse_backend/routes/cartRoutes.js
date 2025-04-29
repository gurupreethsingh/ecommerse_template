const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");
const { verifyToken } = require("../middleware/AuthMiddleware"); 

// Protect all cart routes
router.get("/", verifyToken, cartController.getCart);
router.post("/add", verifyToken, cartController.addToCart);
router.patch("/update/:productId", verifyToken, cartController.updateCartItem);
router.delete("/remove/:productId", verifyToken, cartController.removeCartItem);
router.delete("/clear", verifyToken, cartController.clearCart);
router.post("/sync", verifyToken, cartController.syncCart);

module.exports = router;
