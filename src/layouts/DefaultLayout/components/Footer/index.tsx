function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold mb-4">Dlegent</h2>
            <p className="text-gray-400 text-sm">
              Khám phá những kỳ nghỉ tuyệt vời tại các resort hàng đầu Việt Nam.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition">Trang chủ</a></li>
              <li><a href="/resorts" className="hover:text-white transition">Resort</a></li>
              <li><a href="/about" className="hover:text-white transition">Về chúng tôi</a></li>
              <li><a href="/contact" className="hover:text-white transition">Liên hệ</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
              <li><a href="/policy" className="hover:text-white transition">Chính sách</a></li>
              <li><a href="/terms" className="hover:text-white transition">Điều khoản</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>📍 123 Đường ABC, TP. Hồ Chí Minh</li>
              <li>📞 0123 456 789</li>
              <li>✉️ contact@resort.vn</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Resort. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
