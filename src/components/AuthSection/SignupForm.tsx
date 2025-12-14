import { useState } from 'react';
import { register, registerPartner } from '../../services/authService';
import FormInput from './components/FormInput';
import SocialButtons from './components/SocialButtons';

type AccountType = 'customer' | 'partner';

interface SignupFormProps {
  isActive: boolean;
  onSuccess?: (message: string) => void;
}

function SignupForm({ isActive, onSuccess }: SignupFormProps) {
  const [accountType, setAccountType] = useState<AccountType>('customer');
  const [form, setForm] = useState({
    username: '', password: '', confirmPassword: '',
    name: '', phone_number: '', address: '', banking_number: '', bank: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    setLoading(true);
    try {
      if (accountType === 'customer') {
        await register({ username: form.username, password: form.password });
        onSuccess?.('Đăng ký thành công! Vui lòng đăng nhập.');
      } else {
        const { confirmPassword, ...partnerData } = form;
        await registerPartner(partnerData);
        onSuccess?.('Đăng ký đối tác thành công! Vui lòng chờ admin duyệt.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className={`absolute top-0 right-0 w-1/2 h-full flex items-center justify-center transition-all duration-700 ease-in-out overflow-y-auto py-8 ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
      }`}
    >
      <div className="w-full px-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Tạo tài khoản</h2>
        
        {/* Account Type Toggle */}
        <div className="flex justify-center mb-4">
          <div className="bg-gray-100 rounded-full p-1 flex">
            <button
              type="button"
              onClick={() => setAccountType('customer')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                accountType === 'customer'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Khách hàng
            </button>
            <button
              type="button"
              onClick={() => setAccountType('partner')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                accountType === 'partner'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Đối tác
            </button>
          </div>
        </div>

        {accountType === 'customer' && <SocialButtons />}
        
        <p className="text-gray-400 text-xs text-center mb-3">
          {accountType === 'customer' 
            ? 'hoặc sử dụng email để đăng ký' 
            : 'Đăng ký tài khoản đối tác resort'}
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 text-xs p-2 rounded-lg mb-3 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <FormInput
            type="text"
            placeholder="Tên đăng nhập"
            value={form.username}
            onChange={(v) => updateForm('username', v)}
          />
          <FormInput
            type="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={(v) => updateForm('password', v)}
          />
          <FormInput
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={form.confirmPassword}
            onChange={(v) => updateForm('confirmPassword', v)}
          />

          {/* Partner fields */}
          {accountType === 'partner' && (
            <>
              <FormInput
                type="text"
                placeholder="Tên doanh nghiệp"
                value={form.name}
                onChange={(v) => updateForm('name', v)}
              />
              <FormInput
                type="tel"
                placeholder="Số điện thoại"
                value={form.phone_number}
                onChange={(v) => updateForm('phone_number', v)}
              />
              <FormInput
                type="text"
                placeholder="Địa chỉ"
                value={form.address}
                onChange={(v) => updateForm('address', v)}
              />
              <FormInput
                type="text"
                placeholder="Số tài khoản ngân hàng"
                value={form.banking_number}
                onChange={(v) => updateForm('banking_number', v)}
              />
              <FormInput
                type="text"
                placeholder="Tên ngân hàng"
                value={form.bank}
                onChange={(v) => updateForm('bank', v)}
              />
            </>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-2.5 rounded-full font-semibold hover:bg-gray-800 hover:shadow-lg transition-all duration-300 uppercase tracking-wider text-sm disabled:opacity-50"
          >
            {loading ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
