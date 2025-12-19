import { useChristmasTheme } from '../../../../components/ChristmasTheme';

function Footer() {
  const { isChristmasTheme } = useChristmasTheme();

  return (
    <footer className={`text-white ${isChristmasTheme ? 'christmas-footer' : 'bg-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              Dlegent
              {isChristmasTheme && <span className="text-xl"></span>}
            </h2>
            <p className={`text-sm ${isChristmasTheme ? 'text-green-200' : 'text-gray-400'}`}>
              {isChristmasTheme 
                ? '🎅 Chúc bạn mùa lễ hội vui vẻ! Khám phá những kỳ nghỉ tuyệt vời tại các resort hàng đầu Việt Nam.'
                : 'Khám phá những kỳ nghỉ tuyệt vời tại các resort hàng đầu Việt Nam.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isChristmasTheme ? 'text-yellow-300' : ''}`}>
              {isChristmasTheme && ' '}Liên kết nhanh
            </h3>
            <ul className={`space-y-2 ${isChristmasTheme ? 'text-green-200' : 'text-gray-400'}`}>
              <li><a href="/" className="hover:text-white transition">Trang chủ</a></li>
              <li><a href="/resorts" className="hover:text-white transition">Resort</a></li>
              <li><a href="/about" className="hover:text-white transition">Về chúng tôi</a></li>
              <li><a href="/contact" className="hover:text-white transition">Liên hệ</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <ul className={`space-y-2 ${isChristmasTheme ? 'text-green-200' : 'text-gray-400'}`}>
              <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
              <li><a href="/policy" className="hover:text-white transition">Chính sách</a></li>
              <li><a href="/terms" className="hover:text-white transition">Điều khoản</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <ul className={`space-y-2 text-sm ${isChristmasTheme ? 'text-green-200' : 'text-gray-400'}`}>
              <li>📍 123 Đường ABC, TP. Hồ Chí Minh</li>
              <li>📞 0123 456 789</li>
              <li>✉️ contact@resort.vn</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t mt-8 pt-8 ${isChristmasTheme ? 'border-red-700' : 'border-gray-700'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${isChristmasTheme ? 'text-green-200' : 'text-gray-400'}`}>
              © 2025 Resort. All rights reserved.
              {isChristmasTheme && '  Merry Christmas! 🎅'}
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className={`${isChristmasTheme ? 'text-green-200' : 'text-gray-400'} hover:text-white transition`}>Facebook</a>
              <a href="#" className={`${isChristmasTheme ? 'text-green-200' : 'text-gray-400'} hover:text-white transition`}>Instagram</a>
              <a href="#" className={`${isChristmasTheme ? 'text-green-200' : 'text-gray-400'} hover:text-white transition`}>Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

