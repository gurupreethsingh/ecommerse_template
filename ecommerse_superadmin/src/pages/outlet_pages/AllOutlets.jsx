import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaTrashAlt,
  FaStore,
  FaPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import globalBackendRoute from "../../config/Config";
import SearchBar from "../../components/common_components/SearchBar";
import stopwords from "../../components/common_components/stopwords";

const AllOutlets = () => {
  const [outlets, setOutlets] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchOutlets = async () => {
      try {
        const response = await axios.get(
          `${globalBackendRoute}/api/all-outlets`
        );
        setOutlets(response.data);
      } catch (error) {
        console.error("Error fetching outlets:", error);
      }
    };
    fetchOutlets();
  }, []);

  const deleteOutlet = async (id) => {
    if (window.confirm("Are you sure you want to delete this outlet?")) {
      try {
        await axios.delete(`${globalBackendRoute}/api/delete-outlet/${id}`);
        setOutlets(outlets.filter((o) => o._id !== id));
        alert("Outlet deleted successfully.");
      } catch (err) {
        console.error("Error deleting outlet:", err);
        alert("Failed to delete the outlet.");
      }
    }
  };

  const displayLocation = (address) => {
    if (!address) return "N/A";
    const { street, city, state, zip_code, country } = address;
    return [street, city, state, zip_code, country].filter(Boolean).join(", ");
  };

  const fuzzyIncludes = (text, keyword) => {
    const len = keyword.length;
    if (len < 3) return text.includes(keyword);
    const partial = keyword.slice(0, Math.max(3, len - 2));
    return text.includes(partial);
  };

  const filteredOutlets = outlets.filter((outlet) => {
    if (!searchQuery.trim()) return true;

    const fullText = `${outlet.outlet_name} ${
      outlet.company_name
    } ${displayLocation(outlet.outlet_address)}`.toLowerCase();

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

  const totalPages = Math.ceil(filteredOutlets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOutlets = filteredOutlets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="fullWidth py-6">
      <div className="containerWidth">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap gap-4 mb-6">
          <h2 className="headingText flex items-center gap-2">
            All Outlets
            <span className="text-sm font-normal text-gray-600">
              (Showing {startIndex + 1}–
              {Math.min(startIndex + itemsPerPage, filteredOutlets.length)} of{" "}
              {filteredOutlets.length})
            </span>
          </h2>
          <div className="flex items-center flex-wrap gap-3">
            <FaThList
              className={`text-xl cursor-pointer ${
                view === "list" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("list")}
            />
            <FaThLarge
              className={`text-xl cursor-pointer ${
                view === "card" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("card")}
            />
            <FaTh
              className={`text-xl cursor-pointer ${
                view === "grid" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("grid")}
            />
            <SearchBar
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search outlets..."
            />
            <Link to="/add-outlet">
              <button className="fileUploadBtn py-1 px-3 text-sm">
                Add Outlet
              </button>
            </Link>
          </div>
        </div>

        {/* View Section */}
        <>
          {/* Grid View */}
          {view === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {paginatedOutlets.map((outlet) => (
                <div
                  key={outlet._id}
                  className="relative bg-white p-4 shadow rounded-lg"
                >
                  <button
                    onClick={() => deleteOutlet(outlet._id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                  <Link to={`/single-outlet/${outlet._id}`}>
                    <h3 className="subHeadingText">{outlet.outlet_name}</h3>
                    <p className="paragraphText mt-2">
                      Location: {displayLocation(outlet.outlet_address)}
                    </p>
                    <p className="paragraphText mt-1">
                      Company: {outlet.company_name}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Card View */}
          {view === "card" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedOutlets.map((outlet) => (
                <div
                  key={outlet._id}
                  className="relative bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition"
                >
                  <button
                    onClick={() => deleteOutlet(outlet._id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                  <Link to={`/single-outlet/${outlet._id}`}>
                    <h3 className="subHeadingText mb-2">
                      {outlet.outlet_name}
                    </h3>
                    <p className="paragraphText">
                      {displayLocation(outlet.outlet_address)}
                    </p>
                    <p className="paragraphText mt-1">
                      Company: {outlet.company_name}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {view === "list" && (
            <div className="space-y-4">
              {paginatedOutlets.map((outlet) => (
                <div
                  key={outlet._id}
                  className="relative bg-white p-4 shadow-md rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center"
                >
                  <Link
                    to={`/single-outlet/${outlet._id}`}
                    className="w-full sm:w-auto mb-2 sm:mb-0"
                  >
                    <h3 className="subHeadingText">{outlet.outlet_name}</h3>
                    <p className="paragraphText text-sm text-gray-600">
                      {displayLocation(outlet.outlet_address)} | Company:{" "}
                      {outlet.company_name}
                    </p>
                  </Link>
                  <button
                    onClick={() => deleteOutlet(outlet._id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
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
        </>
      </div>
    </div>
  );
};

export default AllOutlets;
