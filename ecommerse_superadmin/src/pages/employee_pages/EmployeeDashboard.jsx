import React, { useState } from "react";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaTasks,
  FaUserCog,
  FaCalendarAlt,
  FaClock,
  FaFileAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import SearchBar from "../../components/common_components/SearchBar";
import LeftSidebarNav from "../../components/common_components/LeftSidebarNav";
import DashboardCard from "../../components/common_components/DashboardCard";
import DashboardLayout from "../../components/common_components/DashboardLayout";
import stopwords from "../../components/common_components/stopwords.jsx";

const EmployeeDashboard = () => {
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
      title: "Assigned Tasks",
      value: 12,
      icon: <FaTasks className="text-blue-600 text-3xl" />,
      link: "/assigned-tasks",
      bgColor: "bg-blue-100 border border-blue-400",
    },
    {
      title: "Completed Tasks",
      value: 35,
      icon: <FaFileAlt className="text-green-600 text-3xl" />,
      link: "/completed-tasks",
      bgColor: "bg-green-100 border border-green-400",
    },
    {
      title: "Upcoming Meetings",
      value: 4,
      icon: <FaCalendarAlt className="text-indigo-600 text-3xl" />,
      link: "/meetings",
      bgColor: "bg-indigo-100 border border-indigo-400",
    },
    {
      title: "Working Hours",
      value: "7h 30m",
      icon: <FaClock className="text-orange-600 text-3xl" />,
      link: "/working-hours",
      bgColor: "bg-orange-100 border border-orange-400",
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
          <h1 className="headingText">Employee Dashboard</h1>
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
                  label: "Assigned Tasks",
                  icon: <FaTasks className="text-blue-600" />,
                  path: "/assigned-tasks",
                },
                {
                  label: "Completed Tasks",
                  icon: <FaFileAlt className="text-green-600" />,
                  path: "/completed-tasks",
                },
                {
                  label: "Meeting Schedule",
                  icon: <FaCalendarAlt className="text-indigo-500" />,
                  path: "/meetings",
                },
                {
                  label: "Work Hours",
                  icon: <FaClock className="text-orange-500" />,
                  path: "/working-hours",
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

export default EmployeeDashboard;
