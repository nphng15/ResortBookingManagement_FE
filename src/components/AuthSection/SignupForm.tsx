// import React, { useState } from 'react';

// function SignupForm() {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirm: '',
//   });

//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
//   const [success, setSuccess] = useState(false);

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
//     if (!form.name.trim()) err.name = 'Vui lòng nhập họ tên';
//     if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) err.email = 'Email không hợp lệ';
//     if (form.password.length < 6) err.password = 'Mật khẩu tối thiểu 6 ký tự';
//     if (form.password !== form.confirm) err.confirm = 'Mật khẩu không khớp';
//     return err;
//   }

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     const v = validate();
//     setErrors(v);
//     setTouched({ name: true, email: true, password: true, confirm: true });
//     if (Object.keys(v).length === 0) {
//       setSuccess(true);
//       console.log('Đăng ký thành công:', form);
//     } else {
//       setSuccess(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-violet-100 via-sky-100 to-cyan-100 flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-sky-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
//       </div>

//       {/* Form Container */}
//       <div className="w-full max-w-md relative z-10 animate-[fadeIn_0.6s_ease-out]">
//         {/* Card with Glassmorphism */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 hover:shadow-sky-200/50 transition-all duration-300">
//           {/* Header với gradient và pattern */}
//           <div className="bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 px-8 py-8 relative overflow-hidden">
//             {/* Decorative Pattern */}
//             <div className="absolute inset-0 opacity-10">
//               <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
//             </div>
            
//             {/* Icon */}
//             <div className="flex justify-center mb-4">
//               <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
//                 <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//                 </svg>
//               </div>
//             </div>

//             <h1 className="text-3xl font-bold text-white text-center drop-shadow-lg">
//               Đăng ký tài khoản
//             </h1>
//             <p className="text-white/90 text-center mt-2 text-sm">
//               Tạo tài khoản mới để bắt đầu hành trình
//             </p>
//           </div>

//           {/* Form Body */}
//           <div className="px-8 py-8">
//             {success && (
//               <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300 text-emerald-700 text-sm p-4 rounded-xl mb-6 flex items-start gap-3 animate-[slideDown_0.4s_ease-out] shadow-lg shadow-emerald-100">
//                 <div className="bg-emerald-500 rounded-full p-1">
//                   <svg className="w-4 h-4 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="font-bold">Đăng ký thành công!</p>
//                   <p className="text-xs mt-1">Chào mừng bạn đến với Trululu. 🎉</p>
//                 </div>
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* Họ tên */}
//               <div className="group">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 bg-sky-500 rounded-full group-focus-within:scale-150 transition-transform"></span>
//                   Họ và tên
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400 group-focus-within:text-sky-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                     </svg>
//                   </div>
//                   <input
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     placeholder="Nguyễn Văn A"
//                     className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
//                       errors.name && touched.name 
//                         ? 'border-red-300 focus:border-red-500 bg-red-50 shadow-lg shadow-red-100' 
//                         : 'border-gray-200 focus:border-sky-500 bg-white/50 focus:bg-white focus:shadow-lg focus:shadow-sky-100'
//                     }`}
//                   />
//                 </div>
//                 {errors.name && touched.name && (
//                   <p className="text-xs text-red-600 mt-2 flex items-center gap-1.5 animate-[slideDown_0.3s_ease-out]">
//                     <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                     </svg>
//                     {errors.name}
//                   </p>
//                 )}
//               </div>

//               {/* Email */}
//               <div className="group">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 bg-sky-500 rounded-full group-focus-within:scale-150 transition-transform"></span>
//                   Email
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400 group-focus-within:text-sky-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     placeholder="ban@trululu.com"
//                     className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
//                       errors.email && touched.email 
//                         ? 'border-red-300 focus:border-red-500 bg-red-50 shadow-lg shadow-red-100' 
//                         : 'border-gray-200 focus:border-sky-500 bg-white/50 focus:bg-white focus:shadow-lg focus:shadow-sky-100'
//                     }`}
//                   />
//                 </div>
//                 {errors.email && touched.email && (
//                   <p className="text-xs text-red-600 mt-2 flex items-center gap-1.5 animate-[slideDown_0.3s_ease-out]">
//                     <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                     </svg>
//                     {errors.email}
//                   </p>
//                 )}
//               </div>

//               {/* Mật khẩu */}
//               <div className="group">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 bg-sky-500 rounded-full group-focus-within:scale-150 transition-transform"></span>
//                   Mật khẩu
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400 group-focus-within:text-sky-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="password"
//                     name="password"
//                     value={form.password}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     placeholder="••••••••"
//                     className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
//                       errors.password && touched.password 
//                         ? 'border-red-300 focus:border-red-500 bg-red-50 shadow-lg shadow-red-100' 
//                         : 'border-gray-200 focus:border-sky-500 bg-white/50 focus:bg-white focus:shadow-lg focus:shadow-sky-100'
//                     }`}
//                   />
//                 </div>
//                 {errors.password && touched.password && (
//                   <p className="text-xs text-red-600 mt-2 flex items-center gap-1.5 animate-[slideDown_0.3s_ease-out]">
//                     <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                     </svg>
//                     {errors.password}
//                   </p>
//                 )}
//               </div>

//               {/* Nhập lại mật khẩu */}
//               <div className="group">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 bg-sky-500 rounded-full group-focus-within:scale-150 transition-transform"></span>
//                   Xác nhận mật khẩu
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400 group-focus-within:text-sky-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="password"
//                     name="confirm"
//                     value={form.confirm}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     placeholder="••••••••"
//                     className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
//                       errors.confirm && touched.confirm 
//                         ? 'border-red-300 focus:border-red-500 bg-red-50 shadow-lg shadow-red-100' 
//                         : 'border-gray-200 focus:border-sky-500 bg-white/50 focus:bg-white focus:shadow-lg focus:shadow-sky-100'
//                     }`}
//                   />
//                 </div>
//                 {errors.confirm && touched.confirm && (
//                   <p className="text-xs text-red-600 mt-2 flex items-center gap-1.5 animate-[slideDown_0.3s_ease-out]">
//                     <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                     </svg>
//                     {errors.confirm}
//                   </p>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="relative w-full bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 text-white font-bold py-4 rounded-xl hover:from-sky-600 hover:via-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-sky-300/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl overflow-hidden group"
//               >
//                 <span className="relative z-10 flex items-center justify-center gap-2">
//                   Tạo tài khoản
//                   <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                   </svg>
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
// );}
