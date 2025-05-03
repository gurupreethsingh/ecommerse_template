import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import globalBackendRoute from "../../config/Config";
import { AuthContext } from "../auth_components/AuthManager";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // Fetch wishlist
  const fetchWishlist = async () => {
    if (!isLoggedIn) return;
    try {
      setWishlistLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${globalBackendRoute}/api/wishlist/get-wishlist`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWishlistItems(res.data.items);
    } catch (err) {
      if (err.response?.status === 403) {
        console.warn(
          "Unauthorized access to wishlist. Possibly invalid token."
        );
      } else {
        console.error("Wishlist fetch error:", err);
      }
    } finally {
      setWishlistLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchWishlist();
  }, [isLoggedIn]);

  // Local state update helpers
  const addItemToLocalWishlist = (product) => {
    setWishlistItems((prev) => [...prev, product]);
  };

  const removeItemFromLocalWishlist = (productId) => {
    setWishlistItems((prev) =>
      prev.filter((item) => (item._id || item.product?._id) !== productId)
    );
  };

  // Add to wishlist
  const addToWishlist = async (productId, productDetails = null) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${globalBackendRoute}/api/wishlist/add-to-wishlist`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (productDetails) addItemToLocalWishlist(productDetails);
      return true;
    } catch (err) {
      if (err.response?.status === 403) {
        console.warn("Unauthorized add to wishlist attempt.");
      } else {
        console.error("Add to wishlist error:", err);
      }
      return false;
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${globalBackendRoute}/api/wishlist/remove-from-wishlist/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      removeItemFromLocalWishlist(productId);
    } catch (err) {
      if (err.response?.status === 403) {
        console.warn("Unauthorized remove from wishlist attempt.");
      } else {
        console.error("Remove wishlist error:", err);
      }
    }
  };

  // Toggle Save for Later
  const toggleSaveForLater = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${globalBackendRoute}/api/wishlist/toggle-save-for-later/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchWishlist();
    } catch (err) {
      console.error("Toggle save error:", err);
    }
  };

  // Move to Cart
  const moveToCartFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${globalBackendRoute}/api/wishlist/move-to-cart`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Moved to cart");
      removeItemFromLocalWishlist(productId);
    } catch (err) {
      console.error("Move to cart error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistLoading,
        addToWishlist,
        removeFromWishlist,
        toggleSaveForLater,
        moveToCartFromWishlist,
        fetchWishlist,
        addItemToLocalWishlist,
        removeItemFromLocalWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
