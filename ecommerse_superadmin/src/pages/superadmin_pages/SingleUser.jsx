import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserShield,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import globalBackendRoute from "../../config/Config";

const roles = [
  "accountant",
  "admin",
  "alumni_relations",
  "business_analyst",
  "content_creator",
  "course_coordinator",
  "customer_support",
  "data_scientist",
  "department_head",
  "developer",
  "event_coordinator",
  "employee",
  "hr_manager",
  "intern",
  "legal_advisor",
  "maintenance_staff",
  "marketing_manager",
  "operations_manager",
  "product_owner",
  "project_manager",
  "qa_lead",
  "recruiter",
  "registrar",
  "researcher",
  "sales_executive",
  "superadmin",
  "support_engineer",
  "tech_lead",
  "test_engineer",
  "user",
  "ux_ui_designer",
  "vendor",
  "outlet",
  "delivery_person",
];

export default function SingleUser() {
  const [userData, setUserData] = useState(null);
  const [newRole, setNewRole] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${globalBackendRoute}/api/single-user/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data);
        setNewRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchUserData();
  }, [id]);

  const handleRoleUpdate = async () => {
    if (newRole === userData.role) {
      alert("No changes detected. Role remains the same.");
      return;
    }

    const confirmUpdate = window.confirm(
      `You are about to update the user's role to "${newRole}". Are you sure?`
    );

    if (!confirmUpdate) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${globalBackendRoute}/api/update-user-role/${id}`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`Role has been successfully updated to "${newRole}".`);
      window.location.reload(); // ✅ Reload after success
    } catch (error) {
      console.error("Error updating role:", error.message);
      alert("Failed to update role. Please try again.");
      window.location.reload(); // ✅ Reload after failure
    }
  };

  const getImageUrl = (avatar) => {
    if (!avatar) return "https://via.placeholder.com/150";
    return `${globalBackendRoute}/${avatar.replace(/\\/g, "/")}`;
  };

  if (!userData) return <div className="text-center py-8">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="containerWidth my-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-start items-center gap-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-auto h-full sm:w-48 sm:h-48"
        >
          <img
            src={getImageUrl(userData.avatar)}
            alt={userData.name}
            className="w-full h-full object-cover rounded-xl border"
            onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
          />
        </motion.div>

        <div className="w-full">
          <motion.h3
            className="subHeadingTextMobile lg:subHeadingText mb-4"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            User Details
          </motion.h3>

          <div className="border-t border-gray-200 divide-y divide-gray-100">
            <ProfileField
              icon={<FaUser className="text-blue-600" />}
              label="Full Name"
              value={userData.name}
            />
            <ProfileField
              icon={<FaEnvelope className="text-green-600" />}
              label="Email"
              value={userData.email}
            />
            <ProfileField
              icon={<FaPhone className="text-yellow-600" />}
              label="Phone"
              value={userData.phone || "N/A"}
            />
            <ProfileField
              icon={<FaMapMarkerAlt className="text-purple-600" />}
              label="Street"
              value={userData.address?.street || "N/A"}
            />
            <ProfileField
              icon={<FaMapMarkerAlt className="text-indigo-600" />}
              label="City"
              value={userData.address?.city || "N/A"}
            />
            <ProfileField
              icon={<FaMapMarkerAlt className="text-pink-500" />}
              label="State"
              value={userData.address?.state || "N/A"}
            />
            <ProfileField
              icon={<FaMapMarkerAlt className="text-cyan-600" />}
              label="Postal Code"
              value={userData.address?.postalCode || "N/A"}
            />
            <ProfileField
              icon={<FaMapMarkerAlt className="text-teal-600" />}
              label="Country"
              value={userData.address?.country || "N/A"}
            />
          </div>

          <div className="mt-6">
            <label className="formLabel mb-1">Update Role</label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="formInput"
            >
              <option value={userData.role} disabled>
                Current Role: {userData.role}
              </option>
              {roles
                .filter((role) => role !== userData.role)
                .map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
            </select>
            <button
              onClick={handleRoleUpdate}
              className="primaryBtn mt-4 w-fit px-4 rounded-full"
            >
              Update Role
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProfileField({ icon, label, value }) {
  return (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 px-2 sm:px-4">
      <dt className="flex items-center text-sm font-medium text-gray-700 gap-2">
        {icon} {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        {value}
      </dd>
    </div>
  );
}
