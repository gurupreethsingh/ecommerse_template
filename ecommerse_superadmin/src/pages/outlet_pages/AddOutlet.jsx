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
import ModernTextInput from "../../components/common_components/MordernTextInput";

const AddOutlet = () => {
  const navigate = useNavigate();
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

    const outletData = {
      outlet_name: outlet.outlet_name,
      location: outlet.location,
      outlet_email: outlet.outlet_email,
      outlet_phone: outlet.outlet_phone,
      outlet_address: {
        street: outlet.street,
        city: outlet.city,
        state: outlet.state,
        zip_code: outlet.zip_code,
        country: outlet.country,
      },
      company_name: outlet.company_name,
      company_registration_number: outlet.company_registration_number,
      bank_details: {
        bank_name: outlet.bank_name,
        account_number: outlet.account_number,
        ifsc_code: outlet.ifsc_code,
      },
      status: outlet.status,
    };

    try {
      await axios.post(`${globalBackendRoute}/api/add-outlet`, outletData);
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
      navigate("/all-outlets");
    } catch (error) {
      console.error("Error adding outlet:", error);
      alert("There was an issue adding the outlet.");
    }
  };

  const renderRow = (label, name, icon, type = "text", placeholder = "") => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <label className="formLabel w-full sm:w-1/3 flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
      </label>
      <div className="w-full sm:w-2/3">
        <ModernTextInput
          label=""
          name={name}
          value={outlet[name]}
          onChange={handleChange}
          icon={null}
          type={type}
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          required
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white py-10">
      <div className="compactWidth">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Add New Outlet</h2>
          <Link to="/all-outlets">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Outlets
            </button>
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Outlet Info */}
          {renderRow("Outlet Name", "outlet_name", <FaUser className="text-green-500" />)}
          {renderRow("Location", "location", <FaBuilding className="text-blue-500" />)}
          {renderRow("Email", "outlet_email", <FaEnvelope className="text-indigo-500" />, "email")}
          {renderRow("Phone", "outlet_phone", <FaPhone className="text-green-500" />)}

          {/* Address */}
          {renderRow("Street", "street", <FaHome className="text-teal-500" />)}
          {renderRow("City", "city", <FaHome className="text-teal-500" />)}
          {renderRow("State", "state", <FaHome className="text-teal-500" />)}
          {renderRow("Zip Code", "zip_code", <FaHome className="text-teal-500" />)}
          {renderRow("Country", "country", <FaHome className="text-teal-500" />)}

          {/* Company */}
          {renderRow("Company Name", "company_name", <FaBuilding className="text-blue-500" />)}
          {renderRow("Registration Number", "company_registration_number", <FaBuilding className="text-blue-500" />)}

          {/* Bank */}
          {renderRow("Bank Name", "bank_name", <FaMoneyCheck className="text-purple-500" />)}
          {renderRow("Account Number", "account_number", <FaMoneyCheck className="text-purple-500" />)}
          {renderRow("IFSC Code", "ifsc_code", <FaMoneyCheck className="text-purple-500" />)}

          {/* Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="formLabel w-full sm:w-1/3 flex items-center">
              <FaBuilding className="text-gray-500" />
              <span className="ml-2">Status</span>
            </label>
            <select
              name="status"
              value={outlet.status}
              onChange={handleChange}
              className="formInput w-full sm:w-2/3"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="primaryBtn flex justify-center items-center gap-2 px-4 py-2"
            >
              <MdSave />
              Add Outlet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOutlet;
