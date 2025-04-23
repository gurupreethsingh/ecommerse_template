// components/common_components/SearchBar.jsx
import { FaSearch } from "react-icons/fa";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="relative w-full sm:w-64">
      <FaSearch className="absolute left-3 top-3 text-gray-400" />
      <input
        type="text"
        className="formInput pl-10"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
