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

const MainLayout = () => {
  return (
    <div className="min-h-screen text-gray-900">
      <Header />
      <main className="flex-grow containerWidth py-6">
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

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/reset-password" element={<ResetPassword />} />

         

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
