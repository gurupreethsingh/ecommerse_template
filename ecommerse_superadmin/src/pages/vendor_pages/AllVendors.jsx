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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  // Stopwords and fuzzy search logic
  const stopwords = [
    "show",
    "me",
    "all",
    "of",
    "the",
    "vendors",
    "vendor",
    "please",
    "find",
    "list",
    "give",
    "i",
    "want",
    "to",
    "see",
    "display",
    "get",
    "need",
    "for",
    "on",
    "in",
    "at",
    "a",
    "an",
    "this",
    "that",
    "those",
    "these",
    "my",
    "your",
    "their",
    "our",
    "from",
    "and",
    "or",
    "by",
    "can",
    "you",
    "let",
    "us",
    "would",
    "should",
    "could",
    "will",
    "just",
    "is",
    "there",
  ];

  const fuzzyIncludes = (text, keyword) => {
    const len = keyword.length;
    if (len < 3) return text.includes(keyword);
    const partial = keyword.slice(0, Math.max(3, len - 2));
    return text.includes(partial);
  };

  const filteredVendors = vendors.filter((vendor) => {
    if (!searchQuery.trim()) return true;

    const fullText =
      `${vendor.vendor_name} ${vendor.vendor_email} ${vendor.company_name}`.toLowerCase();

    const queryWords = searchQuery
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word && !stopwords.includes(word));

    return queryWords.some(
      (word) =>
        fuzzyIncludes(fullText, word) ||
        fuzzyIncludes(fullText, word.replace(/s$/, ""))
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVendors = filteredVendors.slice(
    startIndex,
    startIndex + itemsPerPage
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
        <p className="paragraphTextMobile text-sm mt-1 text-gray-600">
          {vendor.vendor_email}
        </p>
        <p className="paragraphTextMobile text-sm text-gray-600">
          {vendor.company_name}
        </p>
      </Link>
    </div>
  );

  return (
    <div className="containerWidth py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="headingText flex items-center gap-2">
          All Vendors
          <span className="text-sm font-normal text-gray-600">
            (Showing {startIndex + 1}–
            {Math.min(startIndex + itemsPerPage, filteredVendors.length)} of{" "}
            {filteredVendors.length})
          </span>
        </h2>

        <div className="flex items-center gap-3 flex-wrap">
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
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              className="formInput pl-10 pr-4"
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <Link to="/add-vendor" className="fileUploadBtn text-sm">
            Add Vendor
          </Link>
        </div>
      </div>

      {/* Views */}
      <div className="mt-6">
        {view === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {paginatedVendors.map((v) => renderVendorCard(v))}
          </div>
        )}
        {view === "card" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedVendors.map((v) => renderVendorCard(v, "lg"))}
          </div>
        )}
        {view === "list" && (
          <div className="space-y-4">
            {paginatedVendors.map((v) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="secondaryBtn w-auto px-4"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="secondaryBtn w-auto px-4"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
