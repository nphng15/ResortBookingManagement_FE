import { useState, useEffect } from "react";
import AdminStatCards from "../Common/AdminStatCards";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

type SortKey = "id" | "name" | "email" | "phone";

const CustomerTable: React.FC<{
  customers: Customer[];
  onDelete: (id: number) => void;
  onSave: (updated: Customer) => void;
}> = ({ customers, onDelete, onSave }) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortAsc, setSortAsc] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (typeof valA === "number" && typeof valB === "number") {
      return sortAsc ? valA - valB : valB - valA;
    }
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

  const startEditing = (customer: Customer) => {
    setEditingId(customer.id);
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    });
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
        placeholder="Tìm kiếm tên, email hoặc số điện thoại..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="overflow-x-auto rounded-xl shadow-lg border bg-white">
        <table className="min-w-full text-left divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                { label: "ID", key: "id" },
                { label: "Khách hàng", key: "name" },
                { label: "Email", key: "email" },
                { label: "Điện thoại", key: "phone" },
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
            {sorted.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-gray-50 hover:shadow-md transition-all border-b last:border-none"
              >
                <td className="p-4">{c.id}</td>

                {/* BỎ AVATAR – GIỮ LẠI CHỈ TÊN */}
                <td className="p-4">
                  {editingId === c.id ? (
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="font-medium">{c.name}</span>
                  )}
                </td>

                <td className="p-4">
                  {editingId === c.id ? (
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-blue-500"
                    />
                  ) : (
                    <a href={`mailto:${c.email}`} className="text-blue-600 hover:underline">
                      {c.email}
                    </a>
                  )}
                </td>

                <td className="p-4">
                  {editingId === c.id ? (
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-blue-500"
                    />
                  ) : (
                    <span>{c.phone}</span>
                  )}
                </td>

                <td className="p-4 flex space-x-2">
                  {editingId === c.id ? (
                    <>
                      <button
                        onClick={() => saveEditing(c.id)}
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
                        onClick={() => startEditing(c)}
                        className="px-4 py-2 text-blue-600 bg-blue-100 border border-blue-300 rounded-xl hover:bg-blue-200 transition shadow-sm"
                      >
                        Chỉnh sửa
                      </button>

                      <button
                        onClick={() => onDelete(c.id)}
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

export default function CustomerAccountList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    setCustomers([
      { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", phone: "0901234567" },
      { id: 2, name: "Trần Mai B", email: "b@gmail.com", phone: "0912345678" },
      { id: 3, name: "Lê Thị C", email: "c@gmail.com", phone: "0923456789" },
    ]);
  }, []);

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc muốn xoá khách hàng này?")) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  const handleSave = (updated: Customer) => {
    setCustomers(customers.map((c) => (c.id === updated.id ? updated : c)));
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      <AdminStatCards />
      <h1 className="text-2xl font-bold text-blue-600">Quản lý tài khoản khách hàng</h1>
      <CustomerTable
        customers={customers}
        onDelete={handleDelete}
        onSave={handleSave}
      />
    </div>
  );
}