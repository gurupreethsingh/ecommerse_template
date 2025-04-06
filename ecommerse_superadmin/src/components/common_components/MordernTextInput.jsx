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
}) {
  return (
    <div className="w-full">
      <label className="formLabel flex items-center gap-2 mb-1 text-sm font-medium text-gray-700">
        {icon}
        {label}
      </label>
      <input
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
