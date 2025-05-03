const Wishlist = require("../models/WishlistModel");
const Cart = require("../models/CartModel");

// Get Wishlist
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    if (!wishlist) return res.json({ items: [] });

    res.json({
      items: wishlist.items.map((item) => ({
        _id: item.product._id,
        product_name: item.product.product_name,
        selling_price: item.product.selling_price,
        display_price: item.product.display_price,
        product_image: item.product.product_image,
        availability_status: item.product.availability_status,
        savedForLater: item.savedForLater,
      })),
    });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add to Wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) wishlist = new Wishlist({ user: req.user.id, items: [] });

    const exists = wishlist.items.some(
      (item) => item.product.toString() === productId
    );
    if (exists)
      return res.status(409).json({ message: "Item already in wishlist" });

    wishlist.items.push({ product: productId });
    await wishlist.save();

    res.status(200).json({ message: "Added to wishlist" });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Remove from Wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist)
      return res.status(404).json({ message: "Wishlist not found" });

    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== productId
    );
    await wishlist.save();

    res.status(200).json({ message: "Removed from wishlist" });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Toggle Save for Later
exports.toggleSaveForLater = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user.id });
    const item = wishlist.items.find(
      (item) => item.product.toString() === productId
    );
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.savedForLater = !item.savedForLater;
    await wishlist.save();

    res.status(200).json({ message: "Updated save for later status" });
  } catch (error) {
    console.error("Error updating save for later:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Move to Cart
exports.moveToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const wishlist = await Wishlist.findOne({ user: req.user.id });
    const itemIndex = wishlist.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex === -1)
      return res.status(404).json({ message: "Item not in wishlist" });

    // Add to cart
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = new Cart({ user: req.user.id, items: [] });

    const existingCartItem = cart.items.find(
      (ci) => ci.product.toString() === productId
    );
    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      cart.items.push({ product: productId, quantity: 1 });
    }

    // Remove from wishlist
    wishlist.items.splice(itemIndex, 1);
    await cart.save();
    await wishlist.save();

    res.status(200).json({ message: "Moved to cart" });
  } catch (error) {
    console.error("Error moving to cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
