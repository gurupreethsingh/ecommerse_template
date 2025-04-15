import React, { useState } from "react";

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (input) => {
    const trimmed = input.trim();

    if (trimmed === "") {
      return "Please enter your email to subscribe.";
    }

    if (input !== trimmed) {
      return "Email cannot start or end with spaces.";
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
      console.log("Subscribed with:", email);
      setEmail("");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="font-bold text-lg text-gray-800">SUBSCRIBE</p>
      <p className="text-xs text-gray-500 m-2">
        Get weekly updates delivered to your inbox.
      </p>

      <form className="relative w-full max-w-md" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={`w-full px-5 py-3 pr-32 bg-white/70 text-sm text-gray-900 placeholder-gray-500 rounded border ${
            error ? "border-red-500" : "border-gray-300"
          } shadow-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
        />
        <button
          type="submit"
          className="absolute right-1 top-1 bottom-1 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded shadow hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
        >
          Subscribe
        </button>
      </form>

      {error && (
        <p className="text-sm text-red-500 mt-2 font-medium">{error}</p>
      )}
    </div>
  );
};

export default SubscriptionForm;
