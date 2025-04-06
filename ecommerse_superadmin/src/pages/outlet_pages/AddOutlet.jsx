import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaHome,
  FaMoneyCheck,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";

import globalBackendRoute from "../../config/Config";
import ModernTextInput from "../../components/common_components/MordernTextInput";
import ModernFileInput from "../../components/common_components/ModernFileInput";
import LeftSidebarNav from "../../components/common_components/LeftSidebarNav";
import DashboardLayout from "../../components/common_components/DashboardLayout";
import SearchBar from "../../components/common_components/SearchBar";
import stopwords from "../../components/common_components/stopwords";

const AddOutlet = () => {
  const navigate = useNavigate();
  const [outletImage, setOutletImage] = useState(null);
  const [outlet, setOutlet] = useState({
    outlet_name: "",
    location: "",
    outlet_email: "",
    outlet_phone: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    company_name: "",
    company_registration_number: "",
    bank_name: "",
    account_number: "",
    ifsc_code: "",
    status: "active",
  });

  const handleChange = (e) => {
    setOutlet({ ...outlet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(outlet).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (outletImage) {
      formData.append("outlet_image", outletImage);
    }

    try {
      await axios.post(`${globalBackendRoute}/api/add-outlet`, formData);
      alert("Outlet added successfully!");
      setOutlet({
        outlet_name: "",
        location: "",
        outlet_email: "",
        outlet_phone: "",
        street: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        company_name: "",
        company_registration_number: "",
        bank_name: "",
        account_number: "",
        ifsc_code: "",
        status: "active",
      });
      setOutletImage(null);
      navigate("/all-outlets");
    } catch (error) {
      console.error("Error adding outlet:", error);
      alert("There was an issue adding the outlet.");
    }
  };

  return (
    <div className="fullWidth py-6">
      <div className="containerWidth">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Add New Outlet</h2>
          <Link to="/all-outlets">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Outlets
            </button>
          </Link>
        </div>

        {/* Layout */}
        <DashboardLayout
          left={
            <LeftSidebarNav
              navigate={navigate}
              items={[
                {
                  label: "View All Outlets",
                  icon: <FaBuilding className="text-blue-500" />,
                  path: "/all-outlets",
                },
                {
                  label: "Add New Outlet",
                  icon: <FaUser className="text-green-500" />,
                  path: "/add-outlet",
                },
              ]}
            />
          }
          right={
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-sm p-6 space-y-6"
            >
              <ModernTextInput
                label="Outlet Name"
                icon={<FaUser className="text-green-500" />}
                value={outlet.outlet_name}
                onChange={handleChange}
                name="outlet_name"
                required
              />

              <ModernTextInput
                label="Location"
                icon={<FaBuilding className="text-blue-500" />}
                value={outlet.location}
                onChange={handleChange}
                name="location"
                required
              />

              <ModernTextInput
                label="Email"
                type="email"
                icon={<FaEnvelope className="text-indigo-500" />}
                value={outlet.outlet_email}
                onChange={handleChange}
                name="outlet_email"
                required
              />

              <ModernTextInput
                label="Phone"
                icon={<FaPhone className="text-green-500" />}
                value={outlet.outlet_phone}
                onChange={handleChange}
                name="outlet_phone"
                required
              />

              <ModernTextInput
                label="Street"
                icon={<FaHome className="text-teal-500" />}
                value={outlet.street}
                onChange={handleChange}
                name="street"
              />
              <ModernTextInput
                label="City"
                icon={<FaHome className="text-teal-500" />}
                value={outlet.city}
                onChange={handleChange}
                name="city"
              />
              <ModernTextInput
                label="State"
                icon={<FaHome className="text-teal-500" />}
                value={outlet.state}
                onChange={handleChange}
                name="state"
              />
              <ModernTextInput
                label="Zip Code"
                icon={<FaHome className="text-teal-500" />}
                value={outlet.zip_code}
                onChange={handleChange}
                name="zip_code"
              />
              <ModernTextInput
                label="Country"
                icon={<FaHome className="text-teal-500" />}
                value={outlet.country}
                onChange={handleChange}
                name="country"
              />

              <ModernTextInput
                label="Company Name"
                icon={<FaBuilding className="text-blue-500" />}
                value={outlet.company_name}
                onChange={handleChange}
                name="company_name"
              />
              <ModernTextInput
                label="Registration Number"
                icon={<FaBuilding className="text-blue-500" />}
                value={outlet.company_registration_number}
                onChange={handleChange}
                name="company_registration_number"
              />

              <ModernTextInput
                label="Bank Name"
                icon={<FaMoneyCheck className="text-purple-500" />}
                value={outlet.bank_name}
                onChange={handleChange}
                name="bank_name"
              />
              <ModernTextInput
                label="Account Number"
                icon={<FaMoneyCheck className="text-purple-500" />}
                value={outlet.account_number}
                onChange={handleChange}
                name="account_number"
              />
              <ModernTextInput
                label="IFSC Code"
                icon={<FaMoneyCheck className="text-purple-500" />}
                value={outlet.ifsc_code}
                onChange={handleChange}
                name="ifsc_code"
              />

              {/* Image Upload */}
              <div className="w-full">
                <label className="formLabel mb-1 text-sm font-medium text-gray-700">
                  Outlet Image
                </label>
                <ModernFileInput
                  onFileSelect={(file) => setOutletImage(file)}
                />
              </div>

              {/* Status */}
              <div className="w-full">
                <label className="formLabel mb-1 text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={outlet.status}
                  onChange={handleChange}
                  className="formInput w-full"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="primaryBtn flex items-center gap-2"
                >
                  <MdSave />
                  Add Outlet
                </button>
              </div>
            </form>
          }
        />
      </div>
    </div>
  );
};

export default AddOutlet;
