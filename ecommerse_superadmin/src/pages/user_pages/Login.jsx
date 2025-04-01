import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../components/auth_components/AuthManager";
import globalBackendRoute from "../../config/Config";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
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

  const renderInput = (label, type, id) => (
    <div>
      <label htmlFor={id} className="formLabel">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={formData[id]}
        onChange={handleChange}
        required
        className="mt-2 formInput"
      />
    </div>
  );

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <FaSignInAlt className="iconPrimary" />
        <h2 className="mt-6 text-center headingTextMobile lg:headingText">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && <p className="errorText mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {renderInput("Email address", "email", "email")}
          {renderInput("Password", "password", "password")}

          <button type="submit" className="primaryBtn">
            Login
          </button>
        </form>

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
