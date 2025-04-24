import React, { useState, useEffect } from "react";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaSearch,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import globalBackendRoute from "../../config/Config";

const AllSubCategories = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, subRes] = await Promise.all([
          axios.get(`${globalBackendRoute}/api/all-categories`),
          axios.get(`${globalBackendRoute}/api/all-subcategories`),
        ]);
        setCategories(catRes.data);
        setSubcategories(subRes.data);
        setFilteredSubcategories(subRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      setFilteredSubcategories(subcategories);
    } else {
      setSelectedCategory(categoryId);
      const filtered = subcategories.filter(
        (sub) =>
          String(sub.category?._id || sub.category) === String(categoryId)
      );
      setFilteredSubcategories(filtered);
    }
  };

  const deleteSubCategory = async (subcategoryId) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await axios.delete(
          `${globalBackendRoute}/api/delete-subcategory/${subcategoryId}`
        );
        alert("Subcategory deleted successfully.");
        const updated = subcategories.filter((sub) => sub._id !== subcategoryId);
        setSubcategories(updated);
        const visible = selectedCategory
          ? updated.filter(
              (sub) =>
                String(sub.category?._id || sub.category) ===
                String(selectedCategory)
            )
          : updated;
        setFilteredSubcategories(visible);
      } catch (error) {
        console.error("Error deleting subcategory:", error);
        alert("Failed to delete the subcategory.");
      }
    }
  };

  const getCategoryName = (categoryId) => {
    const id = String(categoryId?._id || categoryId);
    const match = categories.find((cat) => String(cat._id) === id);
    return match?.category_name || "Unknown";
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return `${globalBackendRoute}/${imagePath.replace(/\\/g, "/")}`;
  };

  const searchedSubcategories = filteredSubcategories.filter((sub) => {
    const subName = sub.subcategory_name.toLowerCase();
    const categoryId = String(sub.category?._id || sub.category);
    const categoryObj = categories.find((cat) => String(cat._id) === categoryId);
    const categoryName = categoryObj?.category_name?.toLowerCase() || "";
  
    const words = searchQuery
      .toLowerCase()
      .replace(/[^\w\s]/gi, "") // remove punctuation
      .split(/\s+/); // split by space
  
    return words.some(
      (word) =>
        subName.includes(word) ||
        subName.includes(word.replace(/s$/, "")) ||
        categoryName.includes(word) ||
        categoryName.includes(word.replace(/s$/, ""))
    );
  });
  
  

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
      {/* Left Sidebar - Main Categories */}
      <div className="lg:w-1/4 space-y-4">
        <h3 className="text-xl font-bold">Main Categories</h3>
        {categories.map((category) => (
          <div
            key={category._id}
            className={`cursor-pointer flex items-center gap-4 p-2 rounded border ${
              selectedCategory === category._id
                ? "bg-indigo-100 border-indigo-500"
                : "hover:bg-gray-100 border-gray-300"
            }`}
            onClick={() => handleCategoryClick(category._id)}
          >
            <img
              src={getImageUrl(category.category_image)}
              alt={category.category_name}
              className="w-12 h-12 object-cover rounded"
            />
            <span className="font-medium text-sm">{category.category_name}</span>
          </div>
        ))}
      </div>

      {/* Right Panel - Subcategories */}
      <div className="flex-1">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h2 className="text-xl font-bold">
            Subcategories{" "}
            <span className="ml-2 text-gray-500 text-sm">
              ({searchedSubcategories.length})
            </span>
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
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
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search subcategories..."
                className="pl-10 py-2 border rounded w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Subcategory View */}
        <div
          className={
            view === "list"
              ? "space-y-4"
              : view === "card"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          }
        >
          {searchedSubcategories.map((sub) => (
            <div
              key={sub._id}
              className={`relative bg-white rounded-lg p-4 shadow hover:shadow-lg transition ${
                view === "list" ? "flex items-center gap-4" : "flex flex-col"
              }`}
            >
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => deleteSubCategory(sub._id)}
              >
                <FaTrashAlt />
              </button>
              <Link
                to={`/single-subcategory/${sub._id}`}
                className={
                  view === "list"
                    ? "flex-1 flex flex-col"
                    : "flex flex-col items-center"
                }
              >
                <div className="text-sm font-semibold text-gray-800">
                  {sub.subcategory_name}
                </div>
                <div className="text-xs text-gray-500 italic mt-1">
                  Category: {getCategoryName(sub.category)}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllSubCategories;
