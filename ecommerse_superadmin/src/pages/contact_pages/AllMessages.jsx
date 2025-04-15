import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaArrowLeft,
  FaArrowRight,
  FaEnvelope,
  FaUser,
  FaClock,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import globalBackendRoute from "../../config/Config";

const itemsPerPage = 6;

export default function AllMessages() {
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([]); // Store messages fetched from the server
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");

  // Fetch messages from the server when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${globalBackendRoute}/api/all-messages`
        );
        if (response.data && Array.isArray(response.data)) {
          setMessages(response.data);
          setFilteredMessages(response.data);
        } else {
          console.error("Unexpected API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error.message);
      }
    };

    fetchMessages();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = messages
      .filter(
        (message) =>
          message.firstName?.toLowerCase().includes(value) ||
          message.lastName?.toLowerCase().includes(value) ||
          message.email?.toLowerCase().includes(value) ||
          message.message_text?.toLowerCase().includes(value)
      )
      .sort((a, b) =>
        sortOrder === "desc"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt)
      );
    setFilteredMessages(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newOrder);
    const sortedMessages = [...filteredMessages].sort((a, b) =>
      newOrder === "desc"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );
    setFilteredMessages(sortedMessages);
  };

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-64 rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <button
            onClick={toggleSortOrder}
            className="flex items-center space-x-2 px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-500"
          >
            {sortOrder === "desc" ? (
              <>
                <FaSortAmountDown />
                <span>Newest First</span>
              </>
            ) : (
              <>
                <FaSortAmountUp />
                <span>Oldest First</span>
              </>
            )}
          </button>
          <FaThList
            className={`cursor-pointer ${
              view === "list" ? "text-indigo-600" : "text-gray-500"
            }`}
            onClick={() => setView("list")}
          />
          <FaThLarge
            className={`cursor-pointer ${
              view === "grid" ? "text-indigo-600" : "text-gray-500"
            }`}
            onClick={() => setView("grid")}
          />
          <FaTh
            className={`cursor-pointer ${
              view === "card" ? "text-indigo-600" : "text-gray-500"
            }`}
            onClick={() => setView("card")}
          />
        </div>
      </div>

      <div
        className={`grid gap-6 ${
          view === "list"
            ? "grid-cols-1"
            : view === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {paginatedMessages.map((message) => (
          <Link key={message._id} to={`/reply-message/${message._id}`}>
            <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
              <h3 className="text-lg font-bold text-gray-700 flex items-center">
                <FaEnvelope className="mr-2" /> {message.message_text}
              </h3>
              <p className="mt-2 text-sm text-gray-600 flex items-center">
                <FaUser className="mr-2 text-blue-500" /> {message.firstName}{" "}
                {message.lastName} - ({message.email})
              </p>
              <p className="mt-2 text-sm text-gray-500 flex items-center">
                <FaClock className="mr-2 text-green-500" />{" "}
                {new Date(message.createdAt).toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <p className="text-center text-gray-600 mt-6">No messages found.</p>
      )}

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-white ${
            currentPage === 1
              ? "bg-gray-300"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          <FaArrowLeft />
          <span>Previous</span>
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-white ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          <span>Next</span>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
