import React, { useEffect, useState } from "react";
import { FaUser, FaEdit, FaBox, FaBuilding } from "react-icons/fa";
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
    const fetchData = async () => {
      try {
        const vendorRes = await axios.get(
          `${globalBackendRoute}/api/get-vendor-by-id/${vendorId}`
        );
        setVendorData(vendorRes.data);
        setUpdatedVendor(vendorRes.data);

        const productsRes = await axios.get(
          `${globalBackendRoute}/api/all-added-products`
        );
        const vendorProducts = productsRes.data.filter(
          (p) => p.vendor && p.vendor.toString() === vendorId
        );
        setProducts(vendorProducts);
      } catch (error) {
        console.error("Error fetching vendor or products:", error);
      }
    };
    fetchData();
  }, [vendorId]);

  const handleUpdateVendor = async () => {
    try {
      await axios.put(
        `${globalBackendRoute}/api/updatae-vendor/${vendorId}`,
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

  if (!vendorData) return <div className="text-center py-10">Loading...</div>;

  const fields = [
    { label: "Vendor Name", key: "vendor_name", icon: <FaUser /> },
    { label: "Email", key: "vendor_email", icon: <FaUser /> },
    { label: "Phone", key: "vendor_phone", icon: <FaUser /> },
    { label: "Company Name", key: "company_name", icon: <FaBuilding /> },
  ];

  return (
    <div className="containerWidth py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendor Info */}
        <div className="p-6 shadow-lg rounded-lg bg-white">
          <h2 className="headingText mb-4">Vendor Details</h2>
          <div className="divide-y divide-gray-200">
            {fields.map((f) => (
              <div
                key={f.key}
                className="py-2 flex justify-between items-start flex-wrap"
              >
                <div className="flex items-center gap-2">
                  <span className="text-indigo-600">{f.icon}</span>
                  <span className="paragraphText">{f.label}:</span>
                </div>
                <div className="w-full sm:w-auto mt-2 sm:mt-0">
                  {editMode ? (
                    <input
                      type="text"
                      value={updatedVendor[f.key]}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      className="formInput"
                    />
                  ) : (
                    <span className="text-gray-900">{vendorData[f.key]}</span>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-4 flex justify-end">
              <button
                onClick={() =>
                  editMode ? handleUpdateVendor() : setEditMode(true)
                }
                className="primaryBtn w-auto px-4 py-2"
              >
                {editMode ? "Save Changes" : <FaEdit className="mr-1" />}
              </button>
            </div>
          </div>
        </div>

        {/* Vendor Products */}
        <div className="p-6 shadow-lg rounded-lg bg-white">
          <h2 className="headingText mb-4">Vendor Products</h2>
          {products.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {products.map((product) => (
                <li
                  key={product._id}
                  className="py-4 flex items-center justify-between flex-wrap gap-2"
                >
                  <div className="flex items-center">
                    <FaBox className="text-green-500 mr-2" />
                    <Link
                      to={`/single-product/${product._id}`}
                      className="linkText"
                    >
                      {product.product_name}
                    </Link>
                  </div>
                  <span className="smallText">Stock: {product.stock}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="paragraphText">No products for this vendor.</p>
          )}
        </div>
      </div>
    </div>
  );
}
