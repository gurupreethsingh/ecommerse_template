import React, { useContext } from "react";
import { CartContext } from "../../components/cart_components/CartContext";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaRupeeSign,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, cartLoading } =
    useContext(CartContext);

  const handleIncrease = (id, qty) => {
    updateQuantity(id, qty + 1);
  };

  const handleDecrease = (id, qty) => {
    if (qty > 1) {
      updateQuantity(id, qty - 1);
    }
  };

  const getImageUrl = (img) => {
    if (img) {
      const normalized = img.replace(/\\/g, "/").split("/").pop();
      return `${globalBackendRoute}/uploads/products/${normalized}`;
    }
    return "https://via.placeholder.com/150";
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.selling_price * item.quantity,
    0
  );

  const CartSpinner = () => (
    <div className="flex flex-col justify-center items-center h-[60vh]">
      <FaShoppingCart className="text-orange-500 animate-spin-slow w-16 h-16 mb-6" />
      <p className="text-gray-600 text-lg font-semibold">
        Loading your cart...
      </p>
    </div>
  );

  return (
    <div className="py-8 px-4 animate-fadeIn max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-6">
        <FaShoppingCart className="text-orange-500" />
        Your Cart
      </h1>

      {cartLoading ? (
        <CartSpinner />
      ) : cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mt-20"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
            className="mx-auto w-32 h-32"
          />
          <h2 className="text-xl font-bold text-gray-600 mt-4">
            Your cart is empty!
          </h2>
          <Link
            to="/shop"
            className="mt-6 inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:opacity-90 transition"
          >
            Go Shopping
          </Link>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-6">
          {cartItems.map((item) => (
            <motion.div
              key={item._id}
              className="bg-white rounded-lg shadow flex flex-col md:flex-row items-center justify-between p-4 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full md:w-1/2">
                <img
                  src={getImageUrl(item.product_image)}
                  alt={item.product_name}
                  className="w-24 h-24 object-cover rounded-lg border"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.product_name}
                  </h2>
                  <p className="text-green-600 font-semibold flex items-center gap-1">
                    <FaRupeeSign /> {item.selling_price}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecrease(item._id, item.quantity)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <FaMinus />
                </button>
                <span className="font-semibold text-lg">{item.quantity}</span>
                <button
                  onClick={() => handleIncrease(item._id, item.quantity)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <FaPlus />
                </button>
              </div>

              {/* Total + Remove */}
              <div className="flex items-center gap-5">
                <span className="text-xl font-bold text-green-700 flex items-center">
                  <FaRupeeSign /> {item.selling_price * item.quantity}
                </span>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Total Box */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow text-center mt-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              Total Amount
            </h2>
            <p className="text-2xl text-green-600 font-extrabold flex justify-center items-center gap-1 mb-4">
              <FaRupeeSign /> {totalAmount.toFixed(2)}
            </p>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full font-bold text-lg hover:opacity-90 transition"
            >
              Proceed to Checkout
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
