import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
  FaThList,
  FaThLarge,
  FaTh,
} from "react-icons/fa";
import globalBackendRoute from "../../config/Config";

const AllReplies = () => {
  const [messages, setMessages] = useState([]);
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        `${globalBackendRoute}/api/all-messages`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(
        response.data.map((msg) => ({
          ...msg,
          replies: msg.replies.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          ),
        }))
      );
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    if (!value.trim()) {
      fetchMessages();
      return;
    }
    setMessages(
      messages.filter(
        (message) =>
          message.message_text.toLowerCase().includes(value) ||
          message.firstName.toLowerCase().includes(value) ||
          message.lastName.toLowerCase().includes(value) ||
          message.replies.some((reply) =>
            reply.message.toLowerCase().includes(value)
          )
      )
    );
  };

  const totalPages = Math.ceil(messages.length / itemsPerPage);
  const currentMessages = messages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const renderMessages = () => {
    return currentMessages.map((message, index) => (
      <div
        key={index}
        className={`shadow rounded-lg p-2 ${
          view === "card" ? "shadow-md" : ""
        }`}
      >
        <div className="bg-white p-3 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-md">
          <h3 className="font-bold text-gray-700 mb-2 sm:mb-0">
            Message: {message.message_text}
          </h3>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <p>
              <strong>Sender:</strong> {message.firstName} {message.lastName} (
              {message.email})
            </p>
            <p>
              <strong>Submitted:</strong>{" "}
              {new Date(message.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        {message.replies.length > 0 && (
          <>
            <h4 className="text-left m-2">All Replies:</h4>
            {message.replies.map((reply, idx) => (
              <div
                key={idx}
                className="bg-green-100 p-2 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm"
              >
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <p className="text-gray-700">
                    <strong>Name:</strong> {reply.name}
                  </p>
                  <p className="text-gray-700">
                    <strong>Reply:</strong> {reply.message}
                  </p>
                  <p className="text-gray-700">
                    <strong>Time:</strong>{" "}
                    {new Date(reply.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    ));
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">

      <h2 className="text-2xl font-bold text-gray-900">All Replies</h2>
        <div className="flex space-x-2 ml-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-48 rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <div className="flex items-center space-x-2">
            <FaThList
              className={`cursor-pointer text-xl ${
                view === "list" ? "text-green-500" : "text-gray-500"
              }`}
              onClick={() => setView("list")}
            />
            <FaThLarge
              className={`cursor-pointer text-xl ${
                view === "grid" ? "text-green-500" : "text-gray-500"
              }`}
              onClick={() => setView("grid")}
            />
            <FaTh
              className={`cursor-pointer text-xl ${
                view === "card" ? "text-green-500" : "text-gray-500"
              }`}
              onClick={() => setView("card")}
            />
          </div>
        </div>
      </div>

      {view === "list" && <div>{renderMessages()}</div>}
      {view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentMessages.map((message, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="font-bold text-gray-700">
                Message: {message.message_text}
              </h3>
              <p>
                <strong>Sender:</strong> {message.firstName} {message.lastName}{" "}
                ({message.email})
              </p>
              <p>
                <strong>Submitted:</strong>{" "}
                {new Date(message.createdAt).toLocaleString()}
              </p>
              {message.replies.length > 0 && (
                <>
                  <h4 className="text-left mt-2">Latest Reply:</h4>
                  <div className="bg-green-100 p-2 rounded shadow-sm">
                    <p className="text-gray-700">
                      <strong>Name:</strong> {message.replies[0].name || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Reply:</strong>{" "}
                      {message.replies[0].message || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Time:</strong>{" "}
                      {new Date(message.replies[0].timestamp).toLocaleString()}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      {view === "card" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentMessages.map((message, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-2 text-gray-700">
                Message: {message.message_text}
              </h3>
              <p className="mb-2">
                <strong>Sender:</strong> {message.firstName} {message.lastName}{" "}
                ({message.email})
              </p>
              <p className="mb-4">
                <strong>Submitted:</strong>{" "}
                {new Date(message.createdAt).toLocaleString()}
              </p>
              {message.replies.length > 0 && (
                <>
                  <h4 className="text-left font-semibold">All Replies:</h4>
                  {message.replies.map((reply, idx) => (
                    <div
                      key={idx}
                      className="bg-green-100 p-2 rounded mb-2 shadow-sm"
                    >
                      <p className="text-gray-700">
                        <strong>Name:</strong> {reply.name}
                      </p>
                      <p className="text-gray-700">
                        <strong>Reply:</strong> {reply.message}
                      </p>
                      <p className="text-gray-700">
                        <strong>Time:</strong>{" "}
                        {new Date(reply.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded"
        >
          <FaArrowLeft />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AllReplies;
