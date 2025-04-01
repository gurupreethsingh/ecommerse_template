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
import ContactUs from "../../pages/common_pages/ContactUs";
import AboutUs from "../../pages/common_pages/AboutUs";
import Register from "../../pages/user_pages/Register";
import Login from "../../pages/user_pages/Login";
import Dashboard from "../../pages/user_pages/Dashboard";
import AdminDashboard from "../../pages/admin_pages/AdminDashboard";
import SuperAdminDashboard from "../../pages/superadmin_pages/SuperAdminDashboard";
import EmployeeDashboard from "../../pages/employee_pages/EmployeeDashboard";
import Profile from "../../pages/user_pages/Profile";
import DeliveryAgentDashboard from "../../pages/delivery_agent_pages/DeliveryAgentDashboard";
import HrDashboard from "../../pages/hr_pages/HrDashboard";
import OutletDashboard from "../../pages/outlet_pages/OutletDashboard";
import VendorDashboard from "../../pages/vendor_pages/VendorDashboard";
import UpdateProfile from "../../pages/user_pages/UpdateProfile";
import AllUsers from "../../pages/superadmin_pages/AllUsers";
import SingleUser from "../../pages/superadmin_pages/SingleUser";
import ForgotPassword from "../../pages/user_pages/ForgotPassword";
import ResetPassword from "../../pages/user_pages/ResetPassword";

const MainLayout = () => {
  return (
    <div className="min-h-screen text-gray-900">
      <Header />
      <main className="flex-grow containerWidth py-6">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <PageTitle title="Home">
                  <Homepage />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <PageTitle title="Home">
                  <Homepage />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/homepage"
            element={
              <PrivateRoute>
                <PageTitle title="Home">
                  <Homepage />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/contact-us"
            element={
              <PrivateRoute>
                <PageTitle title="Contact Us">
                  <ContactUs />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/about-us"
            element={
              <PrivateRoute>
                <PageTitle title="About Us">
                  <AboutUs />
                </PageTitle>
              </PrivateRoute>
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
            path="/superadmin-dashboard"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="SuperAdmin Dashboard">
                  <SuperAdminDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute allowedRoles={["admin", "superadmin"]}>
                <PageTitle title="Admin Dashboard">
                  <AdminDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/employee-dashboard"
            element={
              <PrivateRoute allowedRoles={["employee", "superadmin"]}>
                <PageTitle title="Employee Dashboard">
                  <EmployeeDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/delivery-agent-dashboard"
            element={
              <PrivateRoute allowedRoles={["delivery_agent", "superadmin"]}>
                <PageTitle title="Delivery Agent Dashboard">
                  <DeliveryAgentDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/hr-dashboard"
            element={
              <PrivateRoute allowedRoles={["hr", "superadmin"]}>
                <PageTitle title="Human Resource Dashboard">
                  <HrDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/outlet-dashboard"
            element={
              <PrivateRoute allowedRoles={["outlet", "superadmin"]}>
                <PageTitle title="Outlet Dashboard">
                  <OutletDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/vendor-dashboard"
            element={
              <PrivateRoute allowedRoles={["vendor", "superadmin"]}>
                <PageTitle title="Vendor Dashboard">
                  <VendorDashboard />
                </PageTitle>
              </PrivateRoute>
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
            path="/all-users"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="All Users">
                  <AllUsers />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/single-user/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Single User">
                  <SingleUser />
                </PageTitle>
              </PrivateRoute>
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
