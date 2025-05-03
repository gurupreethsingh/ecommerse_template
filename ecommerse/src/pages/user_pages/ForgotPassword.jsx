// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaEnvelope, FaKey } from "react-icons/fa";
// import globalBackendRoute from "../../config/Config";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSendOtp = async () => {
//     try {
//       const response = await axios.post(
//         `${globalBackendRoute}/api/forgot-password`,
//         { email }
//       );
//       alert("OTP sent successfully to your email!");
//       setOtpSent(true);
//       setError("");
//     } catch (error) {
//       console.error(
//         "OTP sending error:",
//         error.response?.data || error.message
//       );
//       setOtpSent(false);
//       setError("Failed to send OTP. Please check your email and try again.");
//       alert("Failed to send OTP. Check email or try again.");
//     }
//   };

//   const handleVerifyOtp = async () => {
//     try {
//       await axios.post(`${globalBackendRoute}/api/verify-otp`, { email, otp });
//       alert("OTP verified! Redirecting to reset password page...");
//       navigate("/reset-password", { state: { email, otp } });
//     } catch (error) {
//       setError("Invalid OTP. Please try again.");
//     }
//   };

//   return (
//     <div className="compactWidth py-12">
//       {/* Header */}
//       <div className="text-center">
//         <FaKey className="iconPrimary mx-auto" size={48} />
//         <h2 className="headingTextMobile lg:headingText mt-4">
//           Forgot Password
//         </h2>
//       </div>

//       {/* Form */}
//       <form className="mt-10 space-y-6">
//         {/* Email */}
//         <div>
//           <label htmlFor="email" className="formLabel flex items-center gap-2">
//             <FaEnvelope className="text-blue-500" />
//             Email address
//           </label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             autoComplete="email"
//             className="formInput mt-2"
//             placeholder="Enter your registered email"
//           />
//         </div>

//         {/* Send OTP Button */}
//         <div className="text-center">
//           <button
//             type="button"
//             onClick={handleSendOtp}
//             className="primaryBtn w-auto px-6"
//           >
//             Send OTP
//           </button>
//         </div>

//         {/* OTP Input */}
//         {otpSent && (
//           <>
//             <div>
//               <label
//                 htmlFor="otp"
//                 className="formLabel flex items-center gap-2"
//               >
//                 <FaKey className="text-purple-500" />
//                 OTP
//               </label>
//               <input
//                 id="otp"
//                 name="otp"
//                 type="text"
//                 required
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 placeholder="Enter OTP"
//                 className="formInput mt-2"
//               />
//             </div>

//             {/* Verify OTP Button */}
//             <div className="text-center">
//               <button
//                 type="button"
//                 onClick={handleVerifyOtp}
//                 className="primaryBtn w-auto px-6"
//               >
//                 Verify OTP
//               </button>
//             </div>
//           </>
//         )}

//         {/* Error Message */}
//         {error && <p className="errorText text-center">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;

//

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
      await axios.post(`${globalBackendRoute}/api/forgot-password`, { email });
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
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post(`${globalBackendRoute}/api/verify-otp`, { email, otp });
      alert("OTP verified! Redirecting to reset password page...");
      navigate("/reset-password", { state: { email, otp } });
    } catch {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center px-4 mb-10">
      <div className="bg-white w-full max-w-md p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <FaKey className="mx-auto text-orange-500" size={48} />
          <h2 className="text-2xl font-extrabold text-gray-800 mt-3">
            Forgot Password
          </h2>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Enter your registered email"
            />
          </div>

          {/* Send OTP */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleSendOtp}
              className="w-auto px-6 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full shadow hover:from-red-700 hover:to-orange-600 transition"
            >
              Send OTP
            </button>
          </div>

          {/* OTP Field and Verify Button */}
          {otpSent && (
            <>
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-auto px-6 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full shadow hover:from-red-700 hover:to-orange-600 transition"
                >
                  Verify OTP
                </button>
              </div>
            </>
          )}

          {/* Error Message */}
          {error && (
            <p className="text-center text-red-600 font-semibold">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
