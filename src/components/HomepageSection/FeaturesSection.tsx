interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon, title, description, gradient }: FeatureCardProps) {
  return (
    <div className="relative group cursor-pointer">
      <div className={`absolute -inset-0.5 ${gradient} rounded-3xl blur opacity-0 group-hover:opacity-75 transition duration-500`} />
      <div className="relative bg-white rounded-3xl p-8 h-full border border-slate-100 group-hover:border-transparent transition-all duration-300">
        <div className={`w-16 h-16 ${gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

const SearchIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CurrencyIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.885a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const features = [
  { icon: <SearchIcon />, title: 'Tìm kiếm thông minh', description: 'AI gợi ý resort phù hợp với sở thích và ngân sách của bạn.', gradient: 'bg-gradient-to-br from-violet-500 to-purple-600' },
  { icon: <CurrencyIcon />, title: 'Đảm bảo giá tốt', description: 'Cam kết hoàn 200% chênh lệch nếu tìm thấy giá rẻ hơn.', gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600' },
  { icon: <StarIcon />, title: 'Đánh giá xác thực', description: 'Chỉ hiển thị đánh giá từ khách đã check-out thực tế.', gradient: 'bg-gradient-to-br from-amber-500 to-orange-600' },
  { icon: <ShieldIcon />, title: 'Bảo vệ toàn diện', description: 'Hoàn tiền 100% nếu resort không đúng như cam kết.', gradient: 'bg-gradient-to-br from-blue-500 to-cyan-600' },
];

function FeaturesSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            Tại sao chọn chúng tôi
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Trải nghiệm đặt phòng
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">hoàn toàn khác biệt</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Công nghệ hiện đại kết hợp dịch vụ tận tâm, mang đến trải nghiệm đặt resort tốt nhất Việt Nam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} gradient={feature.gradient} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
