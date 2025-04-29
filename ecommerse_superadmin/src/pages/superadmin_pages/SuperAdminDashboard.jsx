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

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [roleRes, entityRes, productRes, categoryRes, subcategoryRes] = await Promise.all([
          axios.get(`${globalBackendRoute}/api/getUserCountsByRole`),
          axios.get(`${globalBackendRoute}/api/get-entity-counts`),
          axios.get(`${globalBackendRoute}/api/count-all-products`),
          axios.get(`${globalBackendRoute}/api/category-count`),
          axios.get(`${globalBackendRoute}/api/count-all-subcategories`),
        ]);
        setCounts({
          ...roleRes.data,
          products: productRes.data.count,
          categories: categoryRes.data.count,
          subcategories: subcategoryRes.data.count,
        });
        setEntities(entityRes.data);
      } catch (err) {
        console.error("Failed to fetch counts", err);
      }
    };
    fetchCounts();
  }, []);

  const userRoleCards = Object.entries(counts).map(([key, value]) => {
    if (!value || value === 0) return null;

    const title =
      key === "totalUsers"
        ? "Total Users"
        : key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

        const pathMap = {
          totalUsers: "/all-users",
          products: "/all-added-products",
          categories: "/all-categories",
          subcategories: "/all-subcategories",
        };


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

  return (
    <div className="fullWidth py-6">
      <div className="containerWidth">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap mb-6 gap-4">
          <h1 className="headingText">Superadmin Dashboard</h1>
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
                  label: "Account Settings",
                  icon: <FaCog className="text-indigo-600" />,
                  path: `/profile/${userId}`,
                },
                {
                  label: "Add Category",
                  icon: <FaPlus className="text-orange-400" />,
                  path: "/add-category",
                },
                {
                  label: "Add Sub Category",
                  icon: <FaPlus className="text-orange-600" />,
                  path: "/add-sub-category",
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

export default SuperadminDashboard;
