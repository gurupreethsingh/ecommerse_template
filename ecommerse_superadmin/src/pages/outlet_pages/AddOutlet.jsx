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

  const renderField = (label, name, Icon) => (
    <div className="flex items-center gap-2">
      <label className="formLabel w-1/3 flex items-center">
        <Icon className="text-indigo-500 mr-2" /> {label}
      </label>
      <input
        type="text"
        name={name}
        value={outlet[name]}
        onChange={handleChange}
        required
        className="formInput w-2/3"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );

  return (
    <div className="compactWidth py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="headingText">Add New Outlet</h2>
        <Link to="/all-outlets" className="linkText text-sm">
          View All Outlets
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {renderField("Outlet Name", "outlet_name", FaUser)}
        {renderField("Location", "location", FaBuilding)}
        {renderField("Email", "outlet_email", FaEnvelope)}
        {renderField("Phone", "outlet_phone", FaPhone)}

        {renderField("Street", "street", FaHome)}
        {renderField("City", "city", FaHome)}
        {renderField("State", "state", FaHome)}
        {renderField("Zip Code", "zip_code", FaHome)}
        {renderField("Country", "country", FaHome)}

        {renderField("Company Name", "company_name", FaBuilding)}
        {renderField(
          "Registration Number",
          "company_registration_number",
          FaBuilding
        )}

        {renderField("Bank Name", "bank_name", FaMoneyCheck)}
        {renderField("Account Number", "account_number", FaMoneyCheck)}
        {renderField("IFSC Code", "ifsc_code", FaMoneyCheck)}

        {/* Status Dropdown */}
        <div className="flex items-center gap-2">
          <label className="formLabel w-1/3">Status</label>
          <select
            name="status"
            value={outlet.status}
            onChange={handleChange}
            className="formInput w-2/3"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="primaryBtn mt-4 flex items-center justify-center gap-2"
        >
          <MdSave /> Add Outlet
        </button>
      </form>
    </div>
  );
};

export default AddOutlet;
