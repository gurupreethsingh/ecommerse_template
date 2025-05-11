// components/common_components/MainLayout.jsx
import React from "react";
import Header from "../header_components/Header";
import Footer from "../footer_components/Footer";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "../auth_components/AuthManager";
import PageTitle from "./PageTitle";

// Pages
import Homepage from "../../pages/common_pages/Homepage";
import PageNotFound from "../../pages/common_pages/PageNotFound";
import AboutUs from "../../pages/common_pages/AboutUs";
import Register from "../../pages/user_pages/Register";
import Login from "../../pages/user_pages/Login";
import Dashboard from "../../pages/user_pages/Dashboard";
import Profile from "../../pages/user_pages/Profile";
import UpdateProfile from "../../pages/user_pages/UpdateProfile";
import ForgotPassword from "../../pages/user_pages/ForgotPassword";
import ResetPassword from "../../pages/user_pages/ResetPassword";

// blog pages.
import AllBlogs from "../../pages/blog_pages/AllBlogs";
import SingleBlog from "../../pages/blog_pages/SingleBlog";

// contact pages.
import ContactUs from "../../pages/contact_pages/ContactUs";

// subscription page.
import Subscriptions from "../../pages/subscription_pages/Subscriptions";
import SearchProducts from "../../pages/product_pages/SearchProducts";

// shop page.
import Shop from "../../pages/shop_pages/Shop";
import SingleProduct from "../../pages/shop_pages/SingleProduct";

// cart pages.
import CartPage from "../../pages/cart_pages/CartPage";
import CheckoutPage from "../../pages/cart_pages/CheckoutPage";
import MyOrders from "../../pages/orders_page/MyOrders";
import ThankYou from "../../pages/orders_page/ThankYou";

// wishlist page..
import Wishlist from "../../pages/wishlist_pages/Wishlist";

const MainLayout = () => {
  return (
    <div className="min-h-screen text-gray-900">
      <Header />
      <main className="flex-grow container py-6">
        <Routes>
          <Route
            path="/"
            element={
              <PageTitle title="Home">
                <Homepage />
              </PageTitle>
            }
          />
          <Route
            path="/home"
            element={
              <PageTitle title="Home">
                <Homepage />
              </PageTitle>
            }
          />
          <Route
            path="/homepage"
            element={
              <PageTitle title="Home">
                <Homepage />
              </PageTitle>
            }
          />
          <Route
            path="/contact-us"
            element={
              <PageTitle title="Contact Us">
                <ContactUs />
              </PageTitle>
            }
          />
          <Route
            path="/about-us"
            element={
              <PageTitle title="About Us">
                <AboutUs />
              </PageTitle>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <PageTitle title="Login">
                  <Login />
                </PageTitle>
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <PageTitle title="Register">
                  <Register />
                </PageTitle>
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={["user", "superadmin"]}>
                <PageTitle title="User Dashboard">
                  <Dashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <PageTitle title="Forgot Password">
                <ForgotPassword />
              </PageTitle>
            }
          />

          <Route
            path="/reset-password"
            element={
              <PageTitle title="Forgot Password">
                <ResetPassword />
              </PageTitle>
            }
          />

          <Route
            path="/shop"
            element={
              <PageTitle title="Shop">
                <Shop />
              </PageTitle>
            }
          />

          <Route
            path="/single-product/:id"
            element={
              <PageTitle title="Single-Product">
                <SingleProduct />
              </PageTitle>
            }
          />

          <Route
            path="/profile/:id"
            element={
              <PrivateRoute>
                <PageTitle title="Profile">
                  <Profile />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/update-profile/:id"
            element={
              <PrivateRoute>
                <PageTitle title="Update Profile">
                  <UpdateProfile />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/all-blogs"
            element={
              <PageTitle title="All Blogs">
                <AllBlogs />
              </PageTitle>
            }
          />

          <Route
            path="/single-blog/:id"
            element={
              <PageTitle title="Single Blog">
                <SingleBlog />
              </PageTitle>
            }
          />

          {/* product pages  */}
          <Route
            path="/search-products"
            element={
              <PageTitle title="Search-Products">
                <SearchProducts />
              </PageTitle>
            }
          />

          {/* cart pages  */}
          <Route
            path="/cart"
            element={
              <PageTitle title="Cart">
                <CartPage />
              </PageTitle>
            }
          />

          <Route
            path="/checkout"
            element={
              <PageTitle title="Checkout">
                <CheckoutPage />
              </PageTitle>
            }
          />

          <Route
            path="/my-orders"
            element={
              <PageTitle title="Myorders">
                <MyOrders />
              </PageTitle>
            }
          />

          <Route
            path="/thank-you"
            element={
              <PageTitle title="ThankYou">
                <ThankYou />
              </PageTitle>
            }
          />

          <Route
            path="/wishlist"
            element={
              <PageTitle title="Wishlist">
                <Wishlist />
              </PageTitle>
            }
          />

          <Route
            path="/page-not-found"
            element={
              <PageTitle title="404 Not Found">
                <PageNotFound />
              </PageTitle>
            }
          />
          <Route
            path="/*"
            element={
              <PageTitle title="404 Not Found">
                <PageNotFound />
              </PageTitle>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
