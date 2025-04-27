// // "use client";

// // import { useContext, useMemo, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Dialog, DialogPanel } from "@headlessui/react";
// // import {
// //   Bars3Icon,
// //   XMarkIcon,
// //   ChevronDownIcon,
// //   MagnifyingGlassIcon,
// // } from "@heroicons/react/24/outline";
// // import { AuthContext } from "../../components/auth_components/AuthManager";
// // import CustomeLink from "../common_components/CustomeLink";

// // export default function Header() {
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const [isDropdownOpen, setDropdownOpen] = useState(false);
// //   const [searchInput, setSearchInput] = useState("");
// //   const { user, isLoggedIn, logout } = useContext(AuthContext);
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     setDropdownOpen(false);
// //     logout();
// //     navigate("/home");
// //   };

// //   const goToProfile = () => {
// //     navigate(`/profile/${user.id}`);
// //     setDropdownOpen(false);
// //   };

// //   const toggleDropdown = () => {
// //     setDropdownOpen(!isDropdownOpen);
// //   };

// //   const dashboardRoute = useMemo(() => {
// //     if (!user?.role) return "/dashboard";
// //     const roleRoutes = { user: "/dashboard" };
// //     return roleRoutes[user.role] || "/dashboard";
// //   }, [user?.role]);

// //   const handleDashboardClick = () => {
// //     if (isLoggedIn) {
// //       navigate(dashboardRoute);
// //     } else {
// //       navigate("/login");
// //     }
// //   };

// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     if (searchInput.trim() !== "") {
// //       navigate(
// //         `/search-products?query=${encodeURIComponent(searchInput.trim())}`
// //       );
// //       setSearchInput("");
// //     }
// //   };

// //   return (
// //     <header>
// //       <nav className="bg-white" aria-label="Global">
// //         <div className="containerWidth flex items-center justify-between py-2">
// //           {/* Logo */}
// //           <div className="flex lg:flex-1">
// //             <div className="mr-2">
// //               <CustomeLink linkAddress="/home" linkName="ECOMMERSE" />
// //             </div>

// //             <div className="mr-2">
// //               <CustomeLink linkAddress="/shop" linkName="Shop All" />
// //             </div>
// //           </div>

// //           {/* Desktop Search */}
// //           <div className="hidden lg:flex flex-1 justify-center">
// //             <form onSubmit={handleSearch} className="flex w-full max-w-2xl">
// //               <div className="flex items-center w-full rounded-full border border-gray-300 px-4 py-2">
// //                 <input
// //                   type="text"
// //                   placeholder="Search for products..."
// //                   className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400"
// //                   value={searchInput}
// //                   onChange={(e) => setSearchInput(e.target.value)}
// //                 />
// //                 <button
// //                   type="submit"
// //                   className="flex items-center justify-center"
// //                 >
// //                   <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
// //                 </button>
// //               </div>
// //             </form>
// //           </div>

