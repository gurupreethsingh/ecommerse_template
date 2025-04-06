import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  FaTh,
  FaThLarge,
  FaThList,
  FaBoxOpen,
  FaHeart,
  FaClipboardList,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";

import SearchBar from "../../components/common_components/SearchBar";
import LeftSidebarNav from "../../components/common_components/LeftSidebarNav";
import DashboardCard from "../../components/common_components/DashboardCard";
import DashboardLayout from "../../components/common_components/DashboardLayout";
import stopwords from "../../components/common_components/stopwords.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/my-account");
    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    } catch (error) {
      navigate("/my-account");
    }
  }, [navigate]);

  if (!user) return null;

  const dummyCards = [
    {
      title: "My Orders",
      value: 14,
      icon: <FaClipboardList className="text-indigo-600 text-3xl" />,
      link: "/my-orders",
      bgColor: "bg-indigo-100 border border-indigo-300",
    },
    {
      title: "Wishlist",
      value: 5,
      icon: <FaHeart className="text-red-500 text-3xl" />,
      link: "/wishlist",
      bgColor: "bg-red-100 border border-red-400",
    },
    {
      title: "Cart Items",
      value: 3,
      icon: <FaShoppingCart className="text-green-600 text-3xl" />,
      link: "/cart",
      bgColor: "bg-green-100 border border-green-400",
    },
    {
      title: "My Products",
      value: 2,
      icon: <FaBoxOpen className="text-blue-500 text-3xl" />,
      link: "/my-products",
      bgColor: "bg-blue-100 border border-blue-400",
    },
  ];

  const filteredCards =
    search.trim() === ""
      ? dummyCards
      : dummyCards.filter((card) => {
          const text = `${card.title} ${card.value}`.toLowerCase();
          const queryWords = search
            .toLowerCase()
            .split(/\s+/)
            .filter((word) => !stopwords.includes(word));
          return queryWords.some(
            (word) =>
              text.includes(word) || text.includes(word.replace(/s$/, ""))
          );
        });

  return (
    <div className="fullWidth py-6">
      <div className="containerWidth">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap mb-6 gap-4">
          <h1 className="headingText">Welcome, {user?.name || "User"}</h1>
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cards..."
            />
          </div>
        </div>

        {/* Layout */}
        <DashboardLayout
          left={
            <LeftSidebarNav
              navigate={navigate}
              items={[
                {
                  label: "My Profile",
                  icon: <FaUser className="text-indigo-600" />,
                  path: `/profile/${userId}`,
                },
                {
                  label: "Orders",
                  icon: <FaClipboardList className="text-blue-600" />,
                  path: "/my-orders",
                },
                {
                  label: "Wishlist",
                  icon: <FaHeart className="text-red-600" />,
                  path: "/wishlist",
                },
                {
                  label: "Cart",
                  icon: <FaShoppingCart className="text-green-600" />,
                  path: "/cart",
                },
              ]}
            />
          }
          right={
            <div
              className={`${
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                  : view === "card"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                  : "space-y-4"
              }`}
            >
              {filteredCards.map((card, index) => (
                <DashboardCard
                  key={index}
                  card={card}
                  view={view}
                  onClick={() => navigate(card.link)}
                />
              ))}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Dashboard;
