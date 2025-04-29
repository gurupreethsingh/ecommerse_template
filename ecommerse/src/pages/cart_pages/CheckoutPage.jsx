// import React, { useState, useEffect, useContext } from "react";
// import { CartContext } from "../../components/cart_components/CartContext";
// import { AuthContext } from "../../components/auth_components/AuthManager";
// import {
//   FaHome,
//   FaShippingFast,
//   FaMoneyBillWave,
//   FaAddressCard,
//   FaPlusCircle,
//   FaShoppingCart,
// } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import globalBackendRoute from "../../config/Config";
// import axios from "axios";

// const CheckoutPage = () => {
//   const { cartItems, clearCart } = useContext(CartContext);
//   const { isLoggedIn, user } = useContext(AuthContext);

//   const [billingAddress, setBillingAddress] = useState("");
//   const [shippingAddress, setShippingAddress] = useState("");
//   const [sameAsBilling, setSameAsBilling] = useState(false);
//   const [previousAddresses, setPreviousAddresses] = useState([]);
//   const [selectedShippingAddress, setSelectedShippingAddress] = useState("");

//   const totalAmount = cartItems.reduce(
//     (total, item) => total + item.selling_price * item.quantity,
//     0
//   );

//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchPreviousAddresses();
//     }
//   }, [isLoggedIn]);

//   const fetchPreviousAddresses = async () => {
//     try {
//       const { data } = await axios.get(
//         `${globalBackendRoute}/api/get-addresses`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       setPreviousAddresses(data || []);
//     } catch (error) {
//       console.error("Failed to load addresses:", error.message);
//     }
//   };

//   const saveNewAddress = async (addressType, addressValue) => {
//     try {
//       await axios.post(
//         `${globalBackendRoute}/api/add-address`,
//         {
//           type: addressType,
//           address: addressValue,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       fetchPreviousAddresses();
//       toast.success(`${addressType} address saved!`);
//     } catch (error) {
//       toast.error("Failed to save address");
//     }
//   };

//   const handlePlaceOrder = async () => {
//     if (
//       !billingAddress ||
//       (!sameAsBilling && !shippingAddress && !selectedShippingAddress)
//     ) {
//       toast.error("Please fill in all required address fields.");
//       return;
//     }

//     const finalShipping = sameAsBilling
//       ? billingAddress
//       : selectedShippingAddress || shippingAddress;

//     const orderData = {
//       billingAddress,
//       shippingAddress: finalShipping,
//       items: cartItems,
//       totalAmount,
//       user: isLoggedIn ? user._id : "Guest",
//     };

//     try {
//       await axios.post(`${globalBackendRoute}/api/place-order`, orderData);
//       toast.success("Order placed successfully!");
//       clearCart();
//     } catch (error) {
//       toast.error("Failed to place order.");
//     }
//   };

//   return (
//     <div className="containerWidth py-10 px-4 animate-fadeIn">
//       <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide mb-8 flex items-center gap-3">
//         <FaMoneyBillWave className="text-green-500" />
//         Checkout
//       </h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         {/* LEFT COLUMN */}
//         <div className="space-y-8">
//           {/* Billing Address */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white p-6 rounded-lg shadow space-y-4"
//           >
//             <h2 className="flex items-center gap-2 text-xl font-bold text-gray-700 mb-4">
//               <FaAddressCard /> Billing Address
//             </h2>
//             <textarea
//               className="w-full p-4 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
//               placeholder="Enter billing address..."
//               value={billingAddress}
//               onChange={(e) => setBillingAddress(e.target.value)}
//               rows="4"
//             ></textarea>

//             {isLoggedIn && billingAddress && (
//               <button
//                 onClick={() => saveNewAddress("Billing", billingAddress)}
//                 className="text-sm text-green-700 flex items-center gap-2"
//               >
//                 <FaPlusCircle /> Save Billing Address
//               </button>
//             )}
//           </motion.div>

//           {/* Shipping Address */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white p-6 rounded-lg shadow space-y-4"
//           >
//             <div className="flex items-center justify-between">
//               <h2 className="flex items-center gap-2 text-xl font-bold text-gray-700">
//                 <FaShippingFast /> Shipping Address
//               </h2>
//               <label className="flex items-center gap-2 text-sm text-gray-600">
//                 <input
//                   type="checkbox"
//                   checked={sameAsBilling}
//                   onChange={() => setSameAsBilling(!sameAsBilling)}
//                 />
//                 Same as billing
//               </label>
//             </div>

//             {isLoggedIn && previousAddresses.length > 0 ? (
//               <div className="space-y-2">
//                 {previousAddresses.map((address) => (
//                   <label
//                     key={address._id}
//                     className="flex items-start gap-2 cursor-pointer"
//                   >
//                     <input
//                       type="radio"
//                       name="shipping"
//                       value={address.address}
//                       checked={selectedShippingAddress === address.address}
//                       onChange={(e) =>
//                         setSelectedShippingAddress(e.target.value)
//                       }
//                     />
//                     <span>{address.address}</span>
//                   </label>
//                 ))}
//               </div>
//             ) : (
//               <textarea
//                 className="w-full p-4 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
//                 placeholder="Enter shipping address..."
//                 value={shippingAddress}
//                 onChange={(e) => setShippingAddress(e.target.value)}
//                 rows="4"
//                 disabled={sameAsBilling}
//               ></textarea>
//             )}

//             {isLoggedIn && shippingAddress && !sameAsBilling && (
//               <button
//                 onClick={() => saveNewAddress("Shipping", shippingAddress)}
//                 className="text-sm text-green-700 flex items-center gap-2"
//               >
//                 <FaPlusCircle /> Save Shipping Address
//               </button>
//             )}
//           </motion.div>
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="bg-white p-6 rounded-lg shadow space-y-6">
//           <h2 className="flex items-center gap-2 text-xl font-bold text-gray-700">
//             <FaShoppingCart /> Your Cart
//           </h2>

