interface TestimonialCardProps {
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  location: string;
}

function TestimonialCard({ name, avatar, rating, comment, location }: TestimonialCardProps) {
  return (
    <div className="relative group cursor-pointer h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-3xl blur opacity-0 group-hover:opacity-50 transition duration-500" />
      <div className="relative bg-white rounded-3xl p-8 h-full border border-slate-100 group-hover:border-transparent transition-all duration-300 flex flex-col">
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          ))}
        </div>
        <p className="text-slate-600 leading-relaxed flex-grow text-lg">"{comment}"</p>
        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100">
          <img src={avatar} alt={name} className="w-14 h-14 rounded-full object-cover ring-4 ring-slate-100" />
          <div>
            <h4 className="font-bold text-slate-900">{name}</h4>
            <p className="text-slate-500 text-sm">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  { name: 'Nguyễn Minh Anh', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', rating: 5, comment: 'Trải nghiệm tuyệt vời! Tìm được resort 5 sao với giá cực kỳ hợp lý. Quy trình đặt phòng nhanh chóng, nhân viên hỗ trợ nhiệt tình.', location: 'Hà Nội' },
  { name: 'Trần Văn Hùng', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', rating: 5, comment: 'Đã đặt resort cho cả gia đình 10 người. Mọi thứ đều hoàn hảo từ A-Z. Chắc chắn sẽ quay lại sử dụng dịch vụ!', location: 'TP. Hồ Chí Minh' },
  { name: 'Lê Thị Hương', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', rating: 5, comment: 'Giá cả minh bạch, không phát sinh chi phí ẩn. Resort đúng như hình, thậm chí còn đẹp hơn. 10 điểm!', location: 'Đà Nẵng' },
];

function TestimonialSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            Đánh giá từ khách hàng
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Được tin tưởng bởi
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">hàng nghìn khách hàng</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Đọc những chia sẻ thực tế từ khách hàng đã trải nghiệm dịch vụ của chúng tôi
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <TestimonialCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
