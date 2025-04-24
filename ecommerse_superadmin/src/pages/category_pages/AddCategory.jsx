import globalBackendRoute from "../../config/Config";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModernTextInput from "../../components/common_components/MordernTextInput";
import ModernFileInput from "../../components/common_components/ModernFileInput";

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !categoryImage) {
      setMessage("Please provide both category name and image.");
      return;
    }

    const formData = new FormData();
    formData.append("category_name", categoryName);
    formData.append("category_image", categoryImage);

    try {
      await axios.post(`${globalBackendRoute}/api/add-category`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Category added successfully!");
      setCategoryName("");
      setCategoryImage(null);
      alert("New Category added successfully.");
      navigate("/all-categories");
    } catch (error) {
      console.error("There was an error adding the category!", error);
      setMessage("Error adding category. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="top_header flex justify-between items-center ">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Add Main Category
        </h2>
        <a
          href="/all-categories"
          className="bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-500 text-white font-semibold py-1 px-2 rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-300"
        >
          All Categories
        </a>
      </div>

      {message && <p className="text-green-500 text-center">{message}</p>}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Category Name */}
        <ModernTextInput
          label="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter the category name"
        />

        {/* Category Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Image
          </label>
          <ModernFileInput onFileSelect={(file) => setCategoryImage(file)} />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-300"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
}
