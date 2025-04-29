import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const ThankYou = () => {
  return (
    <div className="containerWidth flex flex-col items-center justify-center min-h-[80vh] text-center animate-fadeIn">
      <FaCheckCircle className="text-green-500 text-7xl mb-6" />
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
        Thank You for Your Order!
      </h1>
      <p className="text-gray-600 mb-8">
        We have received your order. We will process and ship it soon.
      </p>
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold hover:opacity-90 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default ThankYou;
