// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import globalBackendRoute from "../../config/Config";
// import {
//   FaUser,
//   FaEnvelope,
//   FaPhone,
//   FaBuilding,
//   FaMapMarkerAlt,
//   FaBox,
//   FaEdit,
// } from "react-icons/fa";

// export default function SingleOutlet() {
//   const { outletId } = useParams();
//   const [outlet, setOutlet] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [updatedOutlet, setUpdatedOutlet] = useState({});

//   useEffect(() => {
//     const fetchOutletDetails = async () => {
//       try {
//         const response = await axios.get(
//           `${globalBackendRoute}/api/get-outlet-by-id/${outletId}`
//         );
//         setOutlet(response.data);
//         setUpdatedOutlet(response.data);
//       } catch (error) {
//         console.error("Error fetching outlet details:", error);
//       }
//     };

//     fetchOutletDetails();
//   }, [outletId]);

//   useEffect(() => {
//     const fetchOutletProducts = async () => {
//       try {
//         const response = await axios.get(
//           `${globalBackendRoute}/api/products-by-outlet/${outletId}`
//         );
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching outlet products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOutletProducts();
//   }, [outletId]);

//   const handleUpdateOutlet = async () => {
//     try {
//       await axios.put(
//         `${globalBackendRoute}/api/update-outlet/${outletId}`,
//         updatedOutlet
//       );
//       alert("Outlet updated successfully!");
//       setOutlet(updatedOutlet);
//       setEditMode(false);
//     } catch (error) {
//       console.error("Error updating outlet:", error);
//       alert("Failed to update outlet.");
//     }
//   };

//   const handleChange = (key, value) => {
//     setUpdatedOutlet({ ...updatedOutlet, [key]: value });
//   };

//   if (loading)
//     return <div className="text-center py-10">Loading outlet details...</div>;
//   if (!outlet) return <div className="text-center py-10">Outlet not found</div>;

//   const fields = [
//     {
//       label: "Outlet Name",
//       key: "outlet_name",
//       icon: <FaUser className="text-indigo-600 mr-2" />,
//     },
//     {
//       label: "Email",
//       key: "outlet_email",
//       icon: <FaEnvelope className="text-green-500 mr-2" />,
//     },
//     {
//       label: "Phone",
//       key: "outlet_phone",
//       icon: <FaPhone className="text-yellow-500 mr-2" />,
//     },
//     {
//       label: "Company Name",
//       key: "company_name",
//       icon: <FaBuilding className="text-blue-600 mr-2" />,
//     },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg">
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         <div>
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="headingTextMobile">Outlet Information</h3>
//             <Link to="/all-outlets">
//               <button className="fileUploadBtn text-xs py-1 px-3">
//                 Go to All Outlets
//               </button>
//             </Link>
//           </div>

//           <div className="border-t border-gray-200 mt-4">
//             <dl className="divide-y divide-gray-100">
//               {fields.map((field, idx) => (
//                 <div
//                   key={idx}
//                   className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4"
//                 >
//                   <dt className="flex items-center text-sm font-medium text-gray-900">
//                     {field.icon}
//                     {field.label}
//                   </dt>
//                   <dd className="text-sm text-gray-700 sm:col-span-2 mt-1 sm:mt-0">
//                     {editMode ? (
//                       <input
//                         type="text"
//                         value={updatedOutlet[field.key] || ""}
//                         onChange={(e) =>
//                           handleChange(field.key, e.target.value)
//                         }
//                         className="formInput"
//                       />
//                     ) : (
//                       outlet[field.key]
//                     )}
//                   </dd>
//                 </div>
//               ))}

//               <div className="px-4 py-4 flex justify-end">
//                 <button
//                   onClick={() =>
//                     editMode ? handleUpdateOutlet() : setEditMode(true)
//                   }
//                   className="primaryBtn w-auto px-4 py-2"
//                 >
//                   {editMode ? "Save Changes" : <FaEdit className="mr-1" />}
//                 </button>
//               </div>
//             </dl>
//           </div>
//         </div>

//         <div>
//           <h3 className="headingTextMobile mb-4">
//             Products ({products.length})
//           </h3>
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//             {products.length > 0 ? (
//               products.map((product, index) => (
//                 <div
//                   key={product._id || index}
//                   className={`rounded-lg shadow p-4 flex flex-col items-center text-center ${
//                     product.stock <= 5
//                       ? "bg-red-500 text-white animate-pulse"
//                       : product.stock <= 20
//                       ? "bg-yellow-300 text-gray-900"
//                       : "bg-green-200 text-gray-900"
//                   }`}
//                 >
//                   {product.product_image ? (
//                     <img
//                       src={`${globalBackendRoute}/${product.product_image.replace(
//                         /\\/g,
//                         "/"
//                       )}`}
//                       alt={product.product_name}
//                       className="h-16 w-16 object-cover rounded-full mb-2"
//                     />
//                   ) : (
//                     <FaBox className="text-3xl" />
//                   )}
//                   <p className="mt-2 text-sm font-medium">
//                     {product.product_name}
//                   </p>
//                   <p className="mt-1 text-xs">
//                     Stock: {product.stock || "N/A"}
//                   </p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">
//                 No products available for this outlet.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import globalBackendRoute from "../../config/Config";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaMapMarkerAlt,
  FaBox,
  FaEdit,
} from "react-icons/fa";

