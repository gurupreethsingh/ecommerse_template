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
    <div className="bg-white py-10">
      <div className="compactWidth">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Add New Vendor</h2>
          <Link to="/all-vendors">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Vendors
            </button>
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Address */}
          {renderInput(
            "Street",
            "street",
            <FaHome className="text-indigo-500" />
          )}
          {renderInput("City", "city", <FaHome className="text-indigo-500" />)}
          {renderInput(
            "State",
            "state",
            <FaHome className="text-indigo-500" />
          )}
          {renderInput(
            "Zip Code",
            "zip_code",
            <FaHome className="text-indigo-500" />
          )}
          {renderInput(
            "Country",
            "country",
            <FaHome className="text-indigo-500" />
          )}

          {/* Company */}
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

          {/* Bank */}
          {renderInput(
            "Bank Name",
            "bank_name",
            <FaMoneyCheck className="text-purple-500" />
          )}
          {renderInput(
            "Account Number",
            "account_number",
            <FaMoneyCheck className="text-purple-500" />
          )}
          {renderInput(
            "IFSC Code",
            "ifsc_code",
            <FaMoneyCheck className="text-purple-500" />
          )}

          {/* Submit */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="primaryBtn flex justify-center items-center gap-2 px-4 py-2"
            >
              <MdSave />
              Add Vendor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVendor;
