import { useState } from 'react';
import { useNavigate } from 'react-router';
import { login, getCurrentUser } from '../../services/authService';
import FormInput from './components/FormInput';
import SocialButtons from './components/SocialButtons';

interface LoginFormProps {
  isActive: boolean;
  onSuccess?: () => void;
}

function LoginForm({ isActive, onSuccess }: LoginFormProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(form);
      
      // Lấy thông tin user để kiểm tra role
      const user = await getCurrentUser();
      onSuccess?.();
      
      // Chuyển hướng theo role
      if (user.roles.includes('PARTNER')) {
        navigate('/partner');
      } else if (user.roles.includes('ADMIN')) {
        navigate('/admin');
      } else {
        // CUSTOMER hoặc role khác -> trang chủ
        navigate('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`absolute top-0 left-0 w-1/2 h-full flex items-center justify-center transition-all duration-700 ease-in-out ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
      }`}
    >
      <div className="w-full px-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Đăng nhập</h2>
        
        <SocialButtons />
        
        <p className="text-gray-400 text-sm text-center mb-6">hoặc sử dụng tài khoản của bạn</p>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            type="text"
            placeholder="Tên đăng nhập"
            value={form.username}
            onChange={(value) => setForm({ ...form, username: value })}
          />
          <FormInput
            type="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={(value) => setForm({ ...form, password: value })}
          />
          
          <a href="#" className="text-gray-500 text-sm hover:text-gray-800 block text-center">
            Quên mật khẩu?
          </a>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-3 rounded-full font-semibold hover:bg-gray-800 hover:shadow-lg transition-all duration-300 uppercase tracking-wider disabled:opacity-50"
          >
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
