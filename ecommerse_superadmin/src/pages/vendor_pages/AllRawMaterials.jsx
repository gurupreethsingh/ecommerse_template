// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaEdit, FaSave } from "react-icons/fa";

// const AllRawMaterials = () => {
//   const [rawMaterials, setRawMaterials] = useState([]); // List of raw materials
//   const [filteredMaterials, setFilteredMaterials] = useState([]); // Search results
//   const [selectedMaterial, setSelectedMaterial] = useState(null); // Selected material
//   const [searchQuery, setSearchQuery] = useState(""); // Search query
//   const [updateData, setUpdateData] = useState({}); // Data to update

//   // Fetch raw materials when the component mounts
//   useEffect(() => {
//     fetchRawMaterials();
//   }, []);

//   // Function to fetch all raw materials
//   const fetchRawMaterials = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3006/api/all-raw-materials"
//       );
//       setRawMaterials(response.data);
//       setFilteredMaterials(response.data);
//     } catch (error) {
//       console.error("Error fetching raw materials:", error);
//     }
//   };

//   // Handle search input
//   const handleSearch = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     setFilteredMaterials(
//       rawMaterials.filter((material) =>
//         material.raw_material_name.toLowerCase().includes(query.toLowerCase())
//       )
//     );
//   };

//   // Handle material click to fetch details
//   const handleMaterialClick = async (id) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3006/api/raw-material/${id}`
//       );
//       setSelectedMaterial(response.data); // Set selected material details
//       setUpdateData(response.data); // Pre-fill update form with material details
//     } catch (error) {
//       console.error("Error fetching material details:", error);
//     }
//   };

//   // Handle input change in the update form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdateData({ ...updateData, [name]: value });
//   };

//   // Handle update material
//   const handleUpdateMaterial = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `http://localhost:3006/api/raw-material/${selectedMaterial._id}/ordered-history`,
//         {
//           quantity: updateData.quantity,
//           total_cost: updateData.quantity * updateData.price_per_unit,
//         }
//       );

//       await axios.put(
//         `http://localhost:3006/api/raw-material/${selectedMaterial._id}/reorder-history`,
//         {
//           quantity: updateData.quantity,
//         }
//       );

//       await axios.put(
//         `http://localhost:3006/api/raw-material/${selectedMaterial._id}/refilling-history`,
//         {
//           quantity: updateData.quantity,
//         }
//       );

//       await axios.put(
//         `http://localhost:3006/api/raw-material/${selectedMaterial._id}/status-history`,
//         {
//           status: updateData.status,
//           notes: updateData.notes,
//         }
//       );

//       alert("Raw material updated successfully!");
//       fetchRawMaterials(); // Reload the list
//       handleMaterialClick(selectedMaterial._id); // Reload details
//     } catch (error) {
//       console.error("Error updating raw material:", error);
//       alert("Failed to update raw material. Please try again.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-5">
//       {/* Top Section */}
//       <div className="flex justify-between items-center mb-5">
//         <h1 className="text-2xl font-bold">All Raw Materials</h1>
//         <input
//           type="text"
//           placeholder="Search raw material..."
//           value={searchQuery}
//           onChange={handleSearch}
//           className="border p-2 rounded w-1/3"
//         />
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//         {/* Left Section: List of Raw Materials */}
//         <div className="col-span-1 border-r">
//           <h2 className="font-semibold mb-3">Raw Material List</h2>
//           <ul>
//             {filteredMaterials.length > 0 ? (
//               filteredMaterials.map((material) => (
//                 <li
//                   key={material._id}
//                   className="cursor-pointer p-2 hover:bg-gray-200"
//                   onClick={() => handleMaterialClick(material._id)}
//                 >
//                   {material.raw_material_name}
//                 </li>
//               ))
//             ) : (
//               <p>No raw materials found.</p>
//             )}
//           </ul>
//         </div>

//         {/* Middle Section: Details and History */}
//         <div className="col-span-1">
//           {selectedMaterial ? (
//             <div>
//               <h2 className="text-xl font-bold mb-3">
//                 {selectedMaterial.raw_material_name} Details
//               </h2>
//               <p>
//                 <strong>Vendor:</strong> {selectedMaterial.vendor?.vendor_name}
//               </p>
//               <p>
//                 <strong>Quantity:</strong> {selectedMaterial.quantity}{" "}
//                 {selectedMaterial.unit}
//               </p>
//               <p>
//                 <strong>Expire Date:</strong>{" "}
//                 {new Date(selectedMaterial.expire_date).toDateString()}
//               </p>
//               <p>
//                 <strong>Price Per Unit:</strong> $
//                 {selectedMaterial.price_per_unit}
//               </p>
//               <p>
//                 <strong>Total Cost:</strong> $
//                 {(
//                   selectedMaterial.quantity * selectedMaterial.price_per_unit
//                 ).toFixed(2)}
//               </p>
//               <p>
//                 <strong>Notes:</strong> {selectedMaterial.notes || "N/A"}
//               </p>
//               <p>
//                 <strong>Status:</strong> {selectedMaterial.status}
//               </p>

