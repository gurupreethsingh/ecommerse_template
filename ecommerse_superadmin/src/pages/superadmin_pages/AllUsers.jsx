import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaThList, FaThLarge, FaTh, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import globalBackendRoute from "../../config/Config";
import SearchBar from "../../components/common_components/SearchBar";
import stopwords from "../../components/common_components/stopwords";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/all-users`);
        setUsers(res.data);
        setTotalCount(res.data.length);
      } catch (error) {
        console.error("Error fetching users:", error.message);
        toast.error("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  const getImageUrl = (avatar, role) => {
    if (avatar) {
      const normalized = avatar.replace(/\\/g, "/").split("/").pop();
      return `${globalBackendRoute}/uploads/${role}/${normalized}`;
    }
    return "https://via.placeholder.com/150";
  };

  const handleImageError = (e) => {
    if (!e.target.dataset.fallback) {
      e.target.src = "https://via.placeholder.com/150";
      e.target.dataset.fallback = "true";
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirm) return;

    try {
      const res = await axios.delete(
        `${globalBackendRoute}/api/delete-user/${userId}`
      );
      if (res.status === 200) {
        setUsers((prev) => prev.filter((u) => u._id !== userId));
        toast.success("User deleted successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user.");
    }
  };

  const filteredUsers = searchQuery.trim()
    ? users.filter((user) => {
        const fullText =
          `${user.name} ${user.email} ${user.role}`.toLowerCase();
        const queryWords = searchQuery
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word && !stopwords.includes(word));
        return queryWords.some(
          (word) =>
            fullText.includes(word) || fullText.includes(word.replace(/s$/, ""))
        );
      })
    : users;

  return (
    <div className="fullWidth py-10">
      <div className="containerWidth">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="headingText">
            All Users{" "}
            <span className="text-sm text-gray-500 ml-2">
              Showing {filteredUsers.length} of {totalCount}
            </span>
          </h2>
          <div className="flex items-center flex-wrap gap-4">
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
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
            />
          </div>
        </div>

        {/* View Display */}
        <div className="mt-6">
          {filteredUsers.length === 0 ? (
            <p className="text-center text-gray-500">No users found.</p>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {filteredUsers.map((user) => (
                <Link
                  key={user._id}
                  to={`/single-user/${user._id}`}
                  className="relative flex flex-col items-start bg-white shadow rounded-lg overflow-hidden"
                >
                  <img
                    src={getImageUrl(user.avatar, user.role)}
                    alt={user.name}
                    onError={handleImageError}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteUser(user._id);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                  <div className="p-3">
                    <h3 className="subHeadingTextMobile">{user.name}</h3>
                    <p className="paragraphTextMobile">{user.email}</p>
                    <p className="paragraphTextMobile">{user.role}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : view === "card" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <Link
                  key={user._id}
                  to={`/single-user/${user._id}`}
                  className="bg-white rounded-lg shadow relative"
                >
                  <img
                    src={getImageUrl(user.avatar, user.role)}
                    alt={user.name}
                    onError={handleImageError}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteUser(user._id);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                  <div className="p-4">
                    <h3 className="subHeadingText">{user.name}</h3>
                    <p className="paragraphText">{user.email}</p>
                    <p className="paragraphText">{user.role}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <Link
                  key={user._id}
                  to={`/single-user/${user._id}`}
                  className="flex items-center space-x-4 bg-white rounded-lg shadow p-3 relative"
                >
                  <img
                    src={getImageUrl(user.avatar, user.role)}
                    alt={user.name}
                    onError={handleImageError}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteUser(user._id);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                  <div>
                    <h3 className="subHeadingTextMobile">{user.name}</h3>
                    <p className="paragraphTextMobile">{user.email}</p>
                    <p className="paragraphTextMobile">{user.role}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
