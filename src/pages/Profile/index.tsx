import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  UserCircleIcon,
  BuildingOffice2Icon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { getCurrentUser, getToken } from '../../services/authService';
import { updateCustomerProfile, changePassword } from '../../services/customerService';
import { updatePartnerProfile } from '../../services/partnerProfileService';
import type { Account, CustomerInfo, PartnerInfo } from '../../services/authService';

// Validation helpers
const validateEmail = (email: string): string | null => {
  if (!email) return null; // Optional field
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Email không hợp lệ';
  return null;
};

const validatePhone = (phone: string): string | null => {
  if (!phone) return null; // Optional field
  const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) return 'Số điện thoại không hợp lệ (VD: 0901234567)';
  return null;
};

const validateIdNumber = (idNumber: string): string | null => {
  if (!idNumber) return null; // Optional field
  // CCCD: 12 số, CMND: 9 hoặc 12 số
  const idRegex = /^[0-9]{9}$|^[0-9]{12}$/;
  if (!idRegex.test(idNumber)) return 'CCCD/CMND phải có 9 hoặc 12 số';
  return null;
};

const validateFullname = (name: string): string | null => {
  if (!name) return null; // Optional field
  if (name.length < 2) return 'Họ tên phải có ít nhất 2 ký tự';
  if (name.length > 100) return 'Họ tên không được quá 100 ký tự';
  // Check for special characters (allow Vietnamese characters)
  const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
  if (!nameRegex.test(name)) return 'Họ tên không được chứa số hoặc ký tự đặc biệt';
  return null;
};

