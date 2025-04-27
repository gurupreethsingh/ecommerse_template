import React from "react";
import { FaHeart, FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ProductCard = ({ products, wishlist, onWishlistToggle }) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/single-product/${id}`);
  };

  const isInWishlist = (productId) => {
    return wishlist?.includes(productId) || false;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <motion.div
          key={product._id}
          whileHover={{ scale: 1.04 }}
          className="relative group rounded-xl shadow-md hover:shadow-xl bg-white border border-gray-100 overflow-hidden transition duration-300"
        >
          {/* Wishlist Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWishlistToggle(product._id);
              toast.success(
                isInWishlist(product._id)
                  ? "Removed from wishlist!"
                  : "Added to wishlist!",
                { autoClose: 1000 }
              );
            }}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-red-100 transition"
          >
            <FaHeart
              className={`w-5 h-5 ${
                isInWishlist(product._id) ? "text-red-500" : "text-gray-400"
              } transition-transform duration-300`}
            />
          </button>

          {/* Product Image */}
          <div
            className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={() => handleCardClick(product._id)}
          >
            <img
              src={`/${product.product_image}`}
              alt={product.product_name}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Product Info */}
          <div
            onClick={() => handleCardClick(product._id)}
            className="p-4 space-y-2 cursor-pointer"
          >
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-black truncate">
              {product.product_name}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              {product.description?.slice(0, 50)}...
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg font-bold text-green-600 flex items-center">
                <FaRupeeSign /> {product.selling_price}
              </span>
              {product.display_price && (
                <span className="text-gray-400 line-through text-sm flex items-center">
                  <FaRupeeSign /> {product.display_price}
                </span>
              )}
            </div>

            <button
              className="w-full mt-4 py-2 text-center rounded-full bg-gradient-to-r from-red-500 to-orange-400 text-white font-semibold hover:opacity-90 transition"
              onClick={(e) => {
                e.stopPropagation();
                toast.success("Added to cart!", { autoClose: 1000 });
              }}
            >
              Add to Cart
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductCard;
