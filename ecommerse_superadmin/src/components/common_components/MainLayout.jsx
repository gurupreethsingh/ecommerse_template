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
// contact page.
import ContactUs from "../../pages/common_pages/ContactUs";
import AllMessages from "../../pages/contact_pages/AllMessages";
import ReplyMessage from "../../pages/contact_pages/ReplyMessage";
import AllReplies from "../../pages/contact_pages/AllReplies";

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
// category pages.
import AddCategory from "../../pages/category_pages/AddCategory";
import AllCategories from "../../pages/category_pages/AllCategories";
import SingleCategory from "../../pages/category_pages/SingleCategory";
import CategoryAllProducts from "../../pages/category_pages/CategoryAllProducts";
// subcategory pages.
import AddSubCategory from "../../pages/subcategory_pages/AddSubcategory";
import AddVendor from "../../pages/vendor_pages/AddVendor";
import AllVendors from "../../pages/vendor_pages/AllVendors";
import SingleVendor from "../../pages/vendor_pages/SingleVendor";
import AddOutlet from "../../pages/outlet_pages/AddOutlet";
import SingleOutlet from "../../pages/outlet_pages/SingleOutlet";
import AllOutlets from "../../pages/outlet_pages/AllOutlets";
import AllSubCategories from "../../pages/subcategory_pages/AllSubCategories";
import SingleSubCategory from "../../pages/subcategory_pages/SingleSubCategory";
import AddProduct from "../../pages/product_pages/AddProduct";
import AllAddedProducts from "../../pages/product_pages/AllAddedProducts";
import SingleAddedProduct from "../../pages/product_pages/SingleAddedProduct";

const MainLayout = () => {
  return (
    <div className="min-h-screen text-gray-900">
      <Header />
      <main className="flex-grow py-6">
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
              <PageTitle title="Contact Us">
                <ContactUs />
              </PageTitle>
            }
          />

          <Route
            path="/all-messages"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="All-messages">
                  <AllMessages />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/reply-message/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Reply-message">
                  <ReplyMessage />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/all-replies"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="All-replies">
                  <AllReplies />
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

          <Route
            path="/forgot-password"
            element={
              <PageTitle title="User Dashboard">
                <ForgotPassword />
              </PageTitle>
            }
          />

          <Route
            path="/reset-password"
            element={
              <PageTitle title="User Dashboard">
                <ResetPassword />
              </PageTitle>
            }
          />

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

          {/* category routes.  */}
          <Route
            path="/add-category"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Add Category">
                  <AddCategory />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/add-sub-category"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Add Sub Category">
                  <AddSubCategory />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/all-categories"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="All Categories">
                  <AllCategories />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/all-sub-categories"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="All Sub Categories">
                  <AllSubCategories />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/single-category/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Single Category">
                  <SingleCategory />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/single-subcategory/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Single SubCategory">
                  <SingleSubCategory />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/single-category-all-products/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Category All Products">
                  <CategoryAllProducts />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/add-vendor"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Add Vendor">
                  <AddVendor />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/all-vendors"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="All Vendors">
                  <AllVendors />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/single-vendor/:vendorId"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Single Vendor">
                  <SingleVendor />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/vendor-dashboard/:vendorId"
            element={
              <PrivateRoute allowedRoles={["superadmin", "vendor"]}>
                <PageTitle title="Vendor Dashboard">
                  <VendorDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/add-outlet"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Add Outlet">
                  <AddOutlet />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/all-outlets"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="All Outlets">
                  <AllOutlets />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/single-outlet/:outletId"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Single Outlet">
                  <SingleOutlet />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/outlet-dashboard/:outletId"
            element={
              <PrivateRoute allowedRoles={["superadmin", "outlet"]}>
                <PageTitle title="Outlet Dashboard">
                  <OutletDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />

          {/* product routes  */}
          <Route
            path="/add-product"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Add Product">
                  <AddProduct />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/all-added-products"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Add Added Product">
                  <AllAddedProducts />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/single-added-product/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Single Added Product">
                  <SingleAddedProduct />
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
