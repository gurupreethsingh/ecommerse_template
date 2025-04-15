import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import globalBackendRoute from "../../config/Config";

export default function AddBlog() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    summary: "",
    tags: "",
    category: "",
    seoTitle: "",
    metaDescription: "",
    published: false,
    featuredImage: null,
  });
  const [authorId, setAuthorId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized: Login required.");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setAuthorId(decoded.id);
    } catch (error) {
      console.error("Invalid token format");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      featuredImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogForm = new FormData();

    blogForm.append("title", formData.title);
    blogForm.append("body", formData.body);
    blogForm.append("summary", formData.summary);
    blogForm.append("tags", formData.tags);
    blogForm.append("category", formData.category);
    blogForm.append("seoTitle", formData.seoTitle);
    blogForm.append("metaDescription", formData.metaDescription);
    blogForm.append("published", formData.published);
    blogForm.append("author", authorId);
    if (formData.featuredImage) {
      blogForm.append("featuredImage", formData.featuredImage);
    }

    try {
      await axios.post(`${globalBackendRoute}/api/add-blog`, blogForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Blog added successfully!");
      navigate("/all-blogs", { replace: true });
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("❌ Failed to add blog. Please try again.");
    }
  };

  return (
    <div className="containerWidth my-8">
      <div className="bg-white shadow-md rounded-xl p-6 sm:p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📢 Add New Blog
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "Title", name: "title", type: "text" },
            { label: "SEO Title", name: "seoTitle", type: "text" },
            { label: "Tags (comma-separated)", name: "tags", type: "text" },
            { label: "Category", name: "category", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label htmlFor={name} className="formLabel">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="formInput"
                required={name === "title"}
              />
            </div>
          ))}

          <div>
            <label className="formLabel" htmlFor="body">
              Body
            </label>
            <textarea
              id="body"
              name="body"
              rows="5"
              value={formData.body}
              onChange={handleChange}
              className="formInput"
              required
            />
          </div>

          <div>
            <label className="formLabel" htmlFor="summary">
              Summary
            </label>
            <textarea
              id="summary"
              name="summary"
              rows="2"
              value={formData.summary}
              onChange={handleChange}
              className="formInput"
            />
          </div>

          <div>
            <label className="formLabel" htmlFor="metaDescription">
              Meta Description
            </label>
            <textarea
              id="metaDescription"
              name="metaDescription"
              rows="2"
              value={formData.metaDescription}
              onChange={handleChange}
              className="formInput"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="published" className="text-sm text-gray-700">
              Publish Blog
            </label>
          </div>

          <div>
            <label className="formLabel" htmlFor="featuredImage">
              Featured Image
            </label>
            <input
              type="file"
              id="featuredImage"
              onChange={handleImageChange}
              className="w-full mt-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="primaryBtn px-6 py-2 rounded-lg w-full sm:w-1/2 mx-auto"
            >
              Submit Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
