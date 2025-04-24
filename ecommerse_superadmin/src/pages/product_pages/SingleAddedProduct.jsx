import React, { useEffect, useState } from "react";
import {
  FaImage,
  FaUser,
  FaCalendarAlt,
  FaTags,
  FaWarehouse,
  FaStore,
  FaCubes,
  FaCube,
  FaPalette,
  FaBox,
  FaCheck,
  FaGlobe,
  FaChartLine,
  FaClipboardList,
  FaListOl,
  FaBalanceScale,
  FaClock,
  FaFlag,
  FaPercentage,
  FaStar,
  FaEye,
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

        // Remove array-based fields with ObjectId refs if empty or invalid
        [
          "reviews",
          "orders",
          "purchases",
          "returns",
          "wishlist_users",
          "related_products",
        ].forEach((arrField) => {
          if (
            Array.isArray(dataCopy[arrField]) &&
            dataCopy[arrField].length === 0
          ) {
            delete dataCopy[arrField];
          }
        });

        [
          "avg_rating",
          "total_reviews",
          "total_products_sold",
          "discount",
          "min_purchase_qty",
          "max_purchase_qty",
          "version",
          "stock",
        ].forEach((field) => {
          if (dataCopy[field] !== undefined && dataCopy[field] !== null) {
            dataCopy[field] = String(dataCopy[field]);
          }
        });

        [
          "featured",
          "is_new_arrival",
          "is_trending",
          "availability_status",
        ].forEach((field) => {
          if (dataCopy[field] !== undefined && dataCopy[field] !== null) {
            dataCopy[field] = Boolean(dataCopy[field]).toString();
          }
        });

        setUpdatedFields(dataCopy);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProductData();
  }, [id]);

  const handleUpdate = async () => {
    const formData = new FormData();
    Object.entries(updatedFields).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        if (
          [
            "avg_rating",
            "total_reviews",
            "total_products_sold",
            "discount",
            "min_purchase_qty",
            "max_purchase_qty",
            "version",
            "stock",
          ].includes(key)
        ) {
          const number = parseFloat(val);
          if (isNaN(number)) return alert(`${key} must be a number.`);
          formData.append(key, number);
        } else if (
          [
            "featured",
            "is_new_arrival",
            "is_trending",
            "availability_status",
          ].includes(key)
        ) {
          const bool = val === "true";
          formData.append(key, bool);
        } else {
          formData.append(key, val);
        }
      }
    });

    if (newMainImage) formData.append("product_image", newMainImage);
    if (newGalleryImages.length)
      newGalleryImages.forEach((img) =>
        formData.append("all_product_images", img)
      );

    try {
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

  const renderEditableField = (key, value) => (
    <ModernTextInput
      value={updatedFields[key] || ""}
      onChange={(e) =>
        setUpdatedFields((prev) => ({ ...prev, [key]: e.target.value }))
      }
    />
  );

  if (!productData) return <div className="text-center py-8">Loading...</div>;

  const allFields = [
    { icon: <FaUser />, label: "Product Name", key: "product_name" },
    { icon: <FaTags />, label: "SKU", key: "sku" },
    { icon: <FaWarehouse />, label: "Stock", key: "stock" },
    {
      icon: <FaStore />,
      label: "Vendor",
      value:
        productData.vendor?.vendor_name || productData.vendor?.name || "NA",
    },
    {
      icon: <FaStore />,
      label: "Outlet",
      value:
        productData.outlet?.outlet_name || productData.outlet?.name || "NA",
    },
    {
      icon: <FaBox />,
      label: "Category",
      value: productData.category?.category_name || "NA",
    },
    {
      icon: <FaBox />,
      label: "Subcategory",
      value: productData.subcategory?.subcategory_name || "NA",
    },
    { icon: <FaTags />, label: "Brand", key: "brand" },
    { icon: <FaTags />, label: "Barcode", key: "barcode" },
    { icon: <FaPalette />, label: "Color", key: "color" },
    { icon: <FaCube />, label: "Material", key: "material" },
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
    {
      icon: <FaClipboardList />,
      label: "Replacement Policy",
      key: "replacement_policy",
    },
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
          className="w-auto h-full sm:w-48 sm:h-48"
        >
          <img
            src={getImageUrl(productData.product_image)}
            alt={productData.product_name || "Product"}
            className="w-full h-full object-cover rounded-xl border"
          />
          {editMode && <ModernFileInput onFileSelect={setNewMainImage} />}

          {editMode && (
            <ModernFileInput
              multiple
              label="Gallery Images"
              onFileSelect={(files) => setNewGalleryImages(files)}
            />
          )}

          {productData.all_product_images?.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {productData.all_product_images.map((img, i) => (
                <img
                  key={i}
                  src={getImageUrl(img)}
                  alt={`Gallery ${i}`}
                  className="w-20 h-20 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </motion.div>

        <div className="w-full">
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
                  editMode && field.key
                    ? renderEditableField(field.key, field.value)
                    : safe(field.value ?? updatedFields[field.key])
                }
              />
            ))}
          </div>

          <div className="mt-6 text-center flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => (editMode ? handleUpdate() : setEditMode(true))}
              className="primaryBtn w-fit px-4 flex items-center gap-2 rounded-full"
            >
              <MdEdit /> {editMode ? "Save" : "Update"}
            </button>

            <Link
              to="/all-added-products"
              className="secondaryBtn w-fit px-4 rounded-full"
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
