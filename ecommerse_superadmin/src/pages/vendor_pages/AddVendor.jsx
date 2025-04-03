import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

const AddVendor = () => {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState({
    vendor_name: "",
    vendor_email: "",
    vendor_phone: "",
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
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vendorData = {
      vendor_name: vendor.vendor_name,
      vendor_email: vendor.vendor_email,
      vendor_phone: vendor.vendor_phone,
      vendor_address: {
        street: vendor.street,
        city: vendor.city,
        state: vendor.state,
        zip_code: vendor.zip_code,
        country: vendor.country,
      },
      company_name: vendor.company_name,
      company_registration_number: vendor.company_registration_number,
      bank_details: {
        bank_name: vendor.bank_name,
        account_number: vendor.account_number,
        ifsc_code: vendor.ifsc_code,
      },
      status: vendor.status,
    };

    try {
      await axios.post(`${globalBackendRoute}/api/add-vendor`, vendorData);
      alert("Vendor added successfully!");
      setVendor({
        vendor_name: "",
        vendor_email: "",
        vendor_phone: "",
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
      navigate("/all-vendors");
    } catch (error) {
      console.error("Error adding vendor:", error);
      alert("There was an issue adding the vendor.");
    }
  };

  const renderInput = (label, name, icon, type = "text") => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <label className="formLabel w-full sm:w-1/3 flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={vendor[name]}
        onChange={handleChange}
        required
        className="formInput w-full sm:w-2/3"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );

  return (
    <div className="compactWidth py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="headingText">Add New Vendor</h2>
        <Link to="/all-vendors" className="fileUploadBtn text-sm">
          View All Vendors
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {renderInput(
          "Vendor Name",
          "vendor_name",
          <FaUser className="text-green-500" />
        )}
        {renderInput(
          "Email",
          "vendor_email",
          <FaEnvelope className="text-blue-500" />,
          "email"
        )}
        {renderInput(
          "Phone",
          "vendor_phone",
          <FaPhone className="text-green-500" />
        )}

        {/* Address Fields */}
        {["street", "city", "state", "zip_code", "country"].map((field) =>
          renderInput(
            field.replace("_", " ").toUpperCase(),
            field,
            <FaHome className="text-green-500" />
          )
        )}

        {renderInput(
          "Company Name",
          "company_name",
          <FaBuilding className="text-blue-500" />
        )}
        {renderInput(
          "Registration Number",
          "company_registration_number",
          <FaBuilding className="text-blue-500" />
        )}

        {/* Bank Fields */}
        {["bank_name", "account_number", "ifsc_code"].map((field) =>
          renderInput(
            field.replace("_", " ").toUpperCase(),
            field,
            <FaMoneyCheck className="text-blue-500" />
          )
        )}

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="primaryBtn flex items-center justify-center gap-2"
          >
            <MdSave />
            Add Vendor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVendor;
