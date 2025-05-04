// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { FaSignInAlt } from "react-icons/fa";
// import { AuthContext } from "../../components/auth_components/AuthManager";
// import globalBackendRoute from "../../config/Config";

// const Login = () => {
//   const { login } = useContext(AuthContext);
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const { email, password } = formData;

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const validateInputs = () => {
//     const trimmedEmail = email.trim();
//     const trimmedPassword = password.trim();

//     if (!trimmedEmail || !trimmedPassword) {
//       return "Email and password are required.";
//     }

//     if (email !== trimmedEmail) {
//       return "Email cannot start or end with spaces.";
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!trimmedEmail.match(emailRegex)) {
//       return "Please enter a valid email address.";
//     }

//     if (password !== trimmedPassword) {
//       return "Password cannot start or end with spaces.";
//     }

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationError = validateInputs();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${globalBackendRoute}/api/login`,
//         formData
//       );
//       login(response.data.token);
//       alert("Login successful, redirecting...");
//       setError("");
//     } catch {
//       setError("Login failed. Try again.");
//     }
//   };

//   return (
//     <div className=" flex items-center justify-center px-4 mb-10">
//       <div className="bg-white  w-full max-w-md p-8 space-y-6 ">
//         {/* Header */}
//         <div className="text-center">
//           <FaSignInAlt className="mx-auto text-orange-500" size={48} />
//           <h2 className="text-2xl font-extrabold text-gray-800 mt-3">
//             Sign in
//           </h2>
//         </div>

//         {/* Error */}
//         {error && (
//           <p className="text-center text-red-600 font-semibold">{error}</p>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Email Input */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-semibold text-gray-700 mb-1"
//             >
//               Email address
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               autoComplete="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
//               placeholder="Enter your email"
//             />
//           </div>

//           {/* Password Input */}
//           <div>
//             <div className="flex items-center justify-between mb-1">
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-semibold text-gray-700"
//               >
//                 Password
//               </label>
//               <a
//                 href="/forgot-password"
//                 className="text-sm font-semibold text-orange-500 hover:underline"
//               >
//                 Forgot password?
//               </a>
//             </div>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               autoComplete="current-password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
//               placeholder="Enter your password"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full shadow hover:from-red-700 hover:to-orange-600 transition"
//           >
//             Login
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-center text-sm text-gray-600">
//           Don’t have an account?{" "}
//           <a
//             href="/register"
//             className="text-orange-500 font-semibold hover:underline"
//           >
//             Register here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

// with eye patch on password.

import React, { useState, useContext } from "react";
import axios from "axios";
import { FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../components/auth_components/AuthManager";
import globalBackendRoute from "../../config/Config";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const validateInputs = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      return "Email and password are required.";
    }

    if (email !== trimmedEmail) {
      return "Email cannot start or end with spaces.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail.match(emailRegex)) {
      return "Please enter a valid email address.";
    }

    if (password !== trimmedPassword) {
      return "Password cannot start or end with spaces.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post(
        `${globalBackendRoute}/api/login`,
        formData
      );
      login(response.data.token);
      alert("Login successful, redirecting...");
      setError("");
    } catch {
      setError("Login failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center px-4 mb-10">
      <div className="bg-white w-full max-w-md p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <FaSignInAlt className="mx-auto text-orange-500" size={48} />
          <h2 className="text-2xl font-extrabold text-gray-800 mt-3">
            Sign in
          </h2>
        </div>

        {/* Error */}
        {error && (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
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
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input with Toggle */}
          <div className="relative">
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-sm font-semibold text-orange-500 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none pr-10"
              placeholder="Enter your password"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 text-gray-500 hover:text-orange-600 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full shadow hover:from-red-700 hover:to-orange-600 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-orange-500 font-semibold hover:underline"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
