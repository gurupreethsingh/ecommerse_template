
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaStar, FaCartPlus, FaRupeeSign } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import globalBackendRoute from "../../config/Config";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/get-single-added-product-by-id/${id}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to load product:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const getImageUrl = (img) => {
    if (img) {
      const normalized = img.replace(/\\/g, "/").split("/").pop();
      return `${globalBackendRoute}/uploads/products/${normalized}`;
    }
    return "https://via.placeholder.com/150";
  };

  const handleImageError = (e) => {
    if (!e.target.dataset.fallback) {
      e.target.src = "https://via.placeholder.com/150";
      e.target.dataset.fallback = "true";
    }
  };

  const handleAddToCart = () => {
    toast.success("Added to Cart!", { autoClose: 800 });
  };

  const handleAddToWishlist = () => {
    toast.success("Added to Wishlist!", { autoClose: 800 });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-500 text-xl">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-red-500 text-xl">
        Product not found!
      </div>
    );
  }

  return (
    <div className="containerWidth px-4 py-10 flex flex-col lg:flex-row gap-10 animate-fadeIn">
      {/* Left Section - Image */}
      <motion.div
        className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md hover:shadow-lg"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={getImageUrl(product.product_image)}
          alt={product.product_name}
          onError={handleImageError}
          loading="lazy"
          className="w-full h-[400px] object-contain rounded-lg hover:scale-105 transition-transform duration-500"
        />
      </motion.div>

      {/* Right Section - Info */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col justify-between"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-4">
          {/* Product Name */}
          <h1 className="text-3xl font-bold text-gray-800">
            {product.product_name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 text-orange-500">
            {Array(5)
              .fill()
              .map((_, idx) => (
                <FaStar
                  key={idx}
                  className={`${
                    idx < Math.round(product.avg_rating)
                      ? "text-orange-500"
                      : "text-gray-300"
                  } w-5 h-5`}
                />
              ))}
            <span className="ml-2 text-sm text-gray-600">
              ({product.total_reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mt-2">
            <span className="text-3xl font-extrabold text-green-600 flex items-center">
              <FaRupeeSign className="mr-1" /> {product.selling_price}
            </span>
            {product.display_price && (
              <span className="line-through text-gray-400 flex items-center text-lg">
                <FaRupeeSign className="mr-1" /> {product.display_price}
              </span>
            )}
          </div>

          {/* Availability */}
          <div className="mt-2">
            <span
              className={`text-sm font-semibold ${
                product.availability_status ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.availability_status ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 mt-4 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={handleAddToCart}
            disabled={!product.availability_status}
            className={`w-full py-3 rounded-full font-bold text-lg flex items-center justify-center gap-2 
              ${
                product.availability_status
                  ? "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:opacity-90"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            <FaCartPlus className="text-2xl" /> Add to Cart
          </button>

          <button
            onClick={handleAddToWishlist}
            className="w-full py-3 rounded-full font-bold text-lg flex items-center justify-center gap-2 bg-white border border-red-400 text-red-500 hover:bg-red-50 transition"
          >
            <FaHeart className="text-2xl" /> Wishlist
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SingleProduct;
