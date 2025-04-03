import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUser,
  FaBuilding,
  FaCalendarAlt,
  FaWeight,
  FaMoneyCheck,
  FaBox,
  FaStickyNote,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const AddRawMaterialToVendor = () => {
  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]); // Vendors list for dropdown
  const [rawMaterial, setRawMaterial] = useState({
    raw_material_name: "",
    quantity: "",
    unit: "kg",
    expire_date: "",
    ordered_date: "",
    reorder_date: "",
    refilling_date: "",
    vendor: "",
    price_per_unit: "",
    total_cost: "",
    status: "ordered",
    notes: "",
  });

  // Fetch vendors for dropdown selection
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("http://localhost:3006/api/vendors");
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };
    fetchVendors();
  }, []);

  const handleChange = (e) => {
    setRawMaterial({ ...rawMaterial, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate total cost dynamically
    const totalCost = rawMaterial.quantity * rawMaterial.price_per_unit;

    const rawMaterialData = {
      ...rawMaterial,
      total_cost: totalCost,
    };

    try {
      await axios.post("http://localhost:3006/api/add-raw-material", rawMaterialData);
      alert("Raw material added successfully!");
      setRawMaterial({
        raw_material_name: "",
        quantity: "",
        unit: "kg",
        expire_date: "",
        ordered_date: "",
        reorder_date: "",
        refilling_date: "",
        vendor: "",
        price_per_unit: "",
        total_cost: "",
        status: "ordered",
        notes: "",
      });
      navigate("/all-raw-materials");
    } catch (error) {
      console.error("Error adding raw material:", error);
      alert("There was an issue adding the raw material.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Raw Material
          </h2>
          <Link to="/all-raw-materials">
            <button className="bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-500 text-white font-semibold py-1 px-3 rounded-md shadow hover:opacity-90 transition-opacity text-sm">
              View All Raw Materials
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vendor Selection */}
          <InputField
            label="Vendor"
            icon={<FaUser className="text-green-500" />}
            type="select"
            name="vendor"
            value={rawMaterial.vendor}
            onChange={handleChange}
          >
            <option value="">Select Vendor</option>
            {vendors.map((vendor) => (
              <option key={vendor._id} value={vendor._id}>
                {vendor.vendor_name}
              </option>
            ))}
          </InputField>

          {/* Material Name */}
          <InputField
            label="Material Name"
            icon={<FaBox className="text-blue-500" />}
            name="raw_material_name"
            placeholder="Enter material name"
            value={rawMaterial.raw_material_name}
            onChange={handleChange}
          />

          {/* Quantity */}
          <InputField
            label="Quantity"
            icon={<FaWeight className="text-yellow-500" />}
            name="quantity"
            placeholder="Enter quantity"
            value={rawMaterial.quantity}
            onChange={handleChange}
          />

          {/* Unit */}
          <InputField
            label="Unit"
            icon={<FaWeight className="text-green-500" />}
            type="select"
            name="unit"
            value={rawMaterial.unit}
            onChange={handleChange}
          >
            <option value="kg">kg</option>
            <option value="litre">litre</option>
            <option value="pieces">pieces</option>
            <option value="bags">bags</option>
            <option value="boxes">boxes</option>
          </InputField>

          {/* Dates */}
          <InputField
            label="Ordered Date"
            icon={<FaCalendarAlt className="text-teal-500" />}
            type="date"
            name="ordered_date"
            value={rawMaterial.ordered_date}
            onChange={handleChange}
          />
          <InputField
            label="Reorder Date"
            icon={<FaCalendarAlt className="text-orange-500" />}
            type="date"
            name="reorder_date"
            value={rawMaterial.reorder_date}
            onChange={handleChange}
          />
          <InputField
            label="Expiry Date"
            icon={<FaCalendarAlt className="text-red-500" />}
            type="date"
            name="expire_date"
            value={rawMaterial.expire_date}
            onChange={handleChange}
          />

          {/* Price */}
          <InputField
            label="Price per Unit"
            icon={<FaMoneyCheck className="text-green-500" />}
            name="price_per_unit"
            placeholder="Enter price per unit"
            value={rawMaterial.price_per_unit}
            onChange={handleChange}
          />

          {/* Notes */}
          <InputField
            label="Notes"
            icon={<FaStickyNote className="text-indigo-500" />}
            name="notes"
            placeholder="Add any notes"
            value={rawMaterial.notes}
            onChange={handleChange}
          />

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center justify-center w-full py-2 px-4 mt-4 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-500 rounded-md shadow hover:opacity-90 transition-opacity"
            >
              <MdSave className="mr-1" />
              Add Raw Material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, icon, type = "text", children, ...rest }) => (
  <div className="flex items-center space-x-3">
    <label className="block text-sm font-medium text-gray-900 flex items-center w-1/3">
      {icon}
      <span className="ml-2">{label}</span>
    </label>
    {type === "select" ? (
      <select
        {...rest}
        className="w-2/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
      >
        {children}
      </select>
    ) : (
      <input
        type={type}
        {...rest}
        className="w-2/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
      />
    )}
  </div>
);

export default AddRawMaterialToVendor;
