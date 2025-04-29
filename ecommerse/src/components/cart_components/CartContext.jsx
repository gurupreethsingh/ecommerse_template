// CartContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth_components/AuthManager";
import axios from "axios";
import globalBackendRoute from "../../config/Config";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isLoggedIn, user, loading } = useContext(AuthContext);

  const [cartItems, setCartItems] = useState(() => {
    const guestCart = localStorage.getItem("guest_cart");
    if (guestCart) {
      try {
        const parsed = JSON.parse(guestCart);
        if (parsed.expiry > Date.now()) {
          return parsed.cart || [];
        }
      } catch (err) {
        console.error("Invalid guest cart");
      }
    }
    return [];
  });

  const [cartLoading, setCartLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (isLoggedIn && user) {
      syncGuestCartToServer(); // 👈 FIRST: Sync guest cart
    } else {
      setCartLoading(false);
    }
  }, [isLoggedIn, user, loading]);

  // 🛒 Save guest cart whenever guest cart changes
  useEffect(() => {
    if (!isLoggedIn) {
      const payload = {
        cart: cartItems,
        expiry: Date.now() + 7 * 24 * 60 * 60 * 1000,
      };
      localStorage.setItem("guest_cart", JSON.stringify(payload));
    }
  }, [cartItems, isLoggedIn]);

  useEffect(() => {
    const handleStorageChange = () => {
      if (!isLoggedIn) {
        const guestCart = localStorage.getItem("guest_cart");
        if (guestCart) {
          try {
            const parsed = JSON.parse(guestCart);
            if (parsed.expiry > Date.now()) {
              setCartItems(parsed.cart || []);
            }
          } catch (err) {}
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [isLoggedIn]);

  const fetchServerCart = async () => {
    try {
      setCartLoading(true);
      const { data } = await axios.get(
        `${globalBackendRoute}/api/get-cart-items`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCartItems(data.items || []);
    } catch (error) {
      console.error("Failed to fetch server cart:", error.message);
    } finally {
      setCartLoading(false);
    }
  };

  const syncGuestCartToServer = async () => {
    try {
      const guestCart = localStorage.getItem("guest_cart");
      if (guestCart) {
        const parsed = JSON.parse(guestCart);
        if (parsed.expiry > Date.now() && parsed.cart.length > 0) {
          await axios.post(
            `${globalBackendRoute}/api/cart/sync`,
            { items: parsed.cart },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          localStorage.removeItem("guest_cart"); // 🧹 Clear guest cart after syncing
          console.log("Guest cart synced to server!");
        }
      }
    } catch (error) {
      console.error("Error syncing guest cart:", error.message);
    } finally {
      fetchServerCart(); // 🎯 Always fetch server cart after syncing
    }
  };

  const addToCart = async (product) => {
    if (isLoggedIn) {
      try {
        await axios.post(
          `${globalBackendRoute}/api/add-to-cart`,
          { productId: product._id, quantity: 1 },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchServerCart();
        toast.success("Product added to cart!");
      } catch (error) {
        console.error("Failed to add to server cart:", error.message);
        toast.error("Failed to add!");
      }
    } else {
      setCartItems((prev) => {
        const existing = prev.find((item) => item._id === product._id);
        if (existing) {
          return prev.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      toast.success("Product added to cart!");
    }
  };

  const removeFromCart = async (productId) => {
    if (isLoggedIn) {
      try {
        await axios.delete(
          `${globalBackendRoute}/api/remove-cart-item/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchServerCart();
        toast.success("Item removed!");
      } catch (error) {
        console.error("Failed to remove:", error.message);
        toast.error("Failed to remove!");
      }
    } else {
      setCartItems((prev) => prev.filter((item) => item._id !== productId));
      toast.success("Item removed!");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (isLoggedIn) {
      try {
        await axios.patch(
          `${globalBackendRoute}/api/update-cart/${productId}`,
          { quantity },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchServerCart();
        toast.success("Cart updated!");
      } catch (error) {
        console.error("Failed to update:", error.message);
        toast.error("Failed to update!");
      }
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        )
      );
      toast.success("Cart updated!");
    }
  };

  const clearCart = async () => {
    try {
      if (isLoggedIn) {
        await axios.delete(`${globalBackendRoute}/api/clear-cart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }

      setCartItems([]);
      localStorage.removeItem("guest_cart");
      toast.success("Cart cleared!");
    } catch (error) {
      console.error("Failed to clear cart:", error.message);
      toast.error("Failed to clear cart!");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