interface FormErrors {
  fullname?: string;
  email?: string;
  phone_number?: string;
  id_number?: string;
  name?: string;
  address?: string;
  banking_number?: string;
  bank?: string;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Customer form
  const [customerForm, setCustomerForm] = useState({
    fullname: '',
    email: '',
    phone_number: '',
    id_number: '',
  });
  // Partner form
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    phone_number: '',
    address: '',
    banking_number: '',
    bank: '',
  });

  // Password change state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const isPartner = user?.roles.includes('PARTNER');
  const isCustomer = user?.roles.includes('CUSTOMER');
  const themeColor = isPartner ? 'emerald' : 'violet';

  useEffect(() => {
    const loadProfile = async () => {
      const token = getToken();
      if (!token) { navigate('/auth'); return; }
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        if (userData.customer) {
          setCustomerForm({
            fullname: userData.customer.fullname || '',
            email: userData.customer.email || '',
            phone_number: userData.customer.phone_number || '',
            id_number: userData.customer.id_number || '',
          });
        }
        if (userData.partner) {
          setPartnerForm({
            name: userData.partner.name || '',
            phone_number: userData.partner.phone_number || '',
            address: userData.partner.address || '',
            banking_number: userData.partner.banking_number || '',
            bank: userData.partner.bank || '',
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

  const validateCustomerForm = (): boolean => {
    const errors: FormErrors = {};

    const fullnameError = validateFullname(customerForm.fullname);
    if (fullnameError) errors.fullname = fullnameError;

    const emailError = validateEmail(customerForm.email);
    if (emailError) errors.email = emailError;

    const phoneError = validatePhone(customerForm.phone_number);
    if (phoneError) errors.phone_number = phoneError;

    const idError = validateIdNumber(customerForm.id_number);
    if (idError) errors.id_number = idError;

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePartnerForm = (): boolean => {
    const errors: FormErrors = {};

    if (partnerForm.name && partnerForm.name.length < 2) {
      errors.name = 'Tên doanh nghiệp phải có ít nhất 2 ký tự';
    }

    const phoneError = validatePhone(partnerForm.phone_number);
    if (phoneError) errors.phone_number = phoneError;

    if (partnerForm.banking_number && !/^[0-9]{6,20}$/.test(partnerForm.banking_number)) {
      errors.banking_number = 'Số tài khoản không hợp lệ';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');

    // Validate before saving
    if (isCustomer && !validateCustomerForm()) {
      return;
    }
    if (isPartner && !validatePartnerForm()) {
      return;
    }

    setSaving(true);
    try {
      if (isPartner) {
        const result = await updatePartnerProfile(partnerForm);
        setUser((prev) =>
          prev ? { ...prev, partner: { ...prev.partner, ...result.partner } as PartnerInfo } : null
        );
      } else if (isCustomer) {
        const result = await updateCustomerProfile(customerForm);
        setUser((prev) => (prev ? { ...prev, customer: result.customer as CustomerInfo } : null));
      }
      setIsEditing(false);
      setFormErrors({});
      setSuccess('Cập nhật thông tin thành công');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cập nhật thất bại');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (user?.customer) {
      setCustomerForm({
        fullname: user.customer.fullname || '',
        email: user.customer.email || '',
        phone_number: user.customer.phone_number || '',
        id_number: user.customer.id_number || '',
      });
    }
    if (user?.partner) {
      setPartnerForm({
        name: user.partner.name || '',
        phone_number: user.partner.phone_number || '',
        address: user.partner.address || '',
        banking_number: user.partner.banking_number || '',
        bank: user.partner.bank || '',
      });
    }
    setIsEditing(false);
    setFormErrors({});
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
      await changePassword({ old_password: passwordForm.old_password, new_password: passwordForm.new_password });
      setSuccess('Đổi mật khẩu thành công');
      setShowPasswordForm(false);
      setPasswordForm({ old_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đổi mật khẩu thất bại');
    } finally {
      setChangingPassword(false);
    }
  };

  const formatCurrency = (amount: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`animate-spin w-8 h-8 border-4 border-${themeColor}-600 border-t-transparent rounded-full`} />
      </div>
    );
  }

  const displayName = isPartner ? user?.partner?.name : user?.customer?.fullname;
  const Icon = isPartner ? BuildingOffice2Icon : UserCircleIcon;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className={`bg-gradient-to-r ${isPartner ? 'from-emerald-600 to-teal-600' : 'from-violet-600 to-cyan-600'} px-6 py-8`}>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Icon className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{displayName || user?.username}</h1>
                <p className="text-white/80">@{user?.username}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6">{error}</div>}
            {success && <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg mb-6">{success}</div>}

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">{isPartner ? 'Thông tin doanh nghiệp' : 'Thông tin cá nhân'}</h2>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className={`flex items-center gap-2 px-4 py-2 text-${themeColor}-600 hover:bg-${themeColor}-50 rounded-lg transition-colors`}>
                  <PencilIcon className="w-4 h-4" />Chỉnh sửa
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleCancel} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <XMarkIcon className="w-4 h-4" />Hủy
                  </button>
                  <button onClick={handleSave} disabled={saving} className={`flex items-center gap-2 px-4 py-2 bg-${themeColor}-600 text-white rounded-lg hover:bg-${themeColor}-700 transition-colors disabled:opacity-50`}>
                    <CheckIcon className="w-4 h-4" />{saving ? 'Đang lưu...' : 'Lưu'}
                  </button>
                </div>
              )}
            </div>

            {/* Customer Fields */}
            {isCustomer && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Họ và tên</label>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={customerForm.fullname}
                        onChange={(e) => {
                          setCustomerForm({ ...customerForm, fullname: e.target.value });
                          if (formErrors.fullname) setFormErrors({ ...formErrors, fullname: undefined });
                        }}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                          formErrors.fullname ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                      />
                      {formErrors.fullname && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.fullname}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-900">{user?.customer?.fullname || '-'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                  {isEditing ? (
                    <>
                      <input
                        type="email"
                        value={customerForm.email}
                        onChange={(e) => {
                          setCustomerForm({ ...customerForm, email: e.target.value });
                          if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
                        }}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                          formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="example@email.com"
                      />
                      {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
                    </>
                  ) : (
                    <p className="text-gray-900">{user?.customer?.email || '-'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Số điện thoại</label>
                  {isEditing ? (
                    <>
                      <input
                        type="tel"
                        value={customerForm.phone_number}
                        onChange={(e) => {
                          setCustomerForm({ ...customerForm, phone_number: e.target.value });
                          if (formErrors.phone_number)
                            setFormErrors({ ...formErrors, phone_number: undefined });
                        }}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                          formErrors.phone_number ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="0901234567"
                      />
                      {formErrors.phone_number && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.phone_number}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-900">{user?.customer?.phone_number || '-'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">CCCD/CMND</label>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={customerForm.id_number}
                        onChange={(e) => {
                          // Only allow numbers
                          const value = e.target.value.replace(/\D/g, '');
                          setCustomerForm({ ...customerForm, id_number: value });
                          if (formErrors.id_number) setFormErrors({ ...formErrors, id_number: undefined });
                        }}
                        maxLength={12}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                          formErrors.id_number ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="012345678901"
                      />
                      {formErrors.id_number && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.id_number}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-900">{user?.customer?.id_number || '-'}</p>
                  )}
                </div>
              </div>
            )}

            {/* Partner Fields */}
            {isPartner && (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Tên doanh nghiệp</label>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={partnerForm.name}
                          onChange={(e) => {
                            setPartnerForm({ ...partnerForm, name: e.target.value });
                            if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                          }}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                            formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                          }`}
                        />
                        {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
                      </>
                    ) : (
                      <p className="text-gray-900">{user?.partner?.name || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Số điện thoại</label>
                    {isEditing ? (
                      <>
                        <input
                          type="tel"
                          value={partnerForm.phone_number}
                          onChange={(e) => {
                            setPartnerForm({ ...partnerForm, phone_number: e.target.value });
                            if (formErrors.phone_number)
                              setFormErrors({ ...formErrors, phone_number: undefined });
                          }}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                            formErrors.phone_number ? 'border-red-300 bg-red-50' : 'border-gray-200'
                          }`}
                          placeholder="0901234567"
                        />
                        {formErrors.phone_number && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.phone_number}</p>
                        )}
                      </>
                    ) : (
                      <p className="text-gray-900">{user?.partner?.phone_number || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Địa chỉ</label>
                    {isEditing ? (
                      <textarea
                        value={partnerForm.address}
                        onChange={(e) => setPartnerForm({ ...partnerForm, address: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        rows={2}
                      />
                    ) : (
                      <p className="text-gray-900">{user?.partner?.address || '-'}</p>
                    )}
                  </div>
                </div>

                {/* Banking Info */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin ngân hàng</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Ngân hàng</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={partnerForm.bank}
                          onChange={(e) => setPartnerForm({ ...partnerForm, bank: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <p className="text-gray-900">{user?.partner?.bank || '-'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Số tài khoản</label>
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={partnerForm.banking_number}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              setPartnerForm({ ...partnerForm, banking_number: value });
                              if (formErrors.banking_number)
                                setFormErrors({ ...formErrors, banking_number: undefined });
                            }}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                              formErrors.banking_number ? 'border-red-300 bg-red-50' : 'border-gray-200'
                            }`}
                          />
                          {formErrors.banking_number && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.banking_number}</p>
                          )}
                        </>
                      ) : (
                        <p className="text-gray-900">{user?.partner?.banking_number || '-'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Số dư hiện tại</label>
                      <p className="text-emerald-600 font-semibold">
                        {formatCurrency(user?.partner?.balance || 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Account Info */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin tài khoản</h2>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-gray-500">Tên đăng nhập</span><span className="text-gray-900">{user?.username}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Trạng thái</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full">{user?.status === 'ACTIVE' ? 'Hoạt động' : user?.status}</span>
                </div>
                <div className="flex justify-between"><span className="text-gray-500">Ngày tạo</span>
                  <span className="text-gray-900">{user?.created_at ? new Date(user.created_at).toLocaleDateString('vi-VN') : '-'}</span>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Bảo mật</h2>
                {!showPasswordForm && (
                  <button onClick={() => setShowPasswordForm(true)} className={`flex items-center gap-2 px-4 py-2 text-${themeColor}-600 hover:bg-${themeColor}-50 rounded-lg transition-colors`}>
                    <KeyIcon className="w-4 h-4" />Đổi mật khẩu
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
                        className={`w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-${themeColor}-500`} />
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
                        className={`w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-${themeColor}-500`} />
                      <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showNewPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu mới</label>
                    <input type="password" value={passwordForm.confirm_password}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })}
                      className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-${themeColor}-500`} />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button onClick={() => { setShowPasswordForm(false); setPasswordForm({ old_password: '', new_password: '', confirm_password: '' }); }}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">Hủy</button>
                    <button onClick={handleChangePassword} disabled={changingPassword}
                      className={`px-4 py-2 bg-${themeColor}-600 text-white rounded-lg hover:bg-${themeColor}-700 transition-colors disabled:opacity-50`}>
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
