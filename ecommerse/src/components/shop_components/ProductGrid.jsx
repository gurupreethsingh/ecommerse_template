import React from "react";
import { FaHeart, FaRupeeSign } from "react-icons/fa";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ProductGrid = ({
  products,
  handleAddToCart,
  handleToggleWishlist,
  wishlist,
}) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/single-product/${id}`);
  };

  const isInWishlist = (productId) => wishlist?.includes(productId) || false;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <motion.div
          key={product._id}
          whileHover={{ scale: 1.04 }}
          className="relative bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition"
        >
          {/* Out of Stock Banner */}
          {!product.availability_status && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              Out of Stock
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleWishlist(product._id);
              toast.success("Toggled wishlist!", { autoClose: 1000 });
            }}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-red-100"
          >
            <FaHeart
              className={`w-5 h-5 ${
                isInWishlist(product._id) ? "text-red-500" : "text-gray-400"
              } transition`}
            />
          </button>

          {/* Product Image */}
          <div
            className="w-full h-48 bg-gray-100 flex justify-center items-center cursor-pointer"
            onClick={() => handleCardClick(product._id)}
          >
            <img
              src={`/${product.product_image}`}
              alt={product.product_name}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Info */}
          <div
            onClick={() => handleCardClick(product._id)}
            className="p-4 space-y-2 cursor-pointer"
          >
            {product.section_to_appear?.includes("limited_time_offers") && (
              <div className="flex items-center gap-1 text-xs font-bold text-orange-600">
                <MdOutlineLocalOffer />
                Limited Time Deal
              </div>
            )}
            <h3 className="text-md font-bold truncate text-gray-800">
              {product.product_name}
            </h3>

            <div className="flex justify-center items-center gap-2 mt-1">
              <span className="text-lg font-bold text-green-600 flex items-center">
                <FaRupeeSign /> {product.selling_price}
              </span>
              {product.display_price && (
                <span className="text-gray-400 line-through text-sm flex items-center">
                  <FaRupeeSign /> {product.display_price}
                </span>
              )}
            </div>

            <div className="pt-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                disabled={!product.availability_status}
                className={`w-full py-2 rounded-full font-bold text-sm ${
                  product.availability_status
                    ? "bg-gradient-to-r from-red-500 to-orange-400 text-white hover:opacity-90"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } transition`}
              >
                {product.availability_status ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;
