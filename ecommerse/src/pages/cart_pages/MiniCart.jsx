import React, { useState, useRef, useEffect, useContext } from "react";
import { CartContext } from "../../components/cart_components/CartContext";
import { AuthContext } from "../../components/auth_components/AuthManager";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaRupeeSign, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import globalBackendRoute from "../../config/Config";

const MiniCart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const cartRef = useRef();
  const navigate = useNavigate();

  const toggleCart = () => setOpen(!open);

  const handleOutsideClick = (e) => {
    if (cartRef.current && !cartRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  // 👇 Close minicart when cart items change (e.g., user switched)
  useEffect(() => {
    setOpen(false);
  }, [cartItems]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.selling_price * item.quantity,
    0
  );

  const getImageUrl = (img) => {
    if (img) {
      const normalized = img.replace(/\\/g, "/").split("/").pop();
      return `${globalBackendRoute}/uploads/products/${normalized}`;
    }
    return "https://via.placeholder.com/150";
  };

  return (
    <div className="relative" ref={cartRef}>
      {/* Cart Icon */}
      <button onClick={toggleCart} className="relative p-2 rounded-full">
        <FaShoppingCart className="w-7 h-7 text-yellow-500 hover:scale-110 transition-transform duration-300" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce-slow">
            {cartCount}
          </span>
        )}
      </button>

      {/* MiniCart Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 p-4"
          >
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Cart Summary
            </h2>

            {cartItems.length === 0 ? (
              <div className="text-center text-gray-400 py-10">
                <FaShoppingCart className="w-12 h-12 mx-auto mb-2" />
                <p>Your cart is empty!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 border-b pb-2"
                  >
                    <img
                      src={getImageUrl(item.product_image)}
                      alt={item.product_name}
                      className="w-14 h-14 object-cover rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                    <div className="flex-grow">
                      <h3 className="text-sm font-semibold text-gray-700">
                        {item.product_name}
                      </h3>
                      <div className="flex items-center text-sm text-green-600 font-bold">
                        <FaRupeeSign className="mr-1" /> {item.selling_price} ×{" "}
                        {item.quantity}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="p-1 rounded-full hover:bg-red-100 text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="mt-4 border-t pt-4 space-y-3">
                <div className="flex justify-between font-bold text-gray-700">
                  <span>Total:</span>
                  <span className="flex items-center text-green-600">
                    <FaRupeeSign /> {cartTotal.toFixed(2)}
                  </span>
                </div>
                <Link
                  to="/cart"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full font-bold hover:opacity-90 transition"
                >
                  View Cart
                </Link>
                <button
                  className="w-full py-2 mt-2 bg-gray-100 rounded-full font-bold text-gray-700 hover:bg-gray-200"
                  onClick={() => {
                    setOpen(false);
                    navigate("/checkout");
                  }}
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MiniCart;
