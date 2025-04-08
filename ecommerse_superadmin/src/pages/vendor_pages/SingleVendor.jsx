import React, { useEffect, useState } from "react";
import { FaUser, FaBox, FaBuilding, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import globalBackendRoute from "../../config/Config";

export default function SingleVendor() {
  const [vendorData, setVendorData] = useState(null);
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updatedVendor, setUpdatedVendor] = useState({});
  const { vendorId } = useParams();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      // Fetch vendor data
      try {
        const vendorRes = await axios.get(
          `${globalBackendRoute}/api/get-vendor-by-id/${vendorId}`
        );
        if (isMounted) {
          setVendorData(vendorRes.data);
          setUpdatedVendor(vendorRes.data);
        }
      } catch (err) {
        if (isMounted) console.error("Vendor error:", err);
      }

      // Fetch products
      try {
        const productsRes = await axios.get(
          `${globalBackendRoute}/api/all-added-products`
        );
        if (isMounted) {
          const vendorProducts = productsRes.data.filter(
            (p) => p.vendor && p.vendor.toString() === vendorId
          );
          setProducts(vendorProducts);
        }
      } catch (err) {
        if (isMounted) {
          if (err.response?.status === 404) {
            console.warn("No products found for this vendor.");
            setProducts([]);
          } else {
            console.error("Products error:", err);
          }
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [vendorId]);

  const handleUpdateVendor = async () => {
    try {
      await axios.put(
        `${globalBackendRoute}/api/update-vendor/${vendorId}`,
        updatedVendor
      );
      alert("Vendor updated successfully!");
      setVendorData(updatedVendor);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating vendor:", error);
      alert("Failed to update vendor.");
    }
  };

  const handleChange = (key, value) => {
    setUpdatedVendor({ ...updatedVendor, [key]: value });
  };

  if (!vendorData)
    return <div className="text-center py-10">Loading vendor details...</div>;

  const fields = [
    {
      label: "Vendor Name",
      key: "vendor_name",
      icon: <FaUser className="text-indigo-600 mr-2" />,
    },
    {
      label: "Email",
      key: "vendor_email",
      icon: <FaEnvelope className="text-green-600 mr-2" />,
    },
    {
      label: "Phone",
      key: "vendor_phone",
      icon: <FaPhone className="text-yellow-600 mr-2" />,
    },
    {
      label: "Company Name",
      key: "company_name",
      icon: <FaBuilding className="text-blue-600 mr-2" />,
    },
  ];

  return (
    <div className="bg-white py-10">
      <div className="containerWidth">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="headingText flex items-center gap-2">
            Vendor Details
            <span className="text-sm font-normal text-gray-600">
              ({products.length} products)
            </span>
          </h2>
          <Link to="/all-vendors">
            <button className="fileUploadBtn py-1 px-3 text-sm">
              Back to All Vendors
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Vendor Info */}
          <div className="bg-white border rounded-lg shadow-sm p-6">
            <h3 className="subHeadingText mb-4">Vendor Information</h3>
            <div className="divide-y divide-gray-200">
              {fields.map((field, idx) => (
                <div
                  key={idx}
                  className="py-4 flex flex-col sm:flex-row sm:items-center sm:gap-4"
                >
                  <dt className="flex items-center text-sm font-medium text-gray-900 w-40">
                    {field.icon}
                    {field.label}
                  </dt>
                  <dd className="text-sm text-gray-700 mt-2 sm:mt-0 w-full">
                    {editMode ? (
                      <input
                        type="text"
                        value={updatedVendor[field.key] || ""}
                        onChange={(e) =>
                          handleChange(field.key, e.target.value)
                        }
                        className="formInput w-full"
                      />
                    ) : (
                      vendorData[field.key]
                    )}
                  </dd>
                </div>
              ))}

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() =>
                    editMode ? handleUpdateVendor() : setEditMode(true)
                  }
                  className="primaryBtn px-5 py-2 text-sm"
                >
                  {editMode ? "Save Changes" : "Edit"}
                </button>
              </div>
            </div>
          </div>

          {/* Vendor Products */}
          <div>
            <h3 className="subHeadingText mb-4">Vendor Products</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <div
                    key={product._id || index}
                    className={`rounded-lg shadow p-4 flex flex-col items-center text-center transition ${
                      product.stock <= 5
                        ? "bg-red-100 border border-red-400 animate-pulse"
                        : product.stock <= 20
                        ? "bg-yellow-100 border border-yellow-400"
                        : "bg-green-100 border border-green-400"
                    }`}
                  >
                    {product.product_image ? (
                      <img
                        src={`${globalBackendRoute}/${product.product_image.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt={product.product_name}
                        className="h-16 w-16 object-cover rounded-full mb-2"
                      />
                    ) : (
                      <FaBox className="text-3xl text-gray-500 mb-2" />
                    )}
                    <p className="text-sm font-medium">
                      {product.product_name}
                    </p>
                    <p className="text-xs mt-1">Stock: {product.stock}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No products available for this vendor.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
