// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import {
//   FaUsers,
//   FaUserShield,
//   FaUserPlus,
//   FaUserCheck,
//   FaCog,
//   FaBoxOpen,
//   FaStore,
//   FaBuilding,
//   FaPlus,
//   FaThList,
//   FaThLarge,
//   FaTh,
//   FaSearch,
// } from "react-icons/fa";
// import globalBackendRoute from "../../config/Config";

// const SuperadminDashboard = () => {
//   const navigate = useNavigate();
//   const [counts, setCounts] = useState({
//     totalUsers: 0,
//     admins: 0,
//     superadmins: 0,
//     customers: 0,
//   });
//   const [search, setSearch] = useState("");
//   const [userId, setUserId] = useState(null);
//   const [view, setView] = useState("grid");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/my-account");
//       return;
//     }
//     try {
//       const decoded = jwtDecode(token);
//       setUserId(decoded.id);
//     } catch (error) {
//       navigate("/my-account");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const res = await axios.get(`${globalBackendRoute}/api/getUserCounts`);
//         setCounts(res.data);
//       } catch (err) {
//         console.error("Failed to fetch counts", err);
//       }
//     };
//     fetchCounts();
//   }, []);

//   // dynamically adding cards. using this useEffect() funciton. 
//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const res = await axios.get(`${globalBackendRoute}/api/getUserCountsByRole`);
//         setCounts(res.data);
//       } catch (err) {
//         console.error("Failed to fetch counts", err);
//       }
//     };
//     fetchCounts();
//   }, []);

//   const cards = [
//     {
//       title: "Total Users",
//       value: counts.totalUsers,
//       link: "/all-users",
//       icon: <FaUsers className="text-blue-600 text-3xl" />,
//       bgColor: "bg-blue-50",
//     },
//     {
//       title: "Admins",
//       value: counts.admins,
//       link: "/all-admins",
//       icon: <FaUserCheck className="text-indigo-600 text-3xl" />,
//       bgColor: "bg-indigo-50",
//     },
//     {
//       title: "Super Admins",
//       value: counts.superadmins,
//       link: "/all-superadmins",
//       icon: <FaUserShield className="text-red-500 text-3xl" />,
//       bgColor: "bg-red-50",
//     },
//     {
//       title: "Customers",
//       value: counts.customers,
//       link: "/all-customers",
//       icon: <FaUserPlus className="text-green-600 text-3xl" />,
//       bgColor: "bg-green-50",
//     },
//   ];

//   const filteredCards = cards.filter((card) =>
//     card.title.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="fullWidth py-6">
//       <div className="containerWidth">
//         <div className="flex justify-between items-center flex-wrap mb-4">
//           <h1 className="headingText">Superadmin Dashboard</h1>
//           <div className="flex items-center space-x-4 flex-wrap">
//             <FaThList
//               className={`text-xl cursor-pointer ${
//                 view === "list" ? "text-indigo-600" : "text-gray-600"
//               }`}
//               onClick={() => setView("list")}
//             />
//             <FaThLarge
//               className={`text-xl cursor-pointer ${
//                 view === "card" ? "text-indigo-600" : "text-gray-600"
//               }`}
//               onClick={() => setView("card")}
//             />
//             <FaTh
//               className={`text-xl cursor-pointer ${
//                 view === "grid" ? "text-indigo-600" : "text-gray-600"
//               }`}
//               onClick={() => setView("grid")}
//             />
//             <div className="relative">
//               <FaSearch className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="text"
//                 className="pl-10 pr-4 py-2 border rounded-md focus:outline-none"
//                 placeholder="Search cards..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Left Navigation */}
//           <div className="w-full md:w-1/4 p-0">
//             <ul className="space-y-4">
//               <li>
//                 <button
//                   className="flex items-center gap-3 text-gray-800 hover:text-indigo-600"
//                   onClick={() => navigate("/profile/" + userId)}
//                 >
//                   <FaCog className="text-gray-600" /> Account Settings
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className="flex items-center gap-3 text-gray-800 hover:text-blue-600"
//                   onClick={() => navigate("/add-category")}
//                 >
//                   <FaPlus className="text-blue-500" /> Add Category
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className="flex items-center gap-3 text-gray-800 hover:text-green-600"
//                   onClick={() => navigate("/add-product")}
//                 >
//                   <FaBoxOpen className="text-green-500" /> Add Product
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className="flex items-center gap-3 text-gray-800 hover:text-purple-600"
//                   onClick={() => navigate("/add-vendor")}
//                 >
//                   <FaStore className="text-purple-500" /> Add Vendor
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className="flex items-center gap-3 text-gray-800 hover:text-orange-600"
//                   onClick={() => navigate("/add-outlet")}
//                 >
//                   <FaBuilding className="text-orange-500" /> Add Outlet
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className="flex items-center gap-3 text-gray-800 hover:text-teal-600"
//                   onClick={() => navigate("/add-employee")}
//                 >
//                   <FaUserPlus className="text-teal-500" /> Add Employee
//                 </button>
//               </li>
//             </ul>
//           </div>

