import React, { useEffect, useState } from "react";
import { FaImage, FaUser, FaCalendarAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import globalBackendRoute from "../../config/Config";
import ModernFileInput from "../../components/common_components/ModernFileInput";
import ModernTextInput from "../../components/common_components/MordernTextInput";

export default function SingleCategory() {
  const [categoryData, setCategoryData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          `${globalBackendRoute}/api/single-category/${id}`
        );
        setCategoryData(response.data);
        setUpdatedCategoryName(response.data.category_name);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    fetchCategoryData();
  }, [id]);

  const handleUpdateCategory = async () => {
    if (!updatedCategoryName.trim()) {
      alert("Category name cannot be empty!");
      return;
    }

    const formData = new FormData();
    formData.append("category_name", updatedCategoryName);
    if (newCategoryImage) {
      formData.append("category_image", newCategoryImage);
    }

    try {
      await axios.put(
        `${globalBackendRoute}/api/update-category/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Category updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update the category. Please try again.");
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    return `${globalBackendRoute}/${imagePath.replace(/\\/g, "/")}`;
  };

  if (!categoryData) return <div className="text-center py-8">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="containerWidth my-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-start items-center gap-6">
        {/* Category Image */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-auto h-full sm:w-48 sm:h-48"
        >
         <img
  src={
    categoryData.category_image
      ? getImageUrl(categoryData.category_image)
      : "https://via.placeholder.com/150"
  }
  alt={categoryData.category_name || "Category"}
  className="w-full h-full object-cover rounded-xl border"
/>
        </motion.div>

        {/* Category Details */}
        <div className="w-full">
          <motion.h3
            className="subHeadingTextMobile lg:subHeadingText mb-4"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            Category Details
          </motion.h3>

          <div className="border-t border-gray-200 divide-y divide-gray-100">
            <CategoryField
              icon={<FaUser className="text-blue-600" />}
              label="Category Name"
              value={
                editMode ? (
                  <ModernTextInput
                    value={updatedCategoryName}
                    onChange={(e) => setUpdatedCategoryName(e.target.value)}
                  />
                ) : (
                  categoryData.category_name
                )
              }
            />

            <CategoryField
              icon={<FaCalendarAlt className="text-green-600" />}
              label="Created At"
              value={new Date(categoryData.createdAt).toLocaleDateString()}
            />

            {editMode && (
              <CategoryField
                icon={<FaImage className="text-indigo-600" />}
                label="New Image"
                value={
                  <ModernFileInput
                    onFileSelect={(file) => setNewCategoryImage(file)}
                  />
                }
              />
            )}
          </div>

          <div className="mt-6 text-center flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() =>
                editMode ? handleUpdateCategory() : setEditMode(true)
              }
              className="primaryBtn w-fit px-4 flex items-center gap-2 rounded-full"
            >
              <MdEdit /> {editMode ? "Save" : "Update"}
            </button>

            <Link
              to="/all-categories"
              className="secondaryBtn w-fit px-4 rounded-full"
            >
              Back to All Categories
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CategoryField({ icon, label, value }) {
  return (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 px-2 sm:px-4">
      <dt className="flex items-center text-sm font-medium text-gray-700 gap-2">
        {icon} {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        {value}
      </dd>
    </div>
  );
}
