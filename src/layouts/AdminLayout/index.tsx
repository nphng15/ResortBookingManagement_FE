import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router';
import { UsersIcon, BuildingOffice2Icon, ClipboardDocumentCheckIcon, BanknotesIcon, ArrowRightOnRectangleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { getCurrentUser, logout, getToken } from '../../services/authService';
import type { Account } from '../../services/authService';

const navItems = [
  { path: '/admin/customers', label: 'Khách hàng', icon: UsersIcon },
  { path: '/admin/partners', label: 'Đối tác', icon: BuildingOffice2Icon },
  { path: '/admin/partner-approval', label: 'Phê duyệt đối tác', icon: ClipboardDocumentCheckIcon },
  { path: '/admin/withdrawals', label: 'Yêu cầu rút tiền', icon: BanknotesIcon },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (!token) {
        navigate('/auth');
        return;
      }
      try {
        const userData = await getCurrentUser();
        if (!userData.roles.includes('ADMIN')) {
          navigate('/access-denied');
          return;
        }
        setUser(userData);
      } catch {
        navigate('/auth');
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const getAvatarLetter = () => user?.username?.charAt(0).toUpperCase() || 'A';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-gray-900">Admin Panel</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer - User Info */}
        <div className="p-3 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-blue-600">{getAvatarLetter()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.username}</p>
              <p className="text-xs text-gray-500">Quản trị viên</p>
            </div>
          </div>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 w-full transition-colors cursor-pointer">
            <Cog6ToothIcon className="w-5 h-5" />
            Cài đặt
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors cursor-pointer"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-gray-900">
            {navItems.find((item) => item.path === location.pathname)?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">{getAvatarLetter()}</span>
              </div>
              <span className="text-sm font-medium text-gray-700">{user?.username}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
