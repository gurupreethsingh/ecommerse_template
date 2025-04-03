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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${globalBackendRoute}/api/all-categories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const deleteCategory = async (categoryId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this category? This action cannot be undone."
      )
    ) {
      try {
        await axios.delete(
          `${globalBackendRoute}/api/delete-category/${categoryId}`
        );
        alert("Category deleted successfully.");
        setCategories(
          categories.filter((category) => category._id !== categoryId)
        );
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete the category. Please try again.");
      }
    }
  };

  // Function to get full image URL (OS independent)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    return `${globalBackendRoute}/${imagePath.replace(/\\/g, "/")}`;
  };

  // Filtered categories based on search
  const filteredCategories = categories.filter((category) =>
    category.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="text-left text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Main Categories
          </h2>
          <div className="flex items-center space-x-4 flex-wrap mt-4 sm:mt-0">
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
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Link to="/add-category">
              <button className="ml-4 bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:opacity-90 transition-opacity">
                Add Category
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-10">
          {view === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {filteredCategories.map((category) => (
                <div
                  key={category._id}
                  className="relative bg-white pt-4 pb-4 shadow rounded-lg"
                >
                  <button
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    onClick={() => deleteCategory(category._id)}
                  >
                    <FaTrashAlt />
                  </button>
                  <Link
                    to={`/single-category/${category._id}`}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={getImageUrl(category.category_image)}
                      alt={category.category_name}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <h3 className="text-md font-semibold text-gray-900">
                      {category.category_name}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {view === "card" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <div
                  key={category._id}
                  className="relative bg-white p-6 shadow-lg rounded-lg"
                >
                  <button
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    onClick={() => deleteCategory(category._id)}
                  >
                    <FaTrashAlt />
                  </button>
                  <Link
                    to={`/single-category/${category._id}`}
                    className="flex flex-col items-start"
                  >
                    <img
                      src={getImageUrl(category.category_image)}
                      alt={category.category_name}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 text-left">
                      {category.category_name}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {view === "list" && (
            <div className="space-y-6">
              {filteredCategories.map((category) => (
                <div
                  key={category._id}
                  className="relative bg-white p-4 shadow rounded-lg flex items-center space-x-4"
                >
                  <button
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    onClick={() => deleteCategory(category._id)}
                  >
                    <FaTrashAlt />
                  </button>
                  <img
                    src={getImageUrl(category.category_image)}
                    alt={category.category_name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <Link
                    to={`/single-category/${category._id}`}
                    className="flex-1"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 text-left">
                      {category.category_name}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
