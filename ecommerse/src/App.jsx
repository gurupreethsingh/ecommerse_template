// App.jsx
import "./App.css";
import "./styles/global.css";
import "animate.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/auth_components/AuthManager";
import { CartProvider } from "./components/cart_components/CartContext"; // ✅ Import here!
import MainLayout from "./components/common_components/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WishlistProvider } from "./components/wishlist_components/WishlistContext";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <MainLayout />
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>

      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