//               {/* History */}
//               <h3 className="font-semibold mt-4">History</h3>
//               <ul className="mb-3">
//                 <li>
//                   <strong>Ordered History:</strong>
//                 </li>
//                 {selectedMaterial.ordered_history.map((entry, index) => (
//                   <li key={index}>
//                     Ordered {entry.quantity} units on{" "}
//                     {new Date(entry.ordered_date).toDateString()}
//                   </li>
//                 ))}
//                 <li>
//                   <strong>Reorder History:</strong>
//                 </li>
//                 {selectedMaterial.reorder_history.map((entry, index) => (
//                   <li key={index}>
//                     Reordered {entry.quantity} units on{" "}
//                     {new Date(entry.reorder_date).toDateString()}
//                   </li>
//                 ))}
//                 <li>
//                   <strong>Refilling History:</strong>
//                 </li>
//                 {selectedMaterial.refilling_history.map((entry, index) => (
//                   <li key={index}>
//                     Refilled {entry.quantity} units on{" "}
//                     {new Date(entry.refilling_date).toDateString()}
//                   </li>
//                 ))}
//                 <li>
//                   <strong>Status History:</strong>
//                 </li>
//                 {selectedMaterial.status_history.map((entry, index) => (
//                   <li key={index}>
//                     {entry.status} - {entry.notes || "No Notes"} (Updated on{" "}
//                     {new Date(entry.updated_at).toDateString()})
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ) : (
//             <p>Select a raw material to view details.</p>
//           )}
//         </div>

//         {/* Right Section: Update Form */}
//         <div className="col-span-1 bg-gray-50 p-5 rounded-lg shadow-md">
//           {selectedMaterial && (
//             <form onSubmit={handleUpdateMaterial}>
//               <h3 className="text-xl font-semibold mb-4">
//                 Update Raw Material
//               </h3>
//               <InputField
//                 label="Quantity"
//                 name="quantity"
//                 value={updateData.quantity || ""}
//                 onChange={handleInputChange}
//               />
//               <InputField
//                 label="Unit"
//                 name="unit"
//                 value={updateData.unit || ""}
//                 onChange={handleInputChange}
//               />
//               <InputField
//                 label="Price Per Unit"
//                 name="price_per_unit"
//                 value={updateData.price_per_unit || ""}
//                 onChange={handleInputChange}
//               />
//               <InputField
//                 label="Expire Date"
//                 name="expire_date"
//                 type="date"
//                 value={updateData.expire_date || ""}
//                 onChange={handleInputChange}
//               />
//               <InputField
//                 label="Notes"
//                 name="notes"
//                 value={updateData.notes || ""}
//                 onChange={handleInputChange}
//               />

//               <button
//                 type="submit"
//                 className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600"
//               >
//                 <FaSave className="inline mr-2" />
//                 Save Changes
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Reusable Input Field Component
// const InputField = ({ label, name, value, onChange }) => (
//   <div className="mb-4">
//     <label className="block text-sm font-medium text-gray-700">{label}</label>
//     <input
//       type="text"
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//     />
//   </div>
// );

// export default AllRawMaterials;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaSave } from "react-icons/fa";

const AllRawMaterials = () => {
  const [rawMaterials, setRawMaterials] = useState([]); // List of raw materials
  const [filteredMaterials, setFilteredMaterials] = useState([]); // Search results
  const [selectedMaterial, setSelectedMaterial] = useState(null); // Selected material
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [updateData, setUpdateData] = useState({}); // Data to update

  // Fetch raw materials when the component mounts
  useEffect(() => {
    fetchRawMaterials();
  }, []);

  // Function to fetch all raw materials
  const fetchRawMaterials = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3006/api/all-raw-materials"
      );
      setRawMaterials(response.data);
      setFilteredMaterials(response.data);
    } catch (error) {
      console.error("Error fetching raw materials:", error);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredMaterials(
      rawMaterials.filter((material) =>
        material.raw_material_name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  // Handle material click to fetch details
  const handleMaterialClick = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3006/api/raw-material/${id}`
      );
      setSelectedMaterial(response.data); // Set selected material details
      setUpdateData(response.data); // Pre-fill update form with material details
    } catch (error) {
      console.error("Error fetching material details:", error);
    }
  };

  // Handle input change in the update form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  // Handle update material
  const handleUpdateMaterial = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3006/api/raw-material/${selectedMaterial._id}/ordered-history`,
        {
          quantity: updateData.quantity,
          total_cost: updateData.quantity * updateData.price_per_unit,
        }
      );

      await axios.put(
        `http://localhost:3006/api/raw-material/${selectedMaterial._id}/reorder-history`,
        {
          quantity: updateData.quantity,
        }
      );

      await axios.put(
        `http://localhost:3006/api/raw-material/${selectedMaterial._id}/refilling-history`,
        {
          quantity: updateData.quantity,
        }
      );

      await axios.put(
        `http://localhost:3006/api/raw-material/${selectedMaterial._id}/status-history`,
        {
          status: updateData.status,
          notes: updateData.notes,
        }
      );

      alert("Raw material updated successfully!");
      fetchRawMaterials(); // Reload the list
      handleMaterialClick(selectedMaterial._id); // Reload details
    } catch (error) {
      console.error("Error updating raw material:", error);
      alert("Failed to update raw material. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-5">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">All Raw Materials</h1>
        <input
          type="text"
          placeholder="Search raw material..."
          value={searchQuery}
          onChange={handleSearch}
          className="border p-2 rounded w-1/3"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left Section: List of Raw Materials */}
        <div className="col-span-1 border-r">
          <h2 className="font-semibold mb-3">Raw Material List</h2>
          <ul>
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((material) => (
                <li
                  key={material._id}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                  onClick={() => handleMaterialClick(material._id)}
                >
                  {material.raw_material_name}
                </li>
              ))
            ) : (
              <p>No raw materials found.</p>
            )}
          </ul>
        </div>

        {/* Middle Section: Details and History */}
        <div className="col-span-1">
          {selectedMaterial ? (
            <div>
              <h2 className="text-xl font-bold mb-3">
                {selectedMaterial.raw_material_name} Details
              </h2>
              <p>
                <strong>Vendor:</strong> {selectedMaterial.vendor?.vendor_name}
              </p>
              <p>
                <strong>Quantity:</strong> {selectedMaterial.quantity}{" "}
                {selectedMaterial.unit}
              </p>
              <p>
                <strong>Expire Date:</strong>{" "}
                {new Date(selectedMaterial.expire_date).toDateString()}
              </p>
              <p>
                <strong>Price Per Unit:</strong> ₹
                {selectedMaterial.price_per_unit}
              </p>
              <p>
                <strong>Total Cost:</strong> ₹
                {(
                  selectedMaterial.quantity * selectedMaterial.price_per_unit
                ).toFixed(2)}
              </p>
              <p>
                <strong>Notes:</strong> {selectedMaterial.notes || "N/A"}
              </p>
              <p>
                <strong>Status:</strong> {selectedMaterial.status}
              </p>

              {/* History */}
              <h3 className="font-semibold mt-4">History</h3>
              <ul className="mb-3">
                <li>
                  <strong>Ordered History:</strong>
                </li>
                {selectedMaterial.ordered_history.map((entry, index) => (
                  <li key={index}>
                    Ordered {entry.quantity} units on{" "}
                    {new Date(entry.ordered_date).toDateString()}
                  </li>
                ))}
                <li>
                  <strong>Reorder History:</strong>
                </li>
                {selectedMaterial.reorder_history.map((entry, index) => (
                  <li key={index}>
                    Reordered {entry.quantity} units on{" "}
                    {new Date(entry.reorder_date).toDateString()}
                  </li>
                ))}
                <li>
                  <strong>Refilling History:</strong>
                </li>
                {selectedMaterial.refilling_history.map((entry, index) => (
                  <li key={index}>
                    Refilled {entry.quantity} units on{" "}
                    {new Date(entry.refilling_date).toDateString()}
                  </li>
                ))}
                <li>
                  <strong>Status History:</strong>
                </li>
                {selectedMaterial.status_history.map((entry, index) => (
                  <li key={index}>
                    {entry.status} - {entry.notes || "No Notes"} (Updated on{" "}
                    {new Date(entry.updated_at).toDateString()})
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Select a raw material to view details.</p>
          )}
        </div>

        {/* Right Section: Update Form */}
        <div className="col-span-1 bg-gray-50 p-5 rounded-lg shadow-md">
          {selectedMaterial && (
            <form onSubmit={handleUpdateMaterial}>
              <h3 className="text-xl font-semibold mb-4">
                Update Raw Material
              </h3>
              <InputField
                label="Quantity"
                name="quantity"
                value={updateData.quantity || ""}
                onChange={handleInputChange}
              />
              <InputField
                label="Unit"
                name="unit"
                value={updateData.unit || ""}
                onChange={handleInputChange}
              />
              <InputField
                label="Price Per Unit"
                name="price_per_unit"
                value={updateData.price_per_unit || ""}
                onChange={handleInputChange}
              />
              <InputField
                label="Expire Date"
                name="expire_date"
                type="date"
                value={updateData.expire_date || ""}
                onChange={handleInputChange}
              />
              <InputField
                label="Notes"
                name="notes"
                value={updateData.notes || ""}
                onChange={handleInputChange}
              />

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600"
              >
                <FaSave className="inline mr-2" />
                Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, name, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
);

export default AllRawMaterials;
