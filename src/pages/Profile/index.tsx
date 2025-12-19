import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { UserCircleIcon, PencilIcon, CheckIcon, XMarkIcon, KeyIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { getCurrentUser, getToken } from '../../services/authService';
import { updateCustomerProfile, changePassword } from '../../services/customerService';
import type { Account, CustomerInfo } from '../../services/authService';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<Account | null>(null);
  const [profile, setProfile] = useState<CustomerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    fullname: '',
    email: '',
    phone_number: '',
    id_number: '',
  });

  // Password change state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ old_password: '', new_password: '', confirm_password: '' });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const token = getToken();
      if (!token) {
        navigate('/auth');
        return;
      }
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        
        // Lấy thông tin customer từ response /auth/me
        if (userData.customer) {
          setProfile(userData.customer);
          setEditForm({
            fullname: userData.customer.fullname || '',
            email: userData.customer.email || '',
            phone_number: userData.customer.phone_number || '',
            id_number: userData.customer.id_number || '',
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Không thể tải thông tin');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [navigate]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const result = await updateCustomerProfile(editForm);
      setProfile(result.customer);
      setIsEditing(false);
      setSuccess('Cập nhật thông tin thành công');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cập nhật thất bại');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditForm({
      fullname: profile?.fullname || '',
      email: profile?.email || '',
      phone_number: profile?.phone_number || '',
      id_number: profile?.id_number || '',
    });
    setIsEditing(false);
  };

  const handleChangePassword = async () => {
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    if (passwordForm.new_password.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }
    setChangingPassword(true);
    setError('');
    setSuccess('');
    try {
      await changePassword({
        old_password: passwordForm.old_password,
        new_password: passwordForm.new_password,
      });
      setSuccess('Đổi mật khẩu thành công');
      setShowPasswordForm(false);
      setPasswordForm({ old_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đổi mật khẩu thất bại');
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-cyan-600 px-6 py-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <UserCircleIcon className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{profile?.fullname || user?.username}</h1>
                <p className="text-white/80">@{user?.username}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6">{error}</div>}
            {success && <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg mb-6">{success}</div>}

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Thông tin cá nhân</h2>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
                  <PencilIcon className="w-4 h-4" />
                  Chỉnh sửa
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleCancel} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <XMarkIcon className="w-4 h-4" />
                    Hủy
                  </button>
                  <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50">
                    <CheckIcon className="w-4 h-4" />
                    {saving ? 'Đang lưu...' : 'Lưu'}
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Họ và tên</label>
                {isEditing ? (
                  <input type="text" value={editForm.fullname} onChange={(e) => setEditForm({ ...editForm, fullname: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Nhập họ và tên" />
                ) : (
                  <p className="text-gray-900">{profile?.fullname || '-'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                {isEditing ? (
                  <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Nhập email" />
                ) : (
                  <p className="text-gray-900">{profile?.email || '-'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Số điện thoại</label>
                {isEditing ? (
                  <input type="tel" value={editForm.phone_number} onChange={(e) => setEditForm({ ...editForm, phone_number: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Nhập số điện thoại" />
                ) : (
                  <p className="text-gray-900">{profile?.phone_number || '-'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">CCCD/CMND</label>
                {isEditing ? (
                  <input type="text" value={editForm.id_number} onChange={(e) => setEditForm({ ...editForm, id_number: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Nhập số CCCD/CMND" />
                ) : (
                  <p className="text-gray-900">{profile?.id_number || '-'}</p>
                )}
              </div>
            </div>

            {/* Account Info */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin tài khoản</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Tên đăng nhập</span>
                  <span className="text-gray-900">{user?.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Trạng thái</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                    {user?.status === 'ACTIVE' ? 'Hoạt động' : user?.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Ngày tạo</span>
                  <span className="text-gray-900">{user?.created_at ? new Date(user.created_at).toLocaleDateString('vi-VN') : '-'}</span>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Bảo mật</h2>
                {!showPasswordForm && (
                  <button onClick={() => setShowPasswordForm(true)} className="flex items-center gap-2 px-4 py-2 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
                    <KeyIcon className="w-4 h-4" />
                    Đổi mật khẩu
                  </button>
                )}
              </div>

              {showPasswordForm && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu hiện tại</label>
                    <div className="relative">
                      <input type={showOldPassword ? 'text' : 'password'} value={passwordForm.old_password}
                        onChange={(e) => setPasswordForm({ ...passwordForm, old_password: e.target.value })}
                        className="w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500" />
                      <button type="button" onClick={() => setShowOldPassword(!showOldPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showOldPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
                    <div className="relative">
                      <input type={showNewPassword ? 'text' : 'password'} value={passwordForm.new_password}
                        onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                        className="w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500" />
                      <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showNewPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu mới</label>
                    <input type="password" value={passwordForm.confirm_password}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button onClick={() => { setShowPasswordForm(false); setPasswordForm({ old_password: '', new_password: '', confirm_password: '' }); }}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">Hủy</button>
                    <button onClick={handleChangePassword} disabled={changingPassword}
                      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50">
                      {changingPassword ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
