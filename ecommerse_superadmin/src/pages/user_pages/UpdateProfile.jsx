import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserShield,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function UpdateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    avatar: "",
    role: "",
  });

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/getUserById/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const user = res.data;
        setFormData({
          ...user,
          address: {
            street: user.address?.street || "",
            city: user.address?.city || "",
            state: user.address?.state || "",
            postalCode: user.address?.postalCode || "",
            country: user.address?.country || "",
          },
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const form = new FormData();

    try {
      for (let key in formData) {
        if (key === "address") {
          form.append("address", JSON.stringify(formData.address));
        } else {
          form.append(key, formData[key]);
        }
      }
      if (avatar) form.append("avatar", avatar);

      await axios.put(`${globalBackendRoute}/api/update-profile/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profile updated successfully!");
      navigate(`/profile/${id}`);
    } catch (err) {
      console.error("Error updating profile:", err.response || err);
      alert("Failed to update profile.");
    }
  };

  const getImageUrl = (avatar) => {
    if (!avatar) return "https://via.placeholder.com/150";
    return `${globalBackendRoute}/${avatar.replace(/\\/g, "/")}`;
  };

  return (
    <div className="containerWidth my-6">
      <div className="flex flex-col sm:flex-row sm:items-start items-center gap-6">
        <div className="w-auto h-full sm:w-48 sm:h-48">
          <img
            src={getImageUrl(formData.avatar)}
            alt={formData.name}
            className="w-full h-full object-cover rounded-xl border bg-gray-100"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://via.placeholder.com/150?text=No+Image";
            }}
          />
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <h2 className="subHeadingTextMobile lg:subHeadingText mb-4">
            Update Profile
          </h2>

          <EditableField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            icon={<FaUser className="text-blue-600" />}
          />
          <EditableField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            icon={<FaEnvelope className="text-green-600" />}
          />
          <EditableField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            icon={<FaPhone className="text-yellow-600" />}
          />
          <EditableField
            label="Street"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            icon={<FaMapMarkerAlt className="text-purple-600" />}
          />
          <EditableField
            label="City"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            icon={<FaMapMarkerAlt className="text-indigo-600" />}
          />
          <EditableField
            label="State"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
            icon={<FaMapMarkerAlt className="text-pink-500" />}
          />
          <EditableField
            label="Postal Code"
            name="address.postalCode"
            value={formData.address.postalCode}
            onChange={handleChange}
            icon={<FaMapMarkerAlt className="text-cyan-600" />}
          />
          <EditableField
            label="Country"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
            icon={<FaMapMarkerAlt className="text-teal-600" />}
          />

          <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 px-2 sm:px-4">
            <dt className="flex items-center text-sm font-medium text-gray-700 gap-2">
              Profile Image
            </dt>
            <dd className="mt-1 sm:col-span-2 sm:mt-0">
              <label htmlFor="profileImage" className="fileUploadBtn">
                Choose File
              </label>
              <input
                id="profileImage"
                type="file"
                onChange={handleImageChange}
                className="hidden"
              />
            </dd>
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="primaryBtn w-fit px-4 flex items-center gap-2 rounded-full mx-auto"
            >
              <MdSave /> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditableField({ icon, label, name, value, onChange }) {
  return (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 px-2 sm:px-4">
      <dt className="flex items-center text-sm font-medium text-gray-700 gap-2">
        {icon} {label}
      </dt>
      <dd className="mt-1 sm:col-span-2 sm:mt-0">
        <div className="text-sm text-gray-900 border-b border-gray-300 pb-1">
          <input
            type="text"
            name={name}
            value={value || ""}
            onChange={onChange}
            className="w-full bg-transparent focus:outline-none"
          />
        </div>
      </dd>
    </div>
  );
}
