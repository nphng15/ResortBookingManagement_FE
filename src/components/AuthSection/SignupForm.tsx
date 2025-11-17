import React, { useState } from 'react';

function SignupForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  }

  function validate() {
    const err: { [key: string]: string } = {};
    if (!form.name.trim()) err.name = 'Vui lòng nhập họ tên';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) err.email = 'Email không hợp lệ';
    if (form.password.length < 6) err.password = 'Mật khẩu tối thiểu 6 ký tự';
    if (form.password !== form.confirm) err.confirm = 'Mật khẩu không khớp';
    return err;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    setTouched({ name: true, email: true, password: true, confirm: true });
    if (Object.keys(v).length === 0) {
      setSuccess(true);
      console.log('Đăng ký thành công:', form);
    } else {
      setSuccess(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Lớp phủ mờ giúp form nổi bật hơn */}
      <div className="absolute inset-0 bg-sky-900/50 backdrop-blur-sm"></div>

      {/* Form */}
      <div className="relative bg-white/90 shadow-2xl rounded-2xl w-full max-w-md p-8 animate-fadeIn">

        {/* Tiêu đề */}
        <h1 className="text-2xl font-semibold text-sky-700 mb-4 text-center">
            Đăng ký
        </h1>

        {success && (
          <div className="bg-green-100 text-green-700 text-sm p-3 rounded-lg mb-4">
            ✅ Đăng ký thành công! Chào mừng bạn đến với Trululu.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Họ tên */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Họ tên</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nguyễn Văn A"
              className={`mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300 ${
                errors.name && touched.name ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.name && touched.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="ban@trululu.com"
              className={`mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300 ${
                errors.email && touched.email ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.email && touched.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••"
              className={`mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300 ${
                errors.password && touched.password ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.password && touched.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Nhập lại mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Nhập lại mật khẩu</label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••"
              className={`mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300 ${
                errors.confirm && touched.confirm ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.confirm && touched.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
          </div>

          {/* Nút */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 shadow-lg transition transform hover:scale-[1.02]"
          >
            Tạo tài khoản
          </button>
        </form>

        <p className="text-center text-sm text-slate-700 mt-4">
          Đã có tài khoản?{' '}
          <a href="/login" className="text-sky-600 hover:underline font-medium">
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
