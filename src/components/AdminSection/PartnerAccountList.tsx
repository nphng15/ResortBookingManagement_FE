import { useState, useEffect } from "react";

interface Partner {
  id: number;
  name: string;
  email: string;
  phone: string;
}

type SortKey = "id" | "name" | "email" | "phone";

const PartnerTable: React.FC<{
  partners: Partner[];
  onDelete: (id: number) => void;
  onSave: (updated: Partner) => void;
}> = ({ partners, onDelete, onSave }) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortAsc, setSortAsc] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const filtered = partners.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
  );

  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (typeof valA === "number") return sortAsc ? valA - valB : valB - valA;
    return sortAsc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const startEditing = (partner: Partner) => {
    setEditingId(partner.id);
    setForm({ name: partner.name, email: partner.email, phone: partner.phone });
  };

  const cancelEditing = () => setEditingId(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveEditing = (id: number) => {
    onSave({ id, ...form });
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Tìm kiếm đối tác..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
      />

      <div className="overflow-x-auto rounded-xl shadow-lg border bg-white">
        <table className="min-w-full text-left divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              {[
                { label: "ID", key: "id" },
                { label: "Tên đối tác", key: "name" },
                { label: "Email", key: "email" },
                { label: "Số điện thoại", key: "phone" },
                { label: "Hành động", key: "action" },
              ].map((col) => (
                <th
                  key={col.key}
                  className={`p-4 ${
                    col.key !== "action" ? "cursor-pointer select-none" : ""
                  }`}
                  onClick={() =>
                    col.key !== "action" && handleSort(col.key as SortKey)
                  }
                >
                  <div className="flex items-center gap-1 font-semibold text-gray-700">
                    {col.label}
                    {sortKey === col.key && <span>{sortAsc ? "▲" : "▼"}</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sorted.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-blue-50 transition-all border-b last:border-none"
              >
                <td className="p-4">{p.id}</td>

                <td className="p-4">
                  {editingId === p.id ? (
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 bg-blue-50"
                    />
                  ) : (
                    <span className="font-medium">{p.name}</span>
                  )}
                </td>

                <td className="p-4">
                  {editingId === p.id ? (
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 bg-blue-50"
                    />
                  ) : (
                    <a
                      href={`mailto:${p.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {p.email}
                    </a>
                  )}
                </td>

                <td className="p-4">
                  {editingId === p.id ? (
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 bg-blue-50"
                    />
                  ) : (
                    <span>{p.phone}</span>
                  )}
                </td>

                {/* ACTION BUTTONS */}
                <td className="p-4 flex space-x-2">
                  {editingId === p.id ? (
                    <>
                      <button
                        onClick={() => saveEditing(p.id)}
                        className="px-4 py-2 bg-green-100 text-green-700 border border-green-300 rounded-xl hover:bg-green-200 transition shadow-sm"
                      >
                        Lưu
                      </button>

                      <button
                        onClick={cancelEditing}
                        className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-200 transition shadow-sm"
                      >
                        Hủy
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(p)}
                        className="px-4 py-2 text-blue-600 bg-blue-100 border border-blue-300 rounded-xl hover:bg-blue-200 transition shadow-sm"
                      >
                        Chỉnh sửa
                      </button>

                      <button
                        onClick={() => onDelete(p.id)}
                        className="px-4 py-2 bg-red-100 text-red-600 border border-red-300 rounded-xl hover:bg-red-200 transition shadow-sm"
                      >
                        Xoá
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {sorted.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  Không tìm thấy kết quả
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function PartnerAccountList() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    setPartners([
      { id: 1, name: "Luxury Villa Đà Lạt", email: "villa@gmail.com", phone: "0912345678" },
      { id: 2, name: "Resort Biển Xanh", email: "resort@gmail.com", phone: "0987654321" },
      { id: 3, name: "Ocean Paradise", email: "ocean@gmail.com", phone: "0901122334" },
      { id: 4, name: "Mountain Retreat", email: "mountain@gmail.com", phone: "0922334455" },
    ]);
  }, []);

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc muốn xoá đối tác này?")) {
      setPartners(partners.filter((p) => p.id !== id));
    }
  };

  const handleSave = (updated: Partner) => {
    setPartners(partners.map((p) => (p.id === updated.id ? updated : p)));
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      <h1 className="text-2xl font-bold text-blue-600">
        Quản lý tài khoản đối tác
      </h1>

      <PartnerTable partners={partners} onDelete={handleDelete} onSave={handleSave} />
    </div>
  );
}
