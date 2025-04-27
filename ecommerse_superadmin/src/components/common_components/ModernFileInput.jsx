// components/common_components/ModernFileInput.jsx
import React, { useState, useRef } from "react";
import { FiUpload } from "react-icons/fi";

export default function ModernFileInput({
  onFileSelect,
  multiple = false,
  label = "",
  maxFiles = 10,
}) {
  const [fileNames, setFileNames] = useState([]);
  const inputRef = useRef();

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      if (multiple) {
        if (files.length > maxFiles) {
          alert(`You can upload up to ${maxFiles} files only.`);
          return;
        }
        setFileNames(files.map((file) => file.name));
        onFileSelect(files);
      } else {
        setFileNames([files[0].name]);
        onFileSelect(files[0]);
      }
    }
  };

  return (
    <div className="w-full space-y-1">
      {label && (
        <div className="text-gray-700 text-sm font-semibold">{label}</div>
      )}
      <div className="flex items-center gap-3 bg-white border border-dashed border-gray-300 p-3 rounded-xl shadow-sm hover:border-indigo-500 transition">
        <div className="flex items-center gap-3 overflow-x-auto">
          <FiUpload className="text-indigo-600 text-xl min-w-[24px]" />
          <span className="text-sm text-gray-700 truncate">
            {fileNames.length > 0 ? fileNames.join(", ") : "No file selected"}
          </span>
        </div>
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className="cursor-pointer px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-md hover:opacity-90 transition"
        >
          Browse
        </button>
      </div>
    </div>
  );
}
