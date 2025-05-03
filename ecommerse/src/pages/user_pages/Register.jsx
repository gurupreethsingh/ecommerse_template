// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaUserPlus } from "react-icons/fa";
// import globalBackendRoute from "../../config/Config";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const { name, email, password } = formData;

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const validateInputs = () => {
//     const trimmedName = name.trim();
//     const trimmedEmail = email.trim();

//     if (!trimmedName) return "Name cannot be empty or just spaces.";
//     if (name !== trimmedName) return "Name cannot start or end with a space.";

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!trimmedEmail.match(emailRegex)) return "Enter a valid email address.";
//     if (email !== trimmedEmail)
//       return "Email cannot start or end with a space.";

//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;
//     if (!password.match(passwordRegex))
//       return "Password must be 8+ characters with uppercase, lowercase, number, and special character.";

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
//       await axios.post(`${globalBackendRoute}/api/register`, formData);
//       alert("Registration successful. Redirecting to login...");
//       navigate("/login");
//     } catch {
//       setError("Registration failed. Try again.");
//     }
//   };

//   const renderInput = (label, type, id) => (
//     <div>
//       <label htmlFor={id} className="formLabel">
//         {label}
//       </label>
//       <input
//         id={id}
//         name={id}
//         type={type}
//         value={formData[id]}
//         onChange={handleChange}
//         required
//         autoComplete={
//           id === "password" ? "new-password" : id === "email" ? "email" : "name"
//         } // ✅ Proper autocomplete for each field
//         className="mt-2 formInput"
//         placeholder={`Enter your ${id}`}
//       />
//     </div>
//   );

//   return (
//     <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <FaUserPlus className="iconPrimary" />
//         <h2 className="mt-6 text-center headingTextMobile lg:headingText">
//           Register a new account
//         </h2>
//       </div>

//       <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
//         {error && <p className="errorText mb-4">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {renderInput("Name", "text", "name")}
//           {renderInput("Email address", "email", "email")}
//           {renderInput("Password", "password", "password")}

//           <button type="submit" className="primaryBtn">
//             Register
//           </button>
//         </form>

//         <p className="mt-6 text-center paragraphTextMobile lg:paragraphText">
//           Already have an account?{" "}
//           <a href="/login" className="linkTextMobile lg:linkText">
//             Sign in
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

// no eye toggle for password till this stage.

// eye toggle for password code.

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa"; // ✅ Added eye icons
// import globalBackendRoute from "../../config/Config";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // ✅ Added state for toggling
//   const { name, email, password } = formData;

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const validateInputs = () => {
//     const trimmedName = name.trim();
//     const trimmedEmail = email.trim();

//     if (!trimmedName) return "Name cannot be empty or just spaces.";
//     if (name !== trimmedName) return "Name cannot start or end with a space.";

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!trimmedEmail.match(emailRegex)) return "Enter a valid email address.";
//     if (email !== trimmedEmail)
//       return "Email cannot start or end with a space.";

//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;
//     if (!password.match(passwordRegex))
//       return "Password must be 8+ characters with uppercase, lowercase, number, and special character.";

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
//       await axios.post(`${globalBackendRoute}/api/register`, {
//         name: formData.name.trim(),
//         email: formData.email.trim().toLowerCase(),
//         password: formData.password,
//       });
//       alert("Registration successful. Redirecting to login...");
//       navigate("/login");
//     } catch {
//       setError("Registration failed. Try again.");
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const renderInput = (label, type, id) => {
//     if (id === "password") {
//       return (
//         <div className="relative">
//           <label htmlFor={id} className="formLabel">
//             {label}
//           </label>
//           <input
//             id={id}
//             name={id}
//             type={showPassword ? "text" : "password"} // ✅ Show or hide
//             value={formData[id]}
//             onChange={handleChange}
//             required
//             autoComplete="new-password"
//             className="mt-2 formInput pr-10" // Extra padding for icon
//             placeholder={`Enter your ${id}`}
//           />
//           {/* Eye icon */}
//           <span
//             onClick={togglePasswordVisibility}
//             className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           <label htmlFor={id} className="formLabel">
//             {label}
//           </label>
//           <input
//             id={id}
//             name={id}
//             type={type}
//             value={formData[id]}
//             onChange={handleChange}
//             required
//             autoComplete={id === "email" ? "email" : "name"}
//             className="mt-2 formInput"
//             placeholder={`Enter your ${id}`}
//           />
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <FaUserPlus className="iconPrimary" />
//         <h2 className="mt-6 text-center headingTextMobile lg:headingText">
//           Register a new account
//         </h2>
//       </div>

//       <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
//         {error && <p className="errorText mb-4">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {renderInput("Name", "text", "name")}
//           {renderInput("Email address", "email", "email")}
//           {renderInput("Password", "password", "password")}

//           <button type="submit" className="primaryBtn">
//             Register
//           </button>
//         </form>

//         <p className="mt-6 text-center paragraphTextMobile lg:paragraphText">
//           Already have an account?{" "}
//           <a href="/login" className="linkTextMobile lg:linkText">
//             Sign in
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

//

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import globalBackendRoute from "../../config/Config";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { name, email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const validateInputs = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) return "Name cannot be empty or just spaces.";
    if (name !== trimmedName) return "Name cannot start or end with a space.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail.match(emailRegex)) return "Enter a valid email address.";
    if (email !== trimmedEmail)
      return "Email cannot start or end with a space.";

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;
    if (!password.match(passwordRegex))
      return "Password must be 8+ characters with uppercase, lowercase, number, and special character.";

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
      await axios.post(`${globalBackendRoute}/api/register`, {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });
      alert("Registration successful. Redirecting to login...");
      navigate("/login");
    } catch {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center px-4 mb-10">
      <div className="bg-white w-full max-w-md p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <FaUserPlus className="mx-auto text-orange-500" size={48} />
          <h2 className="text-2xl font-extrabold text-gray-800 mt-3">
            Register
          </h2>
        </div>

        {/* Error */}
        {error && (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

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
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
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
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
