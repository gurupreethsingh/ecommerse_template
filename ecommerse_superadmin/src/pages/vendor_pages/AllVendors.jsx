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

export default function AllVendors() {
  const [vendors, setVendors] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get(`${globalBackendRoute}/api/all-vendors`)
      .then((res) => setVendors(res.data))
      .catch((err) => console.error("Error fetching vendors:", err));
  }, []);

  const deleteVendor = async (id) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      try {
        await axios.delete(`${globalBackendRoute}/api/delete-vendor/${id}`);
        setVendors(vendors.filter((v) => v._id !== id));
        alert("Vendor deleted successfully.");
      } catch (err) {
        console.error("Error deleting vendor:", err);
        alert("Failed to delete the vendor.");
      }
    }
  };

  const filteredVendors = vendors.filter((v) =>
    v.vendor_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderVendorCard = (vendor, size = "md") => (
    <div
      key={vendor._id}
      className={`relative bg-white p-4 shadow rounded-lg ${
        size === "lg" ? "p-6" : ""
      }`}
    >
      <button
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        onClick={() => deleteVendor(vendor._id)}
      >
        <FaTrashAlt />
      </button>
      <Link to={`/single-vendor/${vendor._id}`}>
        <h3
          className={`${
            size === "lg" ? "text-lg" : "text-md"
          } font-semibold text-gray-900`}
        >
          {vendor.vendor_name}
        </h3>
      </Link>
    </div>
  );

  return (
    <div className="containerWidth py-12">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <h2 className="headingText">All Vendors</h2>
        <div className="flex items-center gap-3 flex-wrap">
          {/* View Controls */}
          {[
            ["list", FaThList],
            ["card", FaThLarge],
            ["grid", FaTh],
          ].map(([mode, Icon]) => (
            <Icon
              key={mode}
              onClick={() => setView(mode)}
              className={`text-xl cursor-pointer ${
                view === mode ? "text-indigo-600" : "text-gray-600"
              }`}
            />
          ))}
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              className="formInput pl-10 pr-4"
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Add Button */}
          <Link to="/add-vendor" className="fileUploadBtn text-sm">
            Add Vendor
          </Link>
        </div>
      </div>

      {/* Vendor Views */}
      <div className="mt-6">
        {view === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {filteredVendors.map((v) => renderVendorCard(v))}
          </div>
        )}
        {view === "card" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((v) => renderVendorCard(v, "lg"))}
          </div>
        )}
        {view === "list" && (
          <div className="space-y-4">
            {filteredVendors.map((v) => (
              <div
                key={v._id}
                className="relative bg-white p-4 shadow rounded-lg flex items-center justify-between"
              >
                <Link
                  to={`/single-vendor/${v._id}`}
                  className="paragraphText w-full"
                >
                  {v.vendor_name}
                </Link>
                <button
                  onClick={() => deleteVendor(v._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
