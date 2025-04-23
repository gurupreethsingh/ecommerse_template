import React, { useState } from "react";
import {
  FaTh,
  FaThLarge,
  FaThList,
  FaUserTie,
  FaClipboardList,
  FaUserPlus,
  FaUsers,
  FaCalendarCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import SearchBar from "../../components/common_components/SearchBar";
import LeftSidebarNav from "../../components/common_components/LeftSidebarNav";
import DashboardCard from "../../components/common_components/DashboardCard";
import DashboardLayout from "../../components/common_components/DashboardLayout";
import stopwords from "../../components/common_components/stopwords.jsx";

const HrDashboard = () => {
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
      title: "Total Employees",
      value: 48,
      icon: <FaUsers className="text-indigo-600 text-3xl" />,
      link: "/all-employees",
      bgColor: "bg-indigo-100 border border-indigo-300",
    },
    {
      title: "Open Positions",
      value: 6,
      icon: <FaClipboardList className="text-blue-600 text-3xl" />,
      link: "/job-openings",
      bgColor: "bg-blue-100 border border-blue-300",
    },
    {
      title: "Interviews Scheduled",
      value: 9,
      icon: <FaCalendarCheck className="text-green-600 text-3xl" />,
      link: "/interviews",
      bgColor: "bg-green-100 border border-green-300",
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="headingText">HR Dashboard</h1>
          <div className="flex items-center gap-3 flex-wrap">
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
                  label: "Account Settings",
                  icon: <FaCog className="text-indigo-600" />,
                  path: `/profile/${userId}`,
                },
                {
                  label: "Add Employee",
                  icon: <FaUserPlus className="text-orange-600" />,
                  path: "/add-employee",
                },

                {
                  label: "Manage Jobs",
                  icon: <FaClipboardList className="text-blue-600" />,
                  path: "/job-openings",
                },
                {
                  label: "Schedule Interviews",
                  icon: <FaCalendarCheck className="text-green-600" />,
                  path: "/interviews",
                },
              ]}
            />
          }
          right={
            <div
              className={`${
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
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

export default HrDashboard;
