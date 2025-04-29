// =========================
// ✅ AllCategories.jsx (FINAL WORKING: No Flicker, Image Display from Backend)
// =========================

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

export default function AllCategories() {
  const [categories, setCategories] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [catRes, countRes] = await Promise.all([
          axios.get(`${globalBackendRoute}/api/all-categories`),
          axios.get(`${globalBackendRoute}/api/category-count`),
        ]);
        setCategories(catRes.data);
        setTotalCount(countRes.data.categoryCount);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const deleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(
          `${globalBackendRoute}/api/delete-category/${categoryId}`
        );
        alert("Category deleted successfully.");
        setCategories((prev) =>
          prev.filter((category) => category._id !== categoryId)
        );
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete the category.");
      }
    }
  };

  const getImageUrl = (imgPath) => {
    if (!imgPath || typeof imgPath !== "string") return null;
    const normalized = imgPath.replace(/\\/g, "/").replace(/^\/+/g, "");
    return `${globalBackendRoute}/${normalized}`;
  };

  const filteredCategories = categories.filter((category) => {
    const name = (category?.category_name || "").toLowerCase();
    const words = searchQuery.toLowerCase().split(" ");
    return words.some((word) => name.includes(word));
  });

  return (
    <div className="fullWidth py-6">
      <div className="containerWidth">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="headingText">
            All Categories
            <span className="text-sm text-gray-500 ml-2">
              Showing {filteredCategories.length} of {totalCount}
            </span>
          </h2>
          <div className="flex items-center flex-wrap gap-4">
            <FaThList className={`text-xl cursor-pointer ${view === "list" ? "text-indigo-600" : "text-gray-600"}`} onClick={() => setView("list")} />
            <FaThLarge className={`text-xl cursor-pointer ${view === "card" ? "text-indigo-600" : "text-gray-600"}`} onClick={() => setView("card")} />
            <FaTh className={`text-xl cursor-pointer ${view === "grid" ? "text-indigo-600" : "text-gray-600"}`} onClick={() => setView("grid")} />
            <div className="relative w-full sm:w-auto">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                className="formInput pl-10"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Link to="/add-category">
              <button className="fileUploadBtn">Add Category</button>
            </Link>
          </div>
        </div>

        <div className="mt-6">
          {filteredCategories.length === 0 ? (
            <p className="text-center text-gray-500">No categories found.</p>
          ) : (
            <div className={
              view === "list"
                ? "space-y-6"
                : view === "card"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            }>
              {filteredCategories.map((category) => {
                const imageUrl = getImageUrl(category.category_image);

                return (
                  <div
                    key={category._id}
                    className={`relative bg-white rounded-lg p-4 transition hover:shadow-lg ${
                      view === "list"
                        ? "flex items-center space-x-4 shadow"
                        : "flex flex-col"
                    }`}
                  >
                    <button
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      onClick={() => deleteCategory(category._id)}
                    >
                      <FaTrashAlt />
                    </button>
                    <Link
                      to={`/single-category/${category._id}`}
                      className={
                        view === "list"
                          ? "flex-1 flex items-center gap-4"
                          : "flex flex-col items-center"
                      }
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={category.category_name || "Category"}
                          onError={(e) => {
                            e.currentTarget.src = "/images/default-category.jpg";
                          }}
                          className={`$${
                            view === "list"
                              ? "w-20 h-20"
                              : view === "card"
                              ? "w-full h-40"
                              : "w-full h-32"
                          } object-cover rounded-md mb-2`}
                        />
                      ) : (
                        <img
                          src="/images/default-category.jpg"
                          alt="Default"
                          className={`$${
                            view === "list"
                              ? "w-20 h-20"
                              : view === "card"
                              ? "w-full h-40"
                              : "w-full h-32"
                          } object-cover rounded-md mb-2`}
                        />
                      )}
                      <h3
                        className={`$${
                          view === "list"
                            ? "text-lg font-semibold text-left"
                            : "text-md font-semibold text-center"
                        } text-gray-900`}
                      >
                        {category.category_name}
                      </h3>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}