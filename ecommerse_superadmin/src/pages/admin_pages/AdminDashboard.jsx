import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  FaUsers,
  FaUserCheck,
  FaCog,
  FaBoxOpen,
  FaStore,
  FaBuilding,
  FaPlus,
  FaThList,
  FaThLarge,
  FaTh,
  FaSearch,
  FaBoxes,
  FaLayerGroup,
} from "react-icons/fa";
import globalBackendRoute from "../../config/Config";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});
  const [entities, setEntities] = useState({});
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState(null);
  const [view, setView] = useState("grid");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/my-account");
      return;
    }
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

  const iconMap = {
    admin: <FaUserCheck className="text-indigo-600 text-3xl" />,
    user: <FaUsers className="text-green-600 text-3xl" />,
    vendor: <FaStore className="text-orange-600 text-3xl" />,
    outlet: <FaBuilding className="text-blue-500 text-3xl" />,
    category: <FaLayerGroup className="text-yellow-600 text-3xl" />,
    product: <FaBoxes className="text-green-600 text-3xl" />,
  };

  const bgColorLogic = (value) => {
    if (value < 5) return "bg-red-100 animate-pulse border border-red-400";
    if (value < 10) return "bg-yellow-100 border border-yellow-400";
    return "bg-gray-100";
  };

  const userRoleCards = Object.entries(counts).map(([key, value]) => {
    if (!value || value === 0) return null;
    const title = key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      title,
      value,
      link: `/all-${key}`,
      icon: iconMap[key] || <FaUsers className="text-gray-600 text-3xl" />,
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
      icon: iconMap[key] || <FaBoxes className="text-gray-600 text-3xl" />,
      bgColor: bgColorLogic(value),
    };
  });

  const allCards = [...userRoleCards, ...entityCards].filter(Boolean);

  const stopwords = [
    "show",
    "me",
    "all",
    "of",
    "the",
    "users",
    "with",
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
  ];

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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap mb-6 gap-4">
          <h1 className="headingText">Admin Dashboard</h1>
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
          <aside className="w-full md:w-1/4">
            <nav className="rounded-lg overflow-hidden border-gray-200">
              {[
                {
                  label: "Profile Settings",
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

export default AdminDashboard;
