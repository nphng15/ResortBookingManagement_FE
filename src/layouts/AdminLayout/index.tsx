import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

import {
  HiOutlineBars3,
  HiOutlineUserGroup,
  HiOutlineHomeModern,
  HiOutlineBanknotes
} from "react-icons/hi2";

export default function AdminLayout() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(true);

  const menu = [
    {
      path: "/admin/withdraws",
      label: "Yêu cầu rút tiền",
      icon: <HiOutlineBanknotes size={20} />,
    },
    {
      path: "/admin/customers",
      label: "Tài khoản khách hàng",
      icon: <HiOutlineUserGroup size={20} />,
    },
    {
      path: "/admin/partners",
      label: "Tài khoản đối tác",
      icon: <HiOutlineHomeModern size={20} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-blue-100 font-sans">
      <aside
        className={`${open ? "w-64" : "w-20"} bg-blue-100 shadow-xl transition-all duration-300 border-r`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <h2
            className={`text-xl font-bold text-blue-600 transition-all duration-200 ${
              !open && "opacity-0 hidden"
            }`}
          >
            Admin Dashboard
          </h2>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <HiOutlineBars3 size={22} />
        </button>
      </div>

      <nav className="p-4 space-y-3">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${
              pathname === item.path
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            {item.icon}
            <span className={`${!open && "hidden"} whitespace-nowrap`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>

    <main className="flex-1 p-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 border min-h-[80vh]">
        <Outlet />
      </div>
    </main>
  </div>
  );
}
