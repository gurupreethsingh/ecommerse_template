import React, { useState } from "react";
import {
  FaTh,
  FaThLarge,
  FaThList,
  FaSearch,
  FaBox,
  FaStore,
  FaPlus,
  FaShoppingCart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../components/common_components/PageHeading";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");

  const dummyCards = [
    {
      title: "Total Products",
      value: 34,
      icon: <FaBox className="text-indigo-600 text-3xl" />,
      link: "/all-added-products",
      bgColor: "bg-indigo-100 border border-indigo-300",
    },
    {
      title: "Orders Received",
      value: 19,
      icon: <FaShoppingCart className="text-green-600 text-3xl" />,
      link: "/vendor-orders",
      bgColor: "bg-green-100 border border-green-300",
    },
    {
      title: "Vendor Profile",
      value: 1,
      icon: <FaStore className="text-orange-600 text-3xl" />,
      link: "/profile",
      bgColor: "bg-orange-100 border border-orange-300",
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

  const filteredCards = search.trim()
    ? dummyCards.filter((card) => {
        const text = `${card.title} ${card.value}`.toLowerCase();
        const queryWords = search
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => !stopwords.includes(word));
        return queryWords.some(
          (word) => text.includes(word) || text.includes(word.replace(/s$/, ""))
        );
      })
    : dummyCards;

  return (
    <div className="fullWidth py-6">
      <div className="containerWidth">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="headingText">Vendor Dashboard</h1>
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
                  label: "Add Product",
                  icon: <FaPlus className="text-green-600" />,
                  path: "/add-product",
                },
                {
                  label: "View Orders",
                  icon: <FaShoppingCart className="text-teal-600" />,
                  path: "/vendor-orders",
                },
                {
                  label: "Manage Profile",
                  icon: <FaStore className="text-orange-500" />,
                  path: "/profile",
                },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold shadow-sm text-gray-700 hover:bg-green-50 hover:shadow rounded border-b"
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main */}
          <main className="w-full md:w-3/4">
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
                <div
                  key={index}
                  onClick={() => navigate(card.link)}
                  className={`cursor-pointer rounded transition hover:shadow-md ${
                    card.bgColor
                  } ${
                    view === "list"
                      ? "p-4 flex items-center justify-between"
                      : view === "card"
                      ? "p-6 text-center flex flex-col items-center shadow"
                      : "p-4"
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

export default VendorDashboard;
