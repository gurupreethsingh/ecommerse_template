// pages/product_pages/SingleAddedProduct.jsx
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaTags,
  FaWarehouse,
  FaStore,
  FaCube,
  FaPalette,
  FaClipboardList,
  FaStar,
  FaChartLine,
  FaPercentage,
  FaListOl,
  FaClock,
  FaFlag,
  FaGlobe,
  FaCheck,
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import globalBackendRoute from "../../config/Config";
import ModernFileInput from "../../components/common_components/ModernFileInput";
import ModernTextInput from "../../components/common_components/MordernTextInput";

export default function SingleAddedProduct() {
  const [productData, setProductData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedFields, setUpdatedFields] = useState({});
  const [newMainImage, setNewMainImage] = useState(null);
  const [newGalleryImages, setNewGalleryImages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `${globalBackendRoute}/api/get-single-added-product-by-id/${id}`
        );
        setProductData(response.data);

        const dataCopy = { ...response.data };
        delete dataCopy.vendor;
        delete dataCopy.outlet;
        delete dataCopy.category;
        delete dataCopy.subcategory;
        setUpdatedFields(dataCopy);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProductData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      // Append all updated fields
      Object.entries(updatedFields).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          if (Array.isArray(val)) {
            formData.append(key, JSON.stringify(val));
          } else {
            formData.append(key, val);
          }
        }
      });

      // Handle new main image
      if (newMainImage) {
        formData.append("product_image", newMainImage);
      }

      // Handle new gallery images
      if (newGalleryImages.length > 0) {
        newGalleryImages.forEach((file) => {
          formData.append("all_product_images", file);
        });
      }

      await axios.put(
        `${globalBackendRoute}/api/update-product/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Product updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update the product. Please try again.");
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    return `${globalBackendRoute}/${imagePath.replace(/\\/g, "/")}`;
  };

  const safe = (val) =>
    val === null || val === undefined || val === "" ? "NA" : val;

  if (!productData) return <div className="text-center py-8">Loading...</div>;

  const allFields = [
    { icon: <FaUser />, label: "Product Name", key: "product_name" },
    { icon: <FaTags />, label: "SKU", key: "sku" },
    { icon: <FaWarehouse />, label: "Stock", key: "stock" },
    { icon: <FaStore />, label: "Brand", key: "brand" },
    { icon: <FaPalette />, label: "Color", key: "color" },
    { icon: <FaCube />, label: "Material", key: "material" },
    { icon: <FaClipboardList />, label: "Display Price", key: "display_price" },
    { icon: <FaClipboardList />, label: "Selling Price", key: "selling_price" },
    { icon: <FaStar />, label: "Avg Rating", key: "avg_rating" },
    { icon: <FaClipboardList />, label: "Total Reviews", key: "total_reviews" },
    { icon: <FaChartLine />, label: "Total Sold", key: "total_products_sold" },
    { icon: <FaTags />, label: "Tags", key: "tags" },
    { icon: <FaPercentage />, label: "Discount", key: "discount" },
    { icon: <FaListOl />, label: "Min Qty", key: "min_purchase_qty" },
    { icon: <FaListOl />, label: "Max Qty", key: "max_purchase_qty" },
    {
      icon: <FaClock />,
      label: "Delivery Estimate",
      key: "delivery_time_estimate",
    },
    { icon: <FaFlag />, label: "Origin Country", key: "origin_country" },
    { icon: <FaGlobe />, label: "Availability", key: "availability_status" },
    { icon: <FaCheck />, label: "Featured", key: "featured" },
    { icon: <FaCheck />, label: "New Arrival", key: "is_new_arrival" },
    { icon: <FaCheck />, label: "Trending", key: "is_trending" },
    { icon: <FaTags />, label: "Meta Title", key: "meta_title" },
    { icon: <FaTags />, label: "Meta Description", key: "meta_description" },
    { icon: <FaTags />, label: "Slug", key: "slug" },
    {
      icon: <FaClipboardList />,
      label: "Section Appear",
      key: "section_to_appear",
    },
    { icon: <FaTags />, label: "Version", key: "version" },
    { icon: <FaTags />, label: "Admin Notes", key: "admin_notes" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="containerWidth my-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-start items-center gap-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full sm:w-1/3 space-y-4"
        >
          <img
            src={getImageUrl(productData.product_image)}
            alt={productData.product_name || "Product"}
            className="w-full h-48 object-cover rounded-xl border"
          />

          {editMode && (
            <>
              {/* Main Product Image Upload */}
              <ModernFileInput
                label="Update Main Product Image"
                multiple={false}
                onFileSelect={(file) => setNewMainImage(file)}
              />

              {/* Gallery Images Upload */}
              <ModernFileInput
                label="Update Gallery Images (Max 10)"
                multiple={true}
                maxFiles={10}
                onFileSelect={(files) => setNewGalleryImages(files)}
              />
            </>
          )}

          {/* Existing Gallery Images Preview */}
          {productData.all_product_images?.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-4">
              {productData.all_product_images.map((img, i) => (
                <img
                  key={i}
                  src={getImageUrl(img)}
                  alt={`Gallery ${i}`}
                  className="w-full h-20 object-cover rounded-lg border"
                />
              ))}
            </div>
          )}
        </motion.div>

        <div className="w-full sm:w-2/3">
          <motion.h3
            className="subHeadingTextMobile lg:subHeadingText mb-4"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            Product Details
          </motion.h3>

          <div className="border-t border-gray-200 divide-y divide-gray-100">
            {allFields.map((field, idx) => (
              <ProductField
                key={idx}
                icon={field.icon}
                label={field.label}
                value={
                  editMode && field.key ? (
                    <ModernTextInput
                      value={updatedFields[field.key] || ""}
                      onChange={(e) =>
                        setUpdatedFields((prev) => ({
                          ...prev,
                          [field.key]: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    safe(updatedFields[field.key])
                  )
                }
              />
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => (editMode ? handleUpdate() : setEditMode(true))}
              className="primaryBtn w-fit px-6 py-2 rounded-full flex items-center gap-2"
            >
              <MdEdit /> {editMode ? "Save Changes" : "Edit Product"}
            </button>

            <Link
              to="/all-added-products"
              className="secondaryBtn w-fit px-6 py-2 rounded-full"
            >
              Back to All Products
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProductField({ icon, label, value }) {
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
