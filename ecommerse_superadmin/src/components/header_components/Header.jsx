"use client";

import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../components/auth_components/AuthManager";
import CustomeLink from "../common_components/CustomeLink";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setDropdownOpen(false); // Close dropdown
    logout();
    navigate("/login");
  };

  const goToProfile = () => {
    navigate(`/profile/${user.id}`);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const dashboardRoute = useMemo(() => {
    if (!user?.role) return "/dashboard";
    const roleRoutes = {
      admin: "/admin-dashboard",
      superadmin: "/superadmin-dashboard",
      employee: "/employee-dashboard",
      vendor: "/vendor-dashboard",
      delivery_person: "/delivery-dashboard",
      outlet: "/outlet-dashboard",
    };
    return roleRoutes[user.role] || "/dashboard";
  }, [user?.role]);

  const navLinks = useMemo(() => {
    if (!isLoggedIn) return [];
    return [
      { path: "/home", name: "Home" },
      { path: "/about-us", name: "About Us" },
      { path: "/contact-us", name: "Contact Us" },
      { path: dashboardRoute, name: "Dashboard" },
    ];
  }, [isLoggedIn, dashboardRoute]);

  const renderLinks = () =>
    navLinks.map((link) => (
      <CustomeLink
        key={link.path}
        linkAddress={link.path}
        linkName={link.name}
      />
    ));

  return (
    <header>
      {/* Desktop Header */}
      <nav className="bg-gray-800 text-white shadow-sm" aria-label="Global">
        <div className="containerWidth flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <CustomeLink linkAddress="/home" linkName="LOGO" />
          </div>

          {/* Hamburger Menu */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex lg:gap-x-8">{renderLinks()}</div>

          {/* Right: Login/Profile */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
            {isLoggedIn && user ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 font-medium text-white"
                >
                  Welcome, {user.name}
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10 text-gray-800">
                    <button
                      onClick={goToProfile}
                      className="block w-full text-left px-4 py-2 smallText hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 smallText text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <CustomeLink linkAddress="/login" linkName="Login" />
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full max-w-sm bg-gray-800 text-white px-6 py-6 overflow-y-auto">
          <div className="flex items-center justify-between">
            <CustomeLink linkAddress="/home" linkName="LOGO" />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-700">
              <div className="space-y-2 py-6">
                <div className="flex flex-col gap-3 linkTextMobile">
                  {renderLinks()}
                </div>
              </div>

              <div className="py-6">
                {isLoggedIn && user ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        goToProfile();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-semibold hover:bg-gray-700 paragraphTextMobile"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-semibold text-red-400 hover:bg-gray-700 paragraphTextMobile"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <CustomeLink linkAddress="/login" linkName="Login" />
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