//           {/* Right Content */}
//           <div className="w-full md:w-3/4">
//             {view === "grid" && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {filteredCards.map((card, index) => (
//                   <div
//                     key={index}
//                     onClick={() => navigate(card.link)}
//                     className={`p-4 rounded shadow hover:shadow-md transition cursor-pointer ${card.bgColor}`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="subHeadingText mb-1">{card.title}</p>
//                         <p className="text-2xl font-bold text-gray-800">
//                           {card.value}
//                         </p>
//                       </div>
//                       <div>{card.icon}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {view === "card" && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredCards.map((card, index) => (
//                   <div
//                     key={index}
//                     onClick={() => navigate(card.link)}
//                     className={`p-6 rounded shadow hover:shadow-lg transition cursor-pointer ${card.bgColor}`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="subHeadingText mb-2">{card.title}</p>
//                         <p className="text-3xl font-bold text-gray-800">
//                           {card.value}
//                         </p>
//                       </div>
//                       <div>{card.icon}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {view === "list" && (
//               <div className="space-y-4">
//                 {filteredCards.map((card, index) => (
//                   <div
//                     key={index}
//                     onClick={() => navigate(card.link)}
//                     className={`flex items-center justify-between p-4 rounded shadow hover:shadow-md transition cursor-pointer ${card.bgColor}`}
//                   >
//                     <div className="flex items-center gap-4">
//                       {card.icon}
//                       <div>
//                         <p className="subHeadingText mb-1">{card.title}</p>
//                         <p className="text-xl font-bold text-gray-800">
//                           {card.value}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuperadminDashboard;

//


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  FaUsers,
  FaUserShield,
  FaUserPlus,
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
} from "react-icons/fa";
import globalBackendRoute from "../../config/Config";

const SuperadminDashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});
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
        const res = await axios.get(`${globalBackendRoute}/api/getUserCountsByRole`);
        setCounts(res.data);
      } catch (err) {
        console.error("Failed to fetch counts", err);
      }
    };
    fetchCounts();
  }, []);

  const iconMap = {
    admin: <FaUserCheck className="text-indigo-600 text-3xl" />,
    superadmin: <FaUserShield className="text-red-500 text-3xl" />,
    user: <FaUserPlus className="text-green-600 text-3xl" />,
    developer: <FaCog className="text-purple-600 text-3xl" />,
    vendor: <FaStore className="text-orange-600 text-3xl" />,
    outlet: <FaBuilding className="text-blue-500 text-3xl" />,
    delivery_person: <FaBoxOpen className="text-teal-500 text-3xl" />,
    totalUsers: <FaUsers className="text-blue-600 text-3xl" />,
  };

  const bgMap = {
    admin: "bg-indigo-50",
    superadmin: "bg-red-50",
    user: "bg-green-50",
    developer: "bg-purple-50",
    vendor: "bg-orange-50",
    outlet: "bg-blue-50",
    delivery_person: "bg-teal-50",
    totalUsers: "bg-blue-50",
  };

  const cards = Object.keys(counts).map((role) => {
    const title =
      role === "totalUsers"
        ? "Total Users"
        : role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    return {
      title,
      value: counts[role],
      link: role === "totalUsers" ? "/all-users" : `/all-${role}`,
      icon: iconMap[role] || <FaUsers className="text-gray-600 text-3xl" />,
      bgColor: bgMap[role] || "bg-gray-100",
    };
  });

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fullWidth py-6">
      <div className="containerWidth">
        <div className="flex justify-between items-center flex-wrap mb-4">
          <h1 className="headingText">Superadmin Dashboard</h1>
          <div className="flex items-center space-x-4 flex-wrap">
            <FaThList
              className={`text-xl cursor-pointer ${view === "list" ? "text-indigo-600" : "text-gray-600"}`}
              onClick={() => setView("list")}
            />
            <FaThLarge
              className={`text-xl cursor-pointer ${view === "card" ? "text-indigo-600" : "text-gray-600"}`}
              onClick={() => setView("card")}
            />
            <FaTh
              className={`text-xl cursor-pointer ${view === "grid" ? "text-indigo-600" : "text-gray-600"}`}
              onClick={() => setView("grid")}
            />
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none"
                placeholder="Search cards..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Navigation */}
          <div className="w-full md:w-1/4 p-0">
            <ul className="space-y-4">
              <li>
                <button
                  className="flex items-center gap-3 text-gray-800 hover:text-indigo-600"
                  onClick={() => navigate("/profile/" + userId)}
                >
                  <FaCog className="text-gray-600" /> Account Settings
                </button>
              </li>
              <li>
                <button className="flex items-center gap-3 text-gray-800 hover:text-blue-600" onClick={() => navigate("/add-category")}>
                  <FaPlus className="text-blue-500" /> Add Category
                </button>
              </li>
              <li>
                <button className="flex items-center gap-3 text-gray-800 hover:text-green-600" onClick={() => navigate("/add-product")}>
                  <FaBoxOpen className="text-green-500" /> Add Product
                </button>
              </li>
              <li>
                <button className="flex items-center gap-3 text-gray-800 hover:text-purple-600" onClick={() => navigate("/add-vendor")}>
                  <FaStore className="text-purple-500" /> Add Vendor
                </button>
              </li>
              <li>
                <button className="flex items-center gap-3 text-gray-800 hover:text-orange-600" onClick={() => navigate("/add-outlet")}>
                  <FaBuilding className="text-orange-500" /> Add Outlet
                </button>
              </li>
              <li>
                <button className="flex items-center gap-3 text-gray-800 hover:text-teal-600" onClick={() => navigate("/add-employee")}>
                  <FaUserPlus className="text-teal-500" /> Add Employee
                </button>
              </li>
            </ul>
          </div>

          {/* Right Content */}
          <div className="w-full md:w-3/4">
            {view === "grid" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCards.map((card, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(card.link)}
                    className={`p-4 rounded shadow hover:shadow-md transition cursor-pointer ${card.bgColor}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="subHeadingText mb-1">{card.title}</p>
                        <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                      </div>
                      <div>{card.icon}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {view === "card" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCards.map((card, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(card.link)}
                    className={`p-6 rounded shadow hover:shadow-lg transition cursor-pointer ${card.bgColor}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="subHeadingText mb-2">{card.title}</p>
                        <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                      </div>
                      <div>{card.icon}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {view === "list" && (
              <div className="space-y-4">
                {filteredCards.map((card, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(card.link)}
                    className={`flex items-center justify-between p-4 rounded shadow hover:shadow-md transition cursor-pointer ${card.bgColor}`}
                  >
                    <div className="flex items-center gap-4">
                      {card.icon}
                      <div>
                        <p className="subHeadingText mb-1">{card.title}</p>
                        <p className="text-xl font-bold text-gray-800">{card.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperadminDashboard;