// components/dashboard/DashboardLayout.jsx
export default function DashboardLayout({ left, right }) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-1/4">{left}</aside>
      <main className="w-full md:w-3/4">{right}</main>
    </div>
  );
}