export default function SingleOutlet() {
  const { outletId } = useParams();
  const [outlet, setOutlet] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedOutlet, setUpdatedOutlet] = useState({});

  useEffect(() => {
    const fetchOutletDetails = async () => {
      try {
        const response = await axios.get(
          `${globalBackendRoute}/api/get-outlet-by-id/${outletId}`
        );
        setOutlet(response.data);
        setUpdatedOutlet(response.data);
      } catch (error) {
        console.error("Error fetching outlet details:", error);
      }
    };
    fetchOutletDetails();
  }, [outletId]);

  useEffect(() => {
    const fetchOutletProducts = async () => {
      try {
        const response = await axios.get(
          `${globalBackendRoute}/api/products-by-outlet/${outletId}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching outlet products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOutletProducts();
  }, [outletId]);

  const handleUpdateOutlet = async () => {
    try {
      await axios.put(
        `${globalBackendRoute}/api/update-outlet/${outletId}`,
        updatedOutlet
      );
      alert("Outlet updated successfully!");
      setOutlet(updatedOutlet);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating outlet:", error);
      alert("Failed to update outlet.");
    }
  };

  const handleChange = (key, value) => {
    setUpdatedOutlet({ ...updatedOutlet, [key]: value });
  };

  if (loading)
    return <div className="text-center py-10">Loading outlet details...</div>;
  if (!outlet) return <div className="text-center py-10">Outlet not found</div>;

  const fields = [
    {
      label: "Outlet Name",
      key: "outlet_name",
      icon: <FaUser className="text-indigo-600 mr-2" />,
    },
    {
      label: "Email",
      key: "outlet_email",
      icon: <FaEnvelope className="text-green-500 mr-2" />,
    },
    {
      label: "Phone",
      key: "outlet_phone",
      icon: <FaPhone className="text-yellow-500 mr-2" />,
    },
    {
      label: "Company Name",
      key: "company_name",
      icon: <FaBuilding className="text-blue-600 mr-2" />,
    },
  ];

  return (
    <div className="bg-white py-10">
      <div className="containerWidth">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap gap-4 mb-6">
          <h2 className="headingText flex items-center gap-2">
            Outlet Details
            <span className="text-sm font-normal text-gray-600">
              ({products.length} products)
            </span>
          </h2>
          <Link to="/all-outlets">
            <button className="fileUploadBtn py-1 px-3 text-sm">
              Back to All Outlets
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left - Outlet Info */}
          <div className="bg-white border rounded-lg shadow-sm p-6">
            <h3 className="subHeadingText mb-4">Outlet Information</h3>
            <div className="divide-y divide-gray-200">
              {fields.map((field, idx) => (
                <div
                  key={idx}
                  className="py-4 flex flex-col sm:flex-row sm:items-center sm:gap-4"
                >
                  <dt className="flex items-center text-sm font-medium text-gray-900 w-40">
                    {field.icon}
                    {field.label}
                  </dt>
                  <dd className="text-sm text-gray-700 mt-2 sm:mt-0 w-full">
                    {editMode ? (
                      <input
                        type="text"
                        value={updatedOutlet[field.key] || ""}
                        onChange={(e) =>
                          handleChange(field.key, e.target.value)
                        }
                        className="formInput w-full"
                      />
                    ) : (
                      outlet[field.key]
                    )}
                  </dd>
                </div>
              ))}

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() =>
                    editMode ? handleUpdateOutlet() : setEditMode(true)
                  }
                  className="primaryBtn px-5 py-2 text-sm"
                >
                  {editMode ? "Save Changes" : "Edit"}
                </button>
              </div>
            </div>
          </div>

          {/* Right - Product Cards */}
          <div>
            <h3 className="subHeadingText mb-4">Outlet Products</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <div
                    key={product._id || index}
                    className={`rounded-lg shadow p-4 flex flex-col items-center text-center transition ${
                      product.stock <= 5
                        ? "bg-red-100 border border-red-400 animate-pulse"
                        : product.stock <= 20
                        ? "bg-yellow-100 border border-yellow-400"
                        : "bg-green-100 border border-green-400"
                    }`}
                  >
                    {product.product_image ? (
                      <img
                        src={`${globalBackendRoute}/${product.product_image.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt={product.product_name}
                        className="h-16 w-16 object-cover rounded-full mb-2"
                      />
                    ) : (
                      <FaBox className="text-3xl text-gray-500 mb-2" />
                    )}
                    <p className="text-sm font-medium">
                      {product.product_name}
                    </p>
                    <p className="text-xs mt-1">Stock: {product.stock}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No products available for this outlet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
