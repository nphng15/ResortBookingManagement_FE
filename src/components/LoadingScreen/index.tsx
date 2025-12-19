import { useState, useEffect } from 'react';
import snowflakeImg from '../../assets/snow_1.png';

interface LoadingScreenProps {
  onReady: () => void;
}

export default function LoadingScreen({ onReady }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  // Fake progress + ping server
  useEffect(() => {
    let isMounted = true;
    let progressInterval: ReturnType<typeof setInterval>;

    // Fake progress: tăng dần từ 0-85% (slower)
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) return prev;
        const increment = Math.max(0.3, (85 - prev) / 35);
        return Math.min(85, prev + increment);
      });
    }, 200);

    // Ping server - gọi 1 lần và chờ response (Render sẽ treo request cho đến khi server ready)
    const pingServer = async () => {
      const baseUrl = import.meta.env.VITE_BASE_URL || '';
      try {
        await fetch(`${baseUrl}/`);
        // Server đã ready
        if (isMounted) {
          clearInterval(progressInterval);
          setProgress(100);
          setTimeout(() => {
            if (isMounted) onReady();
          }, 600);
        }
      } catch {
        // Lỗi network - không làm gì, user phải refresh
      }
    };

    pingServer();

    return () => {
      isMounted = false;
      clearInterval(progressInterval);
    };
  }, [onReady]);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Christmas gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-green-900 to-red-950">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-500/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-green-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
        
        {/* Snowflakes decoration */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <img
              key={i}
              src={snowflakeImg}
              alt=""
              className="absolute w-6 h-6 opacity-40 animate-snowfall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 6}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Glassmorphism card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Christmas tree icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Outer ring */}
              <div className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center">
                {/* Spinning ring */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-400 border-r-red-400 animate-spin" />
                {/* Inner icon - Christmas tree */}
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                  <svg
                    className="w-9 h-9 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L4 12h3l-2 4h3l-2 4h12l-2-4h3l-2-4h3L12 2zm-1 15h2v3h-2v-3z" />
                  </svg>
                </div>
              </div>
              {/* Star on top */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-yellow-400 text-lg animate-pulse">
                ⭐
              </div>
            </div>
          </div>

          {/* Message */}
          <h2 className="text-white text-xl md:text-2xl font-semibold mb-2 text-center">
            🎄 Merry Christmas! 🎄
          </h2>
          <p className="text-white/70 text-sm text-center mb-8">
            Server đang thức dậy, xin chờ một chút nhé!
          </p>

          {/* Progress bar - Candy cane style with Santa */}
          <div className="w-72 md:w-96 mx-auto relative pb-8">
            {/* Santa face - centered on progress position */}
            <div
              className="absolute -top-5 transition-all duration-500 ease-out z-10"
              style={{ left: `calc(${Math.max(progress, 8)}% - 28px)` }}
            >
              <div className="w-14 h-14 relative">
                {/* Face - render first (behind) */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-11 h-11 bg-[#FDBF60] rounded-full border-2 border-[#E8A050]" />
                {/* Beard */}
                <div className="absolute top-7 left-1/2 -translate-x-1/2 w-10 h-7 bg-white rounded-b-full" />
                {/* Santa hat - lowered position */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-9 h-5 bg-red-500 rounded-t-full z-10" />
                <div className="absolute -top-1 left-1/2 translate-x-2 w-2.5 h-2.5 bg-white rounded-full z-20" />
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-11 h-2 bg-white rounded-full z-10" />
                {/* Eyes */}
                <div className="absolute top-5 left-3.5 w-1.5 h-2 bg-slate-800 rounded-full" />
                <div className="absolute top-5 right-3.5 w-1.5 h-2 bg-slate-800 rounded-full" />
                {/* Nose */}
                <div className="absolute top-7 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#E07040] rounded-full" />
              </div>
            </div>

            {/* Progress bar container */}
            <div className="h-7 bg-gray-200 rounded-full border-2 border-slate-700 relative mt-8 overflow-hidden">
              {/* Candy cane stripes - no rounded to avoid cut at start */}
              <div className="candy-stripes absolute inset-0" />
              {/* White overlay to hide unfilled portion */}
              <div
                className="absolute top-0 right-0 h-full bg-gray-200 transition-all duration-500 ease-out rounded-r-full"
                style={{ width: `${100 - progress}%` }}
              />
            </div>

            {/* Progress text */}
            <div className="flex justify-between items-center mt-3">
              <span className="text-white/60 text-xs">
                {progress < 100 ? 'Đang kết nối...' : 'Sẵn sàng!'}
              </span>
              <span className="text-white font-medium text-sm tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>

        {/* Hint */}
        <p className="text-white/50 text-xs mt-6 text-center max-w-xs">
          🎁 Lần đầu truy cập có thể mất 30-60 giây để khởi động server
        </p>
      </div>

      {/* Custom animation styles */}
      <style>{`
        .candy-stripes {
          background: repeating-linear-gradient(
            -55deg,
            #ef4444 0px,
            #ef4444 10px,
            #ffffff 10px,
            #ffffff 20px
          );
        }
        @keyframes snowfall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-snowfall {
          animation: snowfall linear infinite;
        }
      `}</style>
    </div>
  );
}
