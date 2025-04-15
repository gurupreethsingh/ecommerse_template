import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaCog,
  FaPlus,
  FaBoxOpen,
  FaStore,
  FaBuilding,
  FaUserPlus,
} from "react-icons/fa";

import globalBackendRoute from "../../config/Config";
import SearchBar from "../../components/common_components/SearchBar";
import LeftSidebarNav from "../../components/common_components/LeftSidebarNav";
import DashboardCard from "../../components/common_components/DashboardCard";
import DashboardLayout from "../../components/common_components/DashboardLayout";
import iconMap from "../../components/common_components/iconMap.jsx";
import bgColorLogic from "../../components/common_components/bgColorLogic.jsx";
import stopwords from "../../components/common_components/stopwords.jsx";

const SuperadminDashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});
  const [entities, setEntities] = useState({});
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState(null);
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(8);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    } catch (error) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [roleRes, entityRes] = await Promise.all([
          axios.get(`${globalBackendRoute}/api/getUserCountsByRole`),
          axios.get(`${globalBackendRoute}/api/get-entity-counts`),
        ]);
        setCounts(roleRes.data);
        setEntities(entityRes.data);
      } catch (err) {
        console.error("Failed to fetch counts", err);
      }
    };
    fetchCounts();
  }, []);

  useEffect(() => {
    const calculateCardsPerPage = () => {
      const availableHeight = window.innerHeight - 300;
      const cardHeight = 220;
      const columns =
        window.innerWidth < 640
          ? 4
          : window.innerWidth < 768
          ? 5
          : window.innerWidth < 1024
          ? 6
          : 8;
      const rows = Math.floor(availableHeight / cardHeight);
      return rows * columns;
    };

    const updateLimit = () => {
      setCardsPerPage(calculateCardsPerPage());
      setCurrentPage(1);
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  const userRoleCards = Object.entries(counts).map(([key, value]) => {
    if (!value || value === 0) return null;
    const title =
      key === "totalUsers"
        ? "Total Users"
        : key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      title,
      value,
      link: key === "totalUsers" ? "/all-users" : `/all-${key}`,
      icon: iconMap[key],
      bgColor: bgColorLogic(value),
    };
  });

  const entityCards = Object.entries(entities).map(([key, value]) => {
    if (!value || value === 0) return null;
    const title = key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const pathMap = {
      category: "/all-categories",
      product: "/all-added-products",
      vendor: "/all-vendors",
      outlet: "/all-outlets",
    };
    return {
      title,
      value,
      link: pathMap[key] || "/",
      icon: iconMap[key],
      bgColor: bgColorLogic(value),
    };
  });

  const allCards = [...userRoleCards, ...entityCards].filter(Boolean);

  const filteredCards =
    search.trim() === ""
      ? allCards
      : allCards.filter((card) => {
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

  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  return (
    <div className="fullWidth py-6">
      <div className="containerWidth">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap mb-6 gap-4">
          <div>
            <h1 className="headingText">Superadmin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Showing {paginatedCards.length} of {filteredCards.length} cards
            </p>
          </div>
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
                  label: "Add Category",
                  icon: <FaPlus className="text-orange-500" />,
                  path: "/add-category",
                },
                {
                  label: "Add Product",
                  icon: <FaBoxOpen className="text-green-600" />,
                  path: "/add-product",
                },
                {
                  label: "Add Vendor",
                  icon: <FaStore className="text-purple-600" />,
                  path: "/add-vendor",
                },
                {
                  label: "Add Outlet",
                  icon: <FaBuilding className="text-orange-500" />,
                  path: "/add-outlet",
                },
                {
                  label: "Add Employee",
                  icon: <FaUserPlus className="text-teal-600" />,
                  path: "/add-employee",
                },
                {
                  label: "Add Blog",
                  icon: <FaUserPlus className="text-indigo-800" />,
                  path: "/add-blog",
                },
              ]}
            />
          }
          right={
            <div>
              <div
                className={`${
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                    : view === "card"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }`}
              >
                {paginatedCards.map((card, index) => (
                  <DashboardCard
                    key={index}
                    card={card}
                    view={view}
                    onClick={() => navigate(card.link)}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-4 flex-wrap">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-gray-700 font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default SuperadminDashboard;
