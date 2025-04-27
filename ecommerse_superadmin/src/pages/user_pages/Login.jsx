import React, { useState, useContext } from "react";
import axios from "axios";
import { FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa"; // ✅ Added Eye icons
import { AuthContext } from "../../components/auth_components/AuthManager";
import globalBackendRoute from "../../config/Config";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ Added state
  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
      const response = await axios.post(`${globalBackendRoute}/api/login`, {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });
      console.log("Login Success:", response.data); // ✅ Successful login log
      login(response.data.token);
      alert("Login successful, redirecting...");
      setError("");
    } catch (err) {
      console.error("Login Failed:", err); // ✅ Log the full error
      const backendMessage = err.response?.data?.message;
      if (backendMessage) {
        setError(backendMessage); // ✅ Show backend message like "Invalid credentials"
      } else {
        setError("Login failed. Try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="compactWidth py-12">
      {/* Header */}
      <div className="text-center">
        <FaSignInAlt className="iconPrimary mx-auto" size={48} />
        <h2 className="headingTextMobile lg:headingText mt-4">
          Sign in to your account
        </h2>
      </div>

      {/* Form */}
      <div className="mt-10">
        {error && <p className="errorText text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="formLabel flex items-center gap-2"
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
              className="formInput mt-2"
              placeholder="Enter your email address"
            />
          </div>

          {/* Password Input with Eye Toggle */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="formLabel flex items-center gap-2"
              >
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-indigo-500 hover:text-indigo-600 font-bold"
              >
                Forgot password?
              </a>
            </div>

            <div className="relative mt-2">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"} // 👁️ Toggle type
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                required
                className="formInput pr-10" // right padding for icon
                placeholder="Enter your password"
              />
              {/* Eye Icon */}
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button type="submit" className="primaryBtn w-full">
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center paragraphTextMobile">
          Don't have an account?{" "}
          <a href="/register" className="linkTextMobile lg:linkText">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
