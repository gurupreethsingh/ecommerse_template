import React, { useContext, useEffect } from "react";
import { WishlistContext } from "../../components/wishlist_components/WishlistContext";
import { CartContext } from "../../components/cart_components/CartContext";
import { FaTrash, FaCartPlus, FaBookmark, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";
import { AuthContext } from "../../components/auth_components/AuthManager";
import { motion } from "framer-motion";
import { BsViewList } from "react-icons/bs";

const Wishlist = () => {
  const {
    wishlistItems,
    removeFromWishlist,
    toggleSaveForLater,
    moveToCartFromWishlist,
    fetchWishlist,
  } = useContext(WishlistContext);

  const { addToCart, fetchServerCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && wishlistItems.length === 0) {
      fetchWishlist();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) fetchWishlist();
  }, []);

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/150";
    const normalized = img.replace(/\\/g, "/").split("/").pop();
    return `${globalBackendRoute}/uploads/products/${normalized}`;
  };

  const handleCheckoutNow = (item) => {
    addToCart(item);
    navigate("/checkout");
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide mb-8 flex items-center gap-3">
        <BsViewList className="text-orange-500" />
        My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <motion.div
          className="text-center text-gray-500 mt-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p>Your wishlist is empty.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {wishlistItems.map((item) => (
            <motion.div
              key={item._id}
              className="bg-white rounded shadow-lg hover:shadow-xl transition duration-300 p-4 relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={getImageUrl(item.product_image)}
                alt={item.product_name}
                className="w-full h-48 object-cover rounded-md"
              />

              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {item.product_name}
                </h2>
                <p className="text-green-600 font-bold mt-1 text-xl">
                  ₹{item.selling_price}
                </p>
                {item.display_price && (
                  <p className="text-sm text-red-400 line-through">
                    ₹{item.display_price}
                  </p>
                )}

                {item.savedForLater && (
                  <div className="mt-1 text-xs text-yellow-600 font-medium flex items-center gap-1">
                    <FaBookmark className="text-yellow-500" />
                    Saved for later
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <button
                  onClick={async () => {
                    await moveToCartFromWishlist(item._id);
                    fetchServerCart();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-orange-400 text-white py-2 rounded-full font-semibold hover:scale-105 transition-transform"
                >
                  <FaCartPlus /> Move to Cart
                </button>

                <button
                  onClick={() => handleCheckoutNow(item)}
                  className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded-full font-semibold hover:bg-gray-700 transition"
                >
                  <FaCheck /> Buy Now
                </button>

                <div className="flex justify-between gap-2 mt-2">
                  <button
                    onClick={() => toggleSaveForLater(item._id)}
                    className="w-1/2 flex items-center justify-center gap-1 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm hover:bg-yellow-200"
                  >
                    <FaBookmark />
                    {item.savedForLater ? "Unsave" : "Save for Later"}
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="w-1/2 flex items-center justify-center gap-1 py-2 bg-red-100 text-red-600 rounded-full text-sm hover:bg-red-200"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Wishlist;
