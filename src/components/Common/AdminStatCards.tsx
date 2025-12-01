import { useLocation } from "react-router-dom";

export default function AdminStatCards() {
  const { pathname } = useLocation();

  if (!pathname.startsWith("/admin/withdraw")) {
    return null;
  }

  const stats = [
    { label: "Tổng yêu cầu rút", value: "128", color: "bg-blue-500" },
    { label: "Đã duyệt", value: "96", color: "bg-green-500" },
    { label: "Chờ duyệt", value: "32", color: "bg-yellow-500" },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {stats.map((s, i) => (
        <div
          key={i}
          className="p-6 bg-white shadow rounded-xl border hover:shadow-lg transition"
        >
          <p className="text-gray-500 text-sm">{s.label}</p>
          <h2
            className={`text-3xl font-bold mt-2 ${s.color} bg-opacity-10 p-2 rounded-lg`}
          >
            {s.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
