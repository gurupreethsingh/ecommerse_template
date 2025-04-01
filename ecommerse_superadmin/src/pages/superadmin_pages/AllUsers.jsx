import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaThList, FaThLarge, FaTh, FaSearch, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import globalBackendRoute from "../../config/Config";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${globalBackendRoute}/api/all-users`);
        setUsers(response.data);
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

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${globalBackendRoute}/api/delete-user/${userId}`
      );
      if (response.status === 200) {
        toast.success("User deleted successfully.");
        setUsers(users.filter((user) => user._id !== userId));
      }
    } catch (error) {
      console.error("Delete Error:", error.message);
      toast.error("Error deleting user. Please try again.");
    }
  };

  const filteredUsers = users.filter((user) =>
    ["name", "email", "role"]
      .map((key) => user[key]?.toLowerCase() || "")
      .some((value) => value.includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fullWidth py-10">
      <div className="containerWidth">
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="headingText">All Users</h2>
          <div className="flex items-center space-x-4 flex-wrap">
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
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-10">
          {view === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {filteredUsers.map((user) => (
                <Link
                  key={user._id}
                  to={`/single-user/${user._id}`}
                  className="relative flex flex-col items-start"
                >
                  <img
                    src={getImageUrl(user.avatar, user.role)}
                    alt={user.name}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/150")
                    }
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
                  <h3 className="text-md font-semibold text-gray-900 mt-2">
                    {user.name || "No Name"}
                  </h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </Link>
              ))}
            </div>
          )}

          {view === "card" && (
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
                    className="w-full h-96 object-cover rounded-t-lg"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/150")
                    }
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
                    <h3 className="text-lg font-semibold text-gray-900">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-600">{user.role}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {view === "list" && (
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
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/150")
                    }
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
                    <h3 className="text-lg font-semibold text-gray-900">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-600">{user.role}</p>
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
