// SubscriptionForm.jsx
import React, { useState } from "react";

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (input) => {
    const trimmed = input.trim();
    if (trimmed === "") {
      return "Please enter your email.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(trimmed)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMsg = validateEmail(email);
    if (errorMsg) {
      setError(errorMsg);
    } else {
      setError("");
      alert("✅ Subscription successful!");
      setEmail("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className={`w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border border-red-500" : ""
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white rounded transition"
      >
        Subscribe
      </button>
    </form>
  );
};

export default SubscriptionForm;
