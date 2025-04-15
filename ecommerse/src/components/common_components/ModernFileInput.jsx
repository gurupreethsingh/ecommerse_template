// components/ModernFileInput.jsx
import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";

export default function ModernFileInput({ onFileSelect }) {
  const [fileName, setFileName] = useState("No file chosen");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4 bg-white border border-dashed border-gray-300 p-3 rounded-xl shadow-sm hover:border-indigo-500 hover:shadow transition duration-300">
        <div className="flex items-center gap-3 overflow-x-auto">
          <FiUpload className="text-indigo-600 text-xl min-w-[24px]" />
          <span className="text-sm text-gray-700 truncate">{fileName}</span>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-md shadow hover:opacity-90 transition"
        >
          Browse
        </label>
      </div>
    </div>
  );
}
