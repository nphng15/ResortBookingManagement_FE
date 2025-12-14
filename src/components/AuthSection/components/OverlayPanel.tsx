interface OverlayPanelProps {
  isSignUp: boolean;
  onToggle: () => void;
}

function OverlayPanel({ isSignUp, onToggle }: OverlayPanelProps) {
  return (
    <div
      className={`absolute top-0 w-1/2 h-full bg-black/70 backdrop-blur-sm transition-all duration-700 ease-in-out z-20 flex items-center justify-center ${
        isSignUp ? 'left-0 rounded-r-[100px]' : 'left-1/2 rounded-l-[100px]'
      }`}
    >
      <div className="flex flex-col items-center justify-center text-white px-12 text-center">
        {isSignUp ? (
          <>
            <h1 className="text-4xl font-bold mb-4">Chào mừng trở lại!</h1>
            <p className="mb-8 text-white/80">
              Đăng nhập để tiếp tục khám phá những resort tuyệt vời cùng chúng tôi
            </p>
            <button
              onClick={onToggle}
              className="border-2 border-white text-white px-12 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 uppercase tracking-wider"
            >
              Đăng nhập
            </button>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-4">Xin chào!</h1>
            <p className="mb-8 text-white/80">
              Đăng ký ngay để trải nghiệm dịch vụ đặt resort hàng đầu
            </p>
            <button
              onClick={onToggle}
              className="border-2 border-white text-white px-12 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 uppercase tracking-wider"
            >
              Đăng ký
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default OverlayPanel;
