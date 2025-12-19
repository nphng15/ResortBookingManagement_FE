import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useChristmasTheme } from '../../components/ChristmasTheme';

function CTASection() {
  const navigate = useNavigate();
  const { isChristmasTheme } = useChristmasTheme();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      navigate('/auth');
    }
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background - Christmas vs Default */}
      <div className={`absolute inset-0 ${
        isChristmasTheme 
          ? 'bg-gradient-to-br from-red-700 via-green-800 to-red-900'
          : 'bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700'
      }`} />
      
      {/* Animated shapes - Christmas themed */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse ${
          isChristmasTheme ? 'bg-yellow-400/20' : 'bg-white/10'
        }`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse ${
          isChristmasTheme ? 'bg-green-400/20' : 'bg-cyan-400/20'
        }`} style={{ animationDelay: '1s' }} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse ${
          isChristmasTheme ? 'bg-red-400/15' : 'bg-pink-400/10'
        }`} style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23fff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M0 0h1v40H0V0zm39 0h1v40h-1V0zM0 0h40v1H0V0zm0 39h40v1H0v-1z%22/%3E%3C/g%3E%3C/svg%3E')]" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className={`inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-8 ${
          isChristmasTheme ? 'bg-red-500/30' : 'bg-white/20'
        }`}>
          <span className={`w-2 h-2 rounded-full animate-pulse ${isChristmasTheme ? 'bg-yellow-400' : 'bg-emerald-400'}`} />
      </div>
        
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          {isChristmasTheme ? (
            <>
              Giảm ngay <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">50%</span>
              <br /> Đón Giáng sinh cùng Dlegent! 🎅
            </>
          ) : (
            <>
              Giảm ngay <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">30%</span>
              <br />cho đặt phòng đầu tiên
            </>
          )}
        </h2>
        
        <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
          {isChristmasTheme 
            ? '️ Đăng ký ngay để nhận mã giảm giá Giáng sinh độc quyền và những ưu đãi đặc biệt mùa lễ hội!'
            : 'Đăng ký ngay để nhận mã giảm giá độc quyền và cập nhật những resort mới nhất'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
          <div className="relative w-full sm:flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className={`w-full pl-12 pr-6 py-4 rounded-2xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none transition-all duration-300 ${
                isChristmasTheme ? 'focus:ring-4 focus:ring-yellow-400/40' : 'focus:ring-4 focus:ring-white/30'
              }`}
            />
          </div>
          <button
            type="submit"
            className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer whitespace-nowrap ${
              isChristmasTheme 
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 hover:from-yellow-400 hover:to-yellow-500'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {isChristmasTheme ? ' Nhận quà Giáng sinh!' : 'Nhận ưu đãi'}
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-white/60 text-sm">
          <span className="flex items-center gap-2">
            <svg className={`w-5 h-5 ${isChristmasTheme ? 'text-yellow-400' : 'text-emerald-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Miễn phí đăng ký
          </span>
          <span className="flex items-center gap-2">
            <svg className={`w-5 h-5 ${isChristmasTheme ? 'text-yellow-400' : 'text-emerald-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Không spam
          </span>
          <span className="flex items-center gap-2">
            <svg className={`w-5 h-5 ${isChristmasTheme ? 'text-yellow-400' : 'text-emerald-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Hủy bất cứ lúc nào
          </span>
        </div>
      </div>
    </section>
  );
}

export default CTASection;

