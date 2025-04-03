import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaSearch,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function AllOutlets() {
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

  const displayLocation = (outlet_address) => {
    if (!outlet_address) return "N/A";
    const { street, city, state, zip_code, country } = outlet_address;
    return [street, city, state, zip_code, country].filter(Boolean).join(", ");
  };

  const filteredOutlets = outlets.filter((outlet) =>
    [
      outlet?.outlet_name,
      outlet?.outlet_address?.street,
      outlet?.outlet_address?.city,
      outlet?.outlet_address?.state,
      outlet?.company_name,
    ]
      .map((field) => field?.toLowerCase() || "")
      .some((field) => field.includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredOutlets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOutlets = filteredOutlets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="containerWidth">
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="headingText">All Outlets</h2>
          <div className="flex items-center space-x-3 flex-wrap">
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
            <div className="relative">
              <FaSearch className="absolute left-3 top-2 text-gray-400" />
              <input
                type="text"
                className="formInput pl-10 w-48"
                placeholder="Search outlets..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <Link to="/add-outlet">
              <button className="fileUploadBtn py-1 px-3 text-sm">
                Add Outlet
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-10">
          {view === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
                  <Link
                    to={`/single-outlet/${outlet._id}`}
                    className="flex flex-col items-start"
                  >
                    <h3 className="subHeadingTextMobile">
                      {outlet.outlet_name || "Unknown Outlet"}
                    </h3>
                    <p className="paragraphTextMobile mt-2">
                      Location: {displayLocation(outlet.outlet_address)}
                    </p>
                    <p className="paragraphTextMobile mt-1">
                      Company: {outlet.company_name || "N/A"}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          )}

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
                    <h3 className="subHeadingTextMobile mb-2">
                      {outlet.outlet_name}
                    </h3>
                    <p className="paragraphTextMobile">
                      {displayLocation(outlet.outlet_address)}
                    </p>
                    <p className="paragraphTextMobile mt-1">
                      Company: {outlet.company_name}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {view === "list" && (
            <div className="space-y-4">
              {paginatedOutlets.map((outlet) => (
                <div
                  key={outlet._id}
                  className="relative bg-white p-4 shadow-md rounded-md flex flex-col sm:flex-row sm:items-center justify-between hover:shadow"
                >
                  <Link
                    to={`/single-outlet/${outlet._id}`}
                    className="paragraphTextMobile"
                  >
                    {outlet.outlet_name}
                  </Link>
                  <p className="paragraphTextMobile text-sm text-gray-500">
                    {displayLocation(outlet.outlet_address)} | Company:{" "}
                    {outlet.company_name}
                  </p>
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
      </div>
    </div>
  );
}
