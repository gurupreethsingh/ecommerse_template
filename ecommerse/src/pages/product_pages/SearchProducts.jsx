// import React, { useState, useEffect } from "react";
// import FiltersSidebar from "../../components/shop_components/FiltersSidebar";
// import ProductGrid from "../../components/shop_components/ProductGrid";
// import ProductCard from "../../components/shop_components/ProductCard";
// import ProductList from "../../components/shop_components/ProductList";
// import Pagination from "../../components/shop_components/Pagination";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import globalBackendRoute from "../../config/Config";
// import { motion } from "framer-motion";
// import { FaTh, FaThList, FaIdBadge } from "react-icons/fa";

// const SearchProducts = () => {
//   const location = useLocation();
//   const [query, setQuery] = useState(""); // 🛠 Controlled separately
//   const [allProducts, setAllProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [viewMode, setViewMode] = useState("grid");

//   const productsPerPage =
//     viewMode === "grid" ? 12 : viewMode === "card" ? 9 : 10;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `${globalBackendRoute}/api/all-added-products`
//         );
//         const products = res.data || [];
//         setAllProducts(products);
//       } catch (error) {
//         console.error("Failed to fetch products:", error.message);
//       }
//     };

//     fetchData();
//   }, []); // ✅ only once load all products

//   // 🛠️ Detect query string changes
//   useEffect(() => {
//     const currentQuery =
//       new URLSearchParams(location.search).get("query") || "";
//     setQuery(currentQuery);
//   }, [location.search]);

//   useEffect(() => {
//     if (query.trim() === "") {
//       setFilteredProducts(allProducts);
//     } else {
//       const lowerQueryWords = query
//         .toLowerCase()
//         .split(/\s+/)
//         .filter((word) => word.length > 0);

//       const filtered = allProducts.filter((product) => {
//         const fieldsToSearch = [
//           product.product_name?.toLowerCase() || "",
//           product.description?.toLowerCase() || "",
//           product.brand?.toLowerCase() || "",
//           ...(product.tags || []).map((tag) => tag.toLowerCase()),
//         ];

//         return lowerQueryWords.some((word) =>
//           fieldsToSearch.some((field) => field.includes(word))
//         );
//       });

//       // 🛡️ If nothing matched, show all products instead
//       if (filtered.length === 0) {
//         setFilteredProducts(allProducts);
//       } else {
//         setFilteredProducts(filtered);
//       }
//     }
//     setCurrentPage(1);
//   }, [query, allProducts]);

//   const handleFilterChange = (newFilteredProducts) => {
//     setFilteredProducts(newFilteredProducts);
//     setCurrentPage(1);
//   };

//   const handleWishlistToggle = (productId) => {
//     setWishlist((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId]
//     );
//   };

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className=" py-10 px-4 flex flex-col lg:flex-row gap-4 animate-fadeIn">
//       <motion.div
//         initial={{ x: -100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//         className="w-full lg:w-1/4 bg-gradient-to-br rounded-lg"
//       >
//         <FiltersSidebar
//           allProducts={allProducts}
//           onFilterChange={handleFilterChange}
//         />
//       </motion.div>

//       <motion.div
//         initial={{ x: 100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//         className="w-full lg:w-3/4"
//       >
//         <div className="flex items-center justify-between mb-6">
//           <motion.h1
//             className="text-3xl font-extrabold text-gray-800 tracking-wide"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             {query ? `Results for "${query}"` : "Explore Products"}
//           </motion.h1>

//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-500 hidden md:inline">
//               ({filteredProducts.length} items)
//             </span>

//             <div className="flex gap-2 ml-3">
//               <button
//                 onClick={() => setViewMode("grid")}
//                 className={`p-2 rounded-full border ${
//                   viewMode === "grid"
//                     ? "bg-gray-900 text-white"
//                     : "text-gray-600"
//                 }`}
//               >
//                 <FaTh />
//               </button>
//               <button
//                 onClick={() => setViewMode("card")}
//                 className={`p-2 rounded-full border ${
//                   viewMode === "card"
//                     ? "bg-gray-900 text-white"
//                     : "text-gray-600"
//                 }`}
//               >
//                 <FaIdBadge />
//               </button>
//               <button
//                 onClick={() => setViewMode("list")}
//                 className={`p-2 rounded-full border ${
//                   viewMode === "list"
//                     ? "bg-gray-900 text-white"
//                     : "text-gray-600"
//                 }`}
//               >
//                 <FaThList />
//               </button>
//             </div>
//           </div>
//         </div>

