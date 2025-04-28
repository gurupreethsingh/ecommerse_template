
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaTrash,
  FaRupeeSign,
} from "react-icons/fa";
import { toast } from "react-toastify";
import globalBackendRoute from "../../config/Config";
import SearchBar from "../../components/common_components/SearchBar";
import stopwords from "../../components/common_components/stopwords";

const AllAddedProducts = () => {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/all-added-products`
        );
        setProducts(res.data);
        setTotalCount(res.data.length);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        toast.error("Failed to fetch products.");
      }
    };
    fetchProducts();
  }, []);

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

  const handleDeleteProduct = async (productId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    try {
      const res = await axios.delete(
        `${globalBackendRoute}/api/delete-product/${productId}`
      );
      if (res.status === 200) {
        setProducts((prev) => prev.filter((p) => p._id !== productId));
        toast.success("Product deleted successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product.");
    }
  };

  const filteredProducts = searchQuery.trim()
    ? products.filter((product) => {
        const fullText =
          `${product.product_name} ${product.sku} ${product.brand}`.toLowerCase();
        const queryWords = searchQuery
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word && !stopwords.includes(word));
        return queryWords.some((word) => fullText.includes(word));
      })
    : products;

  return (
    <div className="fullWidth py-10">
      <div className="containerWidth">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="headingText">
            All Products
            <span className="text-sm text-gray-500 ml-2">
              Showing {filteredProducts.length} of {totalCount}
            </span>
          </h2>
          <div className="flex items-center flex-wrap gap-4">
            <FaThList
              className={`text-xl cursor-pointer ${
                view === "list" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("list")}
            />
            <FaThLarge
              className={`text-xl cursor-pointer ${
                view === "card" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("card")}
            />
            <FaTh
              className={`text-xl cursor-pointer ${
                view === "grid" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("grid")}
            />
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
            />
          </div>
        </div>

        <div className="mt-6">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/single-added-product/${product._id}`}
                  className="relative flex flex-col items-start bg-white shadow rounded-lg overflow-hidden"
                >
                  <img
                    src={getImageUrl(product.product_image)}
                    alt={product.product_name}
                    onError={handleImageError}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteProduct(product._id);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                  <div className="p-3 space-y-1">
                    <h3 className="subHeadingTextMobile">
                      {product.product_name}
                    </h3>
                    <p className="paragraphTextMobile">{product.sku}</p>
                    <p className="paragraphTextMobile">{product.brand}</p>
                    <div className="flex items-center gap-2 text-sm mt-2">
                      {product.display_price && (
                        <span className="line-through text-gray-400 flex items-center">
                          <FaRupeeSign /> {product.display_price}
                        </span>
                      )}
                      <span className="font-bold text-green-600 flex items-center">
                        <FaRupeeSign /> {product.selling_price}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/single-added-product/${product._id}`}
                  className="flex items-center space-x-4 bg-white rounded-lg shadow p-3 relative"
                >
                  <img
                    src={getImageUrl(product.product_image)}
                    alt={product.product_name}
                    onError={handleImageError}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteProduct(product._id);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                  <div>
                    <h3 className="subHeadingTextMobile">
                      {product.product_name}
                    </h3>
                    <p className="paragraphTextMobile">{product.sku}</p>
                    <p className="paragraphTextMobile">{product.brand}</p>
                    <div className="flex items-center gap-2 text-sm mt-2">
                      {product.display_price && (
                        <span className="line-through text-gray-400 flex items-center">
                          <FaRupeeSign /> {product.display_price}
                        </span>
                      )}
                      <span className="font-bold text-green-600 flex items-center">
                        <FaRupeeSign /> {product.selling_price}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAddedProducts;
