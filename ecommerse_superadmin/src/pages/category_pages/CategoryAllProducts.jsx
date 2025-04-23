import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaFilter,
  FaArrowLeft,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

const CategoryAllProducts = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    return `${globalBackendRoute}/${imagePath.replace(/\\/g, "/")}`;
  };

  useEffect(() => {
    const fetchCategoryAndSubcategories = async () => {
      try {
        const catRes = await axios.get(
          `${globalBackendRoute}/api/single-category/${categoryId}`
        );
        setCategoryName(catRes.data.category_name);

        const subcatRes = await axios.get(
          `${globalBackendRoute}/api/all-subcategories/${categoryId}`
        );
        setSubcategories(subcatRes.data);
        if (subcatRes.data.length > 0) {
          setSelectedSubcategory(subcatRes.data[0]);
        }
      } catch (error) {
        console.log("Subcategory fetch failed.");
      }
    };

    if (categoryId) fetchCategoryAndSubcategories();
  }, [categoryId]);

  useEffect(() => {
    if (selectedSubcategory) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            `${globalBackendRoute}/api/products-by-subcategory/${selectedSubcategory._id}`
          );
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }
  }, [selectedSubcategory]);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.weight?.toString().includes(searchTerm) ||
      product.selling_price?.toString().includes(searchTerm)
  );

  const handleSort = (key) => {
    const sorted = [...filteredProducts].sort((a, b) =>
      sortConfig?.key === key && sortConfig.order === "asc"
        ? b[key] > a[key]
          ? 1
          : -1
        : a[key] > b[key]
        ? 1
        : -1
    );
    setProducts(sorted);
    setSortConfig({ key, order: sortConfig?.order === "asc" ? "desc" : "asc" });
  };

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add products to your cart.");
      return;
    }

    const cartItem = {
      productId: product._id,
      quantity: 1,
      priceAtPurchase: product.selling_price,
    };

    try {
      const response = await axios.post(
        `${globalBackendRoute}/api/cart`,
        cartItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert(
        response.data.success ? "Product added to cart!" : "Quantity updated."
      );
    } catch (error) {
      alert("Error adding product to cart.");
    }
  };

  return (
    <div className="containerWidth">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-6 gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/home")}
            className="text-indigo-600 hover:text-indigo-800"
          >
            <FaArrowLeft />
          </button>
          <h1 className="headingText">{categoryName}</h1>
          <span className="smallText ml-2">
            {filteredProducts.length} products
          </span>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="formInput"
          />
          <div className="flex gap-2">
            <button
              onClick={() => handleSort("product_name")}
              className="fileUploadBtn text-xs"
            >
              <FaSortAlphaDown className="mr-1" /> Name
            </button>
            <button
              onClick={() => handleSort("selling_price")}
              className="fileUploadBtn text-xs"
            >
              <FaSortAlphaUp className="mr-1" /> Price
            </button>
            <button className="fileUploadBtn text-xs">
              <FaFilter className="mr-1" /> Filter
            </button>
          </div>
        </div>
      </div>

      <hr className="border-gray-200 my-4" />

      <div className="grid grid-cols-12 gap-6">
        {/* Left: Subcategories */}
        <div
          className={`col-span-12 md:col-span-2 space-y-4 ${
            isDesktop ? "border-r pr-4" : ""
          }`}
        >
          <ul className="flex md:block space-x-4 md:space-x-0 overflow-x-auto">
            {subcategories.map((subcategory) => (
              <li
                key={subcategory._id}
                className={`cursor-pointer text-center p-2 ${
                  selectedSubcategory?._id === subcategory._id
                    ? "text-green-600"
                    : ""
                } ${
                  selectedSubcategory?._id === subcategory._id && isDesktop
                    ? "border-l-4 border-green-600"
                    : ""
                }`}
                onClick={() => setSelectedSubcategory(subcategory)}
              >
                <img
                  src={getImageUrl(subcategory.subcategory_image)}
                  alt={subcategory.subcategory_name}
                  className="w-12 h-12 mx-auto object-cover rounded-md mb-1"
                />
                <span className="smallText block">
                  {subcategory.subcategory_name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Products */}
        <div className="col-span-12 md:col-span-10">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product._id} className="text-center">
                  <img
                    src={getImageUrl(product.product_image)}
                    alt={product.product_name}
                    className="w-full h-32 object-cover rounded-md hover:scale-105 transition"
                  />
                  <div className="mt-2">
                    <h3 className="paragraphText">{product.product_name}</h3>
                    <p className="smallText">Price: ₹{product.selling_price}</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="primaryBtnMobile mt-1 w-2/3 mx-auto text-xs"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center smallText">
                No products available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryAllProducts;
