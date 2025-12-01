import { useState } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  ChevronDown,
  DollarSign,
  BarChart2,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Status = "Pending" | "Approved" | "Rejected";

export default function WithDrawList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<string>("");
  const [searchPartner, setSearchPartner] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const [confirmApprove, setConfirmApprove] = useState<null | { id: number; partner: string }>(
    null
  );

  const rows: { id: number; partner: string; amount: number; status: Status }[] = [
    { id: 1, partner: "Resort Biển Xanh", amount: 12000000, status: "Pending" },
    { id: 2, partner: "Villa Đà Lạt", amount: 8500000, status: "Approved" },
    { id: 3, partner: "Mây Homestay", amount: 4300000, status: "Rejected" },
    { id: 4, partner: "Resort Biển Xanh", amount: 5000000, status: "Approved" },
  ];

  const badge = {
    Pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    Approved: "bg-green-100 text-green-700 border border-green-300",
    Rejected: "bg-red-100 text-red-700 border border-red-300",
  } as const;

  const filteredRows = rows.filter((r) => {
    const matchSearch = r.partner.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalAmount = rows.reduce((sum, r) => sum + r.amount, 0);
  const totalApproved = rows.filter((r) => r.status === "Approved").length;
  const totalPending = rows.filter((r) => r.status === "Pending").length;
  const totalRejected = rows.filter((r) => r.status === "Rejected").length;

  const uniquePartners = Array.from(new Set(rows.map((r) => r.partner)));

  const filteredPartners = uniquePartners.filter((p) =>
    p.toLowerCase().includes(searchPartner.toLowerCase())
  );

  const autoSelectedPartner =
    filteredPartners.length === 1 && !selectedPartner ? filteredPartners[0] : selectedPartner;

  const pieData =
    autoSelectedPartner === ""
      ? []
      : [
          {
            name: "Pending",
            value: rows
              .filter((r) => r.partner === autoSelectedPartner && r.status === "Pending")
              .reduce((sum, r) => sum + r.amount, 0),
          },
          {
            name: "Approved",
            value: rows
              .filter((r) => r.partner === autoSelectedPartner && r.status === "Approved")
              .reduce((sum, r) => sum + r.amount, 0),
          },
          {
            name: "Rejected",
            value: rows
              .filter((r) => r.partner === autoSelectedPartner && r.status === "Rejected")
              .reduce((sum, r) => sum + r.amount, 0),
          },
        ].filter((d) => d.value > 0);

  const COLORS = { Pending: "#FACC15", Approved: "#22C55E", Rejected: "#EF4444" };

  return (
    <div className="space-y-6">
      <div className="mb-4 w-full max-w-lg relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Chọn đối tác để xem biểu đồ
        </label>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center bg-white shadow-sm px-3 py-2 rounded-xl border relative">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              placeholder="Tìm đối tác..."
              className="ml-2 outline-none w-full"
              value={searchPartner}
              onChange={(e) => {
                setSearchPartner(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            />
            {searchPartner && filteredPartners.length > 0 && showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg z-50 max-h-40 overflow-auto">
                {filteredPartners.map((p) => (
                  <div
                    key={p}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => {
                      setSelectedPartner(p);
                      setSearchPartner(p);
                      setShowSuggestions(false);
                    }}
                  >
                    {p}
                  </div>
                ))}
              </div>
            )}
          </div>
          <select
            className="border rounded-xl p-2 w-64"
            value={selectedPartner}
            onChange={(e) => setSelectedPartner(e.target.value)}
          >
            <option value="">-- Chọn đối tác --</option>
            {uniquePartners.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {autoSelectedPartner && pieData.length > 0 && (
        <div className="bg-white p-5 rounded-2xl shadow-xl border">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <BarChart2 size={20} /> Biểu đồ số tiền rút - {autoSelectedPartner}
          </h2>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.name}: ${entry.value.toLocaleString()}₫`}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[entry.name as keyof typeof COLORS]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => value.toLocaleString() + "₫"} />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-2xl shadow-lg p-5 flex items-center gap-3">
          <DollarSign size={28} />
          <div>
            <div className="text-sm opacity-80">Tổng số tiền rút</div>
            <div className="text-xl font-semibold">{totalAmount.toLocaleString()}₫</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-2xl shadow-lg p-5 flex items-center gap-3">
          <CheckCircle size={28} />
          <div>
            <div className="text-sm opacity-80">Đã duyệt</div>
            <div className="text-xl font-semibold">{totalApproved}</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-2xl shadow-lg p-5 flex items-center gap-3">
          <BarChart2 size={28} />
          <div>
            <div className="text-sm opacity-80">Đang chờ</div>
            <div className="text-xl font-semibold">{totalPending}</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-400 to-red-600 text-white rounded-2xl shadow-lg p-5 flex items-center gap-3">
          <XCircle size={28} />
          <div>
            <div className="text-sm opacity-80">Bị từ chối</div>
            <div className="text-xl font-semibold">{totalRejected}</div>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-blue-600">Danh sách yêu cầu rút tiền</h1>

      <div className="flex items-center gap-3 mb-4 relative">
        <div className="flex items-center bg-white shadow-sm px-4 py-2 rounded-xl border w-80">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            placeholder="Tìm theo tên đối tác..."
            className="ml-2 outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200"
          >
            {statusFilter === "All" ? "Lọc trạng thái" : statusFilter}
            <ChevronDown size={16} />
          </button>

          {openFilter && (
            <div className="absolute top-full mt-2 right-0 bg-white shadow-lg border rounded-xl w-40 overflow-hidden z-50">
              {["All", "Pending", "Approved", "Rejected"].map((st) => (
                <button
                  key={st}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    statusFilter === st ? "font-semibold text-blue-600" : ""
                  }`}
                  onClick={() => {
                    setStatusFilter(st as Status | "All");
                    setOpenFilter(false);
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-xl border">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-5 text-gray-600">ID</th>
              <th className="p-5 text-gray-600">Đối tác</th>
              <th className="p-5 text-gray-600">Số tiền</th>
              <th className="p-5 text-gray-600">Trạng thái</th>
              <th className="p-5 text-center text-gray-600">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50 transition-all">
                <td className="p-5">{r.id}</td>
                <td className="p-5 font-medium">{r.partner}</td>
                <td className="p-5">{r.amount.toLocaleString()}₫</td>
                <td className="p-5">
                  <span
                    className={`inline-flex items-center justify-center h-8 px-3 rounded-full text-sm shadow-sm ${badge[r.status]}`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="p-5 text-center">
                  {r.status === "Pending" ? (
                    <button
                      onClick={() => setConfirmApprove({ id: r.id, partner: r.partner })}
                      className="inline-flex items-center gap-2 h-10 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-sm"
                    >
                      <CheckCircle size={16} /> Duyệt
                    </button>
                  ) : r.status === "Approved" ? (
                    <button className="inline-flex items-center gap-2 h-10 px-4 bg-green-100 text-green-700 border border-green-300 rounded-xl cursor-default">
                      <CheckCircle size={18} /> Đã duyệt
                    </button>
                  ) : (
                    <button className="inline-flex items-center gap-2 h-10 px-4 bg-red-100 text-red-600 border border-red-300 rounded-xl cursor-default">
                      <XCircle size={18} /> Từ chối
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRows.length === 0 && (
          <div className="p-6 text-center text-gray-500">Không tìm thấy dữ liệu.</div>
        )}
      </div>

      {confirmApprove && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
          <div className="absolute inset-0 backdrop-blur-sm bg-black/10"></div>
          <div className="relative bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.12)] border border-gray-200 p-6 w-[360px] animate-popupAppear">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <CheckCircle className="text-blue-600" size={26} />
              </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">
              Xác nhận duyệt yêu cầu
            </h2>
            <p className="text-gray-600 text-center text-[15px] leading-relaxed mb-5">
              Bạn có chắc muốn duyệt yêu cầu
              <span className="font-semibold text-gray-800"> ID {confirmApprove.id}</span> của đối tác
              <span className="font-semibold text-gray-800"> {confirmApprove.partner}</span>?
            </p>
            <div className="flex justify-between gap-3">
              <button
                onClick={() => setConfirmApprove(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  alert("Duyệt thành công!");
                  setConfirmApprove(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
