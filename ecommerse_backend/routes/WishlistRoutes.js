const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/WishlistController");
const { verifyToken } = require("../middleware/AuthMiddleware");

router.get("/get-wishlist", verifyToken, wishlistController.getWishlist);
router.post("/add-to-wishlist", verifyToken, wishlistController.addToWishlist);
router.delete(
  "/remove-from-wishlist/:productId",
  verifyToken,
  wishlistController.removeFromWishlist
);
router.patch(
  "/toggle-save-for-later/:productId",
  verifyToken,
  wishlistController.toggleSaveForLater
);
router.post("/move-to-cart", verifyToken, wishlistController.moveToCart);

module.exports = router;
