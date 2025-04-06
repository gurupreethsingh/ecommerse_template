import React, { useState } from "react";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaSearch,
  FaTasks,
  FaUserTie,
  FaUserCog,
  FaCalendarAlt,
  FaClock,
  FaFileAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../components/common_components/PageHeading";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");

  // Dummy cards for employee dashboard
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

  const stopwords = [
    "show",
    "me",
    "all",
    "of",
    "the",
    "please",
    "find",
    "list",
    "give",
    "i",
    "want",
    "to",
    "see",
    "display",
    "get",
    "need",
    "for",
    "on",
    "in",
    "at",
    "a",
    "an",
    "this",
    "that",
    "those",
    "these",
    "my",
    "your",
    "their",
    "our",
    "from",
    "and",
    "or",
    "by",
    "can",
    "you",
    "let",
    "us",
    "would",
    "should",
    "could",
    "will",
    "just",
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
          <h1 className="headingText">Dashboard Overview</h1>
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
            <div className="relative w-full sm:w-64">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                className="formInput pl-10"
                placeholder="Search cards..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4">
            <nav className="rounded-lg overflow-hidden border-gray-200">
              {[
                {
                  label: "My Profile",
                  icon: <FaUserCog className="text-indigo-600" />,
                  path: "/profile",
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
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold shadow-sm text-gray-700 hover:shadow-lg hover:bg-green-50 rounded border-b"
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Cards */}
          <main className="w-full md:w-3/4">
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
                <div
                  key={index}
                  onClick={() => navigate(card.link)}
                  className={`rounded cursor-pointer transition duration-200 hover:shadow-md ${
                    card.bgColor
                  } ${
                    view === "card"
                      ? "p-6 flex flex-col items-center justify-between text-center shadow"
                      : view === "grid"
                      ? "p-4"
                      : "p-4 flex items-center justify-between"
                  }`}
                >
                  <div
                    className={
                      view === "list"
                        ? "flex items-center gap-4"
                        : "flex items-center justify-between w-full"
                    }
                  >
                    <div>
                      <p className="subHeadingText mb-1">{card.title}</p>
                      <p className="text-xl font-bold text-gray-800">
                        {card.value}
                      </p>
                    </div>
                    <div>{card.icon}</div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
