import React, { useEffect, useState } from "react";
import { FaUser, FaEdit, FaImage } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import globalBackendRoute from "../../config/Config";

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
    if (!imagePath) return "";
    return `${globalBackendRoute}/${imagePath.replace(/\\/g, "/")}`;
  };

  if (!categoryData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="headingText">Single Category</h2>
          <Link to="/all-categories" className="fileUploadBtn text-sm">
            All Categories
          </Link>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-start">
          <div className="w-full shadow rounded lg:p-5 sm:p-0">
            <h3 className="subHeadingText mb-4 ">
              {categoryData.category_name} Category Details
            </h3>

            {/* Category Image */}
            <div className="mb-6 space-y-2 flex justify-center">
              <img
                src={getImageUrl(categoryData.category_image)}
                alt={categoryData.category_name}
                className="w-full max-w-md h-56 object-cover rounded-md shadow border"
              />
              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewCategoryImage(e.target.files[0])}
                  className="formInput"
                />
              )}
            </div>

            <div className="border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                {/* Category Name */}
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                    <FaUser className="text-indigo-600 mr-2" /> Category Name
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex items-center gap-2">
                    {editMode ? (
                      <input
                        type="text"
                        value={updatedCategoryName}
                        onChange={(e) => setUpdatedCategoryName(e.target.value)}
                        className="formInput"
                      />
                    ) : (
                      categoryData.category_name
                    )}
                    <button
                      onClick={() =>
                        editMode ? handleUpdateCategory() : setEditMode(true)
                      }
                      className="primaryBtnMobile w-auto px-3 py-1"
                    >
                      {editMode ? "Save" : <FaEdit />}
                    </button>
                  </dd>
                </div>

                {/* Created At */}
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="flex items-center text-sm font-medium leading-6 text-gray-900">
                    Created At
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {new Date(categoryData.createdAt).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
