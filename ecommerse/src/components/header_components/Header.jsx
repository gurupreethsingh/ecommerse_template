import { useContext, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../../components/auth_components/AuthManager";
import { CartContext } from "../../components/cart_components/CartContext";
import { WishlistContext } from "../../components/wishlist_components/WishlistContext";
import CustomeLink from "../common_components/CustomeLink";
import MiniCart from "../../pages/cart_pages/MiniCart";
import { MdOutlineCameraswitch } from "react-icons/md";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const { resetCartState } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    resetCartState();
    setDropdownOpen(false);
    logout();
    navigate("/home");
  };

  const goToProfile = () => {
    navigate(`/profile/${user?.id}`);
    setDropdownOpen(false);
  };

  const dashboardRoute = useMemo(() => {
    if (!user?.role) return "/dashboard";
    const roleRoutes = { user: "/dashboard" };
    return roleRoutes[user.role] || "/dashboard";
  }, [user?.role]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(
        `/search-products?query=${encodeURIComponent(searchInput.trim())}`
      );
      setSearchInput("");
      setMobileMenuOpen(false); // ✅ close menu on search
    }
  };

  return (
    <header className="shadow-md sticky top-0 z-50 bg-white/90 backdrop-blur-md">
      <nav className="containerWidth flex items-center justify-between py-3">
        {/* Left - Logo & Shop */}
        <div className="flex items-center gap-6">
          <a href="/home" className="">< MdOutlineCameraswitch className="text-cyan-500 w-20 h-20"/></a>
 
          <CustomeLink
            linkAddress="/shop"
            linkName="SHOP ALL"
            customStyles="hidden md:inline-block text-sm font-medium text-gray-600 hover:text-black transition"
          />
        </div>

        {/* Center - Desktop Search */}
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

        {/* Right - Wishlist + Cart + User */}
        <div className="hidden lg:flex items-center gap-6">
          <Link to="/wishlist" className="relative group flex items-center">
            <div className="relative">
              <FaHeart className="text-pink-500 text-2xl hover:scale-110 transition-transform duration-300" />
              {isLoggedIn && wishlistItems.length > 0 && (
                <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow animate-bounce-slow">
                  {wishlistItems.length}
                </span>
              )}
            </div>
          </Link>

          <MiniCart />

          {isLoggedIn && user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-black transition uppercase"
              >
                {user.name}
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white border rounded-lg shadow-md z-20 overflow-hidden">
                  <button
                    onClick={goToProfile}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate("/my-orders");
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={() => {
                      navigate(dashboardRoute);
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                  >
                    Dashboard
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
            <Link to="/login" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-full shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4Zm0-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                </svg>
              </div>
              <span className="text-sm text-gray-700 font-medium">Sign in</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
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
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" />
        <DialogPanel
          role="dialog"
          aria-modal="true"
          className="fixed inset-y-0 right-0 z-50 w-80 bg-white p-6 overflow-y-auto shadow-xl transition-transform duration-300 transform translate-x-0"
        >
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
            <div className="flex rounded-full overflow-hidden border border-gray-300 bg-white shadow">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 text-sm text-gray-700 outline-none"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 bg-gradient-to-r from-red-500 to-orange-400 text-white"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Mobile Navigation Links */}
          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <CustomeLink
                linkAddress="/shop"
                linkName="SHOP ALL"
                customStyles="block text-lg font-semibold text-gray-700 hover:text-black"
                onClick={() => setMobileMenuOpen(false)}
              />
              <CustomeLink
                linkAddress="/cart"
                linkName="Cart"
                customStyles="block text-lg font-semibold text-gray-700 hover:text-black"
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>

            {isLoggedIn && user ? (
              <>
                <button
                  onClick={() => {
                    goToProfile();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-lg font-semibold text-gray-700 hover:text-black"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    navigate("/my-orders");
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-lg font-semibold text-gray-700 hover:text-black"
                >
                  My Orders
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-lg font-semibold text-red-500 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <CustomeLink
                linkAddress="/login"
                linkName="Login"
                customStyles="block text-lg font-semibold text-gray-700 hover:text-black"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
