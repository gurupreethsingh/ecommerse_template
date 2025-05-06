import React, { useState, useEffect, useContext } from "react";
import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaBuilding,
  FaCity,
  FaGlobeAsia,
  FaMailBulk,
  FaFlag,
  FaStar,
} from "react-icons/fa";
import { CartContext } from "../../components/cart_components/CartContext";
import { AuthContext } from "../../components/auth_components/AuthManager";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";
import axios from "axios";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // At the top
  const [guestInfo, setGuestInfo] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
  });

  const [billing, setBilling] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isDefault: false,
  });

  const [shipping, setShipping] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isDefault: false,
  });

  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [savedBillingAddress, setSavedBillingAddress] = useState(null);
  const [savedShippingAddresses, setSavedShippingAddresses] = useState([]);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.selling_price * item.quantity,
    0
  );

  useEffect(() => {
    if (isLoggedIn) fetchSavedAddresses();
  }, [isLoggedIn]);

  const fetchSavedAddresses = async () => {
    try {
      const { data } = await axios.get(
        `${globalBackendRoute}/api/get-addresses`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const billingSaved = data.find(
        (a) => a.type === "billing" && a.isDefault
      );
      const shippingList = data.filter((a) => a.type === "shipping");

      if (billingSaved) {
        setSavedBillingAddress(billingSaved);
        setBilling({ ...billing, ...billingSaved });
      }
      if (shippingList.length > 0) {
        setSavedShippingAddresses(shippingList);
        setShipping({ ...shipping, ...shippingList[0] });
      }
    } catch (err) {
      console.error("Address fetch error:", err);
    }
  };

  const handleInputChange = (e, setter) => {
    const { name, value, type, checked } = e.target;
    setter((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const renderAddressForm = (title, address, setter) => {
    const iconMap = {
      addressLine1: [FaMapMarkerAlt, "orange", "Street, building, etc."],
      addressLine2: [FaBuilding, "blue", "Apartment, suite..."],
      city: [FaCity, "green", "City"],
      state: [FaGlobeAsia, "purple", "State"],
      postalCode: [FaMailBulk, "pink", "PIN"],
      country: [FaFlag, "red", "Country"],
    };

    return (
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaMapMarkerAlt className="text-orange-500" />
          {title}
        </h2>
        {Object.entries(iconMap).map(([key, [Icon, color, placeholder]]) => (
          <div
            key={key}
            className="flex items-center w-full gap-3 mb-2 sm:mb-0"
          >
            <label className="w-32 text-sm text-gray-700 flex items-center gap-2">
              <Icon className={`text-${color}-500`} />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="text"
              name={key}
              value={address[key] || ""}
              onChange={(e) => handleInputChange(e, setter)}
              placeholder={placeholder}
              className="flex-1 border-b border-gray-300 outline-none py-1 text-gray-800 bg-transparent"
            />
          </div>
        ))}
        <label className="flex items-center gap-2 mt-4 text-sm text-gray-600">
          <input
            type="checkbox"
            name="isDefault"
            checked={address.isDefault || false}
            onChange={(e) => handleInputChange(e, setter)}
            className="accent-orange-500"
          />
          <FaStar className="text-yellow-500" />
          Set as default
        </label>
      </div>
    );
  };

  const handlePlaceOrder = async () => {
    const finalShipping = sameAsBilling ? billing : shipping;

    if (
      !billing.addressLine1 ||
      !billing.city ||
      !finalShipping.addressLine1 ||
      !finalShipping.city
    ) {
      toast.error("Please fill all required fields in billing/shipping.");
      return;
    }

    try {
      if (isLoggedIn && !savedBillingAddress) {
        await axios.post(
          `${globalBackendRoute}/api/add-address`,
          { ...billing, type: "billing" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      if (isLoggedIn && !sameAsBilling && savedShippingAddresses.length === 0) {
        await axios.post(
          `${globalBackendRoute}/api/add-address`,
          { ...shipping, type: "shipping" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      await axios.post(
        `${globalBackendRoute}/api/place-order`,
        {
          billingAddress: billing,
          shippingAddress: finalShipping,
          items: cartItems,
          totalAmount,
          // userId: isLoggedIn ? user._id : null,
        },
        isLoggedIn
          ? {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          : {}
      );

      toast.success("Order placed successfully!");
      navigate(isLoggedIn ? "/my-orders" : "/thank-you");
      clearCart();
    } catch (err) {
      console.error("Order error:", err.message);
      toast.error("Order failed.");
    }
  };

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/150";
    const normalized = img.replace(/\\/g, "/").split("/").pop();
    return `${globalBackendRoute}/uploads/products/${normalized}`;
  };

  return (
    <div className="py-10 px-4 animate-fadeIn font-sans">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 flex items-center gap-3">
        <FaMoneyBillWave className="text-orange-500" /> Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          {renderAddressForm("Billing Address", billing, setBilling)}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={sameAsBilling}
              onChange={() => setSameAsBilling(!sameAsBilling)}
            />
            Same as Billing
          </div>
          {!sameAsBilling &&
            renderAddressForm("Shipping Address", shipping, setShipping)}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 space-y-6 self-start">
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
