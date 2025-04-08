// MordernTextInput.jsx
import React from "react";

export default function ModernTextInput({
  label,
  icon,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  className = "",
  name, // ✅ Add name prop
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="formLabel flex items-center gap-2 mb-1 text-sm font-medium text-gray-700">
          {icon}
          {label}
        </label>
      )}
      <input
        name={name} // ✅ Bind the name here
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`formInput w-full ${className}`}
      />
    </div>
  );
}
