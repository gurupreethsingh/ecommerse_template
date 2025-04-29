import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth_components/AuthManager";
import axios from "axios";
import globalBackendRoute from "../../config/Config";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isLoggedIn, user, loading } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  // 🛒 Load cart when user status is known
  useEffect(() => {
    if (loading) return; // ⏳ Wait for AuthManager to finish checking token

    if (isLoggedIn && user) {
      fetchServerCart();
    } else {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, [isLoggedIn, user, loading]); // 🧠 Notice 'loading' added!

  // 🛒 Save guest cart to localStorage
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoggedIn]);

  // Fetch Cart from Server for logged-in user
  const fetchServerCart = async () => {
    try {
      const { data } = await axios.get(`${globalBackendRoute}/api/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCartItems(data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to fetch cart!", { autoClose: 1000 });
    }
  };

  // Add to Cart
  const addToCart = async (product) => {
    if (isLoggedIn) {
      try {
        await axios.post(
          `${globalBackendRoute}/api/cart/add`,
          { productId: product._id, quantity: 1 },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        fetchServerCart();
        toast.success("Product added to cart!", { autoClose: 800 });
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add product!", { autoClose: 1000 });
      }
    } else {
      setCartItems((prev) => {
        const exists = prev.find((item) => item._id === product._id);
        if (exists) {
          return prev.map((item) =>
            item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prev, { ...product, quantity: 1 }];
        }
      });
      toast.success("Product added to cart!", { autoClose: 800 });
    }
  };

  // Remove from Cart
  const removeFromCart = async (productId) => {
    if (isLoggedIn) {
      try {
        await axios.delete(`${globalBackendRoute}/api/cart/remove/${productId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        fetchServerCart();
        toast.success("Product removed!", { autoClose: 800 });
      } catch (error) {
        console.error("Error removing product:", error);
        toast.error("Failed to remove product!", { autoClose: 1000 });
      }
    } else {
      setCartItems((prev) => prev.filter((item) => item._id !== productId));
      toast.success("Product removed!", { autoClose: 800 });
    }
  };

  // Update Quantity
  const updateQuantity = async (productId, newQuantity) => {
    if (isLoggedIn) {
      try {
        await axios.patch(
          `${globalBackendRoute}/api/cart/update/${productId}`,
          { quantity: newQuantity },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        fetchServerCart();
        toast.success("Cart updated!", { autoClose: 800 });
      } catch (error) {
        console.error("Error updating cart:", error);
        toast.error("Failed to update cart!", { autoClose: 1000 });
      }
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
      toast.success("Cart updated!", { autoClose: 800 });
    }
  };

  // Clear Cart
  const clearCart = async () => {
    if (isLoggedIn) {
      try {
        await axios.delete(`${globalBackendRoute}/api/cart/clear`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCartItems([]);
        toast.success("Cart cleared!", { autoClose: 800 });
      } catch (error) {
        console.error("Error clearing cart:", error);
        toast.error("Failed to clear cart!", { autoClose: 1000 });
      }
    } else {
      setCartItems([]);
      localStorage.removeItem("cart");
      toast.success("Cart cleared!", { autoClose: 800 });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
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
