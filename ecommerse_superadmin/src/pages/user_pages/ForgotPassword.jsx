import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaKey } from "react-icons/fa";
import globalBackendRoute from "../../config/Config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(
        `${globalBackendRoute}/api/forgot-password`,
        { email }
      );
      alert("OTP sent successfully to your email!");
      setOtpSent(true);
      setError("");
    } catch (error) {
      console.error(
        "OTP sending error:",
        error.response?.data || error.message
      );
      setOtpSent(false);
      setError("Failed to send OTP. Please check your email and try again.");
      alert("Failed to send OTP. Check email or try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post(`${globalBackendRoute}/api/verify-otp`, { email, otp });
      alert("OTP verified! Redirecting to reset password page...");
      navigate("/reset-password", { state: { email, otp } });
    } catch (error) {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="compactWidth py-12">
      {/* Header */}
      <div className="text-center">
        <FaKey className="iconPrimary mx-auto" size={48} />
        <h2 className="headingTextMobile lg:headingText mt-4">
          Forgot Password
        </h2>
      </div>

      {/* Form */}
      <form className="mt-10 space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="formLabel flex items-center gap-2">
            <FaEnvelope className="text-blue-500" />
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="formInput mt-2"
            placeholder="Enter your registered email"
          />
        </div>

        {/* Send OTP Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleSendOtp}
            className="primaryBtn w-auto px-6"
          >
            Send OTP
          </button>
        </div>

        {/* OTP Input */}
        {otpSent && (
          <>
            <div>
              <label
                htmlFor="otp"
                className="formLabel flex items-center gap-2"
              >
                <FaKey className="text-purple-500" />
                OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="formInput mt-2"
              />
            </div>

            {/* Verify OTP Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="primaryBtn w-auto px-6"
              >
                Verify OTP
              </button>
            </div>
          </>
        )}

        {/* Error Message */}
        {error && <p className="errorText text-center">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
