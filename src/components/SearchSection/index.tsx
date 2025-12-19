import mainBackground from "../../assets/GoldenBridge.jpg"
import Form from './Form'
import { useChristmasTheme } from '../../components/ChristmasTheme';

function SearchSection() {
  const { isChristmasTheme } = useChristmasTheme();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mainBackground})` }}
      />
      
      {/* Gradient Overlay - Christmas or Default */}
      <div className={`absolute inset-0 ${
        isChristmasTheme 
          ? 'christmas-hero-overlay'
          : 'bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/70'
      }`} />
      
      {/* Aurora Effect - Christmas themed */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full blur-[120px] animate-pulse ${
          isChristmasTheme ? 'christmas-aurora-1' : 'bg-violet-500/20'
        }`} />
        <div className={`absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] rounded-full blur-[100px] animate-pulse ${
          isChristmasTheme ? 'christmas-aurora-2' : 'bg-cyan-500/20'
        }`} style={{ animationDelay: '2s' }} />
        <div className={`absolute top-1/4 right-1/3 w-[400px] h-[400px] rounded-full blur-[80px] animate-pulse ${
          isChristmasTheme ? 'christmas-aurora-3' : 'bg-pink-500/10'
        }`} style={{ animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-24 pb-20">
        {/* Header */}
        <div className="text-center mb-10">
          {/* Christmas banner */}    
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Tìm Kiếm
            <span className={`block ${
              isChristmasTheme 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-400 to-green-400'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400'
            }`}>
              {isChristmasTheme ? 'Kỳ nghỉ Giáng sinh' : 'Resort Hoàn Hảo'}
            </span>
          </h1>
          
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
            {isChristmasTheme 
              ? '️ Đón mùa lễ hội tuyệt vời tại các resort hàng đầu Việt Nam với ưu đãi đặc biệt!'
              : 'Khám phá những kỳ nghỉ tuyệt vời tại các resort hàng đầu Việt Nam'}
          </p>
        </div>

        {/* Search Form */}
        <Form />

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-white/60 text-sm">
          <span className="flex items-center gap-2">
            <svg className={`w-5 h-5 ${isChristmasTheme ? 'text-yellow-400' : 'text-emerald-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            {isChristmasTheme ? 'Ưu đãi Giáng sinh' : 'Đảm bảo giá tốt nhất'}
          </span>
          <span className="flex items-center gap-2">
            <svg className={`w-5 h-5 ${isChristmasTheme ? 'text-yellow-400' : 'text-emerald-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Miễn phí hủy phòng
          </span>
          <span className="flex items-center gap-2">
            <svg className={`w-5 h-5 ${isChristmasTheme ? 'text-yellow-400' : 'text-emerald-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Hỗ trợ 24/7
          </span>
        </div>
      </div>

      {/* Bottom gradient fade - Christmas themed */}
      <div className={`absolute bottom-0 left-0 right-0 h-32 ${
        isChristmasTheme 
          ? 'christmas-bottom-fade'
          : 'bg-gradient-to-t from-white to-transparent'
      }`} />
    </section>
  )
}

export default SearchSection

