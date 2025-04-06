import React, { useState } from "react";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaClock,
  FaMapMarkerAlt,
  FaTruck,
  FaCheck,
  FaBoxOpen,
  FaUserCog,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import SearchBar from "../../components/common_components/SearchBar";
import LeftSidebarNav from "../../components/common_components/LeftSidebarNav";
import DashboardCard from "../../components/common_components/DashboardCard";
import DashboardLayout from "../../components/common_components/DashboardLayout";
import stopwords from "../../components/common_components/stopwords.jsx";

const DeliveryAgentDashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
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

  const dummyCards = [
    {
      title: "Pending Deliveries",
      value: 8,
      icon: <FaBoxOpen className="text-yellow-500 text-3xl" />,
      link: "/pending-deliveries",
      bgColor: "bg-yellow-100 border border-yellow-400",
    },
    {
      title: "Completed Deliveries",
      value: 22,
      icon: <FaCheck className="text-green-600 text-3xl" />,
      link: "/completed-deliveries",
      bgColor: "bg-green-100 border border-green-400",
    },
    {
      title: "Today’s Schedule",
      value: 5,
      icon: <FaClock className="text-indigo-600 text-3xl" />,
      link: "/today-schedule",
      bgColor: "bg-indigo-100 border border-indigo-300",
    },
    {
      title: "Assigned Areas",
      value: 3,
      icon: <FaMapMarkerAlt className="text-red-500 text-3xl" />,
      link: "/assigned-areas",
      bgColor: "bg-red-100 border border-red-400",
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
          <h1 className="headingText">Delivery Agent Dashboard</h1>
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
                  icon: <FaUserCog className="text-indigo-600" />,
                  path: `/profile/${userId}`,
                },
                {
                  label: "Today’s Schedule",
                  icon: <FaClock className="text-blue-500" />,
                  path: "/today-schedule",
                },
                {
                  label: "Pending Deliveries",
                  icon: <FaBoxOpen className="text-yellow-600" />,
                  path: "/pending-deliveries",
                },
                {
                  label: "Completed Deliveries",
                  icon: <FaCheck className="text-green-600" />,
                  path: "/completed-deliveries",
                },
                {
                  label: "Assigned Areas",
                  icon: <FaMapMarkerAlt className="text-red-500" />,
                  path: "/assigned-areas",
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
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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

export default DeliveryAgentDashboard;
