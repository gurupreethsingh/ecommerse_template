import React, { useState, useEffect, useContext } from "react";
import FiltersSidebar from "../../components/shop_components/FiltersSidebar";
import ProductGrid from "../../components/shop_components/ProductGrid";
import ProductCard from "../../components/shop_components/ProductCard";
import ProductList from "../../components/shop_components/ProductList";
import Pagination from "../../components/shop_components/Pagination";
import axios from "axios";
import { CartContext } from "../../components/cart_components/CartContext";
import { WishlistContext } from "../../components/wishlist_components/WishlistContext";
import globalBackendRoute from "../../config/Config";
import { motion } from "framer-motion";
import { FaTh, FaThList, FaIdBadge } from "react-icons/fa";
import { toast } from "react-toastify";

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [showAnimatedMsg, setShowAnimatedMsg] = useState(false);
  const [animatedMsgProductName, setAnimatedMsgProductName] = useState("");

  const { addToCart } = useContext(CartContext);
  const { wishlistItems, addToWishlist, removeFromWishlist, fetchWishlist } =
    useContext(WishlistContext);

  const productsPerPage =
    viewMode === "grid" ? 12 : viewMode === "card" ? 9 : 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/all-added-products`
        );
        const products = res.data || [];
        setAllProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    };
    fetchData();
    fetchWishlist();
  }, []);

  const handleFilterChange = (newFilteredProducts) => {
    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1);
  };

  const handleWishlistToggle = async (product) => {
    const productId = product._id;
    const productName = product.product_name;

    const wishlistIds = wishlistItems.map(
      (item) => item._id || item.product?._id
    );

    if (wishlistIds.includes(productId)) {
      await removeFromWishlist(productId);
      setAnimatedMsgProductName(`❌ ${productName} removed from wishlist`);
      setShowAnimatedMsg(true);
      setTimeout(() => setShowAnimatedMsg(false), 2000);
    } else {
      const success = await addToWishlist(productId, product);
      if (success) {
        setAnimatedMsgProductName(`✨ ${productName} added to wishlist`);
        setShowAnimatedMsg(true);
        setTimeout(() => setShowAnimatedMsg(false), 2000);
      }
    }
  };

  const handleAddToCart = (product) => {
    if (product.availability_status) {
      addToCart(product);
    } else {
      toast.error("Cannot add. Product is Out of Stock!", { autoClose: 1200 });
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="py-10 px-4 flex flex-col lg:flex-row gap-4 animate-fadeIn">
      {showAnimatedMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-20 right-4 z-50 bg-gradient-to-r from-pink-500 via-orange-600 to-orange-400 text-white px-4 py-2 rounded-full shadow-lg animate-pulse"
        >
          {animatedMsgProductName}
        </motion.div>
      )}

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/5 bg-gradient-to-br rounded-lg"
      >
        <FiltersSidebar
          allProducts={allProducts}
          onFilterChange={handleFilterChange}
        />
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-3/4"
      >
        <div className="flex items-center justify-between mb-6">
          <motion.h1
            className="text-3xl font-extrabold text-gray-800 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Our Products
          </motion.h1>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden md:inline">
              ({filteredProducts.length} items)
            </span>

            <div className="flex gap-2 ml-3">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-full border ${
                  viewMode === "grid"
                    ? "bg-gray-900 text-white"
                    : "text-gray-600"
                }`}
              >
                <FaTh />
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded-full border ${
                  viewMode === "card"
                    ? "bg-gray-900 text-white"
                    : "text-gray-600"
                }`}
              >
                <FaIdBadge />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-full border ${
                  viewMode === "list"
                    ? "bg-gray-900 text-white"
                    : "text-gray-600"
                }`}
              >
                <FaThList />
              </button>
            </div>
          </div>
        </div>

        {currentProducts.length === 0 ? (
          <motion.p
            className="text-center text-gray-400 mt-20"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            No products available!
          </motion.p>
        ) : (
          <>
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {viewMode === "grid" && (
                <ProductGrid
                  products={currentProducts}
                  handleAddToCart={handleAddToCart}
                  handleToggleWishlist={handleWishlistToggle}
                  wishlist={wishlistItems.map(
                    (item) => item._id || item.product?._id
                  )}
                />
              )}
              {viewMode === "card" && (
                <ProductCard
                  products={currentProducts}
                  wishlist={wishlistItems.map(
                    (item) => item._id || item.product?._id
                  )}
                  handleToggleWishlist={handleWishlistToggle}
                  handleAddToCart={handleAddToCart}
                />
              )}
              {viewMode === "list" && (
                <ProductList
                  products={currentProducts}
                  wishlist={wishlistItems.map(
                    (item) => item._id || item.product?._id
                  )}
                  handleToggleWishlist={handleWishlistToggle}
                  handleAddToCart={handleAddToCart}
                />
              )}
            </motion.div>

            {filteredProducts.length > productsPerPage && (
              <motion.div
                className="mt-10"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={filteredProducts.length}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Shop;
