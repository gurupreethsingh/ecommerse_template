// components/dashboard/LeftSidebarNav.jsx
export default function LeftSidebarNav({ items = [], navigate }) {
  return (
    <nav className="rounded-lg overflow-hidden border-gray-200">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => navigate(item.path)}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold shadow-sm text-gray-700 hover:shadow-lg hover:bg-green-50 rounded border-b"
        >
          <span className="text-lg">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}