// //           {/* Right - Profile/Login */}
// //           <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
// //             {isLoggedIn && user ? (
// //               <div className="relative">
// //                 <button
// //                   onClick={toggleDropdown}
// //                   className="flex items-center gap-2 font-medium linkText"
// //                 >
// //                   {user.name}
// //                   <ChevronDownIcon className="w-5 h-5 text-gray-400" />
// //                 </button>
// //                 {isDropdownOpen && (
// //                   <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10 text-gray-800">
// //                     <button
// //                       onClick={goToProfile}
// //                       className="block w-full text-left px-4 py-2 smallText hover:bg-gray-100"
// //                     >
// //                       Profile
// //                     </button>
// //                     <button
// //                       onClick={handleLogout}
// //                       className="block w-full text-left px-4 py-2 smallText text-red-600 hover:bg-gray-100"
// //                     >
// //                       Logout
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             ) : (
// //               <CustomeLink linkAddress="/login" linkName="Login" />
// //             )}
// //           </div>

// //           {/* Mobile menu toggle */}
// //           <div className="flex lg:hidden">
// //             <button
// //               type="button"
// //               onClick={() => setMobileMenuOpen(true)}
// //               className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
// //             >
// //               <Bars3Icon className="h-6 w-6 text-black" />
// //             </button>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Mobile Menu */}
// //       <Dialog
// //         as="div"
// //         className="lg:hidden"
// //         open={mobileMenuOpen}
// //         onClose={setMobileMenuOpen}
// //       >
// //         <div className="fixed inset-0 z-10" />
// //         <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full max-w-sm bg-gray-100 linkText px-6 py-6 overflow-y-auto">
// //           <div className="flex items-center justify-between">
// //             <CustomeLink linkAddress="/home" linkName="LOGO" />
// //             <button
// //               type="button"
// //               onClick={() => setMobileMenuOpen(false)}
// //               className="-m-2.5 rounded-md p-2.5"
// //             >
// //               <XMarkIcon className="h-6 w-6" />
// //             </button>
// //           </div>

// //           {/* Mobile Search */}
// //           <div className="mt-6">
// //             <form onSubmit={handleSearch} className="flex">
// //               <div className="flex items-center w-full rounded-full border border-gray-300 px-4 py-2">
// //                 <input
// //                   type="text"
// //                   placeholder="Search for products..."
// //                   className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400"
// //                   value={searchInput}
// //                   onChange={(e) => setSearchInput(e.target.value)}
// //                 />
// //                 <button
// //                   type="submit"
// //                   className="flex items-center justify-center"
// //                 >
// //                   <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
// //                 </button>
// //               </div>
// //             </form>
// //           </div>

// //           {/* Mobile Profile/Login */}
// //           <div className="mt-6 flow-root">
// //             <div className="-my-6 divide-y divide-gray-700">
// //               <div className="py-6">
// //                 {isLoggedIn && user ? (
// //                   <div className="space-y-2">
// //                     <button
// //                       onClick={() => {
// //                         goToProfile();
// //                         setMobileMenuOpen(false);
// //                       }}
// //                       className="block w-full text-left px-3 py-2 text-base font-semibold hover:bg-gray-800 hover:text-gray-50 paragraphTextMobile"
// //                     >
// //                       Profile
// //                     </button>
// //                     <button
// //                       onClick={() => {
// //                         setDropdownOpen(false);
// //                         handleLogout();
// //                         setMobileMenuOpen(false);
// //                       }}
// //                       className="block w-full text-left px-3 py-2 text-base font-semibold text-red-400 hover:bg-gray-700 paragraphTextMobile"
// //                     >
// //                       Logout
// //                     </button>
// //                   </div>
// //                 ) : (
// //                   <CustomeLink linkAddress="/login" linkName="Login" />
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </DialogPanel>
// //       </Dialog>
// //     </header>
// //   );
// // }

// //

// "use client";

// import { useContext, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Dialog, DialogPanel } from "@headlessui/react";
// import {
//   Bars3Icon,
//   XMarkIcon,
//   ChevronDownIcon,
//   MagnifyingGlassIcon,
// } from "@heroicons/react/24/outline";
// import { AuthContext } from "../../components/auth_components/AuthManager";
// import CustomeLink from "../common_components/CustomeLink";

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const [searchInput, setSearchInput] = useState("");
//   const { user, isLoggedIn, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setDropdownOpen(false);
//     logout();
//     navigate("/home");
//   };

//   const goToProfile = () => {
//     navigate(`/profile/${user.id}`);
//     setDropdownOpen(false);
//   };

//   const dashboardRoute = useMemo(() => {
//     if (!user?.role) return "/dashboard";
//     const roleRoutes = { user: "/dashboard" };
//     return roleRoutes[user.role] || "/dashboard";
//   }, [user?.role]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchInput.trim() !== "") {
//       navigate(
//         `/search-products?query=${encodeURIComponent(searchInput.trim())}`
//       );
//       setSearchInput("");
//     }
//   };

//   return (
//     <header className="shadow-md sticky top-0 z-50 bg-white/90 backdrop-blur-md">
//       <nav className="containerWidth flex items-center justify-between py-3">
//         {/* Left - Logo & Shop */}
//         <div className="flex items-center gap-6">
//           <CustomeLink
//             linkAddress="/home"
//             linkName="ECOMMERSE"
//             customStyles="text-xl font-extrabold text-gray-900"
//           />
//           <CustomeLink
//             linkAddress="/shop"
//             linkName="Shop All"
//             customStyles="hidden md:inline-block text-sm font-medium text-gray-600 hover:text-black transition"
//           />
//         </div>

//         {/* Center - Search Bar */}
//         <div className="hidden lg:flex flex-1 justify-center">
//           <form
//             onSubmit={handleSearch}
//             className="flex w-full max-w-2xl rounded-full overflow-hidden border border-gray-300 bg-white"
//           >
//             <input
//               type="text"
//               placeholder="Search for products..."
//               className="flex-grow px-5 py-2 outline-none text-gray-700 placeholder-gray-400"
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//             />
//             <button
//               type="submit"
//               className="px-4 bg-gradient-to-r from-red-500 to-orange-400 text-white flex items-center justify-center hover:opacity-90 transition"
//             >
//               <MagnifyingGlassIcon className="w-5 h-5" />
//             </button>
//           </form>
//         </div>

//         {/* Right - Profile / Login */}
//         <div className="hidden lg:flex items-center gap-6">
//           {isLoggedIn && user ? (
//             <div className="relative">
//               <button
//                 onClick={() => setDropdownOpen(!isDropdownOpen)}
//                 className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition"
//               >
//                 {user.name}
//                 <ChevronDownIcon className="w-4 h-4" />
//               </button>
//               {isDropdownOpen && (
//                 <div className="absolute right-0 mt-3 w-44 bg-white border rounded-lg shadow-md overflow-hidden z-20">
//                   <button
//                     onClick={goToProfile}
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 text-sm"
//                   >
//                     Profile
//                   </button>
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 text-sm"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <CustomeLink
//               linkAddress="/login"
//               linkName="Login"
//               customStyles="text-sm font-medium text-gray-600 hover:text-black transition"
//             />
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="flex lg:hidden">
//           <button
//             onClick={() => setMobileMenuOpen(true)}
//             className="p-2 text-gray-700 hover:text-black"
//           >
//             <Bars3Icon className="w-6 h-6" />
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <Dialog
//         as="div"
//         open={mobileMenuOpen}
//         onClose={setMobileMenuOpen}
//         className="lg:hidden"
//       >
//         <div className="fixed inset-0 z-40 bg-black bg-opacity-30" />
//         <DialogPanel className="fixed inset-y-0 right-0 z-50 w-80 bg-white p-6 overflow-y-auto shadow-xl">
//           <div className="flex items-center justify-between mb-6">
//             <CustomeLink
//               linkAddress="/home"
//               linkName="ECOMMERSE"
//               customStyles="text-xl font-bold text-gray-900"
//             />
//             <button
//               onClick={() => setMobileMenuOpen(false)}
//               className="p-2 text-gray-600 hover:text-black"
//             >
//               <XMarkIcon className="w-6 h-6" />
//             </button>
//           </div>

//           {/* Mobile Search */}
//           <form onSubmit={handleSearch} className="mb-6">
//             <div className="flex rounded-full overflow-hidden border border-gray-300 bg-white">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="flex-grow px-4 py-2 outline-none text-gray-700 placeholder-gray-400"
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//               />
//               <button
//                 type="submit"
//                 className="px-4 bg-gradient-to-r from-red-500 to-orange-400 text-white flex items-center justify-center hover:opacity-90 transition"
//               >
//                 <MagnifyingGlassIcon className="w-5 h-5" />
//               </button>
//             </div>
//           </form>

//           {/* Mobile Links */}
//           <div className="space-y-4">
//             <CustomeLink
//               linkAddress="/shop"
//               linkName="Shop All"
//               customStyles="block text-gray-700 font-medium text-lg hover:text-black transition"
//               onClick={() => setMobileMenuOpen(false)}
//             />

//             {isLoggedIn && user ? (
//               <>
//                 <button
//                   onClick={() => {
//                     goToProfile();
//                     setMobileMenuOpen(false);
//                   }}
//                   className="block w-full text-left text-gray-700 font-medium text-lg hover:text-black transition"
//                 >
//                   Profile
//                 </button>
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setMobileMenuOpen(false);
//                   }}
//                   className="block w-full text-left text-red-500 font-medium text-lg hover:text-red-700 transition"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <CustomeLink
//                 linkAddress="/login"
//                 linkName="Login"
//                 customStyles="block text-gray-700 font-medium text-lg hover:text-black transition"
//                 onClick={() => setMobileMenuOpen(false)}
//               />
//             )}
//           </div>
//         </DialogPanel>
//       </Dialog>
//     </header>
//   );
// }

//

"use client";

import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../../components/auth_components/AuthManager";
import CustomeLink from "../common_components/CustomeLink";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const cartItemCount = 3; // TODO: replace with actual cart count from Context or Redux

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate("/home");
  };

  const goToProfile = () => {
    navigate(`/profile/${user.id}`);
    setDropdownOpen(false);
  };

  const dashboardRoute = useMemo(() => {
    if (!user?.role) return "/dashboard";
    const roleRoutes = { user: "/dashboard" };
    return roleRoutes[user.role] || "/dashboard";
  }, [user?.role]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      navigate(
        `/search-products?query=${encodeURIComponent(searchInput.trim())}`
      );
      setSearchInput("");
    }
  };

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <header className="shadow-md sticky top-0 z-50 bg-white/90 backdrop-blur-md">
      <nav className="containerWidth flex items-center justify-between py-3">
        {/* Left - Logo & Shop */}
        <div className="flex items-center gap-6">
          <CustomeLink
            linkAddress="/home"
            linkName="ECOMMERSE"
            customStyles="text-xl font-extrabold text-gray-900"
          />
          <CustomeLink
            linkAddress="/shop"
            linkName="Shop All"
            customStyles="hidden md:inline-block text-sm font-medium text-gray-600 hover:text-black transition"
          />
        </div>

        {/* Center - Search Bar */}
        <div className="hidden lg:flex flex-1 justify-center">
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-2xl rounded-full overflow-hidden border border-gray-300 bg-white"
          >
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-grow px-5 py-2 outline-none text-gray-700 placeholder-gray-400"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 bg-gradient-to-r from-red-500 to-orange-400 text-white flex items-center justify-center hover:opacity-90 transition"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Right - Cart + Profile/Login */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Cart Icon */}
          <button
            onClick={goToCart}
            className="relative text-gray-700 hover:text-black transition"
          >
            <FaShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Profile/Login */}
          {isLoggedIn && user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition"
              >
                {user.name}
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white border rounded-lg shadow-md overflow-hidden z-20">
                  <button
                    onClick={goToProfile}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 text-sm"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <CustomeLink
              linkAddress="/login"
              linkName="Login"
              customStyles="text-sm font-medium text-gray-600 hover:text-black transition"
            />
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-gray-700 hover:text-black"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        as="div"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-40 bg-black bg-opacity-30" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-80 bg-white p-6 overflow-y-auto shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <CustomeLink
              linkAddress="/home"
              linkName="ECOMMERSE"
              customStyles="text-xl font-bold text-gray-900"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-600 hover:text-black"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex rounded-full overflow-hidden border border-gray-300 bg-white">
              <input
                type="text"
                placeholder="Search..."
                className="flex-grow px-4 py-2 outline-none text-gray-700 placeholder-gray-400"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 bg-gradient-to-r from-red-500 to-orange-400 text-white flex items-center justify-center hover:opacity-90 transition"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Mobile Links */}
          <div className="space-y-6">
            <CustomeLink
              linkAddress="/shop"
              linkName="Shop All"
              customStyles="block text-gray-700 font-semibold text-lg hover:text-black transition"
              onClick={() => setMobileMenuOpen(false)}
            />
            <button
              onClick={goToCart}
              className="block w-full text-left text-gray-700 font-semibold text-lg hover:text-black transition"
            >
              Cart
            </button>

            {isLoggedIn && user ? (
              <>
                <button
                  onClick={() => {
                    goToProfile();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-700 font-semibold text-lg hover:text-black transition"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-red-500 font-semibold text-lg hover:text-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <CustomeLink
                linkAddress="/login"
                linkName="Login"
                customStyles="block text-gray-700 font-semibold text-lg hover:text-black transition"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
