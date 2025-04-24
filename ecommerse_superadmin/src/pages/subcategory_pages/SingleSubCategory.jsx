import React, { useEffect, useState } from "react";
import { FaUser, FaCalendarAlt, FaThLarge } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import globalBackendRoute from "../../config/Config";
import ModernTextInput from "../../components/common_components/MordernTextInput";

export default function SingleSubCategory() {
  const [subCategoryData, setSubCategoryData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updatedSubCategoryName, setUpdatedSubCategoryName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchSubCategoryData = async () => {
      try {
        const [subRes, catRes] = await Promise.all([
          axios.get(`${globalBackendRoute}/api/get-subcategory-by-id/${id}`),
          axios.get(`${globalBackendRoute}/api/all-categories`)
        ]);
        setSubCategoryData(subRes.data);
        setUpdatedSubCategoryName(subRes.data.subcategory_name);
        setCategories(catRes.data);
      } catch (error) {
        console.error("Error fetching subcategory data:", error);
      }
    };
    fetchSubCategoryData();
  }, [id]);

  const handleUpdateSubCategory = async () => {
    if (!updatedSubCategoryName.trim()) {
      alert("Subcategory name cannot be empty!");
      return;
    }

    try {
      await axios.put(
        `${globalBackendRoute}/api/update-subcategory/${id}`,
        { subcategory_name: updatedSubCategoryName }
      );
      alert("Subcategory updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating subcategory:", error);
      alert("Failed to update the subcategory. Please try again.");
    }
  };

  const getCategoryName = () => {
    const subCatCategoryId = String(
      subCategoryData?.category?._id || subCategoryData?.category
    );
  
    const match = categories.find(
      (cat) => String(cat._id) === subCatCategoryId
    );
  
    return match?.category_name || "Unknown";
  };
  

  if (!subCategoryData || categories.length === 0)
    return <div className="text-center py-8">Loading...</div>;
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="containerWidth my-6"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Subcategory Details */}
        <div className="w-full">
          <motion.h3
            className="subHeadingTextMobile lg:subHeadingText mb-4"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            Subcategory Details
          </motion.h3>

          <div className="border-t border-gray-200 divide-y divide-gray-100">
            <SubCategoryField
              icon={<FaUser className="text-blue-600" />}
              label="Subcategory Name"
              value={
                editMode ? (
                  <ModernTextInput
                    value={updatedSubCategoryName}
                    onChange={(e) => setUpdatedSubCategoryName(e.target.value)}
                  />
                ) : (
                  subCategoryData.subcategory_name
                )
              }
            />

            <SubCategoryField
              icon={<FaThLarge className="text-indigo-600" />}
              label="Main Category"
              value={getCategoryName()}
            />

            <SubCategoryField
              icon={<FaCalendarAlt className="text-green-600" />}
              label="Created At"
              value={new Date(subCategoryData.createdAt).toLocaleDateString()}
            />
          </div>

          <div className="mt-6 text-center flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() =>
                editMode ? handleUpdateSubCategory() : setEditMode(true)
              }
              className="primaryBtn w-fit px-4 flex items-center gap-2 rounded-full"
            >
              <MdEdit /> {editMode ? "Save" : "Update"}
            </button>

            <Link
              to="/all-sub-categories"
              className="secondaryBtn w-fit px-4 rounded-full"
            >
              Back to All Subcategories
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SubCategoryField({ icon, label, value }) {
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
