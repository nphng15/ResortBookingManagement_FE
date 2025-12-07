// import React,react from 'react';
 
// function LoginForm() {
//   const [form, setForm] = react.useState({
//     email: '',
//     password: '',
//   });

//   const [errors, setErrors] = react.useState<{ [key: string]: string }>({});
//   const [touched, setTouched] = react.useState<{ [key: string]: boolean }>({});
//   const [success, setSuccess] = react.useState(false);

//   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   }

//   function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
//     const { name } = e.target;
//     setTouched(prev => ({ ...prev, [name]: true }));
//   }

//   function validate() {
//     const err: { [key: string]: string } = {};
//     if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) err.email = 'Email không hợp lệ';
//     if (!form.password) err.password = 'Vui lòng nhập mật khẩu';
//     return err;
//   }

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     const v = validate();
//     setErrors(v);
//     setTouched({ email: true, password: true });
//     if (Object.keys(v).length === 0) {
//       setSuccess(true);
//       console.log('Đăng nhập thành công:', form);
//     } else {
//       setSuccess(false);
//     }
//   }

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center relative flex items-center justify-center font-sans"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')",
//       }}
//     >
//       {/* Overlay mờ để form nổi bật */}
//       <div className="absolute inset-0 bg-sky-950/50 backdrop-blur-[2px]"></div>

//       {/* Form */}
//       <div className="relative bg-white/90 shadow-2xl rounded-3xl w-full max-w-md p-8 backdrop-blur-md transform transition-all hover:shadow-sky-200 animate-fadeIn">
//         <h1 className="text-2xl font-semibold text-sky-700 mb-6 text-center tracking-tight">
//           Đăng nhập
//         </h1>

//         {success && (
//           <div className="bg-green-100 text-green-700 text-sm p-3 rounded-lg mb-4 text-center animate-fadeIn">
//             ✅ Đăng nhập thành công!
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               placeholder="ban@trululu.com"
//               className={`mt-1 w-full border rounded-lg px-3 py-2 bg-white/80 text-slate-700 placeholder:text-slate-400 
//                 focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all 
//                 ${errors.email && touched.email ? 'border-red-400' : 'border-slate-200'}`}
//             />
//             {errors.email && touched.email && (
//               <p className="text-xs text-red-500 mt-1">{errors.email}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Mật khẩu</label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               placeholder="••••••"
//               className={`mt-1 w-full border rounded-lg px-3 py-2 bg-white/80 text-slate-700 placeholder:text-slate-400 
//                 focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all 
//                 ${errors.password && touched.password ? 'border-red-400' : 'border-slate-200'}`}
//             />
//             {errors.password && touched.password && (
//               <p className="text-xs text-red-500 mt-1">{errors.password}</p>
//             )}
//           </div>

//           {/* Nút đăng nhập */}
//           <button
//             type="submit"
//             className="w-full py-2.5 rounded-lg bg-gradient-to-r from-sky-600 to-sky-400 text-white font-medium 
//             hover:from-sky-700 hover:to-sky-500 shadow-lg transition-all transform hover:scale-[1.03]"
//           >
//             Đăng nhập
//           </button>
//         </form>

//         <p className="text-center text-sm text-slate-700 mt-5">
//           Chưa có tài khoản?{' '}
//           <a href="/signup" className="text-sky-600 hover:underline font-medium">
//             Đăng ký
//           </a>
//         </p>

//         <p className="text-center text-sm text-slate-500 mt-1">
//           Quên mật khẩu? <a href="#" className="text-sky-600 hover:underline font-medium">Click vào đây</a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;