//           {cartItems.map((item) => (
//             <div
//               key={item._id}
//               className="flex justify-between items-center border-b pb-3"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={`${globalBackendRoute}/uploads/products/${item.product_image}`}
//                   alt={item.product_name}
//                   className="w-16 h-16 object-cover rounded-lg"
//                 />
//                 <div>
//                   <p className="font-bold text-gray-800">{item.product_name}</p>
//                   <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
//                 </div>
//               </div>
//               <p className="font-bold text-green-600 flex items-center">
//                 <FaMoneyBillWave /> {item.selling_price * item.quantity}
//               </p>
//             </div>
//           ))}

//           <div className="flex justify-between items-center mt-6">
//             <h3 className="text-2xl font-bold text-gray-700">Total</h3>
//             <h3 className="text-2xl font-bold text-green-600 flex items-center">
//               <FaMoneyBillWave /> {totalAmount.toFixed(2)}
//             </h3>
//           </div>

//           <button
//             onClick={handlePlaceOrder}
//             className="w-full mt-6 bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-full font-bold text-lg hover:opacity-90 transition"
//           >
//             Place Order
//           </button>
//         </div>
//       </div>

//       <div className="mt-10 text-center">
//         <Link
//           to="/shop"
//           className="text-sm text-blue-600 underline hover:text-blue-800"
//         >
//           &larr; Back to Shop
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

//

import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../components/cart_components/CartContext";
import { AuthContext } from "../../components/auth_components/AuthManager";
import {
  FaShippingFast,
  FaMoneyBillWave,
  FaAddressCard,
  FaPlusCircle,
  FaShoppingCart,
  FaArrowLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";
import axios from "axios";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [previousAddresses, setPreviousAddresses] = useState([]);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState("");

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.selling_price * item.quantity,
    0
  );

  useEffect(() => {
    if (isLoggedIn) fetchPreviousAddresses();
  }, [isLoggedIn]);

  const fetchPreviousAddresses = async () => {
    try {
      const { data } = await axios.get(
        `${globalBackendRoute}/api/get-addresses`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPreviousAddresses(data || []);
    } catch (error) {
      console.error("Failed to load addresses:", error.message);
    }
  };

  const formatFullAddress = (addr) => {
    return `${addr.addressLine1}, ${addr.addressLine2 || ""}, ${addr.city}, ${
      addr.state || ""
    }, ${addr.postalCode}, ${addr.country}`
      .replace(/,\s*,/g, ",")
      .trim();
  };

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/150";
    const normalized = img.replace(/\\/g, "/").split("/").pop();
    return `${globalBackendRoute}/uploads/products/${normalized}`;
  };

  const handlePlaceOrder = async () => {
    if (
      !billingAddress ||
      (!sameAsBilling && !shippingAddress && !selectedShippingAddress)
    ) {
      toast.error("Please fill in all required address fields.");
      return;
    }

    const finalShipping = sameAsBilling
      ? billingAddress
      : selectedShippingAddress || shippingAddress;

    const orderData = {
      billingAddress,
      shippingAddress: finalShipping,
      items: cartItems,
      totalAmount,
      userId: isLoggedIn && user ? user._id : null,
    };

    try {
      await axios.post(`${globalBackendRoute}/api/place-order`, orderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Order placed successfully!");
      if (isLoggedIn) {
        navigate("/my-orders");
      } else {
        navigate("/thank-you");
      }
      clearCart();
    } catch (error) {
      toast.error("Failed to place order.");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="containerWidth py-10 px-4 animate-fadeIn font-sans">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 flex items-center gap-3">
        <FaMoneyBillWave className="text-orange-500" /> Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT COLUMN */}
        <div className="space-y-8">
          <motion.div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
              <FaAddressCard /> Billing Address
            </h2>
            <textarea
              className="w-full p-4 border rounded-lg text-gray-700 focus:ring-2 focus:ring-orange-400"
              placeholder="Enter billing address..."
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              rows="4"
            />
          </motion.div>

          <motion.div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaShippingFast /> Shipping Address
              </h2>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={sameAsBilling}
                  onChange={() => setSameAsBilling(!sameAsBilling)}
                />
                Same as billing
              </label>
            </div>

            {isLoggedIn && previousAddresses.length > 0 ? (
              <div className="space-y-2">
                {previousAddresses.map((address) => (
                  <label
                    key={address._id}
                    className="flex items-start gap-2 cursor-pointer text-gray-700"
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={formatFullAddress(address)}
                      checked={
                        selectedShippingAddress === formatFullAddress(address)
                      }
                      onChange={(e) =>
                        setSelectedShippingAddress(e.target.value)
                      }
                    />
                    <span>{formatFullAddress(address)}</span>
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                className="w-full p-4 border rounded-lg text-gray-700 focus:ring-2 focus:ring-orange-400"
                placeholder="Enter shipping address..."
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                rows="4"
                disabled={sameAsBilling}
              ></textarea>
            )}
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 space-y-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaShoppingCart /> Your Cart
          </h2>

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={getImageUrl(item.product_image)}
                  alt={item.product_name}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {item.product_name}
                  </p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold text-black text-lg">
                ₹{item.selling_price * item.quantity}
              </p>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <h3 className="text-xl font-bold text-gray-700">Total</h3>
            <h3 className="text-xl font-bold text-black">
              ₹{totalAmount.toFixed(2)}
            </h3>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:opacity-90 transition text-lg"
          >
            Place Order
          </button>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link to="/shop">
          <button className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition text-sm font-medium">
            <FaArrowLeft /> Back to Shop
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPage;