//         {currentProducts.length === 0 ? (
//           <motion.p
//             className="text-center text-gray-400 mt-20"
//             initial={{ scale: 0.8 }}
//             animate={{ scale: 1 }}
//           >
//             No products found matching "{query}"!
//           </motion.p>
//         ) : (
//           <>
//             <motion.div
//               key={viewMode}
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4 }}
//             >
//               {viewMode === "grid" && (
//                 <ProductGrid
//                   products={currentProducts}
//                   wishlist={wishlist}
//                   onWishlistToggle={handleWishlistToggle}
//                 />
//               )}
//               {viewMode === "card" && (
//                 <ProductCard
//                   products={currentProducts}
//                   wishlist={wishlist}
//                   onWishlistToggle={handleWishlistToggle}
//                 />
//               )}
//               {viewMode === "list" && (
//                 <ProductList
//                   products={currentProducts}
//                   wishlist={wishlist}
//                   onWishlistToggle={handleWishlistToggle}
//                 />
//               )}
//             </motion.div>

//             {filteredProducts.length > productsPerPage && (
//               <motion.div
//                 className="mt-10"
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <Pagination
//                   productsPerPage={productsPerPage}
//                   totalProducts={filteredProducts.length}
//                   currentPage={currentPage}
//                   paginate={paginate}
//                 />
//               </motion.div>
//             )}
//           </>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default SearchProducts;


//

import React, { useState, useEffect, useContext } from "react";
import FiltersSidebar from "../../components/shop_components/FiltersSidebar";
import ProductGrid from "../../components/shop_components/ProductGrid";
import ProductCard from "../../components/shop_components/ProductCard";
import ProductList from "../../components/shop_components/ProductList";
import Pagination from "../../components/shop_components/Pagination";
import { CartContext } from "../../components/cart_components/CartContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import globalBackendRoute from "../../config/Config";
import { motion } from "framer-motion";
import { FaTh, FaThList, FaIdBadge } from "react-icons/fa";
import { toast } from "react-toastify";

const SearchProducts = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");

  const { addToCart } = useContext(CartContext); // 🛒

  const productsPerPage =
    viewMode === "grid" ? 12 : viewMode === "card" ? 9 : 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/all-added-products`);
        const products = res.data || [];
        setAllProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const currentQuery =
      new URLSearchParams(location.search).get("query") || "";
    setQuery(currentQuery);
  }, [location.search]);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredProducts(allProducts);
    } else {
      const lowerQueryWords = query
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word.length > 0);

      const filtered = allProducts.filter((product) => {
        const fieldsToSearch = [
          product.product_name?.toLowerCase() || "",
          product.description?.toLowerCase() || "",
          product.brand?.toLowerCase() || "",
          ...(product.tags || []).map((tag) => tag.toLowerCase()),
        ];
        return lowerQueryWords.some((word) =>
          fieldsToSearch.some((field) => field.includes(word))
        );
      });

      if (filtered.length === 0) {
        setFilteredProducts(allProducts);
      } else {
        setFilteredProducts(filtered);
      }
    }
    setCurrentPage(1);
  }, [query, allProducts]);

  const handleFilterChange = (newFilteredProducts) => {
    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1);
  };

  const handleWishlistToggle = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product) => {
    if (product.availability_status) {
      addToCart(product);
      toast.success("Added to cart!", { autoClose: 800 });
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
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/4 bg-gradient-to-br rounded-lg"
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
            {query ? `Results for "${query}"` : "Explore Products"}
          </motion.h1>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden md:inline">
              ({filteredProducts.length} items)
            </span>

            <div className="flex gap-2 ml-3">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-full border ${viewMode === "grid" ? "bg-gray-900 text-white" : "text-gray-600"}`}
              >
                <FaTh />
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded-full border ${viewMode === "card" ? "bg-gray-900 text-white" : "text-gray-600"}`}
              >
                <FaIdBadge />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-full border ${viewMode === "list" ? "bg-gray-900 text-white" : "text-gray-600"}`}
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
            No products found matching "{query}"!
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
                  wishlist={wishlist}
                />
              )}
              {viewMode === "card" && (
                <ProductCard
                  products={currentProducts}
                  wishlist={wishlist}
                  onWishlistToggle={handleWishlistToggle}
                  handleAddToCart={handleAddToCart}
                />
              )}
              {viewMode === "list" && (
                <ProductList
                  products={currentProducts}
                  wishlist={wishlist}
                  onWishlistToggle={handleWishlistToggle}
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

export default SearchProducts;
